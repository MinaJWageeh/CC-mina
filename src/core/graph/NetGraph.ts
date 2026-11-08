import {
  CircuitProject,
  DeviceComponent,
  JunctionNode,
  Point2D,
  Terminal,
  Wire,
  WireEndpoint
} from '../types/circuit';
import { COMPONENT_CATALOG } from '../types/components';
import { TagRegistry } from './TagRegistry';

export class NetGraph {
  public components: Map<string, DeviceComponent> = new Map();
  public wires: Map<string, Wire> = new Map();
  public junctions: Map<string, JunctionNode> = new Map();
  public tagRegistry: TagRegistry = new TagRegistry();

  constructor(initialData?: Partial<CircuitProject>) {
    if (initialData) {
      this.loadProject(initialData);
    }
  }

  public loadProject(data: Partial<CircuitProject>): void {
    this.components.clear();
    this.wires.clear();
    this.junctions.clear();

    if (data.components) {
      for (const comp of data.components) {
        this.components.set(comp.id, { ...comp });
      }
    }
    if (data.wires) {
      for (const wire of data.wires) {
        this.wires.set(wire.id, { ...wire });
      }
    }
    if (data.junctions) {
      for (const junc of data.junctions) {
        this.junctions.set(junc.id, { ...junc });
      }
    }

    this.updateAllTerminalPositions();
    this.tagRegistry.rebuild(Array.from(this.components.values()));
  }

  public toProject(metadata?: CircuitProject['metadata'], viewport?: CircuitProject['viewport']): CircuitProject {
    return {
      version: '1.0.0',
      metadata: metadata || {
        title: 'Untitled Circuit',
        author: 'Mina J. Wageeh',
        date: new Date().toISOString().split('T')[0],
        language: 'ar',
        standard: 'IEC'
      },
      viewport: viewport || { panX: 0, panY: 0, zoom: 1.0 },
      components: Array.from(this.components.values()),
      wires: Array.from(this.wires.values()),
      junctions: Array.from(this.junctions.values())
    };
  }

  // --- COMPONENT MANAGEMENT ---

  public addComponent(component: DeviceComponent): void {
    this.components.set(component.id, component);
    this.updateComponentTerminalPositions(component);
    this.tagRegistry.rebuild(Array.from(this.components.values()));
  }

  public removeComponent(componentId: string): { removedWires: Wire[]; removedJunctions: JunctionNode[] } {
    const comp = this.components.get(componentId);
    if (!comp) return { removedWires: [], removedJunctions: [] };

    const terminalIds = new Set(comp.terminals.map(t => t.id));
    const removedWires: Wire[] = [];
    const removedJunctions: JunctionNode[] = [];

    // Find and remove all attached wires
    for (const [wId, wire] of this.wires.entries()) {
      const fromAttached = wire.from.type === 'terminal' && terminalIds.has(wire.from.id);
      const toAttached = wire.to.type === 'terminal' && terminalIds.has(wire.to.id);
      if (fromAttached || toAttached) {
        removedWires.push(wire);
        this.wires.delete(wId);
      }
    }

    // Clean up orphan junctions
    for (const [jId, junc] of this.junctions.entries()) {
      const activeWires = Array.from(this.wires.values()).filter(
        w => (w.from.type === 'junction' && w.from.id === jId) ||
             (w.to.type === 'junction' && w.to.id === jId)
      );
      if (activeWires.length === 0) {
        removedJunctions.push(junc);
        this.junctions.delete(jId);
      }
    }

    this.components.delete(componentId);
    this.tagRegistry.rebuild(Array.from(this.components.values()));
    return { removedWires, removedJunctions };
  }

  public updateComponent(component: DeviceComponent): void {
    this.components.set(component.id, component);
    this.updateComponentTerminalPositions(component);
    this.tagRegistry.rebuild(Array.from(this.components.values()));
  }

  public moveComponent(componentId: string, newPos: Point2D): void {
    const comp = this.components.get(componentId);
    if (!comp) return;
    comp.position = newPos;
    this.updateComponentTerminalPositions(comp);
  }

  public rotateComponent(componentId: string): void {
    const comp = this.components.get(componentId);
    if (!comp) return;
    comp.rotation = ((comp.rotation + 90) % 360) as 0 | 90 | 180 | 270;
    this.updateComponentTerminalPositions(comp);
  }

  // --- TERMINAL POSITION MATH ---

