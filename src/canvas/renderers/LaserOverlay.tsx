import React, { useEffect, useRef } from 'react';
import { Point2D } from '../../core/types/circuit';

interface StrokePoint extends Point2D {
  time: number;
}

interface LaserOverlayProps {
  active: boolean;
  clearTrigger: number;
}

export const LaserOverlay: React.FC<LaserOverlayProps> = ({ active, clearTrigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<StrokePoint[][]>([]);
  const isDrawingRef = useRef<boolean>(false);

  // Resize canvas to match viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Clear ink when triggered
  useEffect(() => {
    strokesRef.current = [];
  }, [clearTrigger]);

  // Main animation render loop with exponential alpha decay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Filter strokes that are older than 2.8 seconds
      const maxAge = 2800; // ms
      strokesRef.current = strokesRef.current
        .map((stroke) => stroke.filter((p) => now - p.time < maxAge))
        .filter((stroke) => stroke.length > 1);

      // Draw active strokes with fading glow
      for (const stroke of strokesRef.current) {
        for (let i = 1; i < stroke.length; i++) {
          const p1 = stroke[i - 1];
          const p2 = stroke[i];
          const age = now - p2.time;
          const alpha = Math.max(0, 1 - age / maxAge);

          ctx.save();
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.shadowColor = `rgba(56, 189, 248, ${alpha * 0.8})`;
          ctx.shadowBlur = 12;
          ctx.lineWidth = 5;
          ctx.lineCap = 'round';
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
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!active) return;
    isDrawingRef.current = true;
    strokesRef.current.push([{ x: e.clientX, y: e.clientY, time: performance.now() }]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!active || !isDrawingRef.current) return;
    const currentStroke = strokesRef.current[strokesRef.current.length - 1];
    if (currentStroke) {
      currentStroke.push({ x: e.clientX, y: e.clientY, time: performance.now() });
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="fixed inset-0 z-40 pointer-events-auto cursor-crosshair"
    />
  );
};
