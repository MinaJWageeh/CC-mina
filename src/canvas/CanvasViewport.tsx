import React, { useEffect, useRef, useState } from 'react';
import { NetGraph } from '../core/graph/NetGraph';
import { DeviceComponent, Point2D, SimulationMode, Wire, WireEndpoint } from '../core/types/circuit';
import { ComponentRenderer } from './renderers/ComponentRenderer';
import { WireRenderer } from './renderers/WireRenderer';

interface CanvasViewportProps {
  graph: NetGraph;
  mode: SimulationMode;
  animTime: number;
  theme?: 'dark' | 'light';
  selectedComponentIds: string[];
  selectedWireIds: string[];
  onSelectComponent: (id: string, multi: boolean) => void;
  onSelectWire: (id: string, multi: boolean) => void;
  onClearSelection: () => void;
  onGraphChanged: () => void;
  onHoverTerminal?: (terminalId: string | null) => void;
  onToggleComponentState?: (componentId: string) => void;
  onPushbuttonDown?: (componentId: string) => void;
  onPushbuttonUp?: (componentId: string) => void;
}

export const CanvasViewport: React.FC<CanvasViewportProps> = ({
  graph,
  mode,
  animTime,
  theme = 'dark',
  selectedComponentIds,
  selectedWireIds,
  onSelectComponent,
  onSelectWire,
  onClearSelection,
  onGraphChanged,
  onHoverTerminal,
  onToggleComponentState,
  onPushbuttonDown,
  onPushbuttonUp,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Viewport Pan & Zoom
  const [pan, setPan] = useState<Point2D>({ x: 200, y: 100 });
  const [zoom, setZoom] = useState<number>(1.0);

  // Interaction State
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<Point2D>({ x: 0, y: 0 });

  // Dragging Components
  const [draggingCompId, setDraggingCompId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Point2D>({ x: 0, y: 0 });

  // Wire Drawing
  const [activeWireStart, setActiveWireStart] = useState<WireEndpoint | null>(null);
  const [mouseCanvasPos, setMouseCanvasPos] = useState<Point2D>({ x: 0, y: 0 });
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);

  // Marquee Selection Box
  const [marqueeStart, setMarqueeStart] = useState<Point2D | null>(null);
  const [marqueeEnd, setMarqueeEnd] = useState<Point2D | null>(null);

  // Draggable Waypoints for Selected Wires
  const [draggingWaypoint, setDraggingWaypoint] = useState<{
    wireId: string;
    waypointIndex: number;
  } | null>(null);
  const [hoveredWaypoint, setHoveredWaypoint] = useState<{
    wireId: string;
    waypointIndex: number;
  } | null>(null);

  // Track Shift & Space keys for orthogonal snapping and panning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setIsShiftPressed(true);
      if (e.code === 'Space') setIsSpacePressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setIsShiftPressed(false);
      if (e.code === 'Space') setIsSpacePressed(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Sync Canvas2D size with container
  useEffect(() => {
    const updateSize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Convert screen coordinates to canvas world coordinates
  const screenToWorld = (clientX: number, clientY: number): Point2D => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: (clientX - rect.left - pan.x) / zoom,
      y: (clientY - rect.top - pan.y) / zoom,
    };
  };

  // Redraw Wires and Junctions on Canvas2D
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // Apply pan & zoom matrix
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // 1. Draw Subtle Grid
    const gridSize = 20;
    const startX = Math.floor(-pan.x / zoom / gridSize) * gridSize;
    const startY = Math.floor(-pan.y / zoom / gridSize) * gridSize;
    const endX = startX + canvas.width / zoom + gridSize * 2;
    const endY = startY + canvas.height / zoom + gridSize * 2;

    const isLight = theme === 'light';
    ctx.strokeStyle = isLight ? 'rgba(148, 163, 184, 0.45)' : 'rgba(51, 65, 85, 0.25)';
    ctx.lineWidth = isLight ? 0.9 : 0.8;
    ctx.beginPath();
    for (let x = startX; x <= endX; x += gridSize) {
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
    }
    for (let y = startY; y <= endY; y += gridSize) {
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
    }
    ctx.stroke();

    // 2. Render all established Wires
    for (const wire of graph.wires.values()) {
      const startPos = graph.getEndpointPosition(wire.from);
      const endPos = graph.getEndpointPosition(wire.to);
      if (startPos && endPos) {
        const isSelected = selectedWireIds.includes(wire.id);
        WireRenderer.renderWire(ctx, wire, startPos, endPos, isSelected, animTime, theme);

        if (isSelected && mode === 'design') {
          const hIndex =
            hoveredWaypoint && hoveredWaypoint.wireId === wire.id
              ? hoveredWaypoint.waypointIndex
              : null;
          WireRenderer.renderWaypointHandles(ctx, wire, startPos, endPos, hIndex);
        }
      }
    }

    // 3. Render all T-Junction dots
    for (const junc of graph.junctions.values()) {
      WireRenderer.renderJunctionDot(ctx, junc.position, junc.potential, theme);
    }

    // 4. Render Active Wire in progress
    if (activeWireStart) {
      const startPos = graph.getEndpointPosition(activeWireStart);
      if (startPos) {
        const tempWire: Wire = {
          id: 'temp_wire',
          from: activeWireStart,
          to: { type: 'junction', id: 'temp' },
          waypoints: [],
          routingMode: isShiftPressed ? 'ortho' : 'free',
          netId: null,
          potential: 'NONE',
          hasCurrent: false,
        };
        WireRenderer.renderWire(ctx, tempWire, startPos, mouseCanvasPos, false, animTime, theme);
      }
    }

    ctx.restore();
  }, [graph, pan, zoom, animTime, activeWireStart, mouseCanvasPos, isShiftPressed, selectedWireIds, theme]);

  // --- MOUSE EVENT HANDLERS ---

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (mode !== 'design' || selectedWireIds.length === 0) return;
    const worldPos = screenToWorld(e.clientX, e.clientY);

    for (const wireId of selectedWireIds) {
      const wire = graph.wires.get(wireId);
      if (!wire) continue;
      const pStart = graph.getEndpointPosition(wire.from);
      const pEnd = graph.getEndpointPosition(wire.to);
      if (!pStart || !pEnd) continue;

      const allPoints = WireRenderer.getWirePathPoints(wire, pStart, pEnd);
      for (let i = 1; i < allPoints.length - 1; i++) {
        const pt = allPoints[i];
        if (Math.hypot(worldPos.x - pt.x, worldPos.y - pt.y) <= 12) {
          wire.waypoints.splice(i - 1, 1);
          onGraphChanged();
          return;
        }
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Middle click or Space+Click initiates canvas panning
    if (e.button === 1 || (e.button === 0 && isSpacePressed)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    if (e.button === 0) {
      const worldPos = screenToWorld(e.clientX, e.clientY);

      // 1. Check if user clicked an interactive Waypoint handle or segment midpoint of a selected wire
      if (mode === 'design' && selectedWireIds.length > 0 && !activeWireStart) {
        let handleHit = false;
        for (const wireId of selectedWireIds) {
          const wire = graph.wires.get(wireId);
          if (!wire) continue;
          const pStart = graph.getEndpointPosition(wire.from);
          const pEnd = graph.getEndpointPosition(wire.to);
          if (!pStart || !pEnd) continue;

          const allPoints = WireRenderer.getWirePathPoints(wire, pStart, pEnd);

          // A. Click on existing waypoint handle to drag it
          for (let i = 1; i < allPoints.length - 1; i++) {
            const pt = allPoints[i];
            if (Math.hypot(worldPos.x - pt.x, worldPos.y - pt.y) <= 12) {
              if (wire.waypoints.length === 0) {
                wire.waypoints = WireRenderer.getOrthoWaypoints(pStart, pEnd);
              }
              setDraggingWaypoint({ wireId: wire.id, waypointIndex: i - 1 });
              handleHit = true;
              break;
            }
          }
          if (handleHit) break;

          // B. Click on segment midpoint to create a new bend and drag it
          for (let i = 0; i < allPoints.length - 1; i++) {
            const pA = allPoints[i];
            const pB = allPoints[i + 1];
            const mid = { x: (pA.x + pB.x) / 2, y: (pA.y + pB.y) / 2 };
            if (Math.hypot(worldPos.x - mid.x, worldPos.y - mid.y) <= 10) {
              if (wire.waypoints.length === 0) {
                wire.waypoints = WireRenderer.getOrthoWaypoints(pStart, pEnd);
              }
              wire.waypoints.splice(i, 0, { ...mid });
              setDraggingWaypoint({ wireId: wire.id, waypointIndex: i });
              onGraphChanged();
              handleHit = true;
              break;
            }
          }
          if (handleHit) break;
        }

        if (handleHit) return;
      }

      // 2. Check if user clicked an existing wire along ANY of its path segments
      let wireClicked = false;
      for (const wire of graph.wires.values()) {
        const p1 = graph.getEndpointPosition(wire.from);
        const p2 = graph.getEndpointPosition(wire.to);
        if (p1 && p2) {
          const pathPoints = WireRenderer.getWirePathPoints(wire, p1, p2);
          for (let s = 0; s < pathPoints.length - 1; s++) {
            const segA = pathPoints[s];
            const segB = pathPoints[s + 1];
            const { dist, proj } = NetGraph.pointToSegmentDistance(worldPos, segA, segB);
            if (dist < 8) {
              // If currently routing a wire, bisect and branch!
              if (activeWireStart) {
                graph.splitWireAtPoint(wire.id, proj, activeWireStart);
                setActiveWireStart(null);
                onGraphChanged();
                wireClicked = true;
                break;
              } else {
                // Select wire
                onSelectWire(wire.id, e.ctrlKey || e.metaKey);
                wireClicked = true;
                break;
              }
            }
          }
          if (wireClicked) break;
        }
      }

      if (!wireClicked && !activeWireStart) {
        // Start Marquee selection box
        setMarqueeStart(worldPos);
        setMarqueeEnd(worldPos);
        if (!e.ctrlKey && !e.metaKey) {
          onClearSelection();
        }
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const worldPos = screenToWorld(e.clientX, e.clientY);
    setMouseCanvasPos(worldPos);

    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
      return;
    }

    // Dragging waypoint of selected wire
    if (draggingWaypoint) {
      const wire = graph.wires.get(draggingWaypoint.wireId);
      if (wire && wire.waypoints && wire.waypoints[draggingWaypoint.waypointIndex]) {
        const snapGrid = 10;
        let targetX = Math.round(worldPos.x / snapGrid) * snapGrid;
        let targetY = Math.round(worldPos.y / snapGrid) * snapGrid;

        // Shift key locks to horizontal or vertical axis relative to neighboring points
        if (e.shiftKey) {
          const pStart = graph.getEndpointPosition(wire.from)!;
          const pEnd = graph.getEndpointPosition(wire.to)!;
          const allPoints = WireRenderer.getWirePathPoints(wire, pStart, pEnd);
          const prevPt = allPoints[draggingWaypoint.waypointIndex] || pStart;
          const dx = Math.abs(targetX - prevPt.x);
          const dy = Math.abs(targetY - prevPt.y);
          if (dx > dy) {
            targetY = prevPt.y;
          } else {
            targetX = prevPt.x;
          }
        }

        wire.waypoints[draggingWaypoint.waypointIndex] = { x: targetX, y: targetY };
        onGraphChanged();
        return;
      }
    }

    // Moving component
    if (draggingCompId) {
      const snapGrid = 10;
      const targetX = Math.round((worldPos.x - dragOffset.x) / snapGrid) * snapGrid;
      const targetY = Math.round((worldPos.y - dragOffset.y) / snapGrid) * snapGrid;
      graph.moveComponent(draggingCompId, { x: targetX, y: targetY });
      onGraphChanged();
      return;
    }

    // Check hover over waypoints for visual highlight
    if (mode === 'design' && selectedWireIds.length > 0) {
      let hovered: { wireId: string; waypointIndex: number } | null = null;
      for (const wireId of selectedWireIds) {
        const wire = graph.wires.get(wireId);
        if (!wire) continue;
        const pStart = graph.getEndpointPosition(wire.from);
        const pEnd = graph.getEndpointPosition(wire.to);
        if (!pStart || !pEnd) continue;
        const allPoints = WireRenderer.getWirePathPoints(wire, pStart, pEnd);
        for (let i = 1; i < allPoints.length - 1; i++) {
          const pt = allPoints[i];
          if (Math.hypot(worldPos.x - pt.x, worldPos.y - pt.y) <= 12) {
            hovered = { wireId, waypointIndex: i - 1 };
            break;
          }
        }
        if (hovered) break;
      }
      setHoveredWaypoint(hovered);
    }

    // Updating marquee selection box
    if (marqueeStart) {
      setMarqueeEnd(worldPos);
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingCompId(null);
    if (draggingWaypoint) {
      setDraggingWaypoint(null);
      onGraphChanged();
    }

    // Finalize Marquee Box selection
    if (marqueeStart && marqueeEnd) {
      const minX = Math.min(marqueeStart.x, marqueeEnd.x);
      const maxX = Math.max(marqueeStart.x, marqueeEnd.x);
      const minY = Math.min(marqueeStart.y, marqueeEnd.y);
      const maxY = Math.max(marqueeStart.y, marqueeEnd.y);

      // Only select if box size > 10px
      if (maxX - minX > 10 && maxY - minY > 10) {
        for (const comp of graph.components.values()) {
          if (
            comp.position.x >= minX &&
            comp.position.x <= maxX &&
            comp.position.y >= minY &&
            comp.position.y <= maxY
          ) {
            onSelectComponent(comp.id, true);
          }
        }
      }
      setMarqueeStart(null);
      setMarqueeEnd(null);
    }
  };

  // Zoom on wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.max(0.3, Math.min(3.0, zoom * zoomFactor));

    // Zoom centered on cursor
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const newPanX = cursorX - (cursorX - pan.x) * (newZoom / zoom);
      const newPanY = cursorY - (cursorY - pan.y) * (newZoom / zoom);

      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });
    }
  };

  // Terminal click to start or complete wire
  const handleTerminalMouseDown = (terminalId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!activeWireStart) {
      // Start wire
      setActiveWireStart({ type: 'terminal', id: terminalId });
    } else {
      // Complete wire if connecting to different terminal
      if (activeWireStart.type !== 'terminal' || activeWireStart.id !== terminalId) {
        const newWire: Wire = {
          id: 'W_' + Math.random().toString(36).substr(2, 9),
          from: activeWireStart,
          to: { type: 'terminal', id: terminalId },
          waypoints: [],
          routingMode: isShiftPressed ? 'ortho' : 'free',
          netId: null,
          potential: 'NONE',
          hasCurrent: false,
        };
        graph.addWire(newWire);
        setActiveWireStart(null);
        onGraphChanged();
      }
    }
  };

  // Terminal click or drag-drop to complete wire
  const handleTerminalMouseUp = (terminalId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeWireStart && (activeWireStart.type !== 'terminal' || activeWireStart.id !== terminalId)) {
      const newWire: Wire = {
        id: 'W_' + Math.random().toString(36).substr(2, 9),
        from: activeWireStart,
        to: { type: 'terminal', id: terminalId },
        waypoints: [],
        routingMode: isShiftPressed ? 'ortho' : 'free',
        netId: null,
        potential: 'NONE',
        hasCurrent: false,
      };
      graph.addWire(newWire);
      setActiveWireStart(null);
      onGraphChanged();
    }
  };

  // Component Drag Start
  const handleComponentMouseDown = (comp: DeviceComponent, e: React.MouseEvent) => {
    if (mode === 'run') return; // In run mode, do not move components
    e.stopPropagation();

    const worldPos = screenToWorld(e.clientX, e.clientY);
    setDraggingCompId(comp.id);
    setDragOffset({
      x: worldPos.x - comp.position.x,
      y: worldPos.y - comp.position.y,
    });
    onSelectComponent(comp.id, e.ctrlKey || e.metaKey);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onWheel={handleWheel}
      onContextMenu={(e) => {
        if (activeWireStart) {
          e.preventDefault();
          setActiveWireStart(null);
        }
      }}
      className={`relative w-full h-full overflow-hidden cursor-default select-none transition-colors duration-200 ${
        theme === 'light' ? 'bg-slate-100' : 'bg-industrial-950'
      }`}
    >
      {/* Background Canvas for Grid, Glowing Wires & Junction Dots */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* HTML / SVG Component Layer Transformed by Pan & Zoom */}
      <div
        className="absolute origin-top-left pointer-events-auto"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
      >
        {Array.from(graph.components.values()).map((comp) => (
          <div
            key={comp.id}
            onMouseDown={(e) => handleComponentMouseDown(comp, e)}
            className="absolute"
            style={{
              left: comp.position.x,
              top: comp.position.y,
            }}
          >
            <ComponentRenderer
              component={comp}
              isSelected={selectedComponentIds.includes(comp.id)}
              mode={mode}
              animTime={animTime}
              theme={theme}
              onTerminalMouseDown={handleTerminalMouseDown}
              onTerminalMouseUp={handleTerminalMouseUp}
              onTerminalMouseEnter={onHoverTerminal}
              onTerminalMouseLeave={() => onHoverTerminal?.(null)}
              onToggleState={onToggleComponentState}
              onPushbuttonDown={onPushbuttonDown}
              onPushbuttonUp={onPushbuttonUp}
            />
          </div>
        ))}
      </div>

      {/* Marquee Selection Rectangle Box */}
      {marqueeStart && marqueeEnd && (
        <div
          className="absolute border border-sky-400 bg-sky-500/15 pointer-events-none rounded"
          style={{
            left: Math.min(marqueeStart.x * zoom + pan.x, marqueeEnd.x * zoom + pan.x),
            top: Math.min(marqueeStart.y * zoom + pan.y, marqueeEnd.y * zoom + pan.y),
            width: Math.abs(marqueeEnd.x - marqueeStart.x) * zoom,
            height: Math.abs(marqueeEnd.y - marqueeStart.y) * zoom,
          }}
        />
      )}
    </div>
  );
};
