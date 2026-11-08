import React, { useEffect, useReducer, useRef, useState } from 'react';
import { NetGraph } from './core/graph/NetGraph';
import {
  CircuitProject,
  ComponentType,
  DeviceComponent,
  SimulationMode,
  Terminal
} from './core/types/circuit';
import { COMPONENT_CATALOG } from './core/types/components';
import { SimulationClock } from './simulation/clock/SimulationClock';
import { DeviceEvaluator } from './simulation/evaluators/DeviceEvaluator';
import { soundManager } from './audio/AudioEngine';
import { AppHeader } from './components/layout/AppHeader';
import { SidebarPalette } from './components/layout/SidebarPalette';
import { PropertiesInspector } from './components/layout/PropertiesInspector';
import { CanvasViewport } from './canvas/CanvasViewport';
import { ComponentTooltip } from './components/overlays/ComponentTooltip';
import { LaserOverlay } from './canvas/renderers/LaserOverlay';
import { MultimeterTool } from './canvas/tools/MultimeterTool';
import { ExamplesDialog } from './components/dialogs/ExamplesDialog';
import { ExportDialog } from './components/dialogs/ExportDialog';
import { easyCircuits } from './examples/easyCircuits';
import { translations } from './i18n/translations';

export const App: React.FC = () => {
  // Localization: 'ar' by default as requested by user
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const t = translations[lang];

  // Primary State
  const [mode, setMode] = useState<SimulationMode>('design');
  const [isSimRunning, setIsSimRunning] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Selection State
  const [selectedComponentIds, setSelectedComponentIds] = useState<string[]>([]);
  const [selectedWireIds, setSelectedWireIds] = useState<string[]>([]);

  // Presentation & Test Tools
  const [laserActive, setLaserActive] = useState<boolean>(false);
  const [clearLaserTrigger, setClearLaserTrigger] = useState<number>(0);
  const [multimeterActive, setMultimeterActive] = useState<boolean>(false);

  // Modals
  const [isExamplesOpen, setIsExamplesOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Hover Tooltip State
  const [hoveredTerminalId, setHoveredTerminalId] = useState<string | null>(null);

  // Short Circuit Alert
  const [shortCircuitActive, setShortCircuitActive] = useState<boolean>(false);

  // Graph and Simulation Clock
  const graphRef = useRef<NetGraph>(new NetGraph());
  const clockRef = useRef<SimulationClock>(new SimulationClock());
  const animTimeRef = useRef<number>(0);

  // Force re-render trigger
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // Load initial DOL Starter circuit on first mount
  useEffect(() => {
    if (easyCircuits.length > 0) {
      graphRef.current.loadProject(easyCircuits[0].project);
      forceUpdate();
    }
  }, []);

  // Simulation Clock Tick Subscription
  useEffect(() => {
    const clock = clockRef.current;
    const unsubscribe = clock.subscribe((dt) => {
      animTimeRef.current += dt;

      if (mode === 'run') {
        const stepResult = DeviceEvaluator.evaluateStep(graphRef.current, dt);

        // Sound Effects
        if (stepResult.contactsChanged) {
          soundManager.playContactorSnap();
        }

        // Check if any motor is spinning to drive motor hum
        let maxRpm = 0;
        for (const comp of graphRef.current.components.values()) {
          if (comp.type.startsWith('motor_') && (comp.state.motorRpm || 0) > maxRpm) {
            maxRpm = comp.state.motorRpm || 0;
          }
        }
        soundManager.updateMotorSound(maxRpm);

        // Check Short Circuit
        if (stepResult.solverResult.hasShortCircuit && !shortCircuitActive) {
          setShortCircuitActive(true);
          soundManager.playAlarmBeep();
        }

        forceUpdate();
      }
    });

    clock.play();
    return () => {
      unsubscribe();
      clock.pause();
    };
  }, [mode, shortCircuitActive]);

  // Handle Mode Switch (Design <-> Run)
  const handleToggleMode = () => {
    if (mode === 'design') {
      setMode('run');
      clockRef.current.play();
      setIsSimRunning(true);
      // Run initial step
      DeviceEvaluator.evaluateStep(graphRef.current, 0.05);
      forceUpdate();
    } else {
      setMode('design');
      clockRef.current.pause();
      setIsSimRunning(false);
      soundManager.stopMotorSound();
      setShortCircuitActive(false);
      forceUpdate();
    }
  };

  // Keyboard Shortcuts (Delete, Rotate, Undo, Redo, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture shortcuts if typing in input field
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (mode === 'design') {
          // Delete selected components
          for (const id of selectedComponentIds) {
            graphRef.current.removeComponent(id);
          }
          // Delete selected wires
          for (const id of selectedWireIds) {
            graphRef.current.removeWire(id);
          }
          setSelectedComponentIds([]);
          setSelectedWireIds([]);
          forceUpdate();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        if (mode === 'design' && selectedComponentIds.length > 0) {
          for (const id of selectedComponentIds) {
            graphRef.current.rotateComponent(id);
          }
          forceUpdate();
        }
      } else if (e.key === 'Escape') {
        setSelectedComponentIds([]);
        setSelectedWireIds([]);
        setLaserActive(false);
        setMultimeterActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, selectedComponentIds, selectedWireIds]);

  // Add component from palette
  const handleAddComponent = (type: ComponentType) => {
    const def = COMPONENT_CATALOG[type];
    if (!def) return;

    // Count existing instances of this prefix to generate tag (e.g. KM1, KM2)
    const existing = Array.from(graphRef.current.components.values()).filter(
      (c) => c.type === type || c.tag.startsWith(def.defaultTagPrefix)
    );
    const newTag = `${def.defaultTagPrefix}${existing.length + 1}`;

    const id = `${type}_${Math.random().toString(36).substr(2, 9)}`;
    const newComp: DeviceComponent = {
      id,
      type,
      category: def.category,
      tag: newTag,
      position: { x: 300, y: 200 },
      rotation: 0,
      terminals: def.pins.map((pin, i) => ({
        id: `${id}_${pin.label}`,
        componentId: id,
        pinIndex: i,
        label: pin.label,
        offset: pin.offset,
        position: { x: 300 + pin.offset.x, y: 200 + pin.offset.y },
        netId: null,
        potential: 'NONE',
      })),
      state: {
        closed: def.type === 'aux_contact_nc' || def.type === 'pushbutton_nc' || def.type === 'mcb_3p' || def.type === 'mcb_1p',
        timerPreset: 5.0,
        timerElapsed: 0,
        motorRpm: 0,
      },
    };

    graphRef.current.addComponent(newComp);
    setSelectedComponentIds([id]);
    forceUpdate();
  };

  // Toggle component state in Run mode (pushbuttons, switches, overloads, breakers)
  const handleToggleComponentState = (componentId: string) => {
    const comp = graphRef.current.components.get(componentId);
    if (!comp) return;

    const def = COMPONENT_CATALOG[comp.type];
    if (!def) return;

    if (comp.type === 'pushbutton_no' || comp.type === 'pushbutton_nc') {
      comp.state.pressed = !comp.state.pressed;
      soundManager.playContactorSnap();
    } else if (comp.type === 'emergency_stop') {
      comp.state.latched = !comp.state.latched;
      soundManager.playContactorSnap();
    } else if (comp.type === 'mcb_3p' || comp.type === 'mcb_1p') {
      comp.state.closed = !comp.state.closed;
      comp.state.tripped = false;
      soundManager.playContactorSnap();
    } else if (comp.type === 'overload_relay') {
      comp.state.tripped = !comp.state.tripped;
      soundManager.playAlarmBeep();
    } else if (comp.type === 'selector_2pos') {
      comp.state.selectorPosition = comp.state.selectorPosition === 1 ? 0 : 1;
      soundManager.playContactorSnap();
    } else if (comp.type === 'selector_3pos_hoa') {
      comp.state.selectorPosition = ((comp.state.selectorPosition || 0) + 1) % 3;
      soundManager.playContactorSnap();
    }

    DeviceEvaluator.evaluateStep(graphRef.current, 0.05);
    forceUpdate();
  };

  // Selected component for Properties Inspector
  const selectedComponent =
    selectedComponentIds.length === 1
      ? graphRef.current.components.get(selectedComponentIds[0]) || null
      : null;

  // Hovered terminal details for Tooltip
  let hoveredTerminal: Terminal | null = null;
  let hoveredComponent: DeviceComponent | null = selectedComponent;
  if (hoveredTerminalId) {
    for (const comp of graphRef.current.components.values()) {
      const term = comp.terminals.find((t) => t.id === hoveredTerminalId);
      if (term) {
        hoveredTerminal = term;
        hoveredComponent = comp;
        break;
      }
    }
  }

  return (
    <div
      className={`w-screen h-screen flex flex-col bg-industrial-950 text-slate-100 overflow-hidden ${
        lang === 'ar' ? 'font-cairo' : 'font-sans'
      }`}
    >
      {/* Top Header Toolbar */}
      <AppHeader
        mode={mode}
        lang={lang}
        isSimRunning={isSimRunning}
        simSpeed={simSpeed}
        isMuted={isMuted}
        laserActive={laserActive}
        multimeterActive={multimeterActive}
        canUndo={false}
        canRedo={false}
        onToggleMode={handleToggleMode}
        onTogglePlayPause={() => {
          const running = clockRef.current.toggle();
          setIsSimRunning(running);
        }}
        onStepSim={() => clockRef.current.step(0.05)}
        onResetSim={() => {
          for (const comp of graphRef.current.components.values()) {
            if (comp.state.timerElapsed) comp.state.timerElapsed = 0;
            if (comp.state.motorRpm) comp.state.motorRpm = 0;
            comp.state.energized = false;
          }
          forceUpdate();
        }}
        onSetSpeed={(spd) => {
          clockRef.current.setSpeed(spd);
          setSimSpeed(spd);
        }}
        onToggleLanguage={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        onToggleAudio={() => {
          const next = !isMuted;
          setIsMuted(next);
          soundManager.setMuted(next);
        }}
        onToggleLaser={() => setLaserActive(!laserActive)}
        onClearLaser={() => setClearLaserTrigger((x) => x + 1)}
        onToggleMultimeter={() => setMultimeterActive(!multimeterActive)}
        onUndo={() => {}}
        onRedo={() => {}}
        onOpenExamples={() => setIsExamplesOpen(true)}
        onExport={() => setIsExportOpen(true)}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Component Palette */}
        <SidebarPalette lang={lang} onAddComponent={handleAddComponent} />

        {/* Center Interactive 2D Canvas Viewport */}
        <div className="flex-1 h-full relative">
          <CanvasViewport
            graph={graphRef.current}
            mode={mode}
            animTime={animTimeRef.current}
            selectedComponentIds={selectedComponentIds}
            selectedWireIds={selectedWireIds}
            onSelectComponent={(id, multi) => {
              if (multi) {
                setSelectedComponentIds((prev) =>
                  prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                );
              } else {
                setSelectedComponentIds([id]);
                setSelectedWireIds([]);
              }
            }}
            onSelectWire={(id, multi) => {
              if (multi) {
                setSelectedWireIds((prev) =>
                  prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                );
              } else {
                setSelectedWireIds([id]);
                setSelectedComponentIds([]);
              }
            }}
            onClearSelection={() => {
              setSelectedComponentIds([]);
              setSelectedWireIds([]);
            }}
            onGraphChanged={() => {
              DeviceEvaluator.evaluateStep(graphRef.current, 0.05);
              forceUpdate();
            }}
            onHoverTerminal={setHoveredTerminalId}
            onToggleComponentState={handleToggleComponentState}
          />

          {/* Ephemeral Presentation Laser Highlighter Overlay */}
          <LaserOverlay active={laserActive} clearTrigger={clearLaserTrigger} />

          {/* Virtual Multimeter Floating Tool */}
          <MultimeterTool
            graph={graphRef.current}
            active={multimeterActive}
            onClose={() => setMultimeterActive(false)}
            lang={lang}
          />

          {/* Contextual Educational Tooltip on Hover */}
          <ComponentTooltip
            component={hoveredComponent}
            hoveredTerminal={hoveredTerminal}
            lang={lang}
          />

          {/* Short-Circuit Alert Popup Banner */}
          {shortCircuitActive && (
            <div
              className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-rose-950/95 border-2 border-rose-500 rounded-2xl shadow-2xl p-4 max-w-md flex flex-col items-center gap-2 backdrop-blur-md animate-bounce select-none ${
                lang === 'ar' ? 'font-cairo' : 'font-sans'
              }`}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <span className="text-xl">⚠️</span>
                <span>{t.faultAlert.shortCircuit}</span>
              </div>
              <p className="text-xs text-rose-200 text-center leading-relaxed">
                {t.faultAlert.shortCircuitMsg}
              </p>
              <button
                onClick={() => setShortCircuitActive(false)}
                className="mt-1 px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow"
              >
                {t.faultAlert.dismiss}
              </button>
            </div>
          )}
        </div>

        {/* Right Properties Inspector */}
        {selectedComponent && mode === 'design' && (
          <PropertiesInspector
            component={selectedComponent}
            graph={graphRef.current}
            lang={lang}
            onUpdateComponent={(updated) => {
              graphRef.current.updateComponent(updated);
              forceUpdate();
            }}
            onRotate={() => {
              graphRef.current.rotateComponent(selectedComponent.id);
              forceUpdate();
            }}
            onDelete={() => {
              graphRef.current.removeComponent(selectedComponent.id);
              setSelectedComponentIds([]);
              forceUpdate();
            }}
            onClose={() => setSelectedComponentIds([])}
          />
        )}
      </div>

      {/* Dialogs */}
      <ExamplesDialog
        isOpen={isExamplesOpen}
        onClose={() => setIsExamplesOpen(false)}
        onLoadProject={(proj) => {
          graphRef.current.loadProject(proj);
          setSelectedComponentIds([]);
          setSelectedWireIds([]);
          DeviceEvaluator.evaluateStep(graphRef.current, 0.05);
          forceUpdate();
        }}
        lang={lang}
      />

      <ExportDialog
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        project={graphRef.current.toProject()}
        lang={lang}
      />
    </div>
  );
};

export default App;
