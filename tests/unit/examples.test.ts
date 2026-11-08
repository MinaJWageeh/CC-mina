import { describe, it, expect } from 'vitest';
import { NetGraph } from '../../src/core/graph/NetGraph';
import { EquipotentialSolver } from '../../src/simulation/solver/EquipotentialSolver';
import { allExamples } from '../../src/examples';

describe('Examples Curriculum Integrity', () => {
  it('loads and validates all built-in circuits', () => {
    expect(allExamples.length).toBeGreaterThanOrEqual(7);

    for (const example of allExamples) {
      const graph = new NetGraph();
      graph.loadProject(example.project);

      // Verify components loaded
      expect(graph.components.size).toBeGreaterThan(0);

      // Verify wires loaded
      expect(graph.wires.size).toBeGreaterThan(0);

      // Verify EquipotentialSolver solves without thrown errors
      const result = EquipotentialSolver.solve(graph);
      expect(result).toBeDefined();
      expect(result.activeNets).toBeDefined();
    }
  });
});
