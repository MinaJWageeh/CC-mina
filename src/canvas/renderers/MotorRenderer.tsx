import React from 'react';
import { DeviceComponent } from '../../core/types/circuit';
import { COMPONENT_CATALOG } from '../../core/types/components';

interface MotorRendererProps {
  component: DeviceComponent;
  isSelected: boolean;
  animTime: number;
  onTerminalMouseDown: (terminalId: string, e: React.MouseEvent) => void;
  onTerminalMouseUp?: (terminalId: string, e: React.MouseEvent) => void;
  onTerminalMouseEnter?: (terminalId: string) => void;
  onTerminalMouseLeave?: () => void;
}

export const MotorRenderer: React.FC<MotorRendererProps> = ({
  component,
  isSelected,
  animTime,
  onTerminalMouseDown,
  onTerminalMouseUp,
  onTerminalMouseEnter,
  onTerminalMouseLeave,
}) => {
  const def = COMPONENT_CATALOG[component.type];
  const w = def?.width || 90;
  const h = def?.height || 100;

  const rpm = component.state.motorRpm || 0;
  const direction = component.state.motorDirection || 0;
  const isRunning = rpm > 0;

  // Calculate continuous rotation angle
  const rotationAngle = (animTime * (rpm / 60) * 360 * direction) % 360;

  return (
    <div
      className={`relative select-none transition-shadow rounded-lg ${
        isSelected ? 'ring-2 ring-sky-400 shadow-lg shadow-sky-500/20' : ''
      }`}
      style={{
        width: w,
        height: h,
        transform: `rotate(${component.rotation}deg)`,
      }}
    >
      {/* SVG Stator and Animated Rotor */}
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
        {/* Outer Stator Casing */}
        <circle
          cx={w / 2}
          cy={h / 2 + 5}
          r={w * 0.36}
          className={`transition-colors duration-300 ${
            isRunning ? 'fill-slate-800 stroke-emerald-500' : 'fill-slate-900 stroke-slate-600'
          }`}
          strokeWidth="2.5"
        />

        {/* Cooling Fins */}
        {[-25, -15, 0, 15, 25].map((dy, i) => (
          <line
            key={i}
            x1={w / 2 - w * 0.42}
            y1={h / 2 + 5 + dy}
            x2={w / 2 + w * 0.42}
            y2={h / 2 + 5 + dy}
            className="stroke-slate-700/60"
            strokeWidth="1.5"
          />
        ))}

        {/* Center Bearing Hub */}
        <circle
          cx={w / 2}
          cy={h / 2 + 5}
          r="8"
          className="fill-slate-700 stroke-slate-500"
          strokeWidth="1.5"
        />

        {/* Rotating Impeller / Fan Blades */}
        <g
          transform={`translate(${w / 2}, ${h / 2 + 5}) rotate(${rotationAngle})`}
          className="transition-transform"
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={w * 0.28 * Math.cos((deg * Math.PI) / 180)}
              y2={w * 0.28 * Math.sin((deg * Math.PI) / 180)}
              className={isRunning ? 'stroke-sky-400' : 'stroke-slate-500'}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          ))}
          <circle cx="0" cy="0" r="3.5" className="fill-amber-400" />
        </g>

        {/* Direction Indicator Arrow */}
        {isRunning && (
          <path
            d={
              direction > 0
                ? `M ${w / 2 + 20} ${h / 2 - 12} A 22 22 0 0 1 ${w / 2 + 25} ${h / 2 + 10}`
                : `M ${w / 2 - 20} ${h / 2 - 12} A 22 22 0 0 0 ${w / 2 - 25} ${h / 2 + 10}`
            }
            fill="none"
            className={direction > 0 ? 'stroke-emerald-400' : 'stroke-amber-400'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Component Tag and RPM Badge */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center pointer-events-none">
        <span className="text-[10px] font-bold text-sky-400 bg-slate-900/90 px-1.5 py-0.2 rounded border border-slate-700">
          {component.tag}
        </span>
      </div>

      <div className="absolute bottom-1 left-0 right-0 flex justify-center pointer-events-none">
        <span
          className={`text-[9px] font-mono font-semibold px-1 py-0.2 rounded ${
            isRunning ? 'text-emerald-300 bg-emerald-950/80 border border-emerald-800' : 'text-slate-400 bg-slate-900/80'
          }`}
        >
          {rpm > 0 ? `${rpm} RPM` : '0 RPM'}
        </span>
      </div>

      {/* Terminal Pins */}
      {component.terminals.map((term) => {
        const isLive = term.potential !== 'NONE';
        return (
          <div
            key={term.id}
            onMouseDown={(e) => onTerminalMouseDown(term.id, e)}
            onMouseUp={(e) => onTerminalMouseUp?.(term.id, e)}
            onMouseEnter={() => onTerminalMouseEnter?.(term.id)}
            onMouseLeave={onTerminalMouseLeave}
            className={`absolute w-3.5 h-3.5 -ml-1.5 -mt-1.5 rounded-full border cursor-crosshair flex items-center justify-center transition-all ${
              isLive
                ? 'bg-amber-400 border-white shadow-glow-yellow scale-110'
                : 'bg-slate-800 border-slate-400 hover:border-sky-400 hover:scale-125'
            }`}
            style={{
              left: term.offset.x,
              top: term.offset.y,
            }}
            title={`${component.tag} - Terminal ${term.label} (${term.potential})`}
          >
            <span className="text-[8px] font-bold text-slate-200 pointer-events-none -mt-4">
              {term.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
