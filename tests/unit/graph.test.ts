import { describe, it, expect } from 'vitest';
import { NetGraph } from '../../src/core/graph/NetGraph';

describe('NetGraph & Instant Wire Branching', () => {
  it('splits wire and spawns a junction node on branch bisection', () => {
    const graph = new NetGraph();

    // Add 2 dummy terminals
    const compA = {
      id: 'A',
      type: 'source_1p_n' as const,
      category: 'power' as const,
      tag: 'A',
      position: { x: 0, y: 0 },
      rotation: 0 as const,
      terminals: [{ id: 'A_1', componentId: 'A', pinIndex: 0, label: 'L', position: { x: 0, y: 0 }, offset: { x: 0, y: 0 }, netId: null, potential: 'L1' as const }],
      state: {}
    };
    const compB = {
      id: 'B',
      type: 'indicator_lamp' as const,
      category: 'signaling' as const,
      tag: 'B',
      position: { x: 100, y: 0 },
      rotation: 0 as const,
      terminals: [{ id: 'B_1', componentId: 'B', pinIndex: 0, label: 'X1', position: { x: 100, y: 0 }, offset: { x: 0, y: 0 }, netId: null, potential: 'NONE' as const }],
      state: {}
    };

    graph.addComponent(compA);
    graph.addComponent(compB);

    // Add wire between A and B
    const originalWire = {
      id: 'w_orig',
      from: { type: 'terminal' as const, id: 'A_1' },
      to: { type: 'terminal' as const, id: 'B_1' },
      waypoints: [],
      routingMode: 'free' as const,
      netId: null,
      potential: 'NONE' as const,
      hasCurrent: false
    };
    graph.addWire(originalWire);
    expect(graph.wires.size).toBe(1);

    // Split at (50, 0)
    const branchRes = graph.splitWireAtPoint('w_orig', { x: 50, y: 0 }, { type: 'terminal', id: 'C_1' });
    expect(branchRes).not.toBeNull();
    expect(graph.wires.has('w_orig')).toBe(false);
    expect(graph.wires.size).toBe(3);
    expect(graph.junctions.size).toBe(1);
  });
});
