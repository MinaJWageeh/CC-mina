import { ComponentCategory, ComponentType, Point2D } from './circuit';

export interface PinDefinition {
  label: string;
  offset: Point2D;
  role: string;
  roleAr: string;
}

export interface ComponentDefinition {
  type: ComponentType;
  category: ComponentCategory;
  defaultTagPrefix: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  pins: PinDefinition[];
  width: number;
  height: number;
  hasStateToggle?: boolean;
}

export const COMPONENT_CATALOG: Record<ComponentType, ComponentDefinition> = {
  // POWER SOURCES
  source_3p_pe_n: {
    type: 'source_3p_pe_n',
    category: 'power',
    defaultTagPrefix: 'PWR',
    nameEn: '3-Phase AC Power Source',
    nameAr: 'مصدر قدرة ثلاثي الأوجه (380V/400V)',
    descriptionEn: 'Supplies 3-phase alternating current with Neutral and Protective Earth (L1, L2, L3, N, PE).',
    descriptionAr: 'يغذي الدائرة بثلاثة أطوار تيار متردد مع خط التعادل والأرضي (L1, L2, L3, N, PE).',
    width: 140,
    height: 40,
    pins: [
      { label: 'L1', offset: { x: 20, y: 35 }, role: 'Phase 1 (Red/Brown)', roleAr: 'الطور الأول (فاز 1)' },
      { label: 'L2', offset: { x: 45, y: 35 }, role: 'Phase 2 (Yellow/Black)', roleAr: 'الطور الثاني (فاز 2)' },
      { label: 'L3', offset: { x: 70, y: 35 }, role: 'Phase 3 (Blue/Grey)', roleAr: 'الطور الثالث (فاز 3)' },
      { label: 'N', offset: { x: 95, y: 35 }, role: 'Neutral (Cyan)', roleAr: 'خط التعادل (نيوترال)' },
      { label: 'PE', offset: { x: 120, y: 35 }, role: 'Protective Earth (Green)', roleAr: 'خط الحماية الأرضي' },
    ]
  },
  source_1p_n: {
    type: 'source_1p_n',
    category: 'power',
    defaultTagPrefix: 'PWR1',
    nameEn: 'Single-Phase AC Power Source',
    nameAr: 'مصدر قدرة أحادي الوجه (220V/230V)',
    descriptionEn: 'Single-phase 230V AC supply with Line, Neutral, and Ground.',
    descriptionAr: 'مصدر تيار متردد 230 فولت مع فازة ونيوترال وأرضي لدائرة التحكم.',
    width: 90,
    height: 40,
    pins: [
      { label: 'L', offset: { x: 20, y: 35 }, role: 'Live/Phase', roleAr: 'الطور (الكهرباء)' },
      { label: 'N', offset: { x: 45, y: 35 }, role: 'Neutral', roleAr: 'خط التعادل' },
      { label: 'PE', offset: { x: 70, y: 35 }, role: 'Earth', roleAr: 'الأرضي' },
    ]
  },
  source_dc_24v: {
    type: 'source_dc_24v',
    category: 'power',
    defaultTagPrefix: 'DC',
    nameEn: '24V DC Power Supply',
    nameAr: 'وحدة تغذية مستمرة 24V DC',
    descriptionEn: 'Regulated direct current power supply (+24V and 0V).',
    descriptionAr: 'مصدر جهد مستمر منظم 24 فولت لتغذية الريليهات والحساسات الإلكترونية.',
    width: 80,
    height: 40,
    pins: [
      { label: '+24V', offset: { x: 25, y: 35 }, role: 'Positive 24V DC', roleAr: 'القطب الموجب 24V' },
      { label: '0V', offset: { x: 55, y: 35 }, role: 'Negative 0V DC', roleAr: 'القطب السالب 0V' },
    ]
  },

  // PROTECTION
  mcb_3p: {
    type: 'mcb_3p',
    category: 'protection',
    defaultTagPrefix: 'QF',
    nameEn: '3-Pole Circuit Breaker (MCB 3P)',
    nameAr: 'قاطع ثلاثي الأوجه (MCB 3P)',
    descriptionEn: 'Protects the power line against overloads and short-circuits. Can be manually toggled.',
    descriptionAr: 'قاطع رئيسي لحماية دائرة القوى من القصر وزيادة التيار. يمكن فتحه وغلقه يدوياً.',
    width: 90,
    height: 90,
    hasStateToggle: true,
    pins: [
      { label: '1', offset: { x: 20, y: 5 }, role: 'L1 In', roleAr: 'دخل فازة 1' },
      { label: '3', offset: { x: 45, y: 5 }, role: 'L2 In', roleAr: 'دخل فازة 2' },
      { label: '5', offset: { x: 70, y: 5 }, role: 'L3 In', roleAr: 'دخل فازة 3' },
      { label: '2', offset: { x: 20, y: 85 }, role: 'L1 Out', roleAr: 'خرج فازة 1' },
      { label: '4', offset: { x: 45, y: 85 }, role: 'L2 Out', roleAr: 'خرج فازة 2' },
      { label: '6', offset: { x: 70, y: 85 }, role: 'L3 Out', roleAr: 'خرج فازة 3' },
    ]
  },
  mcb_1p: {
    type: 'mcb_1p',
    category: 'protection',
    defaultTagPrefix: 'F',
    nameEn: '1-Pole Circuit Breaker (MCB 1P)',
    nameAr: 'قاطع أحادي الوجه لدائرة التحكم (MCB 1P)',
    descriptionEn: 'Miniature circuit breaker to protect the control circuit.',
    descriptionAr: 'قاطع أحادي لحماية دائرة الكنترول من تيارات القصر الزائدة.',
    width: 40,
    height: 90,
    hasStateToggle: true,
    pins: [
      { label: '1', offset: { x: 20, y: 5 }, role: 'Line In', roleAr: 'دخل الكهرباء' },
      { label: '2', offset: { x: 20, y: 85 }, role: 'Line Out', roleAr: 'خرج الكهرباء' },
    ]
  },
  fuse_3p: {
    type: 'fuse_3p',
    category: 'protection',
    defaultTagPrefix: 'FU',
    nameEn: '3-Phase Fuse Block',
    nameAr: 'مجموعة مصاهر ثلاثية الأوجه (Fuses 3P)',
    descriptionEn: 'Three cartridge fuses providing sacrificial overcurrent protection.',
    descriptionAr: 'مجموعة مصاهر حرارية ثلاثية لفصل الدائرة فورياً عند حدوث قصر.',
    width: 90,
    height: 80,
    pins: [
      { label: '1', offset: { x: 20, y: 5 }, role: 'Fuse 1 In', roleAr: 'دخل المصهر 1' },
      { label: '3', offset: { x: 45, y: 5 }, role: 'Fuse 2 In', roleAr: 'دخل المصهر 2' },
      { label: '5', offset: { x: 70, y: 5 }, role: 'Fuse 3 In', roleAr: 'دخل المصهر 3' },
      { label: '2', offset: { x: 20, y: 75 }, role: 'Fuse 1 Out', roleAr: 'خرج المصهر 1' },
      { label: '4', offset: { x: 45, y: 75 }, role: 'Fuse 2 Out', roleAr: 'خرج المصهر 2' },
      { label: '6', offset: { x: 70, y: 75 }, role: 'Fuse 3 Out', roleAr: 'خرج المصهر 3' },
    ]
  },
  fuse_1p: {
    type: 'fuse_1p',
    category: 'protection',
    defaultTagPrefix: 'FU',
    nameEn: 'Single Fuse',
    nameAr: 'مصهر أحادي (Fuse 1P)',
    descriptionEn: 'Single cartridge fuse for control loop protection.',
    descriptionAr: 'مصهر أحادي سريع لحماية ملفات التحكم.',
    width: 40,
    height: 70,
    pins: [
      { label: '1', offset: { x: 20, y: 5 }, role: 'Fuse In', roleAr: 'دخل المصهر' },
      { label: '2', offset: { x: 20, y: 65 }, role: 'Fuse Out', roleAr: 'خرج المصهر' },
    ]
  },
  overload_relay: {
    type: 'overload_relay',
    category: 'protection',
    defaultTagPrefix: 'OL',
    nameEn: 'Thermal Overload Relay',
    nameAr: 'ريليه الحماية الحرارية (الأوفرلود Overload)',
    descriptionEn: 'Bimetallic relay protecting against motor overheating. Features 95-96 (NC trip) and 97-98 (NO alarm).',
    descriptionAr: 'ريليه حراري لحماية المحرك من ارتفاع الحمل. يضم نقطة فصل مغلقة 95-96 ونقطة إنذار مفتوحة 97-98.',
    width: 110,
    height: 100,
    hasStateToggle: true,
    pins: [
      // Power pass-through
      { label: '1', offset: { x: 20, y: 5 }, role: 'Main L1 In', roleAr: 'دخل قدرة 1' },
      { label: '3', offset: { x: 45, y: 5 }, role: 'Main L2 In', roleAr: 'دخل قدرة 2' },
      { label: '5', offset: { x: 70, y: 5 }, role: 'Main L3 In', roleAr: 'دخل قدرة 3' },
      { label: '2', offset: { x: 20, y: 95 }, role: 'Main L1 Out (to U)', roleAr: 'خرج قدرة 1' },
      { label: '4', offset: { x: 45, y: 95 }, role: 'Main L2 Out (to V)', roleAr: 'خرج قدرة 2' },
      { label: '6', offset: { x: 70, y: 95 }, role: 'Main L3 Out (to W)', roleAr: 'خرج قدرة 3' },
      // Auxiliary control contacts
      { label: '95', offset: { x: 88, y: 15 }, role: 'Trip NC In', roleAr: 'دخل نقطة الفصل 95' },
      { label: '96', offset: { x: 88, y: 40 }, role: 'Trip NC Out', roleAr: 'خرج نقطة الفصل 96' },
      { label: '97', offset: { x: 88, y: 65 }, role: 'Alarm NO In', roleAr: 'دخل نقطة الإنذار 97' },
      { label: '98', offset: { x: 88, y: 88 }, role: 'Alarm NO Out', roleAr: 'خرج نقطة الإنذار 98' },
    ]
  },
  phase_failure_relay: {
    type: 'phase_failure_relay',
    category: 'protection',
    defaultTagPrefix: 'PFR',
    nameEn: 'Phase Failure & Sequence Relay',
    nameAr: 'ريليه مراقبة وسقوط وتتابع الفازات (Phase Sequence)',
    descriptionEn: 'Monitors 3-phase line balance and sequence. Opens contact 11-14 upon phase loss or inversion.',
    descriptionAr: 'يراقب وجود الفازات الثلاث وترتيبها الصحيح. يفصل النقطة 11-14 عند سقوط أو انعكاس أي فازة.',
    width: 100,
    height: 90,
    pins: [
      { label: 'L1', offset: { x: 20, y: 5 }, role: 'Sense L1', roleAr: 'مستشعر فازة 1' },
      { label: 'L2', offset: { x: 45, y: 5 }, role: 'Sense L2', roleAr: 'مستشعر فازة 2' },
      { label: 'L3', offset: { x: 70, y: 5 }, role: 'Sense L3', roleAr: 'مستشعر فازة 3' },
      { label: '11', offset: { x: 25, y: 85 }, role: 'Common Contact', roleAr: 'النقطة المشتركة 11' },
      { label: '12', offset: { x: 50, y: 85 }, role: 'Fault NC Contact', roleAr: 'نقطة مغلقة عطل 12' },
      { label: '14', offset: { x: 75, y: 85 }, role: 'Normal NO Contact', roleAr: 'نقطة تشغيل طبيعي 14' },
    ]
  },

  // CONTACTORS & RELAYS
  contactor_coil: {
    type: 'contactor_coil',
    category: 'contactor',
    defaultTagPrefix: 'KM',
    nameEn: 'Contactor Coil (A1-A2)',
    nameAr: 'ملف الكونتاكتور (Coil A1-A2)',
    descriptionEn: 'Electromagnetic coil. Energizing closes linked main and NO auxiliary contacts and opens NC contacts.',
    descriptionAr: 'الملف الكهرومغناطيسي للكونتاكتور. عند وصول الجهد لطرفيه A1-A2 يجذب القلب الحديدي لتغيير وضع نقاطه.',
    width: 50,
    height: 70,
    pins: [
      { label: 'A1', offset: { x: 25, y: 5 }, role: 'Coil Terminal A1 (+ / Line)', roleAr: 'طرف الملف A1 (الكهرباء)' },
      { label: 'A2', offset: { x: 25, y: 65 }, role: 'Coil Terminal A2 (- / Neutral)', roleAr: 'طرف الملف A2 (النيوترال)' },
    ]
  },
  contactor_main_3p: {
    type: 'contactor_main_3p',
    category: 'contactor',
    defaultTagPrefix: 'KM',
    nameEn: '3-Pole Main Power Contacts',
    nameAr: 'نقاط التلامس الرئيسية للكونتاكتور (1-2, 3-4, 5-6)',
    descriptionEn: 'Heavy duty normally open contacts that switch 3-phase power to the motor when coil is energized.',
    descriptionAr: 'نقاط القدرة الرئيسية المفتوحة. تغلق فورياً عند تغذية ملف الكونتاكتور لتوصيل الكهرباء للمحرك.',
    width: 90,
    height: 80,
    pins: [
      { label: '1', offset: { x: 20, y: 5 }, role: 'L1 In', roleAr: 'دخل فازة 1' },
      { label: '3', offset: { x: 45, y: 5 }, role: 'L2 In', roleAr: 'دخل فازة 2' },
      { label: '5', offset: { x: 70, y: 5 }, role: 'L3 In', roleAr: 'دخل فازة 3' },
      { label: '2', offset: { x: 20, y: 75 }, role: 'L1 Out', roleAr: 'خرج فازة 1' },
      { label: '4', offset: { x: 45, y: 75 }, role: 'L2 Out', roleAr: 'خرج فازة 2' },
      { label: '6', offset: { x: 70, y: 75 }, role: 'L3 Out', roleAr: 'خرج فازة 3' },
    ]
  },
  aux_contact_no: {
    type: 'aux_contact_no',
    category: 'contactor',
    defaultTagPrefix: 'KM',
    nameEn: 'Auxiliary Contact NO (13-14)',
    nameAr: 'نقطة مساعدة مفتوحة NO (13-14 / 23-24)',
    descriptionEn: 'Normally Open auxiliary contact used for holding / latching circuits and indication.',
    descriptionAr: 'نقطة مساعدة مفتوحة طبيعياً، تستخدم للاستمرارية (Latch) مع مفتاح التشغيل أو إشارات التشغيل.',
    width: 45,
    height: 70,
    pins: [
      { label: '13', offset: { x: 22, y: 5 }, role: 'Terminal 13 (In)', roleAr: 'طرف الدخل 13' },
      { label: '14', offset: { x: 22, y: 65 }, role: 'Terminal 14 (Out)', roleAr: 'طرف الخرج 14' },
    ]
  },
  aux_contact_nc: {
    type: 'aux_contact_nc',
    category: 'contactor',
    defaultTagPrefix: 'KM',
    nameEn: 'Auxiliary Contact NC (21-22)',
    nameAr: 'نقطة مساعدة مغلقة NC (21-22 / 31-32)',
    descriptionEn: 'Normally Closed auxiliary contact used for electrical interlocking and safety stop chains.',
    descriptionAr: 'نقطة مساعدة مغلقة طبيعياً، تستخدم للإنترلوك الكهربائي (التعشيق المانع) بين الكونتاكتورات المتضادة.',
    width: 45,
    height: 70,
    pins: [
      { label: '21', offset: { x: 22, y: 5 }, role: 'Terminal 21 (In)', roleAr: 'طرف الدخل 21' },
      { label: '22', offset: { x: 22, y: 65 }, role: 'Terminal 22 (Out)', roleAr: 'طرف الخرج 22' },
    ]
  },
  control_relay_coil: {
    type: 'control_relay_coil',
    category: 'relay',
    defaultTagPrefix: 'KA',
    nameEn: 'Control Relay Coil (KA)',
    nameAr: 'ملف ريليه تحكم مساعد (Relay Coil)',
    descriptionEn: 'Compact intermediate control relay coil with rapid switching dynamics.',
    descriptionAr: 'ملف ريليه مساعد خفيف لعمليات التتابع المنطقي ومضاعفة نقاط التلامس.',
    width: 45,
    height: 65,
    pins: [
      { label: 'A1', offset: { x: 22, y: 5 }, role: 'Coil A1', roleAr: 'طرف الملف A1' },
      { label: 'A2', offset: { x: 22, y: 60 }, role: 'Coil A2', roleAr: 'طرف الملف A2' },
    ]
  },

  // TIMERS
  timer_on_delay: {
    type: 'timer_on_delay',
    category: 'timer',
    defaultTagPrefix: 'KT',
    nameEn: 'On-Delay Timer Relay (TON)',
    nameAr: 'مؤقت تأخير تشغيل (On-Delay Timer)',
    descriptionEn: 'Starts countdown when energized; changes contacts only after preset time expires.',
    descriptionAr: 'يبدأ العد التنازلي عند وصول الجهد؛ وتغير نقاطه وضعها فقط بعد انتهاء الزمن المضبوط.',
    width: 60,
    height: 80,
    pins: [
      { label: 'A1', offset: { x: 30, y: 5 }, role: 'Timer Power In', roleAr: 'تغذية المؤقت A1' },
      { label: 'A2', offset: { x: 30, y: 75 }, role: 'Timer Power Neutral', roleAr: 'تغذية المؤقت A2' },
    ]
  },
  timer_off_delay: {
    type: 'timer_off_delay',
    category: 'timer',
    defaultTagPrefix: 'KT',
    nameEn: 'Off-Delay Timer Relay (TOF)',
    nameAr: 'مؤقت تأخير إيقاف (Off-Delay Timer)',
    descriptionEn: 'Actuates immediately when powered; delays resetting contacts until preset time after power is removed.',
    descriptionAr: 'تتحول نقاطه فورياً عند تشغيله، ويؤخر رجوع نقاطه لوضعها الطبيعي بعد فصل التغذية عنه.',
    width: 60,
    height: 80,
    pins: [
      { label: 'A1', offset: { x: 30, y: 5 }, role: 'Timer Power In', roleAr: 'تغذية المؤقت A1' },
      { label: 'A2', offset: { x: 30, y: 75 }, role: 'Timer Power Neutral', roleAr: 'تغذية المؤقت A2' },
    ]
  },
  timer_flasher: {
    type: 'timer_flasher',
    category: 'timer',
    defaultTagPrefix: 'KT',
    nameEn: 'Flasher / Cycler Timer',
    nameAr: 'مؤقت فليشر دوري (Cycler / Flasher Timer)',
    descriptionEn: 'Alternates contacts between open and closed cyclically while power is applied.',
    descriptionAr: 'يقلب نقاط التلامس دورياً بين فتح وغلق بمعدل نبضات منتظم طالما استمرت التغذية.',
    width: 60,
    height: 80,
    pins: [
      { label: 'A1', offset: { x: 30, y: 5 }, role: 'Flasher Power In', roleAr: 'دخل المؤقت A1' },
      { label: 'A2', offset: { x: 30, y: 75 }, role: 'Flasher Neutral', roleAr: 'نيوترال المؤقت A2' },
    ]
  },
  timer_star_delta: {
    type: 'timer_star_delta',
    category: 'timer',
    defaultTagPrefix: 'KT',
    nameEn: 'Dedicated Star-Delta Timer',
    nameAr: 'مؤقت ستار-دلتا متخصص (Star-Delta Timer)',
    descriptionEn: 'Specialized motor starter timer with built-in 50ms dwell pause between Star and Delta contactors.',
    descriptionAr: 'تايمر مخصص لبدء المحركات؛ يضمن وجود فترة فاصلة (50ms) بين فصل كونتاكتور ستار وتوصيل دلتا لتفادي القصر.',
    width: 70,
    height: 85,
    pins: [
      { label: 'A1', offset: { x: 35, y: 5 }, role: 'Power A1', roleAr: 'تغذية A1' },
      { label: 'A2', offset: { x: 35, y: 80 }, role: 'Power A2', roleAr: 'تغذية A2' },
    ]
  },
  timer_contact_no: {
    type: 'timer_contact_no',
    category: 'timer',
    defaultTagPrefix: 'KT',
    nameEn: 'Timed Contact NO (57-58 / 17-18)',
    nameAr: 'نقطة مؤقت مفتوحة تأخير تشغيل (NO Timed)',
    descriptionEn: 'Normally open contact that closes after the timer preset duration.',
    descriptionAr: 'نقطة تلامس مفتوحة تغلق بعد انتهاء العد التنازلي للتايمر.',
    width: 45,
    height: 70,
    pins: [
      { label: '57', offset: { x: 22, y: 5 }, role: 'Terminal 57 (In)', roleAr: 'طرف الدخل 57' },
      { label: '58', offset: { x: 22, y: 65 }, role: 'Terminal 58 (Out)', roleAr: 'طرف الخرج 58' },
    ]
  },
  timer_contact_nc: {
    type: 'timer_contact_nc',
    category: 'timer',
    defaultTagPrefix: 'KT',
    nameEn: 'Timed Contact NC (55-56 / 15-16)',
    nameAr: 'نقطة مؤقت مغلقة تأخير تشغيل (NC Timed)',
    descriptionEn: 'Normally closed contact that opens after the timer preset duration.',
    descriptionAr: 'نقطة تلامس مغلقة تفتح بعد انتهاء العد التنازلي للتايمر.',
    width: 45,
    height: 70,
    pins: [
      { label: '55', offset: { x: 22, y: 5 }, role: 'Terminal 55 (In)', roleAr: 'طرف الدخل 55' },
      { label: '56', offset: { x: 22, y: 65 }, role: 'Terminal 56 (Out)', roleAr: 'طرف الخرج 56' },
    ]
  },

  // SWITCHES & CONTROLS
  pushbutton_no: {
    type: 'pushbutton_no',
    category: 'switch',
    defaultTagPrefix: 'SB',
    nameEn: 'Start Push Button (NO)',
    nameAr: 'زر تشغيل ضاغط مفتوح (Start NO)',
    descriptionEn: 'Momentary normally open push button. Conducts electricity only while pressed.',
    descriptionAr: 'زر ضاغط مفتوح لحظياً (أخضر). يمرر الكهرباء أثناء الضغط عليه فقط ويعود بياي زنبركي.',
    width: 45,
    height: 70,
    hasStateToggle: true,
    pins: [
      { label: '3', offset: { x: 22, y: 5 }, role: 'Terminal 3 (In)', roleAr: 'طرف الدخل 3' },
      { label: '4', offset: { x: 22, y: 65 }, role: 'Terminal 4 (Out)', roleAr: 'طرف الخرج 4' },
    ]
  },
  pushbutton_nc: {
    type: 'pushbutton_nc',
    category: 'switch',
    defaultTagPrefix: 'SB',
    nameEn: 'Stop Push Button (NC)',
    nameAr: 'زر إيقاف ضاغط مغلق (Stop NC)',
    descriptionEn: 'Momentary normally closed push button. Breaks the circuit when pressed.',
    descriptionAr: 'زر ضاغط مغلق لحظياً (أحمر). يقطع الدائرة ويفصل التغذية عن الملفات فور الضغط عليه.',
    width: 45,
    height: 70,
    hasStateToggle: true,
    pins: [
      { label: '1', offset: { x: 22, y: 5 }, role: 'Terminal 1 (In)', roleAr: 'طرف الدخل 1' },
      { label: '2', offset: { x: 22, y: 65 }, role: 'Terminal 2 (Out)', roleAr: 'طرف الخرج 2' },
    ]
  },
  emergency_stop: {
    type: 'emergency_stop',
    category: 'switch',
    defaultTagPrefix: 'ES',
    nameEn: 'Emergency Stop Mushroom Button',
    nameAr: 'زر طوارئ لطاش مع قفل (Emergency Stop)',
    descriptionEn: 'Latching mushroom head push button. Breaks circuit and locks until mechanically twisted to release.',
    descriptionAr: 'زر طوارئ بمفتاح لطاش يقطع الدائرة الرئيسية فوراً ويغلق ميكانيكياً حتى يتم تدويره لفك القفل.',
    width: 50,
    height: 75,
    hasStateToggle: true,
    pins: [
      { label: '1', offset: { x: 25, y: 5 }, role: 'E-Stop In (1)', roleAr: 'دخل الطوارئ 1' },
      { label: '2', offset: { x: 25, y: 70 }, role: 'E-Stop Out (2)', roleAr: 'خرج الطوارئ 2' },
    ]
  },
  selector_2pos: {
    type: 'selector_2pos',
    category: 'switch',
    defaultTagPrefix: 'SA',
    nameEn: '2-Position Selector Switch (0-1)',
    nameAr: 'مفتاح اختيار بوضعين (Selector 0-1)',
    descriptionEn: 'Maintained rotary selector switch to enable/disable or toggle operating modes.',
    descriptionAr: 'مفتاح دوار بوضعين ثابتين لتشغيل أو إيقاف دائرة أو مسار معين.',
    width: 50,
    height: 70,
    hasStateToggle: true,
    pins: [
      { label: '1', offset: { x: 25, y: 5 }, role: 'Common In', roleAr: 'طرف الدخل المشترك' },
      { label: '2', offset: { x: 25, y: 65 }, role: 'Position 1 Out', roleAr: 'خرج الوضع 1' },
    ]
  },
  selector_3pos_hoa: {
    type: 'selector_3pos_hoa',
    category: 'switch',
    defaultTagPrefix: 'SA',
    nameEn: 'Hand-Off-Auto Selector (HOA 1-0-2)',
    nameAr: 'مفتاح اختيار ثلاثي (يدوي - إيقاف - أوتوماتيك)',
    descriptionEn: '3-Position switch: Left = Hand/Manual, Center = Off, Right = Auto.',
    descriptionAr: 'مفتاح اختيار ثلاثي المواضع: يسار (يدوي)، منتصف (إيقاف)، يمين (أوتوماتيكي مع الحساسات).',
    width: 70,
    height: 70,
    hasStateToggle: true,
    pins: [
      { label: 'C', offset: { x: 35, y: 5 }, role: 'Common Supply In', roleAr: 'الطرف المشترك C' },
      { label: 'H', offset: { x: 18, y: 65 }, role: 'Hand / Manual Out', roleAr: 'خرج الوضع اليدوي H' },
      { label: 'A', offset: { x: 52, y: 65 }, role: 'Auto Out', roleAr: 'خرج الوضع التلقائي A' },
    ]
  },
  limit_switch_no: {
    type: 'limit_switch_no',
    category: 'sensor',
    defaultTagPrefix: 'SQ',
    nameEn: 'Limit Switch NO',
    nameAr: 'مفتاح نهاية شوط مفتوح (Limit Switch NO)',
    descriptionEn: 'Mechanical switch actuated by moving machinery at the end of travel.',
    descriptionAr: 'مفتاح نهاية شوط مفتوح يتغير وضعه ميكانيكياً عند ملامسة العربة أو الباب المتحرك.',
    width: 45,
    height: 70,
    hasStateToggle: true,
    pins: [
      { label: '13', offset: { x: 22, y: 5 }, role: 'In (13)', roleAr: 'طرف 13' },
      { label: '14', offset: { x: 22, y: 65 }, role: 'Out (14)', roleAr: 'طرف 14' },
    ]
  },
  limit_switch_nc: {
    type: 'limit_switch_nc',
    category: 'sensor',
    defaultTagPrefix: 'SQ',
    nameEn: 'Limit Switch NC',
    nameAr: 'مفتاح نهاية شوط مغلق (Limit Switch NC)',
    descriptionEn: 'Mechanical limit switch opening when machine carriage reaches travel boundary.',
    descriptionAr: 'مفتاح نهاية شوط مغلق يفصل الحركة عند وصول الآلية إلى نهاية المسار المحدد.',
    width: 45,
    height: 70,
    hasStateToggle: true,
    pins: [
      { label: '11', offset: { x: 22, y: 5 }, role: 'In (11)', roleAr: 'طرف 11' },
      { label: '12', offset: { x: 22, y: 65 }, role: 'Out (12)', roleAr: 'طرف 12' },
    ]
  },
  float_switch: {
    type: 'float_switch',
    category: 'sensor',
    defaultTagPrefix: 'SL',
    nameEn: 'Liquid Level Float Switch',
    nameAr: 'عوامة مراقبة مستوى السائل (Float Switch)',
    descriptionEn: 'Float-operated switch for automatic tank filling or drainage pump control.',
    descriptionAr: 'مفتاح عوامة كهربائي لمراقبة امتلاء أو تفريغ خزانات المياه والمضخات تلقائياً.',
    width: 50,
    height: 75,
    hasStateToggle: true,
    pins: [
      { label: 'C', offset: { x: 25, y: 5 }, role: 'Common Lead', roleAr: 'الطرف المشترك' },
      { label: 'NO', offset: { x: 15, y: 70 }, role: 'NO Level High', roleAr: 'مستوى مرتفع NO' },
      { label: 'NC', offset: { x: 35, y: 70 }, role: 'NC Level Low', roleAr: 'مستوى منخفض NC' },
    ]
  },

  // LOADS & ACTUATORS
  motor_3p_3wire: {
    type: 'motor_3p_3wire',
    category: 'load',
    defaultTagPrefix: 'M',
    nameEn: '3-Phase Induction Motor (U, V, W)',
    nameAr: 'محرك حثي ثلاثي الأوجه (3-Phase Motor)',
    descriptionEn: 'Standard squirrel-cage induction motor. Speed and direction depend on applied phase sequence.',
    descriptionAr: 'محرك قفص سنجابي قياسي. يدور يميناً أو يساراً بناءً على تتابع الفازات الثلاث.',
    width: 90,
    height: 100,
    pins: [
      { label: 'U', offset: { x: 20, y: 5 }, role: 'Phase 1 Terminal U', roleAr: 'طرف الفازة الأولى U' },
      { label: 'V', offset: { x: 45, y: 5 }, role: 'Phase 2 Terminal V', roleAr: 'طرف الفازة الثانية V' },
      { label: 'W', offset: { x: 70, y: 5 }, role: 'Phase 3 Terminal W', roleAr: 'طرف الفازة الثالثة W' },
      { label: 'PE', offset: { x: 45, y: 95 }, role: 'Earth Ground', roleAr: 'أرضي جسم المحرك' },
    ]
  },
  motor_3p_6wire: {
    type: 'motor_3p_6wire',
    category: 'load',
    defaultTagPrefix: 'M',
    nameEn: '3-Phase Motor (6 Terminals for Star-Delta)',
    nameAr: 'محرك 3 فاز بستة أطراف (ستار-دلتا U1-V1-W1 / U2-V2-W2)',
    descriptionEn: 'Induction motor with open coil ends allowing external Star (Y) or Delta (Δ) contactor connections.',
    descriptionAr: 'محرك بستة أطراف حرة لبدايات ونهايات الملفات للتوصيل الخارجي في دوائر ستار-دلتا.',
    width: 100,
    height: 110,
    pins: [
      { label: 'U1', offset: { x: 20, y: 5 }, role: 'Coil 1 In (U1)', roleAr: 'بداية ملف 1 (U1)' },
      { label: 'V1', offset: { x: 50, y: 5 }, role: 'Coil 2 In (V1)', roleAr: 'بداية ملف 2 (V1)' },
      { label: 'W1', offset: { x: 80, y: 5 }, role: 'Coil 3 In (W1)', roleAr: 'بداية ملف 3 (W1)' },
      { label: 'W2', offset: { x: 20, y: 105 }, role: 'Coil 3 Out (W2)', roleAr: 'نهاية ملف 3 (W2)' },
      { label: 'U2', offset: { x: 50, y: 105 }, role: 'Coil 1 Out (U2)', roleAr: 'نهاية ملف 1 (U2)' },
      { label: 'V2', offset: { x: 80, y: 105 }, role: 'Coil 2 Out (V2)', roleAr: 'نهاية ملف 2 (V2)' },
    ]
  },
  motor_1p: {
    type: 'motor_1p',
    category: 'load',
    defaultTagPrefix: 'M',
    nameEn: 'Single-Phase AC Motor',
    nameAr: 'محرك أحادي الوجه (220V 1-Phase Motor)',
    descriptionEn: 'Single-phase AC motor for fans, pumps, and light commercial appliances.',
    descriptionAr: 'محرك أحادي الطور 220 فولت مع مكثف تشغيل مدمج.',
    width: 70,
    height: 90,
    pins: [
      { label: 'L', offset: { x: 25, y: 5 }, role: 'Live Terminal', roleAr: 'طرف الفازة L' },
      { label: 'N', offset: { x: 45, y: 5 }, role: 'Neutral Terminal', roleAr: 'طرف النيوترال N' },
      { label: 'PE', offset: { x: 35, y: 85 }, role: 'Earth Terminal', roleAr: 'طرف التأريض' },
    ]
  },
  indicator_lamp: {
    type: 'indicator_lamp',
    category: 'signaling',
    defaultTagPrefix: 'HL',
    nameEn: 'Indicator Lamp (Pilot Light)',
    nameAr: 'لمبة بيان وإشارة (Indicator Lamp)',
    descriptionEn: 'Visual signaling lamp emitting vibrant radial light when powered (Run, Stop, Fault).',
    descriptionAr: 'لمبة إشارة ضوئية تشع نوراً ملوناً واضحاً للدلالة على حالة التشغيل أو الإيقاف أو العطل.',
    width: 45,
    height: 65,
    pins: [
      { label: 'X1', offset: { x: 22, y: 5 }, role: 'Lamp Terminal X1 (Line)', roleAr: 'طرف اللمبة X1 (الكهرباء)' },
      { label: 'X2', offset: { x: 22, y: 60 }, role: 'Lamp Terminal X2 (Neutral)', roleAr: 'طرف اللمبة X2 (النيوترال)' },
    ]
  },
  buzzer_alarm: {
    type: 'buzzer_alarm',
    category: 'signaling',
    defaultTagPrefix: 'HA',
    nameEn: 'Acoustic Alarm Horn / Buzzer',
    nameAr: 'سارينة إنذار صوتي (Alarm Buzzer)',
    descriptionEn: 'Audible alarm siren emitting sound alert when energized on fault or warning conditions.',
    descriptionAr: 'سارينة إنذار صوتية تنطلق بصوت تنبيه تحذيري عند حدوث عطل كارتفاع الحمل أو الطوارئ.',
    width: 45,
    height: 65,
    pins: [
      { label: '1', offset: { x: 22, y: 5 }, role: 'Buzzer In (+ / Line)', roleAr: 'طرف الدخل 1' },
      { label: '2', offset: { x: 22, y: 60 }, role: 'Buzzer Ground (- / Neutral)', roleAr: 'طرف الأرضي 2' },
    ]
  }
};
