import React, { useEffect, useRef, useState } from 'react';
import { Point2D } from '../../core/types/circuit';

interface StrokePoint extends Point2D {
  time: number;
}

interface DrawingStroke {
  id: string;
  type: 'pen' | 'laser';
  color: string;
  width: number;
  points: StrokePoint[];
}

interface LaserOverlayProps {
  active: boolean;
  clearTrigger: number;
  onClose: () => void;
  lang?: 'ar' | 'en';
}

const COLOR_PALETTE = [
  { name: 'Sky', hex: '#38bdf8', glow: 'rgba(56, 189, 248, 0.6)' },
  { name: 'Yellow', hex: '#facc15', glow: 'rgba(250, 204, 21, 0.6)' },
  { name: 'Red', hex: '#f43f5e', glow: 'rgba(244, 63, 94, 0.6)' },
  { name: 'Green', hex: '#22c55e', glow: 'rgba(34, 197, 94, 0.6)' },
  { name: 'White', hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.6)' },
];

export const LaserOverlay: React.FC<LaserOverlayProps> = ({
  active,
  clearTrigger,
  onClose,
  lang = 'ar'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<DrawingStroke[]>([]);
  const isDrawingRef = useRef<boolean>(false);

  // Tool states
  const [drawMode, setDrawMode] = useState<'pen' | 'laser'>('pen');
  const [selectedColor, setSelectedColor] = useState<string>('#38bdf8');
  const [strokeWidth, setStrokeWidth] = useState<number>(5);
  const [cursorPos, setCursorPos] = useState<Point2D | null>(null);

  // Clear ink when triggered
  useEffect(() => {
    strokesRef.current = [];
  }, [clearTrigger]);

  // Main setup & render loop that runs when `active` changes
  useEffect(() => {
    if (!active) {
      strokesRef.current = [];
      setCursorPos(null);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    let animId: number;

    const render = () => {
      const now = performance.now();
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const maxLaserAge = 2500; // ms for laser fade

      // Filter and clean old laser points
      strokesRef.current = strokesRef.current.filter((stroke) => {
        if (stroke.type === 'pen') return true;
        // Laser stroke
        stroke.points = stroke.points.filter((p) => now - p.time < maxLaserAge);
        return stroke.points.length > 0;
      });

      // Render each stroke
      for (const stroke of strokesRef.current) {
        if (stroke.points.length === 0) continue;

        if (stroke.points.length === 1) {
          // Single click point (circle dot)
          const p = stroke.points[0];
          const age = now - p.time;
          const alpha = stroke.type === 'pen' ? 1.0 : Math.max(0, 1 - age / maxLaserAge);

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, stroke.width / 2 + 2, 0, Math.PI * 2);
          ctx.fillStyle = stroke.color;
          ctx.shadowColor = stroke.color;
          ctx.shadowBlur = 12;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.restore();
          continue;
        }

        // Draw segmented line
        for (let i = 1; i < stroke.points.length; i++) {
          const p1 = stroke.points[i - 1];
          const p2 = stroke.points[i];
          const age = now - p2.time;
          const alpha = stroke.type === 'pen' ? 1.0 : Math.max(0, 1 - age / maxLaserAge);

          ctx.save();
          ctx.globalAlpha = alpha;

          // Outer neon glow
          ctx.strokeStyle = stroke.color;
          ctx.shadowColor = stroke.color;
          ctx.shadowBlur = stroke.type === 'laser' ? 16 : 8;
          ctx.lineWidth = stroke.width + (stroke.type === 'laser' ? 4 : 2);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // Inner bright core
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = Math.max(2, stroke.width * 0.4);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [active]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!active) return;
    isDrawingRef.current = true;
    const pt: StrokePoint = { x: e.clientX, y: e.clientY, time: performance.now() };
    const newStroke: DrawingStroke = {
      id: 'S_' + Math.random().toString(36).substr(2, 9),
      type: drawMode,
      color: selectedColor,
      width: strokeWidth,
      points: [pt],
    };
    strokesRef.current.push(newStroke);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!active) return;
    setCursorPos({ x: e.clientX, y: e.clientY });

    if (!isDrawingRef.current) return;
    const currentStroke = strokesRef.current[strokesRef.current.length - 1];
    if (currentStroke) {
      currentStroke.points.push({ x: e.clientX, y: e.clientY, time: performance.now() });
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    strokesRef.current = [];
  };

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-40 select-none">
      {/* Floating Presentation Toolbar */}
      <div
        className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 border border-sky-500/40 rounded-2xl shadow-2xl px-3 py-2 flex items-center gap-3 backdrop-blur-md text-xs"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Mode Selector */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDrawMode('pen')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              drawMode === 'pen'
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title={lang === 'ar' ? 'قلم توضيحي ثابت للشرح' : 'Persistent Whiteboard Pen'}
          >
            <span>✏️</span>
            <span>{lang === 'ar' ? 'قلم ثابت' : 'Pen'}</span>
          </button>
          <button
            onClick={() => setDrawMode('laser')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              drawMode === 'laser'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title={lang === 'ar' ? 'مؤشر ليزر متلاشي' : 'Fading Laser Pointer'}
          >
            <span>💫</span>
            <span>{lang === 'ar' ? 'ليزر متلاشي' : 'Laser'}</span>
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5 px-2 border-x border-slate-800">
          {COLOR_PALETTE.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c.hex)}
              className={`w-6 h-6 rounded-full transition-transform ${
                selectedColor === c.hex ? 'scale-125 ring-2 ring-white shadow-md' : 'hover:scale-110 opacity-80'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>

        {/* Stroke Thickness */}
        <div className="flex items-center gap-1">
          {[3, 6, 12].map((w) => (
            <button
              key={w}
              onClick={() => setStrokeWidth(w)}
              className={`px-2 py-1 rounded text-[11px] font-mono ${
                strokeWidth === w ? 'bg-sky-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {w === 3 ? (lang === 'ar' ? 'رفيع' : 'Fine') : w === 6 ? (lang === 'ar' ? 'متوسط' : 'Med') : (lang === 'ar' ? 'عريض' : 'Thick')}
            </button>
          ))}
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClearAll}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 flex items-center gap-1 transition-colors"
          title={lang === 'ar' ? 'مسح كل الرسومات' : 'Clear All Drawings'}
        >
          <span>🧹</span>
          <span>{lang === 'ar' ? 'مسح' : 'Clear'}</span>
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="px-2 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-white font-bold transition-colors"
          title={lang === 'ar' ? 'إنهاء وضع الرسم' : 'Exit Draw Mode'}
        >
          ✕
        </button>
      </div>

      {/* Main Drawing Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full block cursor-crosshair"
      />

      {/* Laser Pointer Dot at mouse location */}
      {cursorPos && (
        <div
          className="fixed pointer-events-none w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-white animate-pulse"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            backgroundColor: selectedColor,
            boxShadow: `0 0 16px ${selectedColor}`,
          }}
        />
      )}
    </div>
  );
};
