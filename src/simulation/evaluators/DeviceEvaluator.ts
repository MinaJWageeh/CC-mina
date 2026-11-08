import { NetGraph } from '../../core/graph/NetGraph';
import { EquipotentialSolver, SolverResult } from '../solver/EquipotentialSolver';
import { MotorDynamics } from './MotorDynamics';

export interface EvaluationStepResult {
  solverResult: SolverResult;
  changedDevices: string[];
  coilsEnergized: string[];
  contactsChanged: boolean;
}

export class DeviceEvaluator {
  /**
   * Runs an iterative convergence pass between the Equipotential Solver and Device Logic.
   * Runs multiple passes (up to 10) until all coil and contact states stabilize.
   */
  public static evaluateStep(graph: NetGraph, dt: number): EvaluationStepResult {
    let solverResult: SolverResult = { hasShortCircuit: false, shortCircuitNets: [], activeNets: new Map() };
    const changedDevices: string[] = [];
    const coilsEnergized: string[] = [];
    let contactsChanged = false;

    // Iterative convergence loop
    for (let iteration = 0; iteration < 8; iteration++) {
      solverResult = EquipotentialSolver.solve(graph);

      // If short-circuit occurs, trip upstream MCBs immediately and abort
      if (solverResult.hasShortCircuit) {
        for (const comp of graph.components.values()) {
          if (comp.type === 'mcb_3p' || comp.type === 'mcb_1p') {
            if (comp.state.closed !== false && !comp.state.tripped) {
              comp.state.tripped = true;
              changedDevices.push(comp.id);
            }
          }
        }
        break;
      }

      let iterationContactChanged = false;

      // 1. Evaluate Coils (Contactor coils, Relay coils, Timer coils)
      for (const comp of graph.components.values()) {
        const isCoil = [
          'contactor_coil',
          'control_relay_coil',
          'timer_on_delay',
          'timer_off_delay',
          'timer_flasher',
          'timer_star_delta'
        ].includes(comp.type);

        if (isCoil) {
          const tA1 = comp.terminals.find(t => t.label === 'A1');
          const tA2 = comp.terminals.find(t => t.label === 'A2');

          const hasLineA1 = tA1 && ['L1', 'L2', 'L3', 'DC_POS'].includes(tA1.potential);
          const hasNeutralA2 = tA2 && ['N', 'DC_NEG'].includes(tA2.potential);
          const hasLineA2 = tA2 && ['L1', 'L2', 'L3', 'DC_POS'].includes(tA2.potential);
          const hasNeutralA1 = tA1 && ['N', 'DC_NEG'].includes(tA1.potential);

          // Coil energizes if it has Phase-to-Neutral or +24V to 0V drop across terminals
          const isEnergized = Boolean((hasLineA1 && hasNeutralA2) || (hasLineA2 && hasNeutralA1));

          if (comp.state.energized !== isEnergized) {
            comp.state.energized = isEnergized;
            changedDevices.push(comp.id);
            if (isEnergized) coilsEnergized.push(comp.tag);
          }

          // Handle Timer logic if timer
          if (comp.type.startsWith('timer_')) {
            const preset = comp.state.timerPreset ?? 5.0; // default 5s
            let elapsed = comp.state.timerElapsed ?? 0;

            if (isEnergized) {
              elapsed = Math.min(preset, elapsed + dt);
              comp.state.timerElapsed = elapsed;
              comp.state.timerRunning = elapsed < preset;
            } else {
              if (comp.type === 'timer_on_delay') {
                comp.state.timerElapsed = 0;
                comp.state.timerRunning = false;
              }
            }
          }

          // 2. Propagate coil state to linked contacts via TagRegistry
          const masterTag = comp.tag;
          if (masterTag) {
            const dependentIds = graph.tagRegistry.getDependents(masterTag);
            for (const depId of dependentIds) {
              const depComp = graph.components.get(depId);
              if (!depComp) continue;

              const prevClosed = depComp.state.closed;
              let nextClosed = prevClosed;

              if (depComp.type === 'contactor_main_3p') {
                nextClosed = comp.state.energized;
              } else if (depComp.type === 'aux_contact_no') {
                nextClosed = comp.state.energized;
              } else if (depComp.type === 'aux_contact_nc') {
                nextClosed = !comp.state.energized;
              } else if (depComp.type === 'timer_contact_no') {
                const preset = comp.state.timerPreset ?? 5.0;
                const elapsed = comp.state.timerElapsed ?? 0;
                nextClosed = elapsed >= preset;
              } else if (depComp.type === 'timer_contact_nc') {
                const preset = comp.state.timerPreset ?? 5.0;
                const elapsed = comp.state.timerElapsed ?? 0;
                nextClosed = elapsed < preset;
              }

              if (nextClosed !== prevClosed) {
                depComp.state.closed = nextClosed;
                iterationContactChanged = true;
                contactsChanged = true;
                changedDevices.push(depComp.id);
              }
            }
          }
        }
      }

      // If no contacts switched state in this iteration, graph has stabilized!
      if (!iterationContactChanged) {
        break;
      }
    }

    // 3. Evaluate Motors (Rotation, Direction, Inertia)
    MotorDynamics.evaluate(graph, dt);

    // 4. Evaluate Indicator Lamps & Buzzers
    for (const comp of graph.components.values()) {
      if (comp.type === 'indicator_lamp') {
        const [t1, t2] = comp.terminals;
        const hasLine = (t1 && ['L1', 'L2', 'L3'].includes(t1.potential)) || (t2 && ['L1', 'L2', 'L3'].includes(t2.potential));
        const hasNeutral = (t1 && t1.potential === 'N') || (t2 && t2.potential === 'N');
        comp.state.energized = Boolean(hasLine && hasNeutral);
      } else if (comp.type === 'buzzer_alarm') {
        const [t1, t2] = comp.terminals;
        const hasLine = (t1 && ['L1', 'L2', 'L3', 'DC_POS'].includes(t1.potential)) || (t2 && ['L1', 'L2', 'L3', 'DC_POS'].includes(t2.potential));
        const hasNeutral = (t1 && ['N', 'DC_NEG'].includes(t1.potential)) || (t2 && ['N', 'DC_NEG'].includes(t2.potential));
        comp.state.energized = Boolean(hasLine && hasNeutral);
      }
    }

    return {
      solverResult,
      changedDevices,
      coilsEnergized,
      contactsChanged
    };
  }
}
