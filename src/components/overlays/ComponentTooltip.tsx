import React from 'react';
import { DeviceComponent, Terminal } from '../../core/types/circuit';
import { COMPONENT_CATALOG } from '../../core/types/components';

interface ComponentTooltipProps {
  component: DeviceComponent | null;
  hoveredTerminal: Terminal | null;
  lang: 'ar' | 'en';
}

export const ComponentTooltip: React.FC<ComponentTooltipProps> = ({
  component,
  hoveredTerminal,
  lang,
}) => {
  if (!component && !hoveredTerminal) return null;

  const def = component ? COMPONENT_CATALOG[component.type] : null;
  if (!def) return null;

  const title = lang === 'ar' ? def.nameAr : def.nameEn;
  const description = lang === 'ar' ? def.descriptionAr : def.descriptionEn;

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 w-80 bg-industrial-900/95 border border-slate-700/80 rounded-xl shadow-2xl p-3.5 backdrop-blur-md transition-all ${
        lang === 'ar' ? 'font-cairo' : 'font-sans'
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Title & Tag */}
      <div className="flex justify-between items-start pb-2 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold text-sky-400 font-mono uppercase tracking-wider block">
            {component?.tag} • {def.category}
          </span>
          <h4 className="text-xs font-bold text-slate-100">{title}</h4>
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-glow-green" />
      </div>

      {/* Description */}
      <p className="text-[11px] text-slate-300 leading-relaxed my-2">{description}</p>

      {/* Hovered Terminal Breakdown if hovering a pin */}
      {hoveredTerminal && (
        <div className="mt-2 pt-2 border-t border-slate-800/80 bg-slate-950/40 rounded p-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-amber-300">
              {lang === 'ar' ? `طرف التوصيل: ${hoveredTerminal.label}` : `Terminal Pin: ${hoveredTerminal.label}`}
            </span>
            <span
              className={`font-mono px-1 rounded text-[9px] ${
                hoveredTerminal.potential !== 'NONE'
                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {hoveredTerminal.potential}
            </span>
          </div>
          {(() => {
            const pinDef = def.pins.find((p) => p.label === hoveredTerminal.label);
            if (!pinDef) return null;
            return (
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {lang === 'ar' ? pinDef.roleAr : pinDef.role}
              </span>
            );
          })()}
        </div>
      )}

      {/* Helper Hints */}
      <div className="mt-2 text-[9px] text-slate-400 flex flex-col gap-0.5 pt-1.5 border-t border-slate-800/60">
        <span>⚡ {lang === 'ar' ? 'اضغط Shift لرسم أسلاك بزوايا 90° قائمة' : 'Hold Shift for 90° orthogonal wires'}</span>
        <span>🔗 {lang === 'ar' ? 'اضغط على أي سلك لعمل تفريع (Branch Node)' : 'Click any wire to spawn branch junction'}</span>
      </div>
    </div>
  );
};
