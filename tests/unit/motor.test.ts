import { describe, it, expect } from 'vitest';
import { NetGraph } from '../../src/core/graph/NetGraph';
import { MotorDynamics } from '../../src/simulation/evaluators/MotorDynamics';
import { DeviceComponent } from '../../src/core/types/circuit';

describe('MotorDynamics', () => {
  it('spins motor Clockwise when L1-L2-L3 is applied', () => {
    const graph = new NetGraph();
    const motor: DeviceComponent = {
      id: 'm1',
      type: 'motor_3p_3wire',
      category: 'load',
      tag: 'M1',
      position: { x: 0, y: 0 },
      rotation: 0,
      terminals: [
        { id: 'm1_U', componentId: 'm1', pinIndex: 0, label: 'U', position: { x: 0, y: 0 }, offset: { x: 0, y: 0 }, netId: null, potential: 'L1' },
        { id: 'm1_V', componentId: 'm1', pinIndex: 1, label: 'V', position: { x: 0, y: 0 }, offset: { x: 0, y: 0 }, netId: null, potential: 'L2' },
        { id: 'm1_W', componentId: 'm1', pinIndex: 2, label: 'W', position: { x: 0, y: 0 }, offset: { x: 0, y: 0 }, netId: null, potential: 'L3' },
      ],
      state: { motorRpm: 0, motorDirection: 0 }
    };
    graph.addComponent(motor);

    MotorDynamics.evaluate(graph, 1.0);
    expect(motor.state.motorDirection).toBe(1); // Clockwise
    expect(motor.state.motorRpm).toBeGreaterThan(0);
  });

  it('spins motor Counter-Clockwise when phases are transposed (L2-L1-L3)', () => {
    const graph = new NetGraph();
    const motor: DeviceComponent = {
      id: 'm1',
      type: 'motor_3p_3wire',
      category: 'load',
      tag: 'M1',
      position: { x: 0, y: 0 },
      rotation: 0,
      terminals: [
        { id: 'm1_U', componentId: 'm1', pinIndex: 0, label: 'U', position: { x: 0, y: 0 }, offset: { x: 0, y: 0 }, netId: null, potential: 'L2' }, // Swapped!
        { id: 'm1_V', componentId: 'm1', pinIndex: 1, label: 'V', position: { x: 0, y: 0 }, offset: { x: 0, y: 0 }, netId: null, potential: 'L1' }, // Swapped!
        { id: 'm1_W', componentId: 'm1', pinIndex: 2, label: 'W', position: { x: 0, y: 0 }, offset: { x: 0, y: 0 }, netId: null, potential: 'L3' },
      ],
      state: { motorRpm: 0, motorDirection: 0 }
    };
    graph.addComponent(motor);

    MotorDynamics.evaluate(graph, 1.0);
    expect(motor.state.motorDirection).toBe(-1); // Counter-Clockwise
    expect(motor.state.motorRpm).toBeGreaterThan(0);
  });
});
