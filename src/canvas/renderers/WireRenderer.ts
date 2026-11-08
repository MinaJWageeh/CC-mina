import { Point2D, VoltagePotential, Wire } from '../../core/types/circuit';

export class WireRenderer {
  public static getPotentialColor(
    potential: VoltagePotential,
    theme: 'dark' | 'light' = 'dark'
  ): { stroke: string; glow: string } {
    const isLight = theme === 'light';

    if (isLight) {
      switch (potential) {
        case 'L1':
          return { stroke: '#dc2626', glow: 'rgba(220, 38, 38, 0.35)' }; // Deep Red
        case 'L2':
          return { stroke: '#d97706', glow: 'rgba(217, 119, 6, 0.35)' };  // Deep Amber
        case 'L3':
          return { stroke: '#2563eb', glow: 'rgba(37, 99, 235, 0.35)' };  // Deep Blue
        case 'N':
          return { stroke: '#0891b2', glow: 'rgba(8, 145, 178, 0.35)' };  // Dark Cyan
        case 'PE':
          return { stroke: '#16a34a', glow: 'rgba(22, 163, 74, 0.35)' };  // Dark Green
        case 'DC_POS':
          return { stroke: '#e11d48', glow: 'rgba(225, 29, 72, 0.35)' };
        case 'DC_NEG':
          return { stroke: '#64748b', glow: 'transparent' };
        case 'NONE':
        default:
          return { stroke: '#94a3b8', glow: 'transparent' }; // Clean drafting slate
      }
    }

    switch (potential) {
      case 'L1':
        return { stroke: '#f87171', glow: 'rgba(248, 113, 113, 0.75)' }; // Neon Red/Orange
      case 'L2':
        return { stroke: '#facc15', glow: 'rgba(250, 204, 21, 0.75)' };  // Neon Yellow/Gold
      case 'L3':
        return { stroke: '#60a5fa', glow: 'rgba(96, 165, 250, 0.75)' };  // Neon Blue
      case 'N':
        return { stroke: '#22d3ee', glow: 'rgba(34, 211, 238, 0.75)' };  // Neon Cyan
      case 'PE':
        return { stroke: '#4ade80', glow: 'rgba(74, 222, 128, 0.75)' };  // Neon Green
      case 'DC_POS':
        return { stroke: '#fb7185', glow: 'rgba(251, 113, 133, 0.75)' }; // Rose/Red
      case 'DC_NEG':
        return { stroke: '#94a3b8', glow: 'rgba(148, 163, 184, 0.5)' };  // Slate
      case 'NONE':
      default:
        return { stroke: '#475569', glow: 'transparent' };               // Muted dark slate (Off)
    }
  }

  /**
   * Generates orthogonal 90-degree corner waypoints between start and end.
   */
  public static getOrthoWaypoints(start: Point2D, end: Point2D): Point2D[] {
    const dx = Math.abs(end.x - start.x);
    const dy = Math.abs(end.y - start.y);

    if (dx < 5 || dy < 5) {
      return []; // Direct straight line
    }

    // Midpoint dog-leg
    const midX = start.x + (end.x - start.x) / 2;
    return [
      { x: midX, y: start.y },
      { x: midX, y: end.y }
    ];
  }

  /**
   * Draws a complete wire path on Canvas2D with multi-pass glow and current flow dashes.
   */
  public static renderWire(
    ctx: CanvasRenderingContext2D,
    wire: Wire,
    start: Point2D,
    end: Point2D,
    isSelected: boolean,
    animTime: number,
    theme: 'dark' | 'light' = 'dark'
  ): void {
    const { stroke, glow } = this.getPotentialColor(wire.potential, theme);
    const points: Point2D[] = [start];

    if (wire.routingMode === 'ortho' && wire.waypoints.length === 0) {
      points.push(...this.getOrthoWaypoints(start, end));
    } else {
      points.push(...wire.waypoints);
    }
    points.push(end);

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 1. Glow pass if energized
    if (wire.potential !== 'NONE' && glow !== 'transparent') {
      ctx.strokeStyle = glow;
      ctx.lineWidth = isSelected ? 8 : 6;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
    }

    // 2. Selection Highlight halo
    if (isSelected) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
    }

    // 3. Core solid wire line
    ctx.strokeStyle = stroke;
    ctx.lineWidth = wire.potential !== 'NONE' ? 3 : 2;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    // 4. Current Flow Particle Animation if energized and current is flowing
    if (wire.potential !== 'NONE' && wire.hasCurrent) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 12]);
      ctx.lineDashOffset = -animTime * 35; // Flow animation velocity
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  }

  /**
   * Draws a solid circular solder connection dot for T-junction branches.
   */
  public static renderJunctionDot(
    ctx: CanvasRenderingContext2D,
    pos: Point2D,
    potential: VoltagePotential,
    theme: 'dark' | 'light' = 'dark'
  ): void {
    const { stroke, glow } = this.getPotentialColor(potential, theme);

    ctx.save();
    if (glow !== 'transparent') {
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 6.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = stroke;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Small specular center dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
