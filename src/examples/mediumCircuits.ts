import { CircuitProject } from '../core/types/circuit';

export const mediumCircuits: { id: string; titleEn: string; titleAr: string; descEn: string; descAr: string; project: CircuitProject }[] = [
  // 1. Forward / Reverse Starter
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
        {
          id: 'm1',
          type: 'motor_3p_3wire',
          category: 'load',
          tag: 'M1',
          position: { x: 110, y: 380 },
          rotation: 0,
          terminals: [
            { id: 'm1_U', componentId: 'm1', pinIndex: 0, label: 'U', position: { x: 130, y: 385 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_V', componentId: 'm1', pinIndex: 1, label: 'V', position: { x: 155, y: 385 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_W', componentId: 'm1', pinIndex: 2, label: 'W', position: { x: 180, y: 385 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_PE', componentId: 'm1', pinIndex: 3, label: 'PE', position: { x: 155, y: 475 }, offset: { x: 45, y: 95 }, netId: null, potential: 'NONE' }
          ],
          state: { motorRpm: 0, motorDirection: 0 }
        },

        // Control Circuit
        {
          id: 'sb1_stop',
          type: 'pushbutton_nc',
          category: 'switch',
          tag: 'SB1 (Stop)',
          position: { x: 370, y: 60 },
          rotation: 0,
          terminals: [
            { id: 'sb1_1', componentId: 'sb1_stop', pinIndex: 0, label: '1', position: { x: 392, y: 65 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb1_2', componentId: 'sb1_stop', pinIndex: 1, label: '2', position: { x: 392, y: 125 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        // Forward Rung: Start Button SB2 & Latch KM1
        {
          id: 'sb2_fwd',
          type: 'pushbutton_no',
          category: 'switch',
          tag: 'SB2 (FWD)',
          position: { x: 330, y: 160 },
          rotation: 0,
          terminals: [
            { id: 'sb2_3', componentId: 'sb2_fwd', pinIndex: 0, label: '3', position: { x: 352, y: 165 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb2_4', componentId: 'sb2_fwd', pinIndex: 1, label: '4', position: { x: 352, y: 225 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'km1_latch',
          type: 'aux_contact_no',
          category: 'contactor',
          tag: 'KM1',
          masterTag: 'KM1',
          position: { x: 390, y: 160 },
          rotation: 0,
          terminals: [
            { id: 'km1_l13', componentId: 'km1_latch', pinIndex: 0, label: '13', position: { x: 412, y: 165 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_l14', componentId: 'km1_latch', pinIndex: 1, label: '14', position: { x: 412, y: 225 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        // Reverse Rung: Start Button SB3 & Latch KM2
        {
          id: 'sb3_rev',
          type: 'pushbutton_no',
          category: 'switch',
          tag: 'SB3 (REV)',
          position: { x: 480, y: 160 },
          rotation: 0,
          terminals: [
            { id: 'sb3_3', componentId: 'sb3_rev', pinIndex: 0, label: '3', position: { x: 502, y: 165 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb3_4', componentId: 'sb3_rev', pinIndex: 1, label: '4', position: { x: 502, y: 225 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'km2_latch',
          type: 'aux_contact_no',
          category: 'contactor',
          tag: 'KM2',
          masterTag: 'KM2',
          position: { x: 540, y: 160 },
          rotation: 0,
          terminals: [
            { id: 'km2_l13', componentId: 'km2_latch', pinIndex: 0, label: '13', position: { x: 562, y: 165 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_l14', componentId: 'km2_latch', pinIndex: 1, label: '14', position: { x: 562, y: 225 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        // Cross Interlocks (NC contacts)
        {
          id: 'km2_nc_int',
          type: 'aux_contact_nc',
          category: 'contactor',
          tag: 'KM2 (Interlock)',
          masterTag: 'KM2',
          position: { x: 360, y: 260 },
          rotation: 0,
          terminals: [
            { id: 'km2_21', componentId: 'km2_nc_int', pinIndex: 0, label: '21', position: { x: 382, y: 265 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_22', componentId: 'km2_nc_int', pinIndex: 1, label: '22', position: { x: 382, y: 325 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: true }
        },
        {
          id: 'km1_nc_int',
          type: 'aux_contact_nc',
          category: 'contactor',
          tag: 'KM1 (Interlock)',
          masterTag: 'KM1',
          position: { x: 510, y: 260 },
          rotation: 0,
          terminals: [
            { id: 'km1_21', componentId: 'km1_nc_int', pinIndex: 0, label: '21', position: { x: 532, y: 265 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_22', componentId: 'km1_nc_int', pinIndex: 1, label: '22', position: { x: 532, y: 325 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: true }
        },
        // Coils
        {
          id: 'km1_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM1',
          position: { x: 360, y: 370 },
          rotation: 0,
          terminals: [
            { id: 'km1_A1', componentId: 'km1_coil', pinIndex: 0, label: 'A1', position: { x: 385, y: 375 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_A2', componentId: 'km1_coil', pinIndex: 1, label: 'A2', position: { x: 385, y: 435 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        },
        {
          id: 'km2_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM2',
          position: { x: 510, y: 370 },
          rotation: 0,
          terminals: [
            { id: 'km2_A1', componentId: 'km2_coil', pinIndex: 0, label: 'A1', position: { x: 535, y: 375 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_A2', componentId: 'km2_coil', pinIndex: 1, label: 'A2', position: { x: 535, y: 435 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        }
      ],
      wires: [
        // Power connections
        { id: 'w_p1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'qf1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p2', from: { type: 'terminal', id: 'pwr_L2' }, to: { type: 'terminal', id: 'qf1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p3', from: { type: 'terminal', id: 'pwr_L3' }, to: { type: 'terminal', id: 'qf1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // QF1 to KM1
        { id: 'w_p4', from: { type: 'terminal', id: 'qf1_2' }, to: { type: 'terminal', id: 'km1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p5', from: { type: 'terminal', id: 'qf1_4' }, to: { type: 'terminal', id: 'km1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p6', from: { type: 'terminal', id: 'qf1_6' }, to: { type: 'terminal', id: 'km1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Parallel KM2 on Top (Normal Sequence L1-L2-L3)
        { id: 'w_p7', from: { type: 'terminal', id: 'km1_1' }, to: { type: 'terminal', id: 'km2_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p8', from: { type: 'terminal', id: 'km1_3' }, to: { type: 'terminal', id: 'km2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p9', from: { type: 'terminal', id: 'km1_5' }, to: { type: 'terminal', id: 'km2_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // KM1 Output to Motor M1
        { id: 'w_p10', from: { type: 'terminal', id: 'km1_2' }, to: { type: 'terminal', id: 'm1_U' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p11', from: { type: 'terminal', id: 'km1_4' }, to: { type: 'terminal', id: 'm1_V' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p12', from: { type: 'terminal', id: 'km1_6' }, to: { type: 'terminal', id: 'm1_W' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // KM2 Output Swapped Phases to Reverse Rotation (Swap Phase 1 & Phase 3)
        { id: 'w_p13', from: { type: 'terminal', id: 'km2_2' }, to: { type: 'terminal', id: 'm1_W' }, waypoints: [{ x: 190, y: 350 }, { x: 180, y: 350 }], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p14', from: { type: 'terminal', id: 'km2_4' }, to: { type: 'terminal', id: 'm1_V' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p15', from: { type: 'terminal', id: 'km2_6' }, to: { type: 'terminal', id: 'm1_U' }, waypoints: [{ x: 240, y: 360 }, { x: 130, y: 360 }], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_pe', from: { type: 'terminal', id: 'pwr_PE' }, to: { type: 'terminal', id: 'm1_PE' }, waypoints: [{ x: 220, y: 475 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },

        // Control Circuit
        { id: 'w_c1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'sb1_1' }, waypoints: [{ x: 120, y: 65 }, { x: 392, y: 65 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c2', from: { type: 'terminal', id: 'sb1_2' }, to: { type: 'junction', id: 'j_ctrl_main' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Branch to FWD Rung
        { id: 'w_c3', from: { type: 'junction', id: 'j_ctrl_main' }, to: { type: 'terminal', id: 'sb2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c4', from: { type: 'junction', id: 'j_ctrl_main' }, to: { type: 'terminal', id: 'km1_l13' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c5', from: { type: 'terminal', id: 'sb2_4' }, to: { type: 'junction', id: 'j_fwd_join' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c6', from: { type: 'terminal', id: 'km1_l14' }, to: { type: 'junction', id: 'j_fwd_join' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c7', from: { type: 'junction', id: 'j_fwd_join' }, to: { type: 'terminal', id: 'km2_21' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c8', from: { type: 'terminal', id: 'km2_22' }, to: { type: 'terminal', id: 'km1_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Branch to REV Rung
        { id: 'w_c9', from: { type: 'junction', id: 'j_ctrl_main' }, to: { type: 'terminal', id: 'sb3_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c10', from: { type: 'junction', id: 'j_ctrl_main' }, to: { type: 'terminal', id: 'km2_l13' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c11', from: { type: 'terminal', id: 'sb3_4' }, to: { type: 'junction', id: 'j_rev_join' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c12', from: { type: 'terminal', id: 'km2_l14' }, to: { type: 'junction', id: 'j_rev_join' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c13', from: { type: 'junction', id: 'j_rev_join' }, to: { type: 'terminal', id: 'km1_21' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c14', from: { type: 'terminal', id: 'km1_22' }, to: { type: 'terminal', id: 'km2_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Neutral Return
        { id: 'w_c15', from: { type: 'terminal', id: 'km1_A2' }, to: { type: 'terminal', id: 'km2_A2' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c16', from: { type: 'terminal', id: 'km1_A2' }, to: { type: 'terminal', id: 'pwr_N' }, waypoints: [{ x: 385, y: 460 }, { x: 195, y: 460 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false }
      ],
      junctions: [
        { id: 'j_ctrl_main', position: { x: 440, y: 140 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c2', 'w_c3', 'w_c4', 'w_c9', 'w_c10'] },
        { id: 'j_fwd_join', position: { x: 382, y: 245 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c5', 'w_c6', 'w_c7'] },
        { id: 'j_rev_join', position: { x: 532, y: 245 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c11', 'w_c12', 'w_c13'] }
      ]
    }
  },

  // 2. Sequential Two Motors Control (M1 -> M2)
  {
    id: 'two_motors_sequence',
    titleEn: 'Two Motors Sequential Control (M1 then M2)',
    titleAr: 'دائرة تشغيل متتابع لمحركين (Sequence Control)',
    descEn: 'Industrial interlocking sequence where Motor 2 cannot start unless Motor 1 is already operating. Uses an auxiliary NO contact from KM1 in series with Motor 2 start circuit.',
    descAr: 'دائرة تتابع صناعية مشهورة في خطوط الإنتاج والسيور: المحرك الثاني M2 يستحيل أن يبدأ إلا بعد تشغيل المحرك الأول M1 أولاً، بواسطة نقطة تلامس مساعدة مفتوحة NO (13-14) من كونتاكتور KM1.',
    project: {
      version: '1.0.0',
      metadata: {
        title: 'Two Motors Sequence Control',
        author: 'Mina J. Wageeh',
        date: '2026-11-08',
        language: 'ar',
        standard: 'IEC'
      },
      viewport: { panX: 100, panY: 50, zoom: 0.88 },
      components: [
        // Power Source & MCB
        {
          id: 'pwr_3p',
          type: 'source_3p_pe_n',
          category: 'power',
          tag: 'L1-L2-L3-N-PE',
          position: { x: 80, y: 30 },
          rotation: 0,
          terminals: [
            { id: 'pwr_L1', componentId: 'pwr_3p', pinIndex: 0, label: 'L1', position: { x: 100, y: 65 }, offset: { x: 20, y: 35 }, netId: null, potential: 'L1' },
            { id: 'pwr_L2', componentId: 'pwr_3p', pinIndex: 1, label: 'L2', position: { x: 125, y: 65 }, offset: { x: 45, y: 35 }, netId: null, potential: 'L2' },
            { id: 'pwr_L3', componentId: 'pwr_3p', pinIndex: 2, label: 'L3', position: { x: 150, y: 65 }, offset: { x: 70, y: 35 }, netId: null, potential: 'L3' },
            { id: 'pwr_N', componentId: 'pwr_3p', pinIndex: 3, label: 'N', position: { x: 175, y: 65 }, offset: { x: 95, y: 35 }, netId: null, potential: 'N' },
            { id: 'pwr_PE', componentId: 'pwr_3p', pinIndex: 4, label: 'PE', position: { x: 200, y: 65 }, offset: { x: 120, y: 35 }, netId: null, potential: 'PE' }
          ],
          state: {}
        },
        // Motor 1 Power Contactor
        {
          id: 'km1_p',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM1',
          masterTag: 'KM1',
          position: { x: 60, y: 150 },
          rotation: 0,
          terminals: [
            { id: 'km1_1', componentId: 'km1_p', pinIndex: 0, label: '1', position: { x: 80, y: 155 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_3', componentId: 'km1_p', pinIndex: 1, label: '3', position: { x: 105, y: 155 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_5', componentId: 'km1_p', pinIndex: 2, label: '5', position: { x: 130, y: 155 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_2', componentId: 'km1_p', pinIndex: 3, label: '2', position: { x: 80, y: 225 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_4', componentId: 'km1_p', pinIndex: 4, label: '4', position: { x: 105, y: 225 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_6', componentId: 'km1_p', pinIndex: 5, label: '6', position: { x: 130, y: 225 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'm1',
          type: 'motor_3p_3wire',
          category: 'load',
          tag: 'M1 (Primary)',
          position: { x: 60, y: 280 },
          rotation: 0,
          terminals: [
            { id: 'm1_U', componentId: 'm1', pinIndex: 0, label: 'U', position: { x: 80, y: 285 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_V', componentId: 'm1', pinIndex: 1, label: 'V', position: { x: 105, y: 285 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_W', componentId: 'm1', pinIndex: 2, label: 'W', position: { x: 130, y: 285 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_PE', componentId: 'm1', pinIndex: 3, label: 'PE', position: { x: 105, y: 375 }, offset: { x: 45, y: 95 }, netId: null, potential: 'NONE' }
          ],
          state: { motorRpm: 0, motorDirection: 0 }
        },

        // Motor 2 Power Contactor
        {
          id: 'km2_p',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM2',
          masterTag: 'KM2',
          position: { x: 180, y: 150 },
          rotation: 0,
          terminals: [
            { id: 'km2_1', componentId: 'km2_p', pinIndex: 0, label: '1', position: { x: 200, y: 155 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_3', componentId: 'km2_p', pinIndex: 1, label: '3', position: { x: 225, y: 155 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_5', componentId: 'km2_p', pinIndex: 2, label: '5', position: { x: 250, y: 155 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_2', componentId: 'km2_p', pinIndex: 3, label: '2', position: { x: 200, y: 225 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km2_4', componentId: 'km2_p', pinIndex: 4, label: '4', position: { x: 225, y: 225 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km2_6', componentId: 'km2_p', pinIndex: 5, label: '6', position: { x: 250, y: 225 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'm2',
          type: 'motor_3p_3wire',
          category: 'load',
          tag: 'M2 (Secondary)',
          position: { x: 180, y: 280 },
          rotation: 0,
          terminals: [
            { id: 'm2_U', componentId: 'm2', pinIndex: 0, label: 'U', position: { x: 200, y: 285 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm2_V', componentId: 'm2', pinIndex: 1, label: 'V', position: { x: 225, y: 285 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm2_W', componentId: 'm2', pinIndex: 2, label: 'W', position: { x: 250, y: 285 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm2_PE', componentId: 'm2', pinIndex: 3, label: 'PE', position: { x: 225, y: 375 }, offset: { x: 45, y: 95 }, netId: null, potential: 'NONE' }
          ],
          state: { motorRpm: 0, motorDirection: 0 }
        },

        // Control Circuit: Stop SB1
        {
          id: 'sb1_stop',
          type: 'pushbutton_nc',
          category: 'switch',
          tag: 'SB1 (Master Stop)',
          position: { x: 350, y: 40 },
          rotation: 0,
          terminals: [
            { id: 'sb1_1', componentId: 'sb1_stop', pinIndex: 0, label: '1', position: { x: 372, y: 45 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb1_2', componentId: 'sb1_stop', pinIndex: 1, label: '2', position: { x: 372, y: 105 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },

        // Motor 1 Control Rung (Start SB2, Latch KM1, Coil KM1)
        {
          id: 'sb2_start1',
          type: 'pushbutton_no',
          category: 'switch',
          tag: 'Start M1',
          position: { x: 320, y: 150 },
          rotation: 0,
          terminals: [
            { id: 'sb2_3', componentId: 'sb2_start1', pinIndex: 0, label: '3', position: { x: 342, y: 155 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb2_4', componentId: 'sb2_start1', pinIndex: 1, label: '4', position: { x: 342, y: 215 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'km1_latch',
          type: 'aux_contact_no',
          category: 'contactor',
          tag: 'KM1',
          masterTag: 'KM1',
          position: { x: 380, y: 150 },
          rotation: 0,
          terminals: [
            { id: 'km1_l13', componentId: 'km1_latch', pinIndex: 0, label: '13', position: { x: 402, y: 155 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_l14', componentId: 'km1_latch', pinIndex: 1, label: '14', position: { x: 402, y: 215 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'km1_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM1',
          position: { x: 350, y: 260 },
          rotation: 0,
          terminals: [
            { id: 'km1_A1', componentId: 'km1_coil', pinIndex: 0, label: 'A1', position: { x: 375, y: 265 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_A2', componentId: 'km1_coil', pinIndex: 1, label: 'A2', position: { x: 375, y: 325 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        },

        // Motor 2 Control Rung: Permissive Contact KM1 NO in series with Start M2
        {
          id: 'km1_seq_perm',
          type: 'aux_contact_no',
          category: 'contactor',
          tag: 'KM1 (M1 Permissive)',
          masterTag: 'KM1',
          position: { x: 480, y: 50 },
          rotation: 0,
          terminals: [
            { id: 'km1_p13', componentId: 'km1_seq_perm', pinIndex: 0, label: '13', position: { x: 502, y: 55 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_p14', componentId: 'km1_seq_perm', pinIndex: 1, label: '14', position: { x: 502, y: 115 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'sb3_start2',
          type: 'pushbutton_no',
          category: 'switch',
          tag: 'Start M2',
          position: { x: 450, y: 150 },
          rotation: 0,
          terminals: [
            { id: 'sb3_3', componentId: 'sb3_start2', pinIndex: 0, label: '3', position: { x: 472, y: 155 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb3_4', componentId: 'sb3_start2', pinIndex: 1, label: '4', position: { x: 472, y: 215 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'km2_latch',
          type: 'aux_contact_no',
          category: 'contactor',
          tag: 'KM2',
          masterTag: 'KM2',
          position: { x: 520, y: 150 },
          rotation: 0,
          terminals: [
            { id: 'km2_l13', componentId: 'km2_latch', pinIndex: 0, label: '13', position: { x: 542, y: 155 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_l14', componentId: 'km2_latch', pinIndex: 1, label: '14', position: { x: 542, y: 215 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'km2_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM2',
          position: { x: 480, y: 260 },
          rotation: 0,
          terminals: [
            { id: 'km2_A1', componentId: 'km2_coil', pinIndex: 0, label: 'A1', position: { x: 505, y: 265 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_A2', componentId: 'km2_coil', pinIndex: 1, label: 'A2', position: { x: 505, y: 325 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        }
      ],
      wires: [
        // Power M1
        { id: 'w_p1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'km1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p2', from: { type: 'terminal', id: 'pwr_L2' }, to: { type: 'terminal', id: 'km1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p3', from: { type: 'terminal', id: 'pwr_L3' }, to: { type: 'terminal', id: 'km1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p4', from: { type: 'terminal', id: 'km1_2' }, to: { type: 'terminal', id: 'm1_U' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p5', from: { type: 'terminal', id: 'km1_4' }, to: { type: 'terminal', id: 'm1_V' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p6', from: { type: 'terminal', id: 'km1_6' }, to: { type: 'terminal', id: 'm1_W' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Power M2 (tapped from L1, L2, L3)
        { id: 'w_p7', from: { type: 'terminal', id: 'km1_1' }, to: { type: 'terminal', id: 'km2_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p8', from: { type: 'terminal', id: 'km1_3' }, to: { type: 'terminal', id: 'km2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p9', from: { type: 'terminal', id: 'km1_5' }, to: { type: 'terminal', id: 'km2_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p10', from: { type: 'terminal', id: 'km2_2' }, to: { type: 'terminal', id: 'm2_U' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p11', from: { type: 'terminal', id: 'km2_4' }, to: { type: 'terminal', id: 'm2_V' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p12', from: { type: 'terminal', id: 'km2_6' }, to: { type: 'terminal', id: 'm2_W' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Control M1
        { id: 'w_c1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'sb1_1' }, waypoints: [{ x: 100, y: 45 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c2', from: { type: 'terminal', id: 'sb1_2' }, to: { type: 'junction', id: 'j_m1_top' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c3', from: { type: 'junction', id: 'j_m1_top' }, to: { type: 'terminal', id: 'sb2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c4', from: { type: 'junction', id: 'j_m1_top' }, to: { type: 'terminal', id: 'km1_l13' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c5', from: { type: 'terminal', id: 'sb2_4' }, to: { type: 'junction', id: 'j_m1_bot' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c6', from: { type: 'terminal', id: 'km1_l14' }, to: { type: 'junction', id: 'j_m1_bot' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c7', from: { type: 'junction', id: 'j_m1_bot' }, to: { type: 'terminal', id: 'km1_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Permissive Contact KM1 in series with M2 Rung
        { id: 'w_c8', from: { type: 'junction', id: 'j_m1_top' }, to: { type: 'terminal', id: 'km1_p13' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c9', from: { type: 'terminal', id: 'km1_p14' }, to: { type: 'junction', id: 'j_m2_top' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c10', from: { type: 'junction', id: 'j_m2_top' }, to: { type: 'terminal', id: 'sb3_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c11', from: { type: 'junction', id: 'j_m2_top' }, to: { type: 'terminal', id: 'km2_l13' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c12', from: { type: 'terminal', id: 'sb3_4' }, to: { type: 'junction', id: 'j_m2_bot' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c13', from: { type: 'terminal', id: 'km2_l14' }, to: { type: 'junction', id: 'j_m2_bot' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c14', from: { type: 'junction', id: 'j_m2_bot' }, to: { type: 'terminal', id: 'km2_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Neutral Return
        { id: 'w_c15', from: { type: 'terminal', id: 'km1_A2' }, to: { type: 'terminal', id: 'km2_A2' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c16', from: { type: 'terminal', id: 'km1_A2' }, to: { type: 'terminal', id: 'pwr_N' }, waypoints: [{ x: 375, y: 350 }, { x: 175, y: 350 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false }
      ],
      junctions: [
        { id: 'j_m1_top', position: { x: 372, y: 130 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c2', 'w_c3', 'w_c4', 'w_c8'] },
        { id: 'j_m1_bot', position: { x: 372, y: 235 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c5', 'w_c6', 'w_c7'] },
        { id: 'j_m2_top', position: { x: 502, y: 130 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c9', 'w_c10', 'w_c11'] },
        { id: 'j_m2_bot', position: { x: 502, y: 235 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c12', 'w_c13', 'w_c14'] }
      ]
    }
  },

  // 3. On-Delay Timer Motor Start
  {
    id: 'timer_delay_start',
    titleEn: 'Delayed Motor Start (On-Delay Timer)',
    titleAr: 'دائرة تشغيل محرك بعد زمن تأخير (On-Delay Timer)',
    descEn: 'Pressing Start energizes the control relay and begins the On-Delay timer KT1 countdown (5s). When timed out, NO contact 15-18 closes and starts motor contactor KM1.',
    descAr: 'الضغط على زر Start يغذي ريليه التحكم ويبدأ تايمر KT1 بالعد التنازلي لمدة 5 ثوان. عند اكتمال الزمن، تنغلق النقطة المفتوحة 15-18 للتايمر فيعمل كونتاكتور المحرك KM1 تلقائياً.',
    project: {
      version: '1.0.0',
      metadata: {
        title: 'Delayed Motor Start On-Delay Timer',
        author: 'Mina J. Wageeh',
        date: '2026-11-08',
        language: 'ar',
        standard: 'IEC'
      },
      viewport: { panX: 120, panY: 50, zoom: 0.9 },
      components: [
        // Power Source & Contactor
        {
          id: 'pwr_3p',
          type: 'source_3p_pe_n',
          category: 'power',
          tag: 'L1-L2-L3-N-PE',
          position: { x: 80, y: 30 },
          rotation: 0,
          terminals: [
            { id: 'pwr_L1', componentId: 'pwr_3p', pinIndex: 0, label: 'L1', position: { x: 100, y: 65 }, offset: { x: 20, y: 35 }, netId: null, potential: 'L1' },
            { id: 'pwr_L2', componentId: 'pwr_3p', pinIndex: 1, label: 'L2', position: { x: 125, y: 65 }, offset: { x: 45, y: 35 }, netId: null, potential: 'L2' },
            { id: 'pwr_L3', componentId: 'pwr_3p', pinIndex: 2, label: 'L3', position: { x: 150, y: 65 }, offset: { x: 70, y: 35 }, netId: null, potential: 'L3' },
            { id: 'pwr_N', componentId: 'pwr_3p', pinIndex: 3, label: 'N', position: { x: 175, y: 65 }, offset: { x: 95, y: 35 }, netId: null, potential: 'N' },
            { id: 'pwr_PE', componentId: 'pwr_3p', pinIndex: 4, label: 'PE', position: { x: 200, y: 65 }, offset: { x: 120, y: 35 }, netId: null, potential: 'PE' }
          ],
          state: {}
        },
        {
          id: 'km1_p',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM1',
          masterTag: 'KM1',
          position: { x: 80, y: 150 },
          rotation: 0,
          terminals: [
            { id: 'km1_1', componentId: 'km1_p', pinIndex: 0, label: '1', position: { x: 100, y: 155 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_3', componentId: 'km1_p', pinIndex: 1, label: '3', position: { x: 125, y: 155 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_5', componentId: 'km1_p', pinIndex: 2, label: '5', position: { x: 150, y: 155 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_2', componentId: 'km1_p', pinIndex: 3, label: '2', position: { x: 100, y: 225 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_4', componentId: 'km1_p', pinIndex: 4, label: '4', position: { x: 125, y: 225 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_6', componentId: 'km1_p', pinIndex: 5, label: '6', position: { x: 150, y: 225 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'm1',
          type: 'motor_3p_3wire',
          category: 'load',
          tag: 'M1',
          position: { x: 80, y: 280 },
          rotation: 0,
          terminals: [
            { id: 'm1_U', componentId: 'm1', pinIndex: 0, label: 'U', position: { x: 100, y: 285 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_V', componentId: 'm1', pinIndex: 1, label: 'V', position: { x: 125, y: 285 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_W', componentId: 'm1', pinIndex: 2, label: 'W', position: { x: 150, y: 285 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_PE', componentId: 'm1', pinIndex: 3, label: 'PE', position: { x: 125, y: 375 }, offset: { x: 45, y: 95 }, netId: null, potential: 'NONE' }
          ],
          state: { motorRpm: 0, motorDirection: 0 }
        },

        // Control Circuit
        {
          id: 'sb1_stop',
          type: 'pushbutton_nc',
          category: 'switch',
          tag: 'SB1 (Stop)',
          position: { x: 280, y: 40 },
          rotation: 0,
          terminals: [
            { id: 'sb1_1', componentId: 'sb1_stop', pinIndex: 0, label: '1', position: { x: 302, y: 45 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb1_2', componentId: 'sb1_stop', pinIndex: 1, label: '2', position: { x: 302, y: 105 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'sb2_start',
          type: 'pushbutton_no',
          category: 'switch',
          tag: 'SB2 (Start)',
          position: { x: 250, y: 140 },
          rotation: 0,
          terminals: [
            { id: 'sb2_3', componentId: 'sb2_start', pinIndex: 0, label: '3', position: { x: 272, y: 145 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb2_4', componentId: 'sb2_start', pinIndex: 1, label: '4', position: { x: 272, y: 205 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'ka1_latch',
          type: 'aux_contact_no',
          category: 'relay',
          tag: 'KA1',
          masterTag: 'KA1',
          position: { x: 310, y: 140 },
          rotation: 0,
          terminals: [
            { id: 'ka1_l13', componentId: 'ka1_latch', pinIndex: 0, label: '13', position: { x: 332, y: 145 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'ka1_l14', componentId: 'ka1_latch', pinIndex: 1, label: '14', position: { x: 332, y: 205 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'ka1_relay',
          type: 'control_relay_coil',
          category: 'relay',
          tag: 'KA1',
          position: { x: 280, y: 250 },
          rotation: 0,
          terminals: [
            { id: 'ka1_A1', componentId: 'ka1_relay', pinIndex: 0, label: 'A1', position: { x: 305, y: 255 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'ka1_A2', componentId: 'ka1_relay', pinIndex: 1, label: 'A2', position: { x: 305, y: 315 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        },

        // On-Delay Timer KT1 Coil
        {
          id: 'kt1_timer',
          type: 'timer_on_delay',
          category: 'timer',
          tag: 'KT1 (5s)',
          position: { x: 390, y: 250 },
          rotation: 0,
          terminals: [
            { id: 'kt1_A1', componentId: 'kt1_timer', pinIndex: 0, label: 'A1', position: { x: 415, y: 255 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'kt1_A2', componentId: 'kt1_timer', pinIndex: 1, label: 'A2', position: { x: 415, y: 315 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' },
            { id: 'kt1_15', componentId: 'kt1_timer', pinIndex: 2, label: '15', position: { x: 450, y: 255 }, offset: { x: 60, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'kt1_18', componentId: 'kt1_timer', pinIndex: 3, label: '18', position: { x: 450, y: 315 }, offset: { x: 60, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { timerPreset: 5.0, timerElapsed: 0, energized: false }
        },

        // Motor Contactor Coil KM1
        {
          id: 'km1_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM1',
          position: { x: 490, y: 250 },
          rotation: 0,
          terminals: [
            { id: 'km1_A1', componentId: 'km1_coil', pinIndex: 0, label: 'A1', position: { x: 515, y: 255 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_A2', componentId: 'km1_coil', pinIndex: 1, label: 'A2', position: { x: 515, y: 315 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        }
      ],
      wires: [
        // Power connections
        { id: 'w_p1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'km1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p2', from: { type: 'terminal', id: 'pwr_L2' }, to: { type: 'terminal', id: 'km1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p3', from: { type: 'terminal', id: 'pwr_L3' }, to: { type: 'terminal', id: 'km1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p4', from: { type: 'terminal', id: 'km1_2' }, to: { type: 'terminal', id: 'm1_U' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p5', from: { type: 'terminal', id: 'km1_4' }, to: { type: 'terminal', id: 'm1_V' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p6', from: { type: 'terminal', id: 'km1_6' }, to: { type: 'terminal', id: 'm1_W' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_pe', from: { type: 'terminal', id: 'pwr_PE' }, to: { type: 'terminal', id: 'm1_PE' }, waypoints: [{ x: 200, y: 375 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },

        // Control connections
        { id: 'w_c1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'sb1_1' }, waypoints: [{ x: 100, y: 45 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c2', from: { type: 'terminal', id: 'sb1_2' }, to: { type: 'junction', id: 'j_ctrl_top' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c3', from: { type: 'junction', id: 'j_ctrl_top' }, to: { type: 'terminal', id: 'sb2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c4', from: { type: 'junction', id: 'j_ctrl_top' }, to: { type: 'terminal', id: 'ka1_l13' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c5', from: { type: 'terminal', id: 'sb2_4' }, to: { type: 'junction', id: 'j_ctrl_bot' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c6', from: { type: 'terminal', id: 'ka1_l14' }, to: { type: 'junction', id: 'j_ctrl_bot' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c7', from: { type: 'junction', id: 'j_ctrl_bot' }, to: { type: 'terminal', id: 'ka1_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Relay KA1 starts Timer KT1 and supplies Contact 15
        { id: 'w_c8', from: { type: 'junction', id: 'j_ctrl_bot' }, to: { type: 'terminal', id: 'kt1_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c9', from: { type: 'junction', id: 'j_ctrl_bot' }, to: { type: 'terminal', id: 'kt1_15' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Timer Contact 18 to Contactor Coil KM1 A1
        { id: 'w_c10', from: { type: 'terminal', id: 'kt1_18' }, to: { type: 'terminal', id: 'km1_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Neutral Return across KA1, KT1, and KM1
        { id: 'w_c11', from: { type: 'terminal', id: 'ka1_A2' }, to: { type: 'terminal', id: 'kt1_A2' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c12', from: { type: 'terminal', id: 'kt1_A2' }, to: { type: 'terminal', id: 'km1_A2' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c13', from: { type: 'terminal', id: 'ka1_A2' }, to: { type: 'terminal', id: 'pwr_N' }, waypoints: [{ x: 305, y: 340 }, { x: 175, y: 340 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false }
      ],
      junctions: [
        { id: 'j_ctrl_top', position: { x: 302, y: 120 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c2', 'w_c3', 'w_c4'] },
        { id: 'j_ctrl_bot', position: { x: 302, y: 225 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c5', 'w_c6', 'w_c7', 'w_c8', 'w_c9'] }
      ]
    }
  }
];
