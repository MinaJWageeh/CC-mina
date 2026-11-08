import { CircuitProject } from '../core/types/circuit';

export const easyCircuits: { id: string; titleEn: string; titleAr: string; descEn: string; descAr: string; project: CircuitProject }[] = [
  {
    id: 'dol_starter',
    titleEn: 'Direct-On-Line (DOL) Motor Starter',
    titleAr: 'دائرة تشغيل مباشر لمحرك 3 فاز (DOL Starter)',
    descEn: 'Fundamental classic control starter with Start/Stop push buttons, holding auxiliary contact (latch 13-14), thermal overload, and 3-phase motor.',
    descAr: 'الدائرة الأساسية في التحكم الآلي: زر تشغيل Start مفتوح، استمرارية بنقطة مساعدة 13-14، زر إيقاف Stop مغلق، حماية أوفرلود 95-96، ومحرك 3 فاز.',
    project: {
      version: '1.0.0',
      metadata: {
        title: 'Direct-On-Line Motor Starter',
        author: 'Mina J. Wageeh',
        date: '2026-11-08',
        language: 'ar',
        standard: 'IEC'
      },
      viewport: { panX: 180, panY: 60, zoom: 0.95 },
      components: [
        // Power Circuit
        {
          id: 'pwr_3p',
          type: 'source_3p_pe_n',
          category: 'power',
          tag: 'L1-L2-L3-N-PE',
          position: { x: 80, y: 30 },
          rotation: 0,
          terminals: [
            { id: 'pwr_3p_L1', componentId: 'pwr_3p', pinIndex: 0, label: 'L1', position: { x: 100, y: 65 }, offset: { x: 20, y: 35 }, netId: null, potential: 'L1' },
            { id: 'pwr_3p_L2', componentId: 'pwr_3p', pinIndex: 1, label: 'L2', position: { x: 125, y: 65 }, offset: { x: 45, y: 35 }, netId: null, potential: 'L2' },
            { id: 'pwr_3p_L3', componentId: 'pwr_3p', pinIndex: 2, label: 'L3', position: { x: 150, y: 65 }, offset: { x: 70, y: 35 }, netId: null, potential: 'L3' },
            { id: 'pwr_3p_N', componentId: 'pwr_3p', pinIndex: 3, label: 'N', position: { x: 175, y: 65 }, offset: { x: 95, y: 35 }, netId: null, potential: 'N' },
            { id: 'pwr_3p_PE', componentId: 'pwr_3p', pinIndex: 4, label: 'PE', position: { x: 200, y: 65 }, offset: { x: 120, y: 35 }, netId: null, potential: 'PE' }
          ],
          state: {}
        },
        {
          id: 'qf1',
          type: 'mcb_3p',
          category: 'protection',
          tag: 'QF1',
          position: { x: 80, y: 120 },
          rotation: 0,
          terminals: [
            { id: 'qf1_1', componentId: 'qf1', pinIndex: 0, label: '1', position: { x: 100, y: 125 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'qf1_3', componentId: 'qf1', pinIndex: 1, label: '3', position: { x: 125, y: 125 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'qf1_5', componentId: 'qf1', pinIndex: 2, label: '5', position: { x: 150, y: 125 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'qf1_2', componentId: 'qf1', pinIndex: 3, label: '2', position: { x: 100, y: 205 }, offset: { x: 20, y: 85 }, netId: null, potential: 'NONE' },
            { id: 'qf1_4', componentId: 'qf1', pinIndex: 4, label: '4', position: { x: 125, y: 205 }, offset: { x: 45, y: 85 }, netId: null, potential: 'NONE' },
            { id: 'qf1_6', componentId: 'qf1', pinIndex: 5, label: '6', position: { x: 150, y: 205 }, offset: { x: 70, y: 85 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: true }
        },
        {
          id: 'km1_power',
          type: 'contactor_main_3p',
          category: 'contactor',
          tag: 'KM1',
          masterTag: 'KM1',
          position: { x: 80, y: 240 },
          rotation: 0,
          terminals: [
            { id: 'km1_p_1', componentId: 'km1_power', pinIndex: 0, label: '1', position: { x: 100, y: 245 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_p_3', componentId: 'km1_power', pinIndex: 1, label: '3', position: { x: 125, y: 245 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_p_5', componentId: 'km1_power', pinIndex: 2, label: '5', position: { x: 150, y: 245 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_p_2', componentId: 'km1_power', pinIndex: 3, label: '2', position: { x: 100, y: 315 }, offset: { x: 20, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_p_4', componentId: 'km1_power', pinIndex: 4, label: '4', position: { x: 125, y: 315 }, offset: { x: 45, y: 75 }, netId: null, potential: 'NONE' },
            { id: 'km1_p_6', componentId: 'km1_power', pinIndex: 5, label: '6', position: { x: 150, y: 315 }, offset: { x: 70, y: 75 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'ol1',
          type: 'overload_relay',
          category: 'protection',
          tag: 'OL1',
          position: { x: 80, y: 350 },
          rotation: 0,
          terminals: [
            { id: 'ol1_1', componentId: 'ol1', pinIndex: 0, label: '1', position: { x: 100, y: 355 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'ol1_3', componentId: 'ol1', pinIndex: 1, label: '3', position: { x: 125, y: 355 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'ol1_5', componentId: 'ol1', pinIndex: 2, label: '5', position: { x: 150, y: 355 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'ol1_2', componentId: 'ol1', pinIndex: 3, label: '2', position: { x: 100, y: 445 }, offset: { x: 20, y: 95 }, netId: null, potential: 'NONE' },
            { id: 'ol1_4', componentId: 'ol1', pinIndex: 4, label: '4', position: { x: 125, y: 445 }, offset: { x: 45, y: 95 }, netId: null, potential: 'NONE' },
            { id: 'ol1_6', componentId: 'ol1', pinIndex: 5, label: '6', position: { x: 150, y: 445 }, offset: { x: 70, y: 95 }, netId: null, potential: 'NONE' },
            { id: 'ol1_95', componentId: 'ol1', pinIndex: 6, label: '95', position: { x: 168, y: 365 }, offset: { x: 88, y: 15 }, netId: null, potential: 'NONE' },
            { id: 'ol1_96', componentId: 'ol1', pinIndex: 7, label: '96', position: { x: 168, y: 390 }, offset: { x: 88, y: 40 }, netId: null, potential: 'NONE' },
            { id: 'ol1_97', componentId: 'ol1', pinIndex: 8, label: '97', position: { x: 168, y: 415 }, offset: { x: 88, y: 65 }, netId: null, potential: 'NONE' },
            { id: 'ol1_98', componentId: 'ol1', pinIndex: 9, label: '98', position: { x: 168, y: 438 }, offset: { x: 88, y: 88 }, netId: null, potential: 'NONE' }
          ],
          state: { tripped: false }
        },
        {
          id: 'm1',
          type: 'motor_3p_3wire',
          category: 'load',
          tag: 'M1',
          position: { x: 80, y: 480 },
          rotation: 0,
          terminals: [
            { id: 'm1_U', componentId: 'm1', pinIndex: 0, label: 'U', position: { x: 100, y: 485 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_V', componentId: 'm1', pinIndex: 1, label: 'V', position: { x: 125, y: 485 }, offset: { x: 45, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_W', componentId: 'm1', pinIndex: 2, label: 'W', position: { x: 150, y: 485 }, offset: { x: 70, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'm1_PE', componentId: 'm1', pinIndex: 3, label: 'PE', position: { x: 125, y: 575 }, offset: { x: 45, y: 95 }, netId: null, potential: 'NONE' }
          ],
          state: { motorRpm: 0, motorDirection: 0 }
        },

        // Control Circuit
        {
          id: 'fu1',
          type: 'fuse_1p',
          category: 'protection',
          tag: 'FU1',
          position: { x: 300, y: 70 },
          rotation: 0,
          terminals: [
            { id: 'fu1_1', componentId: 'fu1', pinIndex: 0, label: '1', position: { x: 320, y: 75 }, offset: { x: 20, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'fu1_2', componentId: 'fu1', pinIndex: 1, label: '2', position: { x: 320, y: 135 }, offset: { x: 20, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: {}
        },
        {
          id: 'sb1_stop',
          type: 'pushbutton_nc',
          category: 'switch',
          tag: 'SB1 (Stop)',
          position: { x: 300, y: 160 },
          rotation: 0,
          terminals: [
            { id: 'sb1_1', componentId: 'sb1_stop', pinIndex: 0, label: '1', position: { x: 322, y: 165 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb1_2', componentId: 'sb1_stop', pinIndex: 1, label: '2', position: { x: 322, y: 225 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'sb2_start',
          type: 'pushbutton_no',
          category: 'switch',
          tag: 'SB2 (Start)',
          position: { x: 270, y: 260 },
          rotation: 0,
          terminals: [
            { id: 'sb2_3', componentId: 'sb2_start', pinIndex: 0, label: '3', position: { x: 292, y: 265 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'sb2_4', componentId: 'sb2_start', pinIndex: 1, label: '4', position: { x: 292, y: 325 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { pressed: false }
        },
        {
          id: 'km1_aux',
          type: 'aux_contact_no',
          category: 'contactor',
          tag: 'KM1',
          masterTag: 'KM1',
          position: { x: 350, y: 260 },
          rotation: 0,
          terminals: [
            { id: 'km1_aux_13', componentId: 'km1_aux', pinIndex: 0, label: '13', position: { x: 372, y: 265 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_aux_14', componentId: 'km1_aux', pinIndex: 1, label: '14', position: { x: 372, y: 325 }, offset: { x: 22, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { closed: false }
        },
        {
          id: 'km1_coil',
          type: 'contactor_coil',
          category: 'contactor',
          tag: 'KM1',
          position: { x: 300, y: 370 },
          rotation: 0,
          terminals: [
            { id: 'km1_c_A1', componentId: 'km1_coil', pinIndex: 0, label: 'A1', position: { x: 325, y: 375 }, offset: { x: 25, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'km1_c_A2', componentId: 'km1_coil', pinIndex: 1, label: 'A2', position: { x: 325, y: 435 }, offset: { x: 25, y: 65 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        },
        {
          id: 'hl1_run',
          type: 'indicator_lamp',
          category: 'signaling',
          tag: 'HL1 (Run)',
          position: { x: 430, y: 370 },
          rotation: 0,
          terminals: [
            { id: 'hl1_X1', componentId: 'hl1_run', pinIndex: 0, label: 'X1', position: { x: 452, y: 375 }, offset: { x: 22, y: 5 }, netId: null, potential: 'NONE' },
            { id: 'hl1_X2', componentId: 'hl1_run', pinIndex: 1, label: 'X2', position: { x: 452, y: 430 }, offset: { x: 22, y: 60 }, netId: null, potential: 'NONE' }
          ],
          state: { energized: false }
        }
      ],
      wires: [
        // Power connections
        { id: 'w_p1', from: { type: 'terminal', id: 'pwr_3p_L1' }, to: { type: 'terminal', id: 'qf1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p2', from: { type: 'terminal', id: 'pwr_3p_L2' }, to: { type: 'terminal', id: 'qf1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p3', from: { type: 'terminal', id: 'pwr_3p_L3' }, to: { type: 'terminal', id: 'qf1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p4', from: { type: 'terminal', id: 'qf1_2' }, to: { type: 'terminal', id: 'km1_p_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p5', from: { type: 'terminal', id: 'qf1_4' }, to: { type: 'terminal', id: 'km1_p_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p6', from: { type: 'terminal', id: 'qf1_6' }, to: { type: 'terminal', id: 'km1_p_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p7', from: { type: 'terminal', id: 'km1_p_2' }, to: { type: 'terminal', id: 'ol1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p8', from: { type: 'terminal', id: 'km1_p_4' }, to: { type: 'terminal', id: 'ol1_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p9', from: { type: 'terminal', id: 'km1_p_6' }, to: { type: 'terminal', id: 'ol1_5' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p10', from: { type: 'terminal', id: 'ol1_2' }, to: { type: 'terminal', id: 'm1_U' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p11', from: { type: 'terminal', id: 'ol1_4' }, to: { type: 'terminal', id: 'm1_V' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_p12', from: { type: 'terminal', id: 'ol1_6' }, to: { type: 'terminal', id: 'm1_W' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_pe', from: { type: 'terminal', id: 'pwr_3p_PE' }, to: { type: 'terminal', id: 'm1_PE' }, waypoints: [{ x: 200, y: 575 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },

        // Control connections
        // L1 to Fuse
        { id: 'w_c1', from: { type: 'terminal', id: 'pwr_3p_L1' }, to: { type: 'terminal', id: 'fu1_1' }, waypoints: [{ x: 100, y: 75 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        // Fuse to Stop SB1
        { id: 'w_c2', from: { type: 'terminal', id: 'fu1_2' }, to: { type: 'terminal', id: 'sb1_1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        // Stop SB1 to Start SB2 and Latch KM1-13 (Branching)
        { id: 'w_c3', from: { type: 'terminal', id: 'sb1_2' }, to: { type: 'junction', id: 'j_ctrl_top' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c4', from: { type: 'junction', id: 'j_ctrl_top' }, to: { type: 'terminal', id: 'sb2_3' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c5', from: { type: 'junction', id: 'j_ctrl_top' }, to: { type: 'terminal', id: 'km1_aux_13' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Start SB2 out and Latch KM1-14 to Coil A1 (Bottom Branch)
        { id: 'w_c6', from: { type: 'terminal', id: 'sb2_4' }, to: { type: 'junction', id: 'j_ctrl_bot' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c7', from: { type: 'terminal', id: 'km1_aux_14' }, to: { type: 'junction', id: 'j_ctrl_bot' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c8', from: { type: 'junction', id: 'j_ctrl_bot' }, to: { type: 'terminal', id: 'km1_c_A1' }, waypoints: [], routingMode: 'free', netId: null, potential: 'NONE', hasCurrent: false },

        // Parallel Run Lamp HL1 with Coil A1
        { id: 'w_c9', from: { type: 'terminal', id: 'km1_c_A1' }, to: { type: 'terminal', id: 'hl1_X1' }, waypoints: [{ x: 325, y: 360 }, { x: 452, y: 360 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },

        // Coil A2 to Overload NC 95-96 then to Neutral
        { id: 'w_c10', from: { type: 'terminal', id: 'km1_c_A2' }, to: { type: 'terminal', id: 'ol1_95' }, waypoints: [{ x: 325, y: 460 }, { x: 168, y: 460 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c11', from: { type: 'terminal', id: 'ol1_96' }, to: { type: 'terminal', id: 'pwr_3p_N' }, waypoints: [{ x: 185, y: 390 }, { x: 185, y: 90 }, { x: 175, y: 90 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false },
        { id: 'w_c12', from: { type: 'terminal', id: 'hl1_X2' }, to: { type: 'terminal', id: 'km1_c_A2' }, waypoints: [{ x: 452, y: 450 }, { x: 325, y: 450 }], routingMode: 'ortho', netId: null, potential: 'NONE', hasCurrent: false }
      ],
      junctions: [
        { id: 'j_ctrl_top', position: { x: 322, y: 245 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c3', 'w_c4', 'w_c5'] },
        { id: 'j_ctrl_bot', position: { x: 322, y: 345 }, netId: null, potential: 'NONE', connectedWireIds: ['w_c6', 'w_c7', 'w_c8'] }
      ]
    }
  }
];
