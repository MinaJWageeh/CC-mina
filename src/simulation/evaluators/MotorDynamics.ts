import { NetGraph } from '../../core/graph/NetGraph';

export class MotorDynamics {
  public static evaluate(graph: NetGraph, dt: number): void {
    for (const comp of graph.components.values()) {
      if (comp.type === 'motor_3p_3wire') {
        const tU = comp.terminals.find(t => t.label === 'U');
        const tV = comp.terminals.find(t => t.label === 'V');
        const tW = comp.terminals.find(t => t.label === 'W');

        const pU = tU?.potential;
        const pV = tV?.potential;
        const pW = tW?.potential;

        const phases = [pU, pV, pW].filter(p => ['L1', 'L2', 'L3'].includes(p as string));
        const uniquePhases = new Set(phases);

        let targetRpm = 0;
        let direction: 1 | -1 | 0 = 0;

        if (uniquePhases.size === 3) {
          targetRpm = 1450; // standard 4-pole synchronous speed minus slip
          // Clockwise: L1-L2-L3, L2-L3-L1, L3-L1-L2
          if (
            (pU === 'L1' && pV === 'L2' && pW === 'L3') ||
            (pU === 'L2' && pV === 'L3' && pW === 'L1') ||
            (pU === 'L3' && pV === 'L1' && pW === 'L2')
          ) {
            direction = 1; // CW
          } else {
            direction = -1; // CCW (Reversed)
          }
        }

        let currentRpm = comp.state.motorRpm || 0;
        const currentDir = comp.state.motorDirection || 0;

        // Smooth acceleration / coast down inertia
        if (targetRpm > 0) {
          currentRpm = Math.min(targetRpm, currentRpm + 600 * dt);
          comp.state.motorDirection = direction;
        } else {
          currentRpm = Math.max(0, currentRpm - 350 * dt);
          if (currentRpm === 0) comp.state.motorDirection = 0;
        }

        comp.state.motorRpm = Math.round(currentRpm);
        comp.state.energized = currentRpm > 0;
      } else if (comp.type === 'motor_3p_6wire') {
        // 6-wire motor for Star-Delta
        const tU1 = comp.terminals.find(t => t.label === 'U1');
        const tV1 = comp.terminals.find(t => t.label === 'V1');
        const tW1 = comp.terminals.find(t => t.label === 'W1');

        const pU1 = tU1?.potential;
        const pV1 = tV1?.potential;
        const pW1 = tW1?.potential;

        const phases = [pU1, pV1, pW1].filter(p => ['L1', 'L2', 'L3'].includes(p as string));
        const uniquePhases = new Set(phases);

        let targetRpm = 0;
        let direction: 1 | -1 | 0 = 0;

        if (uniquePhases.size === 3) {
          targetRpm = 1450;
          direction = 1;
        }

        let currentRpm = comp.state.motorRpm || 0;
        if (targetRpm > 0) {
          currentRpm = Math.min(targetRpm, currentRpm + 550 * dt);
          comp.state.motorDirection = direction;
        } else {
          currentRpm = Math.max(0, currentRpm - 300 * dt);
          if (currentRpm === 0) comp.state.motorDirection = 0;
        }

        comp.state.motorRpm = Math.round(currentRpm);
        comp.state.energized = currentRpm > 0;
      } else if (comp.type === 'motor_1p') {
        const tL = comp.terminals.find(t => t.label === 'L');
        const tN = comp.terminals.find(t => t.label === 'N');

        const hasLine = tL && ['L1', 'L2', 'L3'].includes(tL.potential);
        const hasNeutral = tN && tN.potential === 'N';

        let targetRpm = (hasLine && hasNeutral) ? 1420 : 0;
        let currentRpm = comp.state.motorRpm || 0;

        if (targetRpm > 0) {
          currentRpm = Math.min(targetRpm, currentRpm + 700 * dt);
          comp.state.motorDirection = 1;
        } else {
          currentRpm = Math.max(0, currentRpm - 400 * dt);
          if (currentRpm === 0) comp.state.motorDirection = 0;
        }

        comp.state.motorRpm = Math.round(currentRpm);
        comp.state.energized = currentRpm > 0;
      }
    }
  }
}
