import React from 'react';
import { DeviceComponent, Wire } from '../../core/types/circuit';
import { NetGraph } from '../../core/graph/NetGraph';
import { WireRenderer } from '../../canvas/renderers/WireRenderer';
import { translations } from '../../i18n/translations';

interface PropertiesInspectorProps {
  component: DeviceComponent | null;
  wire?: Wire | null;
  graph: NetGraph;
  lang: 'ar' | 'en';
  onUpdateComponent: (comp: DeviceComponent) => void;
  onUpdateWire?: (wire: Wire) => void;
  onRotate?: () => void;
  onDelete?: () => void;
  onDeleteWire?: () => void;
  onClose: () => void;
}

export const PropertiesInspector: React.FC<PropertiesInspectorProps> = ({
  component,
  wire,
  graph,
  lang,
  onUpdateComponent,
  onUpdateWire,
  onRotate,
  onDelete,
  onDeleteWire,
  onClose,
}) => {
  if (!component && !wire) return null;
  const t = translations[lang];

  // -------------------------------------------------------------
  // WIRE INSPECTOR & PATH EDITING
  // -------------------------------------------------------------
  if (wire) {
    const startPos = graph.getEndpointPosition(wire.from);
    const endPos = graph.getEndpointPosition(wire.to);

    const getEndpointLabel = (endpoint: typeof wire.from) => {
      if (endpoint.type === 'terminal') {
        for (const comp of graph.components.values()) {
          const term = comp.terminals.find((t) => t.id === endpoint.id);
          if (term) return `${comp.tag} : Pin ${term.label}`;
        }
      } else {
        return `T-Junction (${endpoint.id.slice(0, 6)})`;
      }
      return endpoint.id;
    };

    const handleSetOrtho = () => {
      if (!startPos || !endPos) return;
      const waypoints = WireRenderer.getOrthoWaypoints(startPos, endPos);
      onUpdateWire?.({
        ...wire,
        routingMode: 'ortho',
        waypoints,
      });
    };

    const handleSetFree = () => {
      onUpdateWire?.({
        ...wire,
        routingMode: 'free',
        waypoints: [],
      });
    };

    const handleNudge = (deltaY: number) => {
      if (!startPos || !endPos) return;
      let newWaypoints = [...wire.waypoints];

      if (newWaypoints.length === 0) {
        // Initialize an arched / stepped bypass
        const midX = (startPos.x + endPos.x) / 2;
        newWaypoints = [
          { x: startPos.x + (endPos.x - startPos.x) * 0.25, y: startPos.y + deltaY },
          { x: startPos.x + (endPos.x - startPos.x) * 0.75, y: endPos.y + deltaY },
        ];
      } else {
        newWaypoints = newWaypoints.map((wp) => ({
          x: wp.x,
          y: wp.y + deltaY,
        }));
      }

      onUpdateWire?.({
        ...wire,
        waypoints: newWaypoints,
      });
    };

    const handleAddWaypoint = () => {
      if (!startPos || !endPos) return;
      const points = WireRenderer.getWirePathPoints(wire, startPos, endPos);
      const midA = points[Math.floor(points.length / 2) - 1] || startPos;
      const midB = points[Math.floor(points.length / 2)] || endPos;
      const newPoint = {
        x: Math.round((midA.x + midB.x) / 20) * 10,
        y: Math.round((midA.y + midB.y) / 20) * 10 - 20,
      };

      const waypoints = wire.waypoints.length > 0 ? [...wire.waypoints, newPoint] : [newPoint];
      onUpdateWire?.({
        ...wire,
        waypoints,
      });
    };

    const handleResetPath = () => {
      onUpdateWire?.({
        ...wire,
        routingMode: 'free',
        waypoints: [],
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
          <h3 className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
            <span>⚡</span>
            <span>{t.properties.wireTitle}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 my-4 flex-1 overflow-y-auto">
          {/* Wire Info */}
          <div className="bg-industrial-950/80 border border-slate-800/80 rounded-lg p-2.5 space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center text-slate-400">
              <span>{lang === 'ar' ? 'من:' : 'From:'}</span>
              <span className="font-mono font-bold text-sky-300">{getEndpointLabel(wire.from)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>{lang === 'ar' ? 'إلى:' : 'To:'}</span>
              <span className="font-mono font-bold text-emerald-300">{getEndpointLabel(wire.to)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-slate-800/60">
              <span>{lang === 'ar' ? 'الطور / الجهد:' : 'Phase / Potential:'}</span>
              <span
                className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] ${
                  wire.potential !== 'NONE'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'text-slate-500 bg-slate-800'
                }`}
              >
                {wire.potential}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>{lang === 'ar' ? 'نقاط الثني (Waypoints):' : 'Bends / Waypoints:'}</span>
              <span className="font-mono font-bold text-slate-200">{wire.waypoints.length}</span>
            </div>
          </div>

          {/* Routing Mode Buttons */}
          <div>
            <label className="text-[11px] font-semibold text-sky-300 block mb-2">
              📐 {t.properties.wireRouting}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSetOrtho}
                className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all border flex flex-col items-center gap-1 ${
                  wire.routingMode === 'ortho'
                    ? 'bg-sky-600/30 border-sky-400 text-sky-300 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="text-sm">📐</span>
                <span className="text-[10px] text-center leading-tight">{t.properties.orthoRouting}</span>
              </button>
              <button
                onClick={handleSetFree}
                className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all border flex flex-col items-center gap-1 ${
                  wire.routingMode === 'free'
                    ? 'bg-amber-600/30 border-amber-400 text-amber-300 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="text-sm">⚡</span>
                <span className="text-[10px] text-center leading-tight">{t.properties.freeRouting}</span>
              </button>
            </div>
          </div>

          {/* Elevation & Path Adjustment Buttons */}
          <div>
            <label className="text-[11px] font-semibold text-amber-300 block mb-2">
              ↕️ {lang === 'ar' ? 'تعديل مسار وارتفاع السلك:' : 'Adjust Path & Elevation:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNudge(-20)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-2 rounded border border-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>⬆️</span>
                <span>{t.properties.moveUp}</span>
              </button>
              <button
                onClick={() => handleNudge(20)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-2 rounded border border-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>⬇️</span>
                <span>{t.properties.moveDown}</span>
              </button>
            </div>
          </div>

          {/* Add Waypoint & Reset */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleAddWaypoint}
              className="w-full bg-slate-800/90 hover:bg-slate-800 text-sky-300 text-xs font-semibold py-1.5 px-3 rounded border border-slate-700 flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>➕</span>
              <span>{t.properties.addWaypoint}</span>
            </button>
            <button
              onClick={handleResetPath}
              className="w-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs py-1.5 px-3 rounded border border-slate-800 flex items-center justify-center gap-2 transition-all"
            >
              <span>🔄</span>
              <span>{t.properties.resetPath}</span>
            </button>
          </div>

          {/* Visual Instruction Tip */}
          <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-900/50 text-[10px] text-sky-300 leading-relaxed">
            💡 {lang === 'ar'
              ? 'يمكنك سحب الدوائر الزرقاء على السلك بالماوس مباشرة لرفعه أو تنزيله، أو الضغط على علامة (+) الزرقاء لإنشاء ثنية جديدة، ودوس دبل كليك لحذف أي ثنية.'
              : 'Drag the blue circles on the wire to move or bend it directly on the canvas. Click (+) to add a bend, or double-click any point to remove it.'}
          </div>
        </div>

        {/* Delete Wire Button */}
        <div className="pt-3 border-t border-slate-800">
          <button
            onClick={onDeleteWire}
            className="w-full bg-rose-950/50 hover:bg-rose-900 text-rose-300 text-xs font-bold py-2 rounded flex items-center justify-center gap-2 border border-rose-800 transition-colors shadow"
          >
            <span>🗑️</span>
            <span>{t.properties.deleteWire}</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // COMPONENT INSPECTOR
  // -------------------------------------------------------------
  if (!component) return null;

  const masterTags = graph.tagRegistry.getMasterTags();
  const isDependentContact = [
    'aux_contact_no',
    'aux_contact_nc',
    'contactor_main_3p',
    'timer_contact_no',
    'timer_contact_nc',
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
      state: { ...component.state, timerPreset: Math.max(0.5, val) },
    });
  };

  const handleResetOverload = () => {
    onUpdateComponent({
      ...component,
      state: { ...component.state, tripped: false },
    });
  };

  const handleTestOverload = () => {
    onUpdateComponent({
      ...component,
      state: { ...component.state, tripped: true },
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

        {/* Indicator Lamp Color Selector */}
        {component.type === 'indicator_lamp' && (
          <div>
            <label className="text-[11px] font-semibold text-amber-300 block mb-2">
              🎨 {t.properties.lampColor}
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: 'red', name: t.properties.lampRed, bg: 'bg-rose-500', border: 'border-rose-400' },
                { id: 'green', name: t.properties.lampGreen, bg: 'bg-emerald-500', border: 'border-emerald-400' },
                { id: 'yellow', name: t.properties.lampYellow, bg: 'bg-amber-400', border: 'border-amber-300' },
                { id: 'blue', name: t.properties.lampBlue, bg: 'bg-sky-500', border: 'border-sky-400' },
                { id: 'white', name: t.properties.lampWhite, bg: 'bg-slate-100', border: 'border-slate-300' },
              ].map((c) => {
                const isSelected = (component.state.lampColor || 'green') === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      onUpdateComponent({
                        ...component,
                        state: { ...component.state, lampColor: c.id as any },
                      });
                    }}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-slate-800 border-sky-400 text-white shadow-sm ring-1 ring-sky-400/50'
                        : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${c.bg} border ${c.border} shadow-sm shrink-0`} />
                    <span className="truncate">{c.name}</span>
                    {isSelected && <span className="ml-auto text-sky-400 text-xs">✓</span>}
                  </button>
                );
              })}
            </div>
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
        {onRotate && (
          <button
            onClick={onRotate}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1.5"
          >
            <span>🔄</span>
            <span>{lang === 'ar' ? 'تدوير 90° (R)' : 'Rotate 90° (R)'}</span>
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="w-full bg-rose-900/60 hover:bg-rose-900 text-rose-300 text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1.5 border border-rose-800"
          >
            <span>🗑️</span>
            <span>{t.delete}</span>
          </button>
        )}
      </div>
    </div>
  );
};
