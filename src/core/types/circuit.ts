export type VoltagePotential = 
  | 'NONE'
  | 'L1'
  | 'L2'
  | 'L3'
  | 'N'
  | 'PE'
  | 'DC_POS'
  | 'DC_NEG';

export interface Point2D {
  x: number;
  y: number;
}

export interface Terminal {
  id: string;              // unique terminal identifier, e.g. "KM1-A1"
  componentId: string;     // parent component ID
  pinIndex: number;
  label: string;           // industrial pin designation, e.g. "13", "14", "A1", "A2", "95", "96"
  position: Point2D;       // absolute canvas position or relative to component
  offset: Point2D;         // relative offset from component origin (x, y)
  netId: string | null;    // resolved equipotential net
  potential: VoltagePotential;
}

export interface JunctionNode {
  id: string;              // unique junction id, e.g. "J-1"
  position: Point2D;
  netId: string | null;
  potential: VoltagePotential;
  connectedWireIds: string[];
}

export interface WireEndpoint {
  type: 'terminal' | 'junction';
  id: string;
}

export interface Wire {
  id: string;
  from: WireEndpoint;
  to: WireEndpoint;
  waypoints: Point2D[];    // intermediate bends/corners
  routingMode: 'free' | 'ortho';
  netId: string | null;
  potential: VoltagePotential;
  hasCurrent: boolean;     // true if conducting active load current
}

export type ComponentCategory =
  | 'power'
  | 'protection'
  | 'contactor'
  | 'relay'
  | 'timer'
  | 'switch'
  | 'sensor'
  | 'load'
  | 'signaling';

export type ComponentType =
  // Power Sources
  | 'source_3p_pe_n'     // L1, L2, L3, N, PE
  | 'source_1p_n'        // L, N, PE
  | 'source_dc_24v'      // +24V, 0V
  // Protection
  | 'mcb_3p'             // 3-Pole Miniature Circuit Breaker
  | 'mcb_1p'             // 1-Pole MCB
  | 'fuse_3p'            // 3-Phase Fuse Block
  | 'fuse_1p'            // Single Fuse
  | 'overload_relay'     // Thermal Overload Relay (95-96 NC, 97-98 NO, Reset/Test)
  | 'phase_failure_relay'// Phase sequence and failure monitor
  // Contactors & Relays
  | 'contactor_coil'     // Contactor coil A1-A2
  | 'contactor_main_3p'  // 3-Pole Power Contacts 1-2, 3-4, 5-6
  | 'aux_contact_no'     // Auxiliary contact NO 13-14 (or 23-24, etc.)
  | 'aux_contact_nc'     // Auxiliary contact NC 21-22 (or 31-32, etc.)
  | 'control_relay_coil' // Control relay coil A1-A2
  // Timers
  | 'timer_on_delay'     // On-Delay Timer Coil + 55-56 NC + 57-58 NO
  | 'timer_off_delay'    // Off-Delay Timer
  | 'timer_flasher'      // Asymmetric / Flasher Cycler
  | 'timer_star_delta'   // Dedicated Star-Delta transition timer
  | 'timer_contact_no'   // Timed NO contact (On-delay / Off-delay)
  | 'timer_contact_nc'   // Timed NC contact
  // Switches & Inputs
  | 'pushbutton_no'      // Start Push Button (Green)
  | 'pushbutton_nc'      // Stop Push Button (Red)
  | 'emergency_stop'     // Mushroom latching E-Stop
  | 'selector_2pos'      // 2-Position Selector (0-1)
  | 'selector_3pos_hoa'  // Hand-Off-Auto (1-0-2)
  | 'limit_switch_no'    // Mechanical Limit Switch NO
  | 'limit_switch_nc'    // Limit Switch NC
  | 'float_switch'       // Liquid level float switch
  // Loads & Signaling
  | 'motor_3p_3wire'     // 3-Phase Induction Motor (U, V, W, PE)
  | 'motor_3p_6wire'     // 3-Phase Motor for Star-Delta (U1-V1-W1, U2-V2-W2)
  | 'motor_1p'           // Single Phase Motor
  | 'indicator_lamp'     // Pilot Light (Red, Green, Yellow, Blue, White)
  | 'buzzer_alarm';      // Audible alarm horn / siren

export interface DeviceState {
  energized?: boolean;
  closed?: boolean;
  tripped?: boolean;
  pressed?: boolean;
  latched?: boolean;
  selectorPosition?: number; // 0, 1, 2
  timerElapsed?: number;     // seconds elapsed
  timerPreset?: number;      // target duration (e.g. 5s)
  timerRunning?: boolean;
  motorRpm?: number;
  motorDirection?: 1 | -1 | 0; // 1 = CW, -1 = CCW, 0 = stopped
  lampColor?: 'red' | 'green' | 'yellow' | 'blue' | 'white';
}

export interface DeviceComponent {
  id: string;
  type: ComponentType;
  category: ComponentCategory;
  tag: string;               // e.g. "KM1", "S1", "OL1", "M1"
  masterTag?: string;        // if auxiliary contact, the master coil/overload tag it binds to
  label?: string;            // user descriptive label
  position: Point2D;
  rotation: 0 | 90 | 180 | 270;
  terminals: Terminal[];
  state: DeviceState;
  customData?: Record<string, unknown>;
}

export interface CircuitProject {
  version: string;
  metadata: {
    title: string;
    description?: string;
    author: string;
    date: string;
    language: 'ar' | 'en';
    standard: 'IEC' | 'NEMA';
  };
  viewport: {
    panX: number;
    panY: number;
    zoom: number;
  };
  components: DeviceComponent[];
  wires: Wire[];
  junctions: JunctionNode[];
}

export type SimulationMode = 'design' | 'run';
