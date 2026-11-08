import React from 'react';
import { SimulationMode } from '../../core/types/circuit';
import { translations } from '../../i18n/translations';
import { AppIcon } from '../common/AppIcon';

interface AppHeaderProps {
  mode: SimulationMode;
  lang: 'ar' | 'en';
  isSimRunning: boolean;
  simSpeed: number;
  isMuted: boolean;
  laserActive: boolean;
  multimeterActive: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onToggleMode: () => void;
  onTogglePlayPause: () => void;
  onStepSim: () => void;
  onResetSim: () => void;
  onSetSpeed: (speed: number) => void;
  onToggleLanguage: () => void;
  onToggleAudio: () => void;
  onToggleLaser: () => void;
  onClearLaser: () => void;
  onToggleMultimeter: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onOpenExamples: () => void;
  onExport: () => void;
  onOpenHelp: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  mode,
  lang,
  isSimRunning,
  simSpeed,
  isMuted,
  laserActive,
  multimeterActive,
  canUndo,
  canRedo,
  onToggleMode,
  onTogglePlayPause,
  onStepSim,
  onResetSim,
  onSetSpeed,
  onToggleLanguage,
  onToggleAudio,
  onToggleLaser,
  onClearLaser,
  onToggleMultimeter,
  onUndo,
  onRedo,
  onOpenExamples,
  onExport,
  onOpenHelp,
}) => {
  const t = translations[lang];

  return (
    <header
      className={`h-14 bg-industrial-900 border-b border-slate-800 flex items-center justify-between px-4 z-30 select-none ${
        lang === 'ar' ? 'font-cairo' : 'font-sans'
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <AppIcon className="w-8 h-8 rounded-xl shadow-md shadow-sky-500/25 shrink-0" />
        <div>
          <h1 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>{t.appTitle}</span>
            <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-800">
              PRO v2.0
            </span>
          </h1>
          <p className="text-[10px] text-slate-400 -mt-0.5">{t.appSubtitle}</p>
        </div>
      </div>

      {/* Primary Mode Switch (Design vs. Live Run) */}
      <div className="flex items-center bg-industrial-950 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => mode !== 'design' && onToggleMode()}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            mode === 'design'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>📐</span>
          <span>{t.designMode}</span>
        </button>
        <button
          onClick={() => mode !== 'run' && onToggleMode()}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            mode === 'run'
              ? 'bg-emerald-500 text-slate-950 shadow-glow-green animate-pulse'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>⚡</span>
          <span>{t.runMode}</span>
        </button>
      </div>

      {/* Simulation Clock Controls (Active in Run Mode) */}
      {mode === 'run' && (
        <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-emerald-900/50">
          <button
            onClick={onTogglePlayPause}
            className={`p-1.5 rounded text-xs font-bold transition-colors ${
              isSimRunning ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-400'
            }`}
            title={isSimRunning ? t.pause : t.play}
          >
            {isSimRunning ? '⏸️' : '▶️'}
          </button>
          <button
            onClick={onStepSim}
            className="p-1.5 rounded text-xs text-slate-300 hover:text-white bg-slate-800"
            title={t.step}
          >
            ⏭️
          </button>
          <button
            onClick={onResetSim}
            className="p-1.5 rounded text-xs text-slate-300 hover:text-white bg-slate-800"
            title={t.reset}
          >
            🔄
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 ml-2 text-[10px] text-slate-400 font-mono">
            <span>{t.speed}:</span>
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => onSetSpeed(spd)}
                className={`px-1.5 py-0.5 rounded ${
                  simSpeed === spd ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tools: Undo/Redo, Multimeter, Presentation, Audio, Language, Examples */}
      <div className="flex items-center gap-1.5">
        {/* Undo & Redo */}
        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1 text-xs rounded ${canUndo ? 'text-slate-300 hover:text-white' : 'text-slate-600'}`}
            title={t.undo}
          >
            ↩️
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1 text-xs rounded ${canRedo ? 'text-slate-300 hover:text-white' : 'text-slate-600'}`}
            title={t.redo}
          >
            ↪️
          </button>
        </div>

        {/* Presentation Laser Highlighter */}
        <button
          onClick={onToggleLaser}
          className={`px-2.5 py-1 text-xs rounded-lg border transition-all flex items-center gap-1 ${
            laserActive
              ? 'bg-sky-500/20 text-sky-300 border-sky-400 shadow-glow-blue'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500'
          }`}
          title={t.laserPen}
        >
          <span>🖊️</span>
          <span className="hidden md:inline">{t.laserPen}</span>
        </button>

        {laserActive && (
          <button
            onClick={onClearLaser}
            className="px-2 py-1 text-[10px] rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          >
            {t.clearLaser}
          </button>
        )}

        {/* Multimeter */}
        <button
          onClick={onToggleMultimeter}
          className={`px-2.5 py-1 text-xs rounded-lg border transition-all flex items-center gap-1 ${
            multimeterActive
              ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-glow-yellow'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500'
          }`}
          title={t.multimeter}
        >
          <span>📟</span>
          <span className="hidden md:inline">{t.multimeter}</span>
        </button>

        {/* Audio Mute/Unmute */}
        <button
          onClick={onToggleAudio}
          className={`p-1.5 text-xs rounded-lg border transition-all ${
            isMuted ? 'bg-rose-950/40 text-rose-400 border-rose-900' : 'bg-slate-800 text-emerald-400 border-slate-700'
          }`}
          title={isMuted ? t.soundOff : t.soundOn}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        {/* Examples Library */}
        <button
          onClick={onOpenExamples}
          className="px-2.5 py-1 text-xs rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white font-semibold transition-all border border-indigo-500 flex items-center gap-1 shadow"
        >
          <span>📚</span>
          <span>{t.examples}</span>
        </button>

        {/* Help & Guide */}
        <button
          onClick={onOpenHelp}
          className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold transition-all border border-slate-700 flex items-center gap-1 shadow"
          title={t.help}
        >
          <span>❓</span>
          <span className="hidden sm:inline">{t.help}</span>
        </button>

        {/* Export */}
        <button
          onClick={onExport}
          className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all border border-slate-700"
          title={t.exportPdf}
        >
          💾
        </button>

        {/* Language Toggle Button */}
        <button
          onClick={onToggleLanguage}
          className="px-2 py-1 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 font-mono"
        >
          {lang === 'ar' ? 'EN' : 'عربي'}
        </button>
      </div>
    </header>
  );
};