  public updateComponentTerminalPositions(comp: DeviceComponent): void {
    const def = COMPONENT_CATALOG[comp.type];
    const w = def?.width || 60;
    const h = def?.height || 60;

    for (const term of comp.terminals) {
      let ox = term.offset.x;
      let oy = term.offset.y;

      // Rotate offset around center if rotated
      if (comp.rotation === 90) {
        const rx = w - oy;
        const ry = ox;
        ox = rx;
        oy = ry;
      } else if (comp.rotation === 180) {
        ox = w - ox;
        oy = h - oy;
      } else if (comp.rotation === 270) {
        const rx = oy;
        const ry = h - ox;
        ox = rx;
        oy = ry;
      }

      term.position = {
        x: comp.position.x + ox,
        y: comp.position.y + oy
      };
    }
  }

  public updateAllTerminalPositions(): void {
    for (const comp of this.components.values()) {
      this.updateComponentTerminalPositions(comp);
    }
  }

  // --- WIRE MANAGEMENT & INSTANT BRANCHING ---

  public addWire(wire: Wire): void {
    this.wires.set(wire.id, wire);
  }

  public removeWire(wireId: string): void {
    this.wires.delete(wireId);
    // Cleanup dangling junctions with < 2 connections
    for (const [jId, junc] of this.junctions.entries()) {
      const active = Array.from(this.wires.values()).filter(
        w => (w.from.type === 'junction' && w.from.id === jId) ||
             (w.to.type === 'junction' && w.to.id === jId)
      );
      if (active.length < 2) {
        this.junctions.delete(jId);
      }
    }
  }

  public getEndpointPosition(endpoint: WireEndpoint): Point2D | null {
    if (endpoint.type === 'terminal') {
      for (const comp of this.components.values()) {
        const term = comp.terminals.find(t => t.id === endpoint.id);
        if (term) return term.position;
      }
    } else {
      const junc = this.junctions.get(endpoint.id);
      if (junc) return junc.position;
    }
    return null;
  }

  /**
   * Splits an existing wire at a projection point and connects a new branch wire.
   * This is the core instant T-Junction bisection algorithm!
   */
  public splitWireAtPoint(
    targetWireId: string,
    splitPoint: Point2D,
    incomingEndpoint: WireEndpoint
  ): { junction: JunctionNode; newWireA: Wire; newWireB: Wire; branchWire: Wire } | null {
    const targetWire = this.wires.get(targetWireId);
    if (!targetWire) return null;

    const juncId = 'J_' + Math.random().toString(36).substr(2, 9);
    const junction: JunctionNode = {
      id: juncId,
      position: splitPoint,
      netId: targetWire.netId,
      potential: targetWire.potential,
      connectedWireIds: []
    };
    this.junctions.set(juncId, junction);

    // Segment A: from original 'from' to Junction
    const wireA: Wire = {
      id: 'W_' + Math.random().toString(36).substr(2, 9),
      from: targetWire.from,
      to: { type: 'junction', id: juncId },
      waypoints: [],
      routingMode: targetWire.routingMode,
      netId: targetWire.netId,
      potential: targetWire.potential,
      hasCurrent: false
    };

    // Segment B: from Junction to original 'to'
    const wireB: Wire = {
      id: 'W_' + Math.random().toString(36).substr(2, 9),
      from: { type: 'junction', id: juncId },
      to: targetWire.to,
      waypoints: [],
      routingMode: targetWire.routingMode,
      netId: targetWire.netId,
      potential: targetWire.potential,
      hasCurrent: false
    };

    // Branch Wire: from incomingEndpoint to Junction
    const branchWire: Wire = {
      id: 'W_' + Math.random().toString(36).substr(2, 9),
      from: incomingEndpoint,
      to: { type: 'junction', id: juncId },
      waypoints: [],
      routingMode: 'free',
      netId: targetWire.netId,
      potential: targetWire.potential,
      hasCurrent: false
    };

    junction.connectedWireIds = [wireA.id, wireB.id, branchWire.id];

    // Delete original wire and install the 3 new wire branches
    this.wires.delete(targetWireId);
    this.wires.set(wireA.id, wireA);
    this.wires.set(wireB.id, wireB);
    this.wires.set(branchWire.id, branchWire);

    return { junction, newWireA: wireA, newWireB: wireB, branchWire };
  }

  /**
   * Distance from a point P to a line segment AB
   */
  public static pointToSegmentDistance(p: Point2D, a: Point2D, b: Point2D): { dist: number; proj: Point2D } {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const lenSq = dx * dx + dy * dy;

    if (lenSq === 0) {
      const d = Math.hypot(p.x - a.x, p.y - a.y);
      return { dist: d, proj: a };
    }

    let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));

    const proj = {
      x: a.x + t * dx,
      y: a.y + t * dy
    };
    const dist = Math.hypot(p.x - proj.x, p.y - proj.y);
    return { dist, proj };
  }
}
