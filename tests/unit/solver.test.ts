import { describe, it, expect } from 'vitest';
import { NetGraph } from '../../src/core/graph/NetGraph';
import { EquipotentialSolver } from '../../src/simulation/solver/EquipotentialSolver';
import { DeviceEvaluator } from '../../src/simulation/evaluators/DeviceEvaluator';
import { easyCircuits } from '../../src/examples/easyCircuits';

describe('EquipotentialSolver & DeviceEvaluator', () => {
  it('loads DOL starter and solves without short circuits', () => {
    const graph = new NetGraph();
    graph.loadProject(easyCircuits[0].project);

    const result = EquipotentialSolver.solve(graph);
    expect(result.hasShortCircuit).toBe(false);

    // Initial state: coil KM1 should be de-energized
    const km1Coil = graph.components.get('km1_coil');
    expect(km1Coil).toBeDefined();
    expect(km1Coil?.state.energized).toBeFalsy();
  });

  it('energizes coil when Start button is pressed and latches via auxiliary contact', () => {
    const graph = new NetGraph();
    graph.loadProject(easyCircuits[0].project);

    const sb2 = graph.components.get('sb2_start');
    expect(sb2).toBeDefined();

    // 1. Press Start button
    sb2!.state.pressed = true;
    DeviceEvaluator.evaluateStep(graph, 0.05);

    const km1Coil = graph.components.get('km1_coil');
    expect(km1Coil?.state.energized).toBe(true);

    const km1Aux = graph.components.get('km1_aux');
    expect(km1Aux?.state.closed).toBe(true);

    // 2. Release Start button -> should remain latched via KM1-13/14
    sb2!.state.pressed = false;
    DeviceEvaluator.evaluateStep(graph, 0.05);
    expect(km1Coil?.state.energized).toBe(true);

    // 3. Press Stop button -> should de-energize
    const sb1 = graph.components.get('sb1_stop');
    sb1!.state.pressed = true;
    DeviceEvaluator.evaluateStep(graph, 0.05);
    expect(km1Coil?.state.energized).toBe(false);
  });
});
