import React, { useState } from 'react';
import { NetGraph } from '../../core/graph/NetGraph';
import { Terminal, VoltagePotential } from '../../core/types/circuit';
import { soundManager } from '../../audio/AudioEngine';

interface MultimeterToolProps {
  graph: NetGraph;
  active: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const MultimeterTool: React.FC<MultimeterToolProps> = ({
  graph,
  active,
  onClose,
  lang,
}) => {
  const [selectedTerminalRed, setSelectedTerminalRed] = useState<string>('');
  const [selectedTerminalBlack, setSelectedTerminalBlack] = useState<string>('');
  const [mode, setMode] = useState<'AC_V' | 'DC_V' | 'CONT'>('AC_V');

  if (!active) return null;

  // Gather all available terminals in the graph
  const allTerminals: { id: string; label: string; potential: VoltagePotential; netId: string | null }[] = [];
  for (const comp of graph.components.values()) {
    for (const term of comp.terminals) {
      allTerminals.push({
        id: term.id,
        label: `${comp.tag} : Pin ${term.label}`,
        potential: term.potential,
        netId: term.netId
      });
    }
  }

  const termRed = allTerminals.find(t => t.id === selectedTerminalRed);
  const termBlack = allTerminals.find(t => t.id === selectedTerminalBlack);

  // Calculate measurement
  let displayValue = '0.0 V';
  let unit = 'AC';
  let isBeeping = false;

  const pRed = termRed?.potential || 'NONE';
  const pBlack = termBlack?.potential || 'NONE';

  if (mode === 'AC_V') {
    unit = 'V AC';
    if (['L1', 'L2', 'L3'].includes(pRed) && pBlack === 'N') {
      displayValue = '231.4';
    } else if (pRed === 'N' && ['L1', 'L2', 'L3'].includes(pBlack)) {
      displayValue = '231.4';
    } else if (['L1', 'L2', 'L3'].includes(pRed) && ['L1', 'L2', 'L3'].includes(pBlack) && pRed !== pBlack) {
      displayValue = '401.8';
    } else if (pRed === pBlack && pRed !== 'NONE') {
      displayValue = '0.0';
    } else {
      displayValue = '0.0';
    }
  } else if (mode === 'DC_V') {
    unit = 'V DC';
    if (pRed === 'DC_POS' && pBlack === 'DC_NEG') {
      displayValue = '+24.1';
    } else if (pRed === 'DC_NEG' && pBlack === 'DC_POS') {
      displayValue = '-24.1';
    } else {
      displayValue = '0.0';
    }
  } else if (mode === 'CONT') {
    unit = 'Ω';
    // If both pins share the same netId and are not empty
    if (termRed && termBlack && termRed.netId && termRed.netId === termBlack.netId) {
      displayValue = '0.1';
      isBeeping = true;
      soundManager.playAlarmBeep();
    } else {
      displayValue = 'O.L'; // Open Loop
    }
  }

  return (
    <div
      className={`fixed top-20 right-6 z-50 w-72 bg-industrial-900/95 border border-amber-500/40 rounded-xl shadow-2xl p-4 backdrop-blur-md ${
        lang === 'ar' ? 'font-cairo' : 'font-sans'
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400 shadow-glow-yellow animate-pulse" />
          <span className="text-xs font-bold text-amber-400">
            {lang === 'ar' ? 'أفوميتر رقمي حقيقي' : 'True-RMS Multimeter'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800"
        >
          ✕
        </button>
      </div>

      {/* LCD Screen */}
      <div className="my-3 bg-industrial-950 border border-slate-700 rounded-lg p-3 flex flex-col items-end justify-center shadow-inner">
        <span className="text-2xl font-mono font-bold text-amber-300 tracking-wider">
          {displayValue}
        </span>
        <span className="text-[10px] font-mono text-slate-400">{unit}</span>
      </div>

      {/* Mode Selector Knob */}
      <div className="flex justify-center gap-2 my-2">
        <button
          onClick={() => setMode('AC_V')}
          className={`px-2 py-1 text-[10px] font-bold rounded ${
            mode === 'AC_V' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
          }`}
        >
          ~ V (AC)
        </button>
        <button
          onClick={() => setMode('DC_V')}
          className={`px-2 py-1 text-[10px] font-bold rounded ${
            mode === 'DC_V' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
          }`}
        >
          ⎓ V (DC)
        </button>
        <button
          onClick={() => setMode('CONT')}
          className={`px-2 py-1 text-[10px] font-bold rounded ${
            mode === 'CONT' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
          }`}
        >
          🔔 Ω (Continuity)
        </button>
      </div>

      {/* Probe Terminal Pickers */}
      <div className="space-y-2 mt-3 text-xs">
        {/* Red Probe */}
        <div>
          <label className="text-[10px] text-rose-400 font-semibold flex items-center gap-1 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
            {lang === 'ar' ? 'المجس الأحمر (+):' : 'Red Probe (+):'}
          </label>
          <select
            value={selectedTerminalRed}
            onChange={(e) => setSelectedTerminalRed(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-[11px] rounded p-1"
          >
            <option value="">{lang === 'ar' ? '-- اختر طرف التلامس --' : '-- Select Terminal --'}</option>
            {allTerminals.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label} ({t.potential})
              </option>
            ))}
          </select>
        </div>

        {/* Black Probe */}
        <div>
          <label className="text-[10px] text-slate-300 font-semibold flex items-center gap-1 mb-1">
            <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
            {lang === 'ar' ? 'المجس الأسود (-):' : 'Black Probe (-):'}
          </label>
          <select
            value={selectedTerminalBlack}
            onChange={(e) => setSelectedTerminalBlack(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-[11px] rounded p-1"
          >
            <option value="">{lang === 'ar' ? '-- اختر طرف التلامس --' : '-- Select Terminal --'}</option>
            {allTerminals.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label} ({t.potential})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
