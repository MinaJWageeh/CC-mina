import React, { useState } from 'react';
import { CircuitProject } from '../../core/types/circuit';
import { allExamples } from '../../examples';
import { translations } from '../../i18n/translations';

interface ExamplesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadProject: (project: CircuitProject) => void;
  lang: 'ar' | 'en';
}

export const ExamplesDialog: React.FC<ExamplesDialogProps> = ({
  isOpen,
  onClose,
  onLoadProject,
  lang,
}) => {
  const [activeTier, setActiveTier] = useState<'easy' | 'medium' | 'advanced'>('easy');
  if (!isOpen) return null;

  const t = translations[lang];
  const filtered = allExamples.filter((ex) => ex.tier === activeTier);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 select-none">
      <div
        className={`bg-industrial-900 border border-indigo-500/40 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${
          lang === 'ar' ? 'font-cairo' : 'font-sans'
        }`}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-4 bg-industrial-950 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📚</span>
            <div>
              <h2 className="text-sm font-bold text-slate-100">{t.examplesModal.title}</h2>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar'
                  ? 'دوائر تدريبية قياسية معتمدة جاهزة للمحاكاة والشرح المباشر'
                  : 'Verified classic control circuits ready for immediate simulation'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 text-xs"
          >
            ✕
          </button>
        </div>

        {/* Tier Tabs (Easy / Medium / Advanced) */}
        <div className="flex border-b border-slate-800 bg-industrial-950/60 p-2 gap-2">
          <button
            onClick={() => setActiveTier('easy')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTier === 'easy'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🟢</span>
            <span>{t.examplesModal.easy}</span>
          </button>
          <button
            onClick={() => setActiveTier('medium')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTier === 'medium'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🟡</span>
            <span>{t.examplesModal.medium}</span>
          </button>
          <button
            onClick={() => setActiveTier('advanced')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTier === 'advanced'
                ? 'bg-rose-700 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🔴</span>
            <span>{t.examplesModal.advanced}</span>
          </button>
        </div>

        {/* Circuit List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.map((item) => {
            const title = lang === 'ar' ? item.titleAr : item.titleEn;
            const desc = lang === 'ar' ? item.descAr : item.descEn;

            return (
              <div
                key={item.id}
                className="bg-industrial-950/80 border border-slate-800 hover:border-indigo-500/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1 max-w-xl">
                  <h3 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                    <span className="text-sky-400">⚡</span>
                    <span>{title}</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{desc}</p>
                </div>
                <button
                  onClick={() => {
                    onLoadProject(item.project);
                    onClose();
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-md transition-all flex items-center justify-center gap-1.5 self-end sm:self-center"
                >
                  <span>🚀</span>
                  <span>{t.examplesModal.loadCircuit}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
