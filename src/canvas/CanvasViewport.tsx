import React, { useEffect, useRef, useState } from 'react';
import { NetGraph } from '../core/graph/NetGraph';
import { DeviceComponent, Point2D, SimulationMode, Wire, WireEndpoint } from '../core/types/circuit';
import { ComponentRenderer } from './renderers/ComponentRenderer';
import { WireRenderer } from './renderers/WireRenderer';

interface CanvasViewportProps {
  graph: NetGraph;
  mode: SimulationMode;
  animTime: number;
  selectedComponentIds: string[];
  selectedWireIds: string[];
  onSelectComponent: (id: string, multi: boolean) => void;
  onSelectWire: (id: string, multi: boolean) => void;
  onClearSelection: () => void;
  onGraphChanged: () => void;
  onHoverTerminal?: (terminalId: string | null) => void;
  onToggleComponentState?: (componentId: string) => void;
}

export const CanvasViewport: React.FC<CanvasViewportProps> = ({
  graph,
  mode,
  animTime,
  selectedComponentIds,
  selectedWireIds,
  onSelectComponent,
  onSelectWire,
  onClearSelection,
  onGraphChanged,
  onHoverTerminal,
  onToggleComponentState,
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

    ctx.strokeStyle = 'rgba(51, 65, 85, 0.25)';
    ctx.lineWidth = 0.8;
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
        WireRenderer.renderWire(ctx, wire, startPos, endPos, isSelected, animTime);
      }
    }

    // 3. Render all T-Junction dots
    for (const junc of graph.junctions.values()) {
      WireRenderer.renderJunctionDot(ctx, junc.position, junc.potential, false);
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
        WireRenderer.renderWire(ctx, tempWire, startPos, mouseCanvasPos, false, animTime);
      }
    }

    ctx.restore();
  }, [graph, pan, zoom, animTime, activeWireStart, mouseCanvasPos, isShiftPressed, selectedWireIds]);

  // --- MOUSE EVENT HANDLERS ---

  const handleMouseDown = (e: React.MouseEvent) => {
    // Middle click or Space+Click initiates canvas panning
    if (e.button === 1 || (e.button === 0 && isSpacePressed)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    if (e.button === 0) {
      const worldPos = screenToWorld(e.clientX, e.clientY);

      // Check if user clicked an existing wire to branch or select
      let wireClicked = false;
      for (const wire of graph.wires.values()) {
        const p1 = graph.getEndpointPosition(wire.from);
        const p2 = graph.getEndpointPosition(wire.to);
        if (p1 && p2) {
          const { dist, proj } = NetGraph.pointToSegmentDistance(worldPos, p1, p2);
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

    // Moving component
    if (draggingCompId) {
      const snapGrid = 10;
      const targetX = Math.round((worldPos.x - dragOffset.x) / snapGrid) * snapGrid;
      const targetY = Math.round((worldPos.y - dragOffset.y) / snapGrid) * snapGrid;
      graph.moveComponent(draggingCompId, { x: targetX, y: targetY });
      onGraphChanged();
      return;
    }

    // Updating marquee selection box
    if (marqueeStart) {
      setMarqueeEnd(worldPos);
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingCompId(null);

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
      onWheel={handleWheel}
      className="relative w-full h-full overflow-hidden bg-industrial-950 cursor-default select-none"
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
              onTerminalMouseDown={handleTerminalMouseDown}
              onTerminalMouseEnter={onHoverTerminal}
              onTerminalMouseLeave={() => onHoverTerminal?.(null)}
              onToggleState={onToggleComponentState}
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
