# Classic Control Simulator (Next-Gen EKTS Alternative)

* **Author:** Mina J. Wageeh
* **Date:** 2026-11-08

## Overview

A bilingual (Arabic/English) desktop application designed for learning, simulating, and designing electrical classic control circuits. It replaces legacy software like EKTS with an interactive 2D canvas, hybrid wire routing (freehand with Shift-to-90° orthogonal snap), instant wire branching (T-junction bisection), potential-aware glowing conductors, animated mechanical behaviors (contactor snapping, motor rotation with inertia, timer countdowns), tag-bound component dropdowns, contextual hover tooltips, and pre-packaged educational circuits.

## Multi-Lens Synthesis & Analysis

### 1. Canvas Ergonomics & Directional Rules
* **RTL / LTR Split Architecture:**
  * **UI Chrome & Popovers:** Dynamically switch between Arabic (RTL) and English (LTR) for toolbars, sidebars, properties inspectors, and tooltips.
  * **Schematic Invariant Rule:** The schematic canvas strictly adheres to international electrical standards (IEC 60617 / NFPA 79). Power rungs flow Top-to-Bottom ($L_1, L_2, L_3 \to \text{Protective Device} \to \text{Contactor} \to \text{Overload} \to \text{Motor}$), and control circuits flow Left-to-Right ($L \to \text{Stop} \to \text{Start} \to \text{Coil} \to N$). Inverting schematic coordinates to RTL is explicitly rejected as it distorts industrial convention.
* **Hybrid Wire Routing Model:**
  * Default freehand routing with bend point insertion.
  * Holding `Shift` snaps active segment to orthogonal axes ($\Delta x = 0$ or $\Delta y = 0$).
  * Automatic wire crossing bridge arcs to distinguish non-connected crossing lines from connected junctions.
* **Instant Wire Branching (T-Junctions):**
  * Proximity detection ($\epsilon_{\text{snap}} = 10\text{px}$) detects drop onto an existing wire segment, bisects it into contiguous sub-edges, and inserts a standard IEC connection dot ($\bullet$).

### 2. Topological Simulation Engine (Discrete Graph vs. Analog SPICE)
* **Discrete Equipotential Graph Propagation (Union-Find):**
  * Avoids heavy analog SPICE matrix calculations. Control circuits operate logically (conductive vs. non-conductive).
  * Equipotential nets propagate source potentials ($L_1, L_2, L_3, L, N, +24\text{V}, 0\text{V}$) across closed paths in $< 2\text{ms}$.
  * Coils evaluate potential difference across terminals ($A_1-A_2$); state transitions trigger re-propagation loops with cycle and race-condition detection.
* **Direct Fault & Short-Circuit Protection:**
  * Zero-impedance connections between Phase and Neutral or Phase-to-Phase trip upstream circuit breakers or blow fuses immediately with visual alerts, preventing infinite loop states.
* **Simulation Clock:**
  * Centralized discrete clock with play, pause, single-step tick, and speed scaling ($0.25\times, 0.5\times, 1.0\times, 2.0\times$).

### 3. Visual, Dynamic & Acoustic Feedback
* **Potential-Aware Luminescent Conductors:**
  * Energized conductors glow according to voltage phase (Phase $L_1$: Brown/Red, $L_2$: Black/Yellow, $L_3$: Grey/Blue; Neutral: Blue/Cyan; PE: Green/Yellow).
  * Active current flow particle animation reveals live electrical paths.
  * De-energized conductors stay dark gray.
* **Component-Level Actuation:**
  * **Contactors & Relays:** Coil illumination with animated armature closure (NO closes, NC opens) accompanied by realistic physical "clack/snap" mechanical sound.
  * **Motors:** Smooth angular momentum rotor rotation with direction arrow (CW vs. CCW based on phase sequence), RPM readout, and realistic motor acceleration hum.
  * **Timers:** On-body countdown numerical display and progress ring.
  * **Indicator Lamps & Sirens:** Radial light emission and acoustic alert buzzer with global mute/volume control.

### 4. Presentation, Teaching & Documentation Tools
* **Presentation / Lecturer Mode:**
  * **Laser & Highlighter Pen:** Temporary glowing markup tool allowing instructors to sketch live electrical current loops on top of the circuit during lectures (auto-fades or clears with a single click).
  * **Spotlight / Magnified Cursor:** Highlights active mouse interaction zones on projectors and shared video screens.
* **Professional Export Engine:**
  * 1-click vector PDF and high-res transparent/solid PNG export.
  * Standard Industrial Title Block (Cartouche) embedding project title, student/engineer name, revision, date, and project description in Arabic and English.

### 5. Categorized Educational Curriculum (Easy / Medium / Advanced)
* **Easy Tier (المستوى السهل - أساسيات التحكم):**
  1. *Direct-On-Line (DOL) Starter:* Start/Stop push buttons, holding auxiliary contact (latch 13-14), overload protection, and running/fault indicator lamps.
  2. *Multi-Station Control:* Starting and stopping a motor from two separate physical locations (OR logic for Start, AND logic for Stop).
  3. *Inching / Jogging:* Switching between continuous run mode and instantaneous jogging pulse.
  4. *Simple Timer Delay:* Automatically delaying motor activation using an On-Delay relay.
