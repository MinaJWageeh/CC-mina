import React from 'react';
import { DeviceComponent } from '../../core/types/circuit';
import { NetGraph } from '../../core/graph/NetGraph';
import { translations } from '../../i18n/translations';

interface PropertiesInspectorProps {
  component: DeviceComponent | null;
  graph: NetGraph;
  lang: 'ar' | 'en';
  onUpdateComponent: (comp: DeviceComponent) => void;
  onRotate: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const PropertiesInspector: React.FC<PropertiesInspectorProps> = ({
  component,
  graph,
  lang,
  onUpdateComponent,
  onRotate,
  onDelete,
  onClose,
}) => {
  if (!component) return null;
  const t = translations[lang];

  // Available master tags in circuit (KM1, KA1, KT1, OL1, etc.)
  const masterTags = graph.tagRegistry.getMasterTags();
  const isDependentContact = [
    'aux_contact_no',
    'aux_contact_nc',
    'contactor_main_3p',
    'timer_contact_no',
    'timer_contact_nc'
  ].includes(component.type);

  const handleTagChange = (newTag: string) => {
    onUpdateComponent({ ...component, tag: newTag });
  };

  const handleMasterTagChange = (newMaster: string) => {
    onUpdateComponent({ ...component, masterTag: newMaster });
  };

  const handlePresetChange = (val: number) => {
    onUpdateComponent({
      ...component,
      state: { ...component.state, timerPreset: Math.max(0.5, val) }
    });
  };

  const handleResetOverload = () => {
    onUpdateComponent({
      ...component,
      state: { ...component.state, tripped: false }
    });
  };

  const handleTestOverload = () => {
    onUpdateComponent({
      ...component,
      state: { ...component.state, tripped: true }
    });
  };

  return (
    <div
      className={`w-72 bg-industrial-900 border-l border-slate-800 p-4 flex flex-col z-30 select-none shadow-xl ${
        lang === 'ar' ? 'font-cairo' : 'font-sans'
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-slate-800">
        <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
          <span>⚙️</span>
          <span>{t.properties.title}</span>
        </h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3.5 my-4 flex-1 overflow-y-auto">
        {/* Component Tag */}
        <div>
          <label className="text-[11px] font-semibold text-slate-300 block mb-1">
            {t.properties.tag}
          </label>
          <input
            type="text"
            value={component.tag}
            onChange={(e) => handleTagChange(e.target.value)}
            className="w-full bg-industrial-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-sky-400 font-mono font-bold"
          />
        </div>

        {/* Master Coil Binding Dropdown for Contacts */}
        {isDependentContact && (
          <div>
            <label className="text-[11px] font-semibold text-amber-300 block mb-1">
              {t.properties.bindToMaster}
            </label>
            <select
              value={component.masterTag || ''}
              onChange={(e) => handleMasterTagChange(e.target.value)}
              className="w-full bg-industrial-950 border border-amber-600/60 text-slate-200 text-xs rounded p-1.5 font-mono"
            >
              <option value="">{t.properties.none}</option>
              {masterTags.map((mt) => (
                <option key={mt} value={mt}>
                  {mt}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Timer Duration Preset */}
        {component.type.startsWith('timer_') && !component.type.includes('contact') && (
          <div>
            <label className="text-[11px] font-semibold text-amber-300 block mb-1">
              {t.properties.timerPreset}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0.5"
                max="120"
                step="0.5"
                value={component.state.timerPreset ?? 5.0}
                onChange={(e) => handlePresetChange(parseFloat(e.target.value))}
                className="w-24 bg-industrial-950 border border-slate-700 rounded px-2 py-1 text-xs text-amber-400 font-mono font-bold"
              />
              <span className="text-xs text-slate-400">{t.properties.seconds}</span>
            </div>
          </div>
        )}

        {/* Overload Relay Reset & Test Buttons */}
        {component.type === 'overload_relay' && (
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={handleResetOverload}
              className="w-full bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold py-1.5 rounded transition-all shadow"
            >
              🔄 {t.properties.resetOverload}
            </button>
            <button
              onClick={handleTestOverload}
              className="w-full bg-rose-700/80 hover:bg-rose-700 text-white text-xs font-bold py-1.5 rounded transition-all shadow"
            >
              ⚡ {t.properties.testOverload}
            </button>
          </div>
        )}

        {/* Terminals list */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
            {lang === 'ar' ? 'أطراف التوصيل:' : 'Terminals:'}
          </label>
          <div className="space-y-1">
            {component.terminals.map((term) => (
              <div
                key={term.id}
                className="flex justify-between items-center bg-slate-950/60 border border-slate-800/80 px-2 py-1 rounded text-[10px]"
              >
                <span className="font-mono font-bold text-slate-300">Pin {term.label}</span>
                <span
                  className={`font-mono px-1 rounded ${
                    term.potential !== 'NONE'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'text-slate-500'
                  }`}
                >
                  {term.potential}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-800 space-y-2">
        <button
          onClick={onRotate}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1.5"
        >
          <span>🔄</span>
          <span>{lang === 'ar' ? 'تدوير 90° (R)' : 'Rotate 90° (R)'}</span>
        </button>
        <button
          onClick={onDelete}
          className="w-full bg-rose-900/60 hover:bg-rose-900 text-rose-300 text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1.5 border border-rose-800"
        >
          <span>🗑️</span>
          <span>{t.delete}</span>
        </button>
      </div>
    </div>
  );
};
