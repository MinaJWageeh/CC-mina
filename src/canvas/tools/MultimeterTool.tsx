import React, { useEffect, useMemo, useState } from 'react';
import { NetGraph } from '../../core/graph/NetGraph';
import { VoltagePotential } from '../../core/types/circuit';
import { soundManager } from '../../audio/AudioEngine';
import { translations } from '../../i18n/translations';

interface MultimeterToolProps {
  graph: NetGraph;
  active: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  theme?: 'dark' | 'light';
}

type MultimeterMode = 'AC_V' | 'AC_A' | 'DC_V' | 'CONT';

export const MultimeterTool: React.FC<MultimeterToolProps> = ({
  graph,
  active,
  onClose,
  lang,
  theme = 'dark',
}) => {
  const [mode, setMode] = useState<MultimeterMode>('AC_V');
  const [selectedTerminalRed, setSelectedTerminalRed] = useState<string>('');
  const [selectedTerminalBlack, setSelectedTerminalBlack] = useState<string>('');
  const [clampTargetComponentId, setClampTargetComponentId] = useState<string>('');
  const [jitter, setJitter] = useState<number>(0);

  const t = translations[lang];
  const isAr = lang === 'ar';
  const isLight = theme === 'light';

  // Subtle real-time digital LCD jitter effect for realism
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setJitter((Math.random() - 0.5) * 0.04);
    }, 400);
    return () => clearInterval(interval);
  }, [active]);

  // Gather all available terminals in the graph
  const allTerminals = useMemo(() => {
    const list: { id: string; label: string; potential: VoltagePotential; netId: string | null }[] = [];
    for (const comp of graph.components.values()) {
      for (const term of comp.terminals) {
        list.push({
          id: term.id,
          label: `${comp.tag} : Pin ${term.label}`,
          potential: term.potential,
          netId: term.netId,
        });
      }
    }
    return list;
  }, [graph, graph.components.size]);

  // Gather all loads & components for clamp ammeter probe
  const measurableComponents = useMemo(() => {
    return Array.from(graph.components.values()).map((comp) => ({
      id: comp.id,
      tag: comp.tag,
      type: comp.type,
      state: comp.state,
    }));
  }, [graph, graph.components.size]);

  if (!active) return null;

  const termRed = allTerminals.find((t) => t.id === selectedTerminalRed);
  const termBlack = allTerminals.find((t) => t.id === selectedTerminalBlack);

  let displayValue = '0.0';
  let unit = 'V AC';
  let isBeeping = false;

  const pRed = termRed?.potential || 'NONE';
  const pBlack = termBlack?.potential || 'NONE';

  // 1. AC Voltage Mode
  if (mode === 'AC_V') {
    unit = 'V AC';
    if (['L1', 'L2', 'L3'].includes(pRed) && pBlack === 'N') {
      const v = 230.5 + jitter * 10;
      displayValue = v.toFixed(1);
    } else if (pRed === 'N' && ['L1', 'L2', 'L3'].includes(pBlack)) {
      const v = 230.5 + jitter * 10;
      displayValue = v.toFixed(1);
    } else if (['L1', 'L2', 'L3'].includes(pRed) && ['L1', 'L2', 'L3'].includes(pBlack) && pRed !== pBlack) {
      const v = 400.2 + jitter * 15;
      displayValue = v.toFixed(1);
    } else if (pRed === pBlack && pRed !== 'NONE') {
      displayValue = '0.0';
    } else {
      displayValue = '0.0';
    }
  }

  // 2. AC Current Mode (Ammeter & Clamp Meter)
  else if (mode === 'AC_A') {
    const targetComp = measurableComponents.find((c) => c.id === clampTargetComponentId);

    if (targetComp) {
      if (targetComp.type.startsWith('motor_3p')) {
        const rpm = targetComp.state.motorRpm || 0;
        if (rpm > 0) {
          unit = 'A AC';
          // Inrush vs running current
          if (rpm < 800) {
            const inrush = 31.5 + jitter * 8;
            displayValue = inrush.toFixed(1);
          } else {
            const running = 7.45 + jitter;
            displayValue = running.toFixed(2);
          }
        } else {
          unit = 'A AC';
          displayValue = '0.00';
        }
      } else if (targetComp.type === 'motor_1p') {
        const rpm = targetComp.state.motorRpm || 0;
        unit = 'A AC';
        if (rpm > 0) {
          const running = 4.22 + jitter;
          displayValue = running.toFixed(2);
        } else {
          displayValue = '0.00';
        }
      } else if (targetComp.type.includes('coil')) {
        unit = 'mA AC';
        if (targetComp.state.energized) {
          const coilCurrent = 185.0 + jitter * 15;
          displayValue = coilCurrent.toFixed(1);
        } else {
          displayValue = '0.0';
        }
      } else if (targetComp.type === 'indicator_lamp') {
        unit = 'mA AC';
        if (targetComp.state.energized) {
          const lampCurrent = 22.4 + jitter * 2;
          displayValue = lampCurrent.toFixed(1);
        } else {
          displayValue = '0.0';
        }
      } else {
        unit = 'A AC';
        displayValue = '0.00';
      }
    } else {
      // If no clamp component picked, estimate based on red/black probes
      unit = 'A AC';
      if (['L1', 'L2', 'L3'].includes(pRed) && pBlack === 'N') {
        displayValue = '0.00'; // high impedance in voltmeter connections
      } else {
        displayValue = '0.00';
      }
    }
  }

  // 3. DC Voltage Mode
  else if (mode === 'DC_V') {
    unit = 'V DC';
    if (pRed === 'DC_POS' && pBlack === 'DC_NEG') {
      const v = 24.08 + jitter;
      displayValue = '+' + v.toFixed(1);
    } else if (pRed === 'DC_NEG' && pBlack === 'DC_POS') {
      const v = 24.08 + jitter;
      displayValue = '-' + v.toFixed(1);
    } else {
      displayValue = '0.0';
    }
  }

  // 4. Continuity & Resistance Mode
  else if (mode === 'CONT') {
    unit = 'Ω';
    if (termRed && termBlack && termRed.netId && termRed.netId === termBlack.netId) {
      displayValue = '0.08';
      isBeeping = true;
      soundManager.playAlarmBeep();
    } else {
      displayValue = 'O.L';
    }
  }

  return (
    <div
      className={`fixed top-16 right-6 z-50 w-80 rounded-2xl shadow-2xl p-4 border transition-all select-none backdrop-blur-xl ${
        isLight
          ? 'bg-white/95 border-amber-500/50 text-slate-800 shadow-amber-500/10'
          : 'bg-slate-950/95 border-amber-500/50 text-slate-100 shadow-amber-500/15'
      } ${isAr ? 'font-cairo' : 'font-sans'}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-2.5 border-b border-amber-500/30">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24] animate-pulse" />
          <span className="text-xs font-bold text-amber-500 tracking-wide uppercase font-mono">
            {t.multimeterModal.title}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xs transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Digital LCD Display Screen */}
      <div className="my-3 p-3 bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-slate-700 rounded-xl shadow-inner flex flex-col justify-between h-20 text-emerald-400 font-mono relative overflow-hidden">
        {/* LCD Backlight Glass Effect */}
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />

        <div className="flex justify-between items-center text-[10px] text-emerald-500/80 font-bold tracking-widest uppercase">
          <span>AUTO-RANGE TRUE RMS</span>
          <span>{isBeeping ? '🔊 BEEP' : 'HOLD'}</span>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-black tracking-wider text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
            {displayValue}
          </span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60">
            {unit}
          </span>
        </div>
      </div>

      {/* Function Dial / Mode Buttons */}
      <div className="grid grid-cols-4 gap-1.5 mb-3 text-[11px] font-bold font-mono">
        <button
          onClick={() => setMode('AC_V')}
          className={`py-1.5 rounded-lg border transition-all ${
            mode === 'AC_V'
              ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          V ~
        </button>
        <button
          onClick={() => setMode('AC_A')}
          className={`py-1.5 rounded-lg border transition-all ${
            mode === 'AC_A'
              ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
          title={isAr ? 'قياس شدة التيار المتردد (أمبير AC)' : 'AC Current (Amps)'}
        >
          A ~
        </button>
        <button
          onClick={() => setMode('DC_V')}
          className={`py-1.5 rounded-lg border transition-all ${
            mode === 'DC_V'
              ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          V ⎓
        </button>
        <button
          onClick={() => setMode('CONT')}
          className={`py-1.5 rounded-lg border transition-all ${
            mode === 'CONT'
              ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          Ω 🔊
        </button>
      </div>

      {/* Mode-Specific Probes Configuration */}
      {mode === 'AC_A' ? (
        // Clamp Meter Mode: Select Component / Line
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
            <span>🗜️</span>
            <span>{t.multimeterModal.clampTarget}:</span>
          </label>
          <select
            value={clampTargetComponentId}
            onChange={(e) => setClampTargetComponentId(e.target.value)}
            className={`w-full text-xs rounded-xl px-2.5 py-1.5 border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
              isLight
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-slate-900 border-slate-700 text-slate-200'
            }`}
          >
            <option value="">{isAr ? '-- اختر محرك أو ملف أو لمبة لقياس تيارها --' : '-- Select component for current measurement --'}</option>
            {measurableComponents.map((c) => (
              <option key={c.id} value={c.id}>
                {c.tag} ({c.type})
              </option>
            ))}
          </select>
          <p className="text-[10px] text-slate-400 leading-relaxed italic">
            {t.multimeterModal.clampDesc}
          </p>
        </div>
      ) : (
        // Voltage / Resistance Probes (Red & Black)
        <div className="space-y-2">
          {/* Red Probe (+) */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-[0_0_6px_#f43f5e]" />
              <span>{t.multimeterModal.probeRed}</span>
            </label>
            <select
              value={selectedTerminalRed}
              onChange={(e) => setSelectedTerminalRed(e.target.value)}
              className={`w-full text-xs rounded-xl px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-rose-500 ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-slate-900 border-slate-700 text-slate-200'
              }`}
            >
              <option value="">{isAr ? '-- اختر طرف التوصيل --' : '-- Select Pin --'}</option>
              {allTerminals.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Black Probe (-) */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block shadow-[0_0_6px_#64748b]" />
              <span>{t.multimeterModal.probeBlack}</span>
            </label>
            <select
              value={selectedTerminalBlack}
              onChange={(e) => setSelectedTerminalBlack(e.target.value)}
              className={`w-full text-xs rounded-xl px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-slate-500 ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-slate-900 border-slate-700 text-slate-200'
              }`}
            >
              <option value="">{isAr ? '-- اختر طرف التوصيل --' : '-- Select Pin --'}</option>
              {allTerminals.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