* **Medium Tier (المستوى المتوسط - دوائر تشغيل وتتابع):**
  1. *Forward / Reverse Starter:* Direction reversal with dual electrical interlocks (NC auxiliary contacts) and push-button mechanical interlocks.
  2. *Automatic Star-Delta Starter:* Reduced-voltage starting using Main, Star, and Delta contactors governed by a dedicated transition timer.
  3. *Sequential Motor Starting:* Two motors where Motor 2 is prevented from starting until Motor 1 is operational.
  4. *Automatic Tank Level Control:* High/Low float switches with Hand-Off-Auto (HOA) selector switch.
  5. *Periodic Flashing Alarm:* Cycler timer driving alternating warning lights and sirens.
* **Advanced Tier (المستوى المتقدم - منظومات صناعية مركبة):**
  1. *Dahlander Two-Speed Motor Control:* Low-speed vs. high-speed Dahlander winding configuration with interlocking protection.
  2. *Reversible Star-Delta Starter:* Full 5-contactor system combining direction reversal with Star-Delta transition.
  3. *Lead-Lag Alternating Dual Pumps:* Automatic cyclical duty-standby alternation between two pumps with overflow backup.
  4. *Conveyor Sorting Line:* Automated conveyor with forward/reverse limit switches, time delays, and jam trip protection.
  5. *Multi-Phase Traffic Controller:* Automated timed signal sequencing using cascading timers.

### 6. Tag Association & Anti-Friction Insertion
* **Tag Registry:**
  * Component insertion uses category dropdowns (e.g., Contactor $\to$ Coil, 3-Pole Main NO, Aux NO 13-14, Aux NC 21-22).
  * Auxiliaries bind to existing coils via a dropdown selector to eliminate manual typo mismatches (e.g., `KM1` vs `Km1`).
  * Hovering over any tag highlights all associated coils and contacts across the canvas.

### 7. Contextual Learning & Diagnostic Multimeter
* **Contextual Popovers (Hover Cards):**
  * Displays component type, symbol, standard terminal designations ($13-14$ NO, $21-22$ NC, $95-96$ Overload NC, $97-98$ Overload NO), functional description, and live operating state in Arabic or English.
* **Virtual Test Instruments:**
  * Integrated two-lead multimeter (Red & Black probes) to measure live AC/DC potential differences, continuity, and voltage drops across any two points.
* **Interactive Troubleshooting Challenges (Fault Injection):**
  * Exercises with hidden faults (blown coil, welded contact, broken wire, tripped bimetal) for hands-on technician diagnostic training.

## Goals vs. Non-Goals

### In-Scope Goals
* Standalone desktop application with high-performance 2D hardware-accelerated canvas.
* Hybrid wire drawing with Shift-snap and instant T-branching.
* Discrete equipotential solver with sub-2ms propagation and short-circuit protection.
* Dynamic visual feedback (glowing wires, armature snaps, rotating motors, countdown dials).
* Strict tag dropdown binding and tag highlight network.
* Bilingual (AR/EN) UI chrome, tooltips, and educational material.
* Built-in interactive standard starter circuits (DOL, Reversing with interlocks, Star-Delta, Sequential).
* Virtual multimeter probe tool for live circuit testing.

### Out-of-Scope Non-Goals
* Continuous microsecond analog SPICE simulation (transient harmonics, inductive arcing).
* 3D physical enclosure/cabinet DIN-rail mounting layout.
* PLC programming and ladder logic editors (reserved for a distinct future module).

## Alternatives Weighed
* **Full Canvas Coordinates RTL Mirroring:** Rejected. Inverting the schematic coordinates horizontally violates IEC 60617 / NEMA conventions and disorients students. UI panels mirror to RTL, but the schematic canvas maintains international Top-to-Bottom / Left-to-Right orientation.
* **Free-Text Tag Input for Contacts:** Rejected. Manual typing leads to subtle spelling mismatches that silently break circuits. Dropdown binding from a centralized tag registry ensures integrity.
* **SPICE Analog Engine:** Rejected. Continuous differential equations introduce performance overhead, numerical instability, and convergence failures without pedagogical benefit for relay logic. A discrete graph propagation solver provides instant, deterministic execution.

## Key Decisions & Staging for Next Steps
* Core tech stack: Electron / Tauri desktop shell with React, TypeScript, Tailwind CSS, and a 2-tier Canvas2D/SVG rendering pipeline.
* State & solver architecture: Decoupled immutable schematic graph with discrete Union-Find potential solver running off a controllable simulation clock.
* Proceeding to formal design document (`egm-draft`) to define the exact component data model, routing math, and engine interfaces.
