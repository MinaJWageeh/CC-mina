import React from 'react';
import { DeviceComponent, SimulationMode } from '../../core/types/circuit';
import { COMPONENT_CATALOG } from '../../core/types/components';
import { MotorRenderer } from './MotorRenderer';

interface ComponentRendererProps {
  component: DeviceComponent;
  isSelected: boolean;
  mode: SimulationMode;
  animTime: number;
  onTerminalMouseDown: (terminalId: string, e: React.MouseEvent) => void;
  onTerminalMouseEnter?: (terminalId: string) => void;
  onTerminalMouseLeave?: () => void;
  onToggleState?: (componentId: string) => void;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isSelected,
  mode,
  animTime,
  onTerminalMouseDown,
  onTerminalMouseEnter,
  onTerminalMouseLeave,
  onToggleState,
}) => {
  // If motor, use specialized motor renderer
  if (component.type.startsWith('motor_')) {
    return (
      <MotorRenderer
        component={component}
        isSelected={isSelected}
        animTime={animTime}
        onTerminalMouseDown={onTerminalMouseDown}
        onTerminalMouseEnter={onTerminalMouseEnter}
        onTerminalMouseLeave={onTerminalMouseLeave}
      />
    );
  }

  const def = COMPONENT_CATALOG[component.type];
  const w = def?.width || 60;
  const h = def?.height || 70;
  const state = component.state || {};

  const handleComponentClick = (e: React.MouseEvent) => {
    // In Run mode, allow clicking buttons / switches / toggles
    if (mode === 'run' && def?.hasStateToggle && onToggleState) {
      e.stopPropagation();
      onToggleState(component.id);
    }
  };

  return (
    <div
      onClick={handleComponentClick}
      className={`relative select-none bg-industrial-900/90 border rounded-lg transition-all ${
        isSelected
          ? 'border-sky-400 ring-2 ring-sky-400/40 shadow-lg shadow-sky-500/20'
          : 'border-slate-700/80 hover:border-slate-500'
      } ${mode === 'run' && def?.hasStateToggle ? 'cursor-pointer' : 'cursor-move'}`}
      style={{
        width: w,
        height: h,
        transform: `rotate(${component.rotation}deg)`,
      }}
    >
      {/* Component Header / Tag Badge */}
      <div className="absolute top-1 left-1 right-1 flex justify-between items-center px-1 pointer-events-none">
        <span className="text-[10px] font-bold text-sky-400 font-mono tracking-tight">
          {component.tag}
        </span>
        {component.masterTag && (
          <span className="text-[8px] font-mono text-amber-400 bg-amber-950/60 px-1 rounded border border-amber-800">
            {component.masterTag}
          </span>
        )}
      </div>

      {/* Internal Symbol & Mechanical Visuals */}
      <div className="w-full h-full flex items-center justify-center p-2">
        {/* Contactor Coil Symbol */}
        {component.type === 'contactor_coil' || component.type === 'control_relay_coil' ? (
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <div
              className={`w-7 h-9 border-2 rounded transition-all flex items-center justify-center ${
                state.energized
                  ? 'border-amber-400 bg-amber-500/30 shadow-glow-yellow'
                  : 'border-slate-500 bg-slate-800/40'
              }`}
            >
              <div className="w-3 h-5 border border-dashed border-slate-400 rounded-sm" />
            </div>
          </div>
        ) : null}

        {/* 3-Pole Contactor Power Contacts */}
        {component.type === 'contactor_main_3p' ? (
          <div className="flex justify-around w-full mt-3">
            {[0, 1, 2].map((pole) => (
              <div key={pole} className="flex flex-col items-center h-10 justify-between">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <div
                  className={`w-0.5 h-6 transition-transform duration-100 origin-bottom ${
                    state.closed ? 'rotate-0 bg-emerald-400' : '-rotate-35 bg-slate-400'
                  }`}
                />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              </div>
            ))}
          </div>
        ) : null}

        {/* Auxiliary Contact NO */}
        {component.type === 'aux_contact_no' || component.type === 'timer_contact_no' ? (
          <div className="flex flex-col items-center h-10 justify-between mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <div
              className={`w-0.5 h-6 transition-transform duration-100 origin-bottom ${
                state.closed ? 'rotate-0 bg-emerald-400' : '-rotate-35 bg-slate-400'
              }`}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          </div>
        ) : null}

        {/* Auxiliary Contact NC */}
        {component.type === 'aux_contact_nc' || component.type === 'timer_contact_nc' ? (
          <div className="flex flex-col items-center h-10 justify-between mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <div
              className={`w-0.5 h-6 transition-transform duration-100 origin-bottom ${
                state.closed === false ? '-rotate-35 bg-rose-400' : 'rotate-0 bg-slate-300'
              }`}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          </div>
        ) : null}

        {/* Miniature Circuit Breaker (MCB) */}
        {component.type === 'mcb_3p' || component.type === 'mcb_1p' ? (
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <div
              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-colors ${
                state.tripped
                  ? 'bg-rose-900 text-rose-300 border border-rose-600 animate-pulse'
                  : state.closed !== false
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                  : 'bg-slate-800 text-slate-400 border border-slate-600'
              }`}
            >
              {state.tripped ? 'TRIP' : state.closed !== false ? 'ON' : 'OFF'}
            </div>
          </div>
        ) : null}

        {/* Thermal Overload Relay */}
        {component.type === 'overload_relay' ? (
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <span
              className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                state.tripped
                  ? 'bg-rose-900 text-rose-200 border border-rose-600 animate-bounce'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {state.tripped ? 'OVERLOAD TRIP' : 'THERMAL 95-96'}
            </span>
          </div>
        ) : null}

        {/* Timers */}
        {component.type.startsWith('timer_') && !component.type.includes('contact') ? (
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <div
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                state.timerRunning
                  ? 'border-amber-400 bg-amber-500/20 shadow-glow-yellow'
                  : 'border-slate-600 bg-slate-800/60'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-amber-300">
                {state.timerRunning
                  ? `${Math.max(0, ((state.timerPreset ?? 5) - (state.timerElapsed ?? 0))).toFixed(1)}s`
                  : `${state.timerPreset ?? 5}s`}
              </span>
            </div>
          </div>
        ) : null}

        {/* Push Buttons */}
        {component.type === 'pushbutton_no' ? (
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <div
              className={`w-7 h-7 rounded-full border-2 transition-transform ${
                state.pressed
                  ? 'scale-90 bg-emerald-500 border-white shadow-glow-green'
                  : 'bg-emerald-600/80 border-emerald-400 hover:scale-105'
              }`}
            />
          </div>
        ) : null}

        {component.type === 'pushbutton_nc' ? (
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <div
              className={`w-7 h-7 rounded-full border-2 transition-transform ${
                state.pressed
                  ? 'scale-90 bg-rose-500 border-white shadow-glow-red'
                  : 'bg-rose-600/80 border-rose-400 hover:scale-105'
              }`}
            />
          </div>
        ) : null}

        {component.type === 'emergency_stop' ? (
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <div
              className={`w-8 h-8 rounded-full border-3 flex items-center justify-center transition-all ${
                state.latched
                  ? 'bg-rose-700 border-yellow-400 shadow-glow-red scale-95'
                  : 'bg-rose-600 border-rose-300 hover:scale-105'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-yellow-300" />
            </div>
          </div>
        ) : null}

        {/* Indicator Lamp */}
        {component.type === 'indicator_lamp' ? (
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                state.energized
                  ? 'bg-emerald-400 border-white shadow-glow-green scale-110'
                  : 'bg-slate-800/80 border-slate-600'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${state.energized ? 'bg-white' : 'bg-slate-600'}`} />
            </div>
          </div>
        ) : null}

        {/* Buzzer Alarm */}
        {component.type === 'buzzer_alarm' ? (
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <div
              className={`w-7 h-7 rounded-sm border-2 flex items-center justify-center transition-all ${
                state.energized
                  ? 'bg-rose-500 border-amber-300 shadow-glow-red animate-pulse'
                  : 'bg-slate-800 border-slate-600'
              }`}
            >
              <span className="text-[10px]">📢</span>
            </div>
          </div>
        ) : null}
      </div>

      {/* Terminal Pins */}
      {component.terminals.map((term) => {
        const isLive = term.potential !== 'NONE';
        return (
          <div
            key={term.id}
            onMouseDown={(e) => onTerminalMouseDown(term.id, e)}
            onMouseEnter={() => onTerminalMouseEnter?.(term.id)}
            onMouseLeave={onTerminalMouseLeave}
            className={`absolute w-3.5 h-3.5 -ml-1.5 -mt-1.5 rounded-full border cursor-crosshair flex items-center justify-center transition-all ${
              isLive
                ? 'bg-amber-400 border-white shadow-glow-yellow scale-115'
                : 'bg-slate-800 border-slate-400 hover:border-sky-400 hover:scale-125'
            }`}
            style={{
              left: term.offset.x,
              top: term.offset.y,
            }}
            title={`${component.tag} - Terminal ${term.label} (${term.potential})`}
          >
            <span className="text-[7.5px] font-bold text-slate-200 pointer-events-none -mt-4">
              {term.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
