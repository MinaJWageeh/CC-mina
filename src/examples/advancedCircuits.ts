import { CircuitProject } from '../core/types/circuit';

export const advancedCircuits: { id: string; titleEn: string; titleAr: string; descEn: string; descAr: string; project: CircuitProject }[] = [
  // 1. Star-Delta Starter
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
        // KM1 Main Power
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
        // 6-wire Motor M1
        {
          id: 'm1_6w',
          type: 'motor_3p_6wire',
          category: 'load',
          tag: 'M1 (6-Lead)',
          position: { x: 100, y: 360 },
          rotation: 0,
          terminals: [
            { id: 'm1_U1', componentId: 'm1_6w', pinIndex: 0, label: 'U1', position: { x: 115, y: 370 }, offset: { x: 15, y: 10 }, netId: null, potential: 'NONE' },
            { id: 'm1_V1', componentId: 'm1_6w', pinIndex: 1, label: 'V1', position: { x: 135, y: 370 }, offset: { x: 35, y: 10 }, netId: null, potential: 'NONE' },
            { id: 'm1_W1', componentId: 'm1_6w', pinIndex: 2, label: 'W1', position: { x: 155, y: 370 }, offset: { x: 55, y: 10 }, netId: null, potential: 'NONE' },
            { id: 'm1_W2', componentId: 'm1_6w', pinIndex: 3, label: 'W2', position: { x: 115, y: 440 }, offset: { x: 15, y: 80 }, netId: null, potential: 'NONE' },
            { id: 'm1_U2', componentId: 'm1_6w', pinIndex: 4, label: 'U2', position: { x: 135, y: 440 }, offset: { x: 35, y: 80 }, netId: null, potential: 'NONE' },
            { id: 'm1_V2', componentId: 'm1_6w', pinIndex: 5, label: 'V2', position: { x: 155, y: 440 }, offset: { x: 55, y: 80 }, netId: null, potential: 'NONE' },
            { id: 'm1_PE', componentId: 'm1_6w', pinIndex: 6, label: 'PE', position: { x: 175, y: 440 }, offset: { x: 75, y: 80 }, netId: null, potential: 'NONE' }
          ],
          state: { motorRpm: 0, motorDirection: 0 }
        },
        // KM2 Star Contactor
        {
          id: 'km2_star',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM2 (Star)',
          masterTag: 'KM2',
          position: { x: 220, y: 480 },
          rotation: 0,
          terminals: [
            { id: 'km2_1', componentId: 'km2_star', pinIndex: 0, label: '1', position: { x: 240, y: 485 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_3', componentId: 'km2_star', pinIndex: 1, label: '3', position: { x: 265, y: 485 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_5', componentId: 'km2_star', pinIndex: 2, label: '5', position: { x: 290, y: 485 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_2', componentId: 'km2_star', pinIndex: 3, label: '2', position: { x: 240, y: 555 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km2_4', componentId: 'km2_star', pinIndex: 4, label: '4', position: { x: 265, y: 555 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km2_6', componentId: 'km2_star', pinIndex: 5, label: '6', position: { x: 290, y: 555 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        // KM3 Delta Contactor
        {
          id: 'km3_delta',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM3 (Delta)',
          masterTag: 'KM3',
          position: { x: 220, y: 360 },
          rotation: 0,
          terminals: [
            { id: 'km3_1', componentId: 'km3_delta', pinIndex: 0, label: '1', position: { x: 240, y: 365 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km3_3', componentId: 'km3_delta', pinIndex: 1, label: '3', position: { x: 265, y: 365 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km3_5', componentId: 'km3_delta', pinIndex: 2, label: '5', position: { x: 290, y: 365 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km3_2', componentId: 'km3_delta', pinIndex: 3, label: '2', position: { x: 240, y: 435 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km3_4', componentId: 'km3_delta', pinIndex: 4, label: '4', position: { x: 265, y: 435 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km3_6', componentId: 'km3_delta', pinIndex: 5, label: '6', position: { x: 290, y: 435 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },

        // Control Circuit
        {
          id: 'sb1_stop',
          type: 'pushbutton_nc',
          category: 'switch',
          tag: 'SB1 (Stop)',
          position: { x: 380, y: 60 },
          rotation: 0,
          terminals: [
            { id: 'sb1_1', componentId: 'sb1_stop', pinIndex: 0, label: '1', position: { x: 402, y: 65 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb1_2', componentId: 'sb1_stop', pinIndex: 1, label: '2', position: { x: 402, y: 125 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
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
        { id: 'w_m1', from: { type: 'terminal', id: 'km1_2' }, to: { type: 'terminal', id: 'm1_U1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_m2', from: { type: 'terminal', id: 'km1_4' }, to: { type: 'terminal', id: 'm1_V1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_m3', from: { type: 'terminal', id: 'km1_6' }, to: { type: 'terminal', id: 'm1_W1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_star1', from: { type: 'terminal', id: 'km2_2' }, to: { type: 'terminal', id: 'km2_4' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_star2', from: { type: 'terminal', id: 'km2_4' }, to: { type: 'terminal', id: 'km2_6' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_w2', from: { type: 'terminal', id: 'm1_W2' }, to: { type: 'terminal', id: 'km2_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_u2', from: { type: 'terminal', id: 'm1_U2' }, to: { type: 'terminal', id: 'km2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_v2', from: { type: 'terminal', id: 'm1_V2' }, to: { type: 'terminal', id: 'km2_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
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
  },

  // 2. Automatic Reversing Conveyor with Limit Switches
  {
    id: 'auto_reversing_conveyor',
    titleEn: 'Automatic Reversing Conveyor with Limit Switches',
    titleAr: 'سير ناقل ينعكس أوتوماتيكياً بمفاتيح نهاية الشوط (SQ1 & SQ2)',
    descEn: 'Industrial reciprocal conveyor system. Forward motion triggers limit switch SQ1, stopping Forward and automatically engaging Reverse motion until it hits SQ2, creating continuous back-and-forth cycling.',
    descAr: 'نظام صناعي شائع لخطوط النقل والتشغيل الترددي: المحرك يتحرك للأمام حتى يضغط على مفتاح نهاية الشوط SQ1 فيفصل الحركة الأمامية ويشغل الحركة الخلفية حتى يصل إلى SQ2 ليكرر الدورة أوتوماتيكياً.',
    project: {
      version: '1.0.0',
      metadata: {
        title: 'Auto Reversing Conveyor with Limit Switches',
        author: 'Mina J. Wageeh',
        date: '2026-11-08',
        language: 'ar',
        standard: 'IEC'
      },
      viewport: { panX: 110, panY: 50, zoom: 0.88 },
      components: [
        {
          id: 'pwr_3p',
          type: 'source_3p_pe_n',
          category: 'power',
          tag: 'L1-L2-L3-N-PE',
          position: { x: 90, y: 30 },
          rotation: 0,
          terminals: [
            { id: 'pwr_L1', componentId: 'pwr_3p', pinIndex: 0, label: 'L1', position: { x: 110, y: 65 }, offset: { x: 20, y: 35 }, netId: null, potential: 'L1' },
            { id: 'pwr_L2', componentId: 'pwr_3p', pinIndex: 1, label: 'L2', position: { x: 135, y: 65 }, offset: { x: 45, y: 35 }, netId: null, potential: 'L2' },
            { id: 'pwr_L3', componentId: 'pwr_3p', pinIndex: 2, label: 'L3', position: { x: 160, y: 65 }, offset: { x: 70, y: 35 }, netId: null, potential: 'L3' },
            { id: 'pwr_N', componentId: 'pwr_3p', pinIndex: 3, label: 'N', position: { x: 185, y: 65 }, offset: { x: 95, y: 35 }, netId: null, potential: 'N' },
            { id: 'pwr_PE', componentId: 'pwr_3p', pinIndex: 4, label: 'PE', position: { x: 210, y: 65 }, offset: { x: 120, y: 35 }, netId: null, potential: 'PE' }
          ],
          state: {}
        },
        {
          id: 'km1_fwd',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM1 (Forward)',
          masterTag: 'KM1',
          position: { x: 60, y: 150 },
          rotation: 0,
          terminals: [
            { id: 'km1_1', componentId: 'km1_fwd', pinIndex: 0, label: '1', position: { x: 80, y: 155 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_3', componentId: 'km1_fwd', pinIndex: 1, label: '3', position: { x: 105, y: 155 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_5', componentId: 'km1_fwd', pinIndex: 2, label: '5', position: { x: 130, y: 155 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_2', componentId: 'km1_fwd', pinIndex: 3, label: '2', position: { x: 80, y: 225 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_4', componentId: 'km1_fwd', pinIndex: 4, label: '4', position: { x: 105, y: 225 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_6', componentId: 'km1_fwd', pinIndex: 5, label: '6', position: { x: 130, y: 225 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'km2_rev',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM2 (Reverse)',
          masterTag: 'KM2',
          position: { x: 170, y: 150 },
          rotation: 0,
          terminals: [
            { id: 'km2_1', componentId: 'km2_rev', pinIndex: 0, label: '1', position: { x: 190, y: 155 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_3', componentId: 'km2_rev', pinIndex: 1, label: '3', position: { x: 215, y: 155 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_5', componentId: 'km2_rev', pinIndex: 2, label: '5', position: { x: 240, y: 155 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_2', componentId: 'km2_rev', pinIndex: 3, label: '2', position: { x: 190, y: 225 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km2_4', componentId: 'km2_rev', pinIndex: 4, label: '4', position: { x: 215, y: 225 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km2_6', componentId: 'km2_rev', pinIndex: 5, label: '6', position: { x: 240, y: 225 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'm1',
          type: 'motor_3p_3wire',
          category: 'load',
          tag: 'M1 (Conveyor)',
          position: { x: 110, y: 300 },
          rotation: 0,
          terminals: [
            { id: 'm1_U', componentId: 'm1', pinIndex: 0, label: 'U', position: { x: 130, y: 305 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_V', componentId: 'm1', pinIndex: 1, label: 'V', position: { x: 155, y: 305 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_W', componentId: 'm1', pinIndex: 2, label: 'W', position: { x: 180, y: 305 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_PE', componentId: 'm1', pinIndex: 3, label: 'PE', position: { x: 155, y: 395 }, offset: { x: 45, y: 95 }, netId: null, potential: 'NONE' }
          ],
          state: { motorRpm: 0, motorDirection: 0 }
        },

        // Control Circuit: Master Stop SB1
        {
          id: 'sb1_stop',
          type: 'pushbutton_nc',
          category: 'switch',
          tag: 'SB1 (Stop)',
          position: { x: 380, y: 40 },
          rotation: 0,
          terminals: [
            { id: 'sb1_1', componentId: 'sb1_stop', pinIndex: 0, label: '1', position: { x: 402, y: 45 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb1_2', componentId: 'sb1_stop', pinIndex: 1, label: '2', position: { x: 402, y: 105 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        // Forward Start SB2
        {
          id: 'sb2_start',
          type: 'pushbutton_no',
          category: 'switch',
          tag: 'Start FWD',
          position: { x: 330, y: 140 },
          rotation: 0,
          terminals: [
            { id: 'sb2_3', componentId: 'sb2_start', pinIndex: 0, label: '3', position: { x: 352, y: 145 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb2_4', componentId: 'sb2_start', pinIndex: 1, label: '4', position: { x: 352, y: 205 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'km1_latch',
          type: 'aux_contact_no',
          category: 'contactor',
          tag: 'KM1',
          masterTag: 'KM1',
          position: { x: 390, y: 140 },
          rotation: 0,
          terminals: [
            { id: 'km1_l13', componentId: 'km1_latch', pinIndex: 0, label: '13', position: { x: 412, y: 145 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_l14', componentId: 'km1_latch', pinIndex: 1, label: '14', position: { x: 412, y: 205 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        // Limit Switch SQ1 (Forward End Limit - Normally Closed)
        {
          id: 'sq1_limit',
          type: 'limit_switch_nc',
          category: 'sensor',
          tag: 'SQ1 (FWD Limit)',
          position: { x: 360, y: 240 },
          rotation: 0,
          terminals: [
            { id: 'sq1_11', componentId: 'sq1_limit', pinIndex: 0, label: '11', position: { x: 382, y: 245 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sq1_12', componentId: 'sq1_limit', pinIndex: 1, label: '12', position: { x: 382, y: 305 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: true }
        },
        // Limit Switch SQ2 (Reverse End Limit - Normally Closed)
        {
          id: 'sq2_limit',
          type: 'limit_switch_nc',
          category: 'sensor',
          tag: 'SQ2 (REV Limit)',
          position: { x: 500, y: 240 },
          rotation: 0,
          terminals: [
            { id: 'sq2_11', componentId: 'sq2_limit', pinIndex: 0, label: '11', position: { x: 522, y: 245 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sq2_12', componentId: 'sq2_limit', pinIndex: 1, label: '12', position: { x: 522, y: 305 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: true }
        },
        // Forward Coil KM1
        {
          id: 'km1_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM1',
          position: { x: 360, y: 340 },
          rotation: 0,
          terminals: [
            { id: 'km1_A1', componentId: 'km1_coil', pinIndex: 0, label: 'A1', position: { x: 385, y: 345 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_A2', componentId: 'km1_coil', pinIndex: 1, label: 'A2', position: { x: 385, y: 405 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        },
        // Reverse Coil KM2
        {
          id: 'km2_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM2',
          position: { x: 500, y: 340 },
          rotation: 0,
          terminals: [
            { id: 'km2_A1', componentId: 'km2_coil', pinIndex: 0, label: 'A1', position: { x: 525, y: 345 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km2_A2', componentId: 'km2_coil', pinIndex: 1, label: 'A2', position: { x: 525, y: 405 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        }
      ],
      wires: [
        // Power connections
        { id: 'w_p1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'km1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p2', from: { type: 'terminal', id: 'pwr_L2' }, to: { type: 'terminal', id: 'km1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p3', from: { type: 'terminal', id: 'pwr_L3' }, to: { type: 'terminal', id: 'km1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p4', from: { type: 'terminal', id: 'km1_1' }, to: { type: 'terminal', id: 'km2_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p5', from: { type: 'terminal', id: 'km1_3' }, to: { type: 'terminal', id: 'km2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p6', from: { type: 'terminal', id: 'km1_5' }, to: { type: 'terminal', id: 'km2_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p7', from: { type: 'terminal', id: 'km1_2' }, to: { type: 'terminal', id: 'm1_U' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p8', from: { type: 'terminal', id: 'km1_4' }, to: { type: 'terminal', id: 'm1_V' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p9', from: { type: 'terminal', id: 'km1_6' }, to: { type: 'terminal', id: 'm1_W' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p10', from: { type: 'terminal', id: 'km2_2' }, to: { type: 'terminal', id: 'm1_W' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p11', from: { type: 'terminal', id: 'km2_4' }, to: { type: 'terminal', id: 'm1_V' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p12', from: { type: 'terminal', id: 'km2_6' }, to: { type: 'terminal', id: 'm1_U' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Control connections
        { id: 'w_c1', from: { type: 'terminal', id: 'pwr_L1' }, to: { type: 'terminal', id: 'sb1_1' }, waypoints: [{ x: 110, y: 45 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c2', from: { type: 'terminal', id: 'sb1_2' }, to: { type: 'junction', id: 'j_ctrl_top' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c3', from: { type: 'junction', id: 'j_ctrl_top' }, to: { type: 'terminal', id: 'sb2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c4', from: { type: 'junction', id: 'j_ctrl_top' }, to: { type: 'terminal', id: 'km1_l13' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c5', from: { type: 'terminal', id: 'sb2_4' }, to: { type: 'junction', id: 'j_ctrl_mid' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c6', from: { type: 'terminal', id: 'km1_l14' }, to: { type: 'junction', id: 'j_ctrl_mid' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c7', from: { type: 'junction', id: 'j_ctrl_mid' }, to: { type: 'terminal', id: 'sq1_11' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c8', from: { type: 'terminal', id: 'sq1_12' }, to: { type: 'terminal', id: 'km1_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c9', from: { type: 'terminal', id: 'sq2_12' }, to: { type: 'terminal', id: 'km2_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c10', from: { type: 'terminal', id: 'km1_A2' }, to: { type: 'terminal', id: 'km2_A2' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c11', from: { type: 'terminal', id: 'km1_A2' }, to: { type: 'terminal', id: 'pwr_N' }, waypoints: [{ x: 385, y: 430 }, { x: 185, y: 430 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false }
      ],
      junctions: [
        { id: 'j_ctrl_top', position: { x: 380, y: 120 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c2', 'w_c3', 'w_c4'] },
        { id: 'j_ctrl_mid', position: { x: 382, y: 220 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c5', 'w_c6', 'w_c7'] }
      ]
    }
  }
];
