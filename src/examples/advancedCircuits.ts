import { CircuitProject } from '../core/types/circuit';

export const advancedCircuits: { id: string; titleEn: string; titleAr: string; descEn: string; descAr: string; project: CircuitProject }[] = [
  {
    id: 'star_delta_starter',
    titleEn: 'Automatic Star-Delta Starter with Dedicated Timer',
    titleAr: 'دائرة بدء حركة محرك ستار-دلتا أوتوماتيك (Star-Delta)',
    descEn: 'Reduced-voltage starter using Main (KM1), Star (KM2), and Delta (KM3) contactors, with 6-lead induction motor and automatic star-delta transition timer (KT1).',
    descAr: 'دائرة تقليل تيار البدء الشهيرة للمحركات الكبيرة: تبدأ بتوصيل ستار (KM1 + KM2) لتقليل الجهد والتيار لثلث القيمة، ثم يحول تايمر KT1 إلى دلتا (KM1 + KM3) مع إنترلوك لمنع قفلة فازات.',
    project: {
      version: '1.0.0',
      metadata: {
        title: 'Automatic Star-Delta Starter',
        author: 'Mina J. Wageeh',
        date: '2026-11-08',
        language: 'ar',
        standard: 'IEC'
      },
      viewport: { panX: 100, panY: 40, zoom: 0.85 },
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
        // Main Contactor KM1
        {
          id: 'km1_p',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM1 (Main)',
          masterTag: 'KM1',
          position: { x: 100, y: 240 },
          rotation: 0,
          terminals: [
            { id: 'km1_1', componentId: 'km1_p', pinIndex: 0, label: '1', position: { x: 120, y: 245 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_3', componentId: 'km1_p', pinIndex: 1, label: '3', position: { x: 145, y: 245 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_5', componentId: 'km1_p', pinIndex: 2, label: '5', position: { x: 170, y: 245 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_2', componentId: 'km1_p', pinIndex: 3, label: '2', position: { x: 120, y: 315 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_4', componentId: 'km1_p', pinIndex: 4, label: '4', position: { x: 145, y: 315 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_6', componentId: 'km1_p', pinIndex: 5, label: '6', position: { x: 170, y: 315 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        // 6-Terminal Induction Motor for Star-Delta
        {
          id: 'm1_6w',
          type: 'motor_3p_6wire',
          category: 'load',
          tag: 'M1 (6-Lead)',
          position: { x: 95, y: 360 },
          rotation: 0,
          terminals: [
            { id: 'm1_U1', componentId: 'm1_6w', pinIndex: 0, label: 'U1', position: { x: 115, y: 365 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_V1', componentId: 'm1_6w', pinIndex: 1, label: 'V1', position: { x: 145, y: 365 }, offset: { x: 50, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_W1', componentId: 'm1_6w', pinIndex: 2, label: 'W1', position: { x: 175, y: 365 }, offset: { x: 80, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_W2', componentId: 'm1_6w', pinIndex: 3, label: 'W2', position: { x: 115, y: 465 }, offset: { x: 20, y: 105 }, netId: null, potential: 'NONE' },
            { id: 'm1_U2', componentId: 'm1_6w', pinIndex: 4, label: 'U2', position: { x: 145, y: 465 }, offset: { x: 50, y: 105 }, netId: null, potential: 'NONE' },
            { id: 'm1_V2', componentId: 'm1_6w', pinIndex: 5, label: 'V2', position: { x: 175, y: 465 }, offset: { x: 80, y: 105 }, netId: null, potential: 'NONE' }
          ],
          state: { motorRpm: 0, motorDirection: 0 }
        },
        // Star Contactor KM2 (Short-circuits W2-U2-V2 together)
        {
          id: 'km2_star',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM2 (Star)',
          masterTag: 'KM2',
          position: { x: 50, y: 510 },
          rotation: 0,
          terminals: [
            { id: 'km2_1', componentId: 'km2_star', pinIndex: 0, label: '1', position: { x: 70, y: 515 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_3', componentId: 'km2_star', pinIndex: 1, label: '3', position: { x: 95, y: 515 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_5', componentId: 'km2_star', pinIndex: 2, label: '5', position: { x: 120, y: 515 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_2', componentId: 'km2_star', pinIndex: 3, label: '2', position: { x: 70, y: 585 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km2_4', componentId: 'km2_star', pinIndex: 4, label: '4', position: { x: 95, y: 585 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km2_6', componentId: 'km2_star', pinIndex: 5, label: '6', position: { x: 120, y: 585 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        // Delta Contactor KM3
        {
          id: 'km3_delta',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM3 (Delta)',
          masterTag: 'KM3',
          position: { x: 180, y: 510 },
          rotation: 0,
          terminals: [
            { id: 'km3_1', componentId: 'km3_delta', pinIndex: 0, label: '1', position: { x: 200, y: 515 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km3_3', componentId: 'km3_delta', pinIndex: 1, label: '3', position: { x: 225, y: 515 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km3_5', componentId: 'km3_delta', pinIndex: 2, label: '5', position: { x: 250, y: 515 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km3_2', componentId: 'km3_delta', pinIndex: 3, label: '2', position: { x: 200, y: 585 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km3_4', componentId: 'km3_delta', pinIndex: 4, label: '4', position: { x: 225, y: 585 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km3_6', componentId: 'km3_delta', pinIndex: 5, label: '6', position: { x: 250, y: 585 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },

        // Control Circuit: Start, Stop, Timer KT1, KM1 Coil, KM2 Coil, KM3 Coil
        {
          id: 'sb1_stop',
          type: 'pushbutton_nc',
          category: 'switch',
          tag: 'SB1 (Stop)',
          position: { x: 380, y: 80 },
          rotation: 0,
          terminals: [
            { id: 'sb1_1', componentId: 'sb1_stop', pinIndex: 0, label: '1', position: { x: 402, y: 85 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb1_2', componentId: 'sb1_stop', pinIndex: 1, label: '2', position: { x: 402, y: 145 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'sb2_start',
          type: 'pushbutton_no',
          category: 'switch',
          tag: 'SB2 (Start)',
          position: { x: 380, y: 170 },
          rotation: 0,
          terminals: [
            { id: 'sb2_3', componentId: 'sb2_start', pinIndex: 0, label: '3', position: { x: 402, y: 175 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb2_4', componentId: 'sb2_start', pinIndex: 1, label: '4', position: { x: 402, y: 235 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        // KM1 Coil (Main)
        {
          id: 'km1_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM1',
          position: { x: 340, y: 350 },
          rotation: 0,
          terminals: [
            { id: 'km1_A1', componentId: 'km1_coil', pinIndex: 0, label: 'A1', position: { x: 365, y: 355 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_A2', componentId: 'km1_coil', pinIndex: 1, label: 'A2', position: { x: 365, y: 415 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        },
        // Dedicated Star-Delta Timer KT1
        {
          id: 'kt1_timer',
          type: 'timer_star_delta',
          category: 'timer',
          tag: 'KT1 (Y-Δ)',
          position: { x: 420, y: 350 },
          rotation: 0,
          terminals: [
            { id: 'kt1_A1', componentId: 'kt1_timer', pinIndex: 0, label: 'A1', position: { x: 455, y: 355 }, offset: { x: 35, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'kt1_A2', componentId: 'kt1_timer', pinIndex: 1, label: 'A2', position: { x: 455, y: 430 }, offset: { x: 35, y: 80 }, netId: null, potential: 'NONE' }
          ],
          state: { timerElapsed: 0, timerPreset: 4.0, timerRunning: false }
        },
        // Star Contactor KM2 Coil
        {
          id: 'km2_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM2',
          position: { x: 510, y: 350 },
          rotation: 0,
          terminals: [
            { id: 'km2_A1', componentId: 'km2_coil', pinIndex: 0, label: 'A1', position: { x: 535, y: 355 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_A2', componentId: 'km2_coil', pinIndex: 1, label: 'A2', position: { x: 535, y: 415 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        },
        // Delta Contactor KM3 Coil
        {
          id: 'km3_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM3',
          position: { x: 580, y: 350 },
          rotation: 0,
          terminals: [
            { id: 'km3_A1', componentId: 'km3_coil', pinIndex: 0, label: 'A1', position: { x: 605, y: 355 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km3_A2', componentId: 'km3_coil', pinIndex: 1, label: 'A2', position: { x: 605, y: 415 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        }
      ],
      wires: [
        { id: 'w_p1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'qf1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p2', from: { type: 'terminal', id: 'pwr_L2' }, to: { type: 'terminal', id: 'qf1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p3', from: { type: 'terminal', id: 'pwr_L3' }, to: { type: 'terminal', id: 'qf1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p4', from: { type: 'terminal', id: 'qf1_2' }, to: { type: 'terminal', id: 'km1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p5', from: { type: 'terminal', id: 'qf1_4' }, to: { type: 'terminal', id: 'km1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p6', from: { type: 'terminal', id: 'qf1_6' }, to: { type: 'terminal', id: 'km1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        // To motor U1, V1, W1
        { id: 'w_m1', from: { type: 'terminal', id: 'km1_2' }, to: { type: 'terminal', id: 'm1_U1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_m2', from: { type: 'terminal', id: 'km1_4' }, to: { type: 'terminal', id: 'm1_V1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_m3', from: { type: 'terminal', id: 'km1_6' }, to: { type: 'terminal', id: 'm1_W1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Star short bridge (2-4-6 of KM2)
        { id: 'w_star1', from: { type: 'terminal', id: 'km2_2' }, to: { type: 'terminal', id: 'km2_4' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_star2', from: { type: 'terminal', id: 'km2_4' }, to: { type: 'terminal', id: 'km2_6' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        // Motor endings to KM2 and KM3
        { id: 'w_w2', from: { type: 'terminal', id: 'm1_W2' }, to: { type: 'terminal', id: 'km2_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_u2', from: { type: 'terminal', id: 'm1_U2' }, to: { type: 'terminal', id: 'km2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_v2', from: { type: 'terminal', id: 'm1_V2' }, to: { type: 'terminal', id: 'km2_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Control Circuit
        { id: 'w_c1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'sb1_1' }, waypoints: [{ x: 120, y: 70 }, { x: 402, y: 70 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c2', from: { type: 'terminal', id: 'sb1_2' }, to: { type: 'terminal', id: 'sb2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c3', from: { type: 'terminal', id: 'sb2_4' }, to: { type: 'terminal', id: 'km1_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c4', from: { type: 'terminal', id: 'km1_A1' }, to: { type: 'terminal', id: 'kt1_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c5', from: { type: 'terminal', id: 'km1_A1' }, to: { type: 'terminal', id: 'km2_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_n1', from: { type: 'terminal', id: 'km1_A2' }, to: { type: 'terminal', id: 'pwr_N' }, waypoints: [{ x: 365, y: 440 }, { x: 195, y: 440 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_n2', from: { type: 'terminal', id: 'kt1_A2' }, to: { type: 'terminal', id: 'km1_A2' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_n3', from: { type: 'terminal', id: 'km2_A2' }, to: { type: 'terminal', id: 'km1_A2' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_n4', from: { type: 'terminal', id: 'km3_A2' }, to: { type: 'terminal', id: 'km1_A2' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false }
      ],
      junctions: []
    }
  }
];
