import { NetGraph } from '../../core/graph/NetGraph';
import { DeviceComponent, Terminal, VoltagePotential } from '../../core/types/circuit';
import { UnionFind } from './UnionFind';

export interface SolverResult {
  hasShortCircuit: boolean;
  shortCircuitNets: string[];
  activeNets: Map<string, VoltagePotential>;
}

export class EquipotentialSolver {
  public static solve(graph: NetGraph): SolverResult {
    const uf = new UnionFind();

    // 1. Register all terminals and junctions as vertices in Union-Find
    for (const comp of graph.components.values()) {
      for (const term of comp.terminals) {
        uf.makeSet(term.id);
      }
    }
    for (const junc of graph.junctions.values()) {
      uf.makeSet(junc.id);
    }

    // 2. Unite nodes connected by wires
    for (const wire of graph.wires.values()) {
      const fromKey = wire.from.id;
      const toKey = wire.to.id;
      uf.union(fromKey, toKey);
    }

    // 3. Unite internal closed conduction paths inside components
    for (const comp of graph.components.values()) {
      const state = comp.state || {};

      switch (comp.type) {
        case 'mcb_3p': {
          const isClosed = state.closed !== false; // default closed if not toggled open
          if (isClosed && !state.tripped) {
            // Pair 1-2, 3-4, 5-6
            this.uniteTerminals(uf, comp, '1', '2');
            this.uniteTerminals(uf, comp, '3', '4');
            this.uniteTerminals(uf, comp, '5', '6');
          }
          break;
        }
        case 'mcb_1p': {
          const isClosed = state.closed !== false;
          if (isClosed && !state.tripped) {
            this.uniteTerminals(uf, comp, '1', '2');
          }
          break;
        }
        case 'fuse_3p': {
          this.uniteTerminals(uf, comp, '1', '2');
          this.uniteTerminals(uf, comp, '3', '4');
          this.uniteTerminals(uf, comp, '5', '6');
          break;
        }
        case 'fuse_1p': {
          this.uniteTerminals(uf, comp, '1', '2');
          break;
        }
        case 'contactor_main_3p': {
          if (state.closed) {
            this.uniteTerminals(uf, comp, '1', '2');
            this.uniteTerminals(uf, comp, '3', '4');
            this.uniteTerminals(uf, comp, '5', '6');
          }
          break;
        }
        case 'aux_contact_no':
        case 'timer_contact_no': {
          if (state.closed) {
            // 13-14 or 57-58
            const [tA, tB] = comp.terminals;
            if (tA && tB) uf.union(tA.id, tB.id);
          }
          break;
        }
        case 'aux_contact_nc':
        case 'timer_contact_nc': {
          // Closed by default, opens when master coil/timer acts
          const isClosed = state.closed !== false;
          if (isClosed) {
            const [tA, tB] = comp.terminals;
            if (tA && tB) uf.union(tA.id, tB.id);
          }
          break;
        }
        case 'pushbutton_no': {
          if (state.pressed) {
            this.uniteTerminals(uf, comp, '3', '4');
          }
          break;
        }
        case 'pushbutton_nc': {
          // Closed by default unless pressed
          if (!state.pressed) {
            this.uniteTerminals(uf, comp, '1', '2');
          }
          break;
        }
        case 'emergency_stop': {
          // Closed unless latched/pressed
          if (!state.latched && !state.pressed) {
            this.uniteTerminals(uf, comp, '1', '2');
          }
          break;
        }
        case 'selector_2pos': {
          if (state.selectorPosition === 1) {
            this.uniteTerminals(uf, comp, '1', '2');
          }
          break;
        }
        case 'selector_3pos_hoa': {
          if (state.selectorPosition === 1) { // Hand
            this.uniteTerminals(uf, comp, 'C', 'H');
          } else if (state.selectorPosition === 2) { // Auto
            this.uniteTerminals(uf, comp, 'C', 'A');
          }
          break;
        }
        case 'limit_switch_no': {
          if (state.closed) {
            this.uniteTerminals(uf, comp, '13', '14');
          }
          break;
        }
        case 'limit_switch_nc': {
          if (state.closed !== false) {
            this.uniteTerminals(uf, comp, '11', '12');
          }
          break;
        }
        case 'float_switch': {
          if (state.selectorPosition === 1) { // High level -> NO closes
            this.uniteTerminals(uf, comp, 'C', 'NO');
          } else { // Low level -> NC closes
            this.uniteTerminals(uf, comp, 'C', 'NC');
          }
          break;
        }
        case 'overload_relay': {
          // Main power poles (1-2, 3-4, 5-6) always pass through
          this.uniteTerminals(uf, comp, '1', '2');
          this.uniteTerminals(uf, comp, '3', '4');
          this.uniteTerminals(uf, comp, '5', '6');

          // Auxiliary contacts: 95-96 NC trips open when tripped; 97-98 NO closes when tripped
          if (!state.tripped) {
            this.uniteTerminals(uf, comp, '95', '96');
          } else {
            this.uniteTerminals(uf, comp, '97', '98');
          }
          break;
        }
      }
    }

    // 4. Source rail injection: Map source pins to root nets
    const rootPotentials = new Map<string, Set<VoltagePotential>>();

    for (const comp of graph.components.values()) {
      if (comp.type === 'source_3p_pe_n') {
        this.injectPotential(uf, rootPotentials, comp, 'L1', 'L1');
        this.injectPotential(uf, rootPotentials, comp, 'L2', 'L2');
        this.injectPotential(uf, rootPotentials, comp, 'L3', 'L3');
        this.injectPotential(uf, rootPotentials, comp, 'N', 'N');
        this.injectPotential(uf, rootPotentials, comp, 'PE', 'PE');
      } else if (comp.type === 'source_1p_n') {
        this.injectPotential(uf, rootPotentials, comp, 'L', 'L1');
        this.injectPotential(uf, rootPotentials, comp, 'N', 'N');
        this.injectPotential(uf, rootPotentials, comp, 'PE', 'PE');
      } else if (comp.type === 'source_dc_24v') {
        this.injectPotential(uf, rootPotentials, comp, '+24V', 'DC_POS');
        this.injectPotential(uf, rootPotentials, comp, '0V', 'DC_NEG');
      }
    }

    // 5. Detect Short Circuits (Conflicting potentials on same net)
    const shortCircuitNets: string[] = [];
    const netPotentialMap = new Map<string, VoltagePotential>();

    for (const [root, potentials] of rootPotentials.entries()) {
      const activePotentials = Array.from(potentials).filter(p => p !== 'NONE');
      
      const hasConflictingPhases = activePotentials.filter(p => ['L1', 'L2', 'L3'].includes(p)).length > 1;
      const hasPhaseAndNeutral = activePotentials.some(p => ['L1', 'L2', 'L3'].includes(p)) && activePotentials.includes('N');
      const hasDCPosAndNeg = activePotentials.includes('DC_POS') && activePotentials.includes('DC_NEG');

      if (hasConflictingPhases || hasPhaseAndNeutral || hasDCPosAndNeg) {
        shortCircuitNets.push(root);
      } else if (activePotentials.length > 0) {
        netPotentialMap.set(root, activePotentials[0]);
      }
    }

    // 6. Update terminals and junctions
    for (const comp of graph.components.values()) {
      for (const term of comp.terminals) {
        const root = uf.find(term.id);
        term.netId = root;
        term.potential = netPotentialMap.get(root) || 'NONE';
      }
    }

    for (const junc of graph.junctions.values()) {
      const root = uf.find(junc.id);
      junc.netId = root;
      junc.potential = netPotentialMap.get(root) || 'NONE';
    }

    // 7. Update wires
    for (const wire of graph.wires.values()) {
      const root = uf.find(wire.from.id);
      wire.netId = root;
      wire.potential = netPotentialMap.get(root) || 'NONE';
      // hasCurrent if carrying non-NONE potential
      wire.hasCurrent = wire.potential !== 'NONE';
    }

    return {
      hasShortCircuit: shortCircuitNets.length > 0,
      shortCircuitNets,
      activeNets: netPotentialMap
    };
  }

  private static uniteTerminals(uf: UnionFind, comp: DeviceComponent, labelA: string, labelB: string): void {
    const tA = comp.terminals.find(t => t.label === labelA);
    const tB = comp.terminals.find(t => t.label === labelB);
    if (tA && tB) {
      uf.union(tA.id, tB.id);
    }
  }

  private static injectPotential(
    uf: UnionFind,
    map: Map<string, Set<VoltagePotential>>,
    comp: DeviceComponent,
    pinLabel: string,
    potential: VoltagePotential
  ): void {
    const term = comp.terminals.find(t => t.label === pinLabel);
    if (!term) return;
    const root = uf.find(term.id);
    if (!map.has(root)) {
      map.set(root, new Set());
    }
    map.get(root)!.add(potential);
  }
}
