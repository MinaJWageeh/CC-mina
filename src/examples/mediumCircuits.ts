import { CircuitProject } from '../core/types/circuit';

export const mediumCircuits: { id: string; titleEn: string; titleAr: string; descEn: string; descAr: string; project: CircuitProject }[] = [
  {
    id: 'fwd_rev_starter',
    titleEn: 'Forward / Reverse 3-Phase Starter with Dual Interlocks',
    titleAr: 'دائرة عكس حركة محرك 3 فاز مع إنترلوك كهربي وميكانيكي',
    descEn: 'Controls direction of rotation with KM1 (Forward) and KM2 (Reverse). Features electrical interlocks (NC auxiliary contacts) and phase swap (L1-L2-L3 vs L2-L1-L3).',
    descAr: 'دائرة عكس اتجاه دوران محرك ثلاثي الأطوار باستخدام كونتاكتورين KM1 و KM2 مع تبديل فازتين، وتأمين تام بإنترلوك كهربي متقاطع (نقاط NC 21-22) لمنع حدوث قفلة شورت سيركت.',
    project: {
      version: '1.0.0',
      metadata: {
        title: 'Forward Reverse Motor Starter',
        author: 'Mina J. Wageeh',
        date: '2026-11-08',
        language: 'ar',
        standard: 'IEC'
      },
      viewport: { panX: 120, panY: 50, zoom: 0.9 },
      components: [
        {
          id: 'pwr_3p',
          type: 'source_3p_pe_n',
          category: 'power',
          tag: 'L1-L2-L3-N-PE',
          position: { x: 100, y: 30 },
          rotation: 0,
          terminals: [
            { id: 'pwr_L1', componentId: 'pwr_3p', pinIndex: 0, label: 'L1', position: { x: 120, y: 65 }, offset: { x: 20, y: 35 }, netId: null, potential: 'L1' },
            { id: 'pwr_L2', componentId: 'pwr_3p', pinIndex: 1, label: 'L2', position: { x: 145, y: 65 }, offset: { x: 45, y: 35 }, netId: null, potential: 'L2' },
            { id: 'pwr_L3', componentId: 'pwr_3p', pinIndex: 2, label: 'L3', position: { x: 170, y: 65 }, offset: { x: 70, y: 35 }, netId: null, potential: 'L3' },
            { id: 'pwr_N', componentId: 'pwr_3p', pinIndex: 3, label: 'N', position: { x: 195, y: 65 }, offset: { x: 95, y: 35 }, netId: null, potential: 'N' },
            { id: 'pwr_PE', componentId: 'pwr_3p', pinIndex: 4, label: 'PE', position: { x: 220, y: 65 }, offset: { x: 120, y: 35 }, netId: null, potential: 'PE' }
          ],
          state: {}
        },
        {
          id: 'qf1',
          type: 'mcb_3p',
          category: 'protection',
          tag: 'QF1',
          position: { x: 100, y: 120 },
          rotation: 0,
          terminals: [
            { id: 'qf1_1', componentId: 'qf1', pinIndex: 0, label: '1', position: { x: 120, y: 125 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'qf1_3', componentId: 'qf1', pinIndex: 1, label: '3', position: { x: 145, y: 125 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'qf1_5', componentId: 'qf1', pinIndex: 2, label: '5', position: { x: 170, y: 125 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'qf1_2', componentId: 'qf1', pinIndex: 3, label: '2', position: { x: 120, y: 205 }, offset: { x: 20, y: 85 }, netId: null, potential: 'NONE' },
            { id: 'qf1_4', componentId: 'qf1', pinIndex: 4, label: '4', position: { x: 145, y: 205 }, offset: { x: 45, y: 85 }, netId: null, potential: 'NONE' },
            { id: 'qf1_6', componentId: 'qf1', pinIndex: 5, label: '6', position: { x: 170, y: 205 }, offset: { x: 70, y: 85 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: true }
        },
        // KM1 (Forward Main Contacts)
        {
          id: 'km1_p',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM1 (FWD)',
          masterTag: 'KM1',
          position: { x: 60, y: 240 },
          rotation: 0,
          terminals: [
            { id: 'km1_1', componentId: 'km1_p', pinIndex: 0, label: '1', position: { x: 80, y: 245 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_3', componentId: 'km1_p', pinIndex: 1, label: '3', position: { x: 105, y: 245 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_5', componentId: 'km1_p', pinIndex: 2, label: '5', position: { x: 130, y: 245 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_2', componentId: 'km1_p', pinIndex: 3, label: '2', position: { x: 80, y: 315 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_4', componentId: 'km1_p', pinIndex: 4, label: '4', position: { x: 105, y: 315 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_6', componentId: 'km1_p', pinIndex: 5, label: '6', position: { x: 130, y: 315 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        // KM2 (Reverse Main Contacts)
        {
          id: 'km2_p',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM2 (REV)',
          masterTag: 'KM2',
          position: { x: 170, y: 240 },
          rotation: 0,
          terminals: [
            { id: 'km2_1', componentId: 'km2_p', pinIndex: 0, label: '1', position: { x: 190, y: 245 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_3', componentId: 'km2_p', pinIndex: 1, label: '3', position: { x: 215, y: 245 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_5', componentId: 'km2_p', pinIndex: 2, label: '5', position: { x: 240, y: 245 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_2', componentId: 'km2_p', pinIndex: 3, label: '2', position: { x: 190, y: 315 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km2_4', componentId: 'km2_p', pinIndex: 4, label: '4', position: { x: 215, y: 315 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km2_6', componentId: 'km2_p', pinIndex: 5, label: '6', position: { x: 240, y: 315 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        // Motor 3P
        {
          id: 'm1',
          type: 'motor_3p_3wire',
          category: 'load',
          tag: 'M1',
          position: { x: 100, y: 400 },
          rotation: 0,
          terminals: [
            { id: 'm1_U', componentId: 'm1', pinIndex: 0, label: 'U', position: { x: 120, y: 405 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_V', componentId: 'm1', pinIndex: 1, label: 'V', position: { x: 145, y: 405 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_W', componentId: 'm1', pinIndex: 2, label: 'W', position: { x: 170, y: 405 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_PE', componentId: 'm1', pinIndex: 3, label: 'PE', position: { x: 145, y: 495 }, offset: { x: 45, y: 95 }, netId: null, potential: 'NONE' }
          ],
          state: { motorRpm: 0, motorDirection: 0 }
        },

        // Control Circuit: Stop SB1, Start FWD SB2, Start REV SB3, KM1 Coil, KM2 Coil, Interlocks
        {
          id: 'sb1_stop',
          type: 'pushbutton_nc',
          category: 'switch',
          tag: 'SB1 (Stop)',
          position: { x: 380, y: 120 },
          rotation: 0,
          terminals: [
            { id: 'sb1_1', componentId: 'sb1_stop', pinIndex: 0, label: '1', position: { x: 402, y: 125 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb1_2', componentId: 'sb1_stop', pinIndex: 1, label: '2', position: { x: 402, y: 185 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'sb2_fwd',
          type: 'pushbutton_no',
          category: 'switch',
          tag: 'SB2 (FWD)',
          position: { x: 340, y: 220 },
          rotation: 0,
          terminals: [
            { id: 'sb2_3', componentId: 'sb2_fwd', pinIndex: 0, label: '3', position: { x: 362, y: 225 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb2_4', componentId: 'sb2_fwd', pinIndex: 1, label: '4', position: { x: 362, y: 285 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'sb3_rev',
          type: 'pushbutton_no',
          category: 'switch',
          tag: 'SB3 (REV)',
          position: { x: 440, y: 220 },
          rotation: 0,
          terminals: [
            { id: 'sb3_3', componentId: 'sb3_rev', pinIndex: 0, label: '3', position: { x: 462, y: 225 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb3_4', componentId: 'sb3_rev', pinIndex: 1, label: '4', position: { x: 462, y: 285 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        // Interlock KM2 NC inside KM1 branch
        {
          id: 'km2_nc_int',
          type: 'aux_contact_nc',
          category: 'contactor',
          tag: 'KM2 (Interlock)',
          masterTag: 'KM2',
          position: { x: 340, y: 310 },
          rotation: 0,
          terminals: [
            { id: 'km2_nc_21', componentId: 'km2_nc_int', pinIndex: 0, label: '21', position: { x: 362, y: 315 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_nc_22', componentId: 'km2_nc_int', pinIndex: 1, label: '22', position: { x: 362, y: 375 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: true }
        },
        // Interlock KM1 NC inside KM2 branch
        {
          id: 'km1_nc_int',
          type: 'aux_contact_nc',
          category: 'contactor',
          tag: 'KM1 (Interlock)',
          masterTag: 'KM1',
          position: { x: 440, y: 310 },
          rotation: 0,
          terminals: [
            { id: 'km1_nc_21', componentId: 'km1_nc_int', pinIndex: 0, label: '21', position: { x: 462, y: 315 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_nc_22', componentId: 'km1_nc_int', pinIndex: 1, label: '22', position: { x: 462, y: 375 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: true }
        },
        // KM1 Coil
        {
          id: 'km1_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM1',
          position: { x: 340, y: 400 },
          rotation: 0,
          terminals: [
            { id: 'km1_A1', componentId: 'km1_coil', pinIndex: 0, label: 'A1', position: { x: 365, y: 405 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_A2', componentId: 'km1_coil', pinIndex: 1, label: 'A2', position: { x: 365, y: 465 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        },
        // KM2 Coil
        {
          id: 'km2_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM2',
          position: { x: 440, y: 400 },
          rotation: 0,
          terminals: [
            { id: 'km2_A1', componentId: 'km2_coil', pinIndex: 0, label: 'A1', position: { x: 465, y: 405 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_A2', componentId: 'km2_coil', pinIndex: 1, label: 'A2', position: { x: 465, y: 465 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        }
      ],
      wires: [
        // Power lines QF1 to KM1
        { id: 'w_p1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'qf1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p2', from: { type: 'terminal', id: 'pwr_L2' }, to: { type: 'terminal', id: 'qf1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p3', from: { type: 'terminal', id: 'pwr_L3' }, to: { type: 'terminal', id: 'qf1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p4', from: { type: 'terminal', id: 'qf1_2' }, to: { type: 'terminal', id: 'km1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p5', from: { type: 'terminal', id: 'qf1_4' }, to: { type: 'terminal', id: 'km1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p6', from: { type: 'terminal', id: 'qf1_6' }, to: { type: 'terminal', id: 'km1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Parallel power input to KM2
        { id: 'w_p7', from: { type: 'terminal', id: 'km1_1' }, to: { type: 'terminal', id: 'km2_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p8', from: { type: 'terminal', id: 'km1_3' }, to: { type: 'terminal', id: 'km2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p9', from: { type: 'terminal', id: 'km1_5' }, to: { type: 'terminal', id: 'km2_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // KM1 Output to Motor: U, V, W
        { id: 'w_p10', from: { type: 'terminal', id: 'km1_2' }, to: { type: 'terminal', id: 'm1_U' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p11', from: { type: 'terminal', id: 'km1_4' }, to: { type: 'terminal', id: 'm1_V' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p12', from: { type: 'terminal', id: 'km1_6' }, to: { type: 'terminal', id: 'm1_W' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // KM2 Output: Transpose phases (2 to V, 4 to U, 6 to W) -> Causes REVERSE direction!
        { id: 'w_rev1', from: { type: 'terminal', id: 'km2_2' }, to: { type: 'terminal', id: 'm1_V' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_rev2', from: { type: 'terminal', id: 'km2_4' }, to: { type: 'terminal', id: 'm1_U' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_rev3', from: { type: 'terminal', id: 'km2_6' }, to: { type: 'terminal', id: 'm1_W' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Control Circuit
        { id: 'w_c1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'sb1_1' }, waypoints: [{ x: 120, y: 90 }, { x: 402, y: 90 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c2', from: { type: 'terminal', id: 'sb1_2' }, to: { type: 'terminal', id: 'sb2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c3', from: { type: 'terminal', id: 'sb1_2' }, to: { type: 'terminal', id: 'sb3_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c4', from: { type: 'terminal', id: 'sb2_4' }, to: { type: 'terminal', id: 'km2_nc_21' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c5', from: { type: 'terminal', id: 'km2_nc_22' }, to: { type: 'terminal', id: 'km1_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c6', from: { type: 'terminal', id: 'sb3_4' }, to: { type: 'terminal', id: 'km1_nc_21' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c7', from: { type: 'terminal', id: 'km1_nc_22' }, to: { type: 'terminal', id: 'km2_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_n1', from: { type: 'terminal', id: 'km1_A2' }, to: { type: 'terminal', id: 'pwr_N' }, waypoints: [{ x: 365, y: 490 }, { x: 195, y: 490 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_n2', from: { type: 'terminal', id: 'km2_A2' }, to: { type: 'terminal', id: 'km1_A2' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false }
      ],
      junctions: []
    }
  }
];
