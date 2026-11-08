import { Point2D, VoltagePotential, Wire } from '../../core/types/circuit';

export class WireRenderer {
  public static getPotentialColor(potential: VoltagePotential): { stroke: string; glow: string } {
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
    animTime: number
  ): void {
    const { stroke, glow } = this.getPotentialColor(wire.potential);
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
    if (wire.potential !== 'NONE') {
      ctx.strokeStyle = glow;
      ctx.lineWidth = isSelected ? 8 : 6;
      ctx.beginPath();
      this.drawPolyline(ctx, points);
      ctx.stroke();
    }

    // 2. Selection halo
    if (isSelected) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 5;
      ctx.beginPath();
      this.drawPolyline(ctx, points);
      ctx.stroke();
    }

    // 3. Core conductor line
    ctx.strokeStyle = stroke;
    ctx.lineWidth = wire.potential !== 'NONE' ? 2.5 : 1.8;
    ctx.beginPath();
    this.drawPolyline(ctx, points);
    ctx.stroke();

    // 4. Current flow particle animation
    if (wire.hasCurrent && wire.potential !== 'NONE') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.0;
      ctx.setLineDash([4, 12]);
      ctx.lineDashOffset = -animTime * 35; // flowing in forward direction
      ctx.beginPath();
      this.drawPolyline(ctx, points);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Draws a standard solid IEC junction dot (dot at T-branch)
   */
  public static renderJunctionDot(
    ctx: CanvasRenderingContext2D,
    pos: Point2D,
    potential: VoltagePotential,
    isSelected: boolean
  ): void {
    const { stroke, glow } = this.getPotentialColor(potential);

    ctx.save();
    if (potential !== 'NONE') {
      ctx.shadowColor = glow;
      ctx.shadowBlur = 8;
    }

    ctx.fillStyle = isSelected ? '#38bdf8' : stroke;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }

  private static drawPolyline(ctx: CanvasRenderingContext2D, points: Point2D[]): void {
    if (points.length < 2) return;
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
  }
}
