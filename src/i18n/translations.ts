export interface TranslationDictionary {
  appTitle: string;
  appSubtitle: string;
  designMode: string;
  runMode: string;
  play: string;
  pause: string;
  step: string;
  reset: string;
  speed: string;
  undo: string;
  redo: string;
  zoomIn: string;
  zoomOut: string;
  zoomFit: string;
  delete: string;
  clearAll: string;
  examples: string;
  exportPdf: string;
  exportPng: string;
  soundOn: string;
  soundOff: string;
  themeLight: string;
  themeDark: string;
  langEn: string;
  langAr: string;
  presentationMode: string;
  laserPen: string;
  multimeter: string;
  clearLaser: string;
  help: string;
  helpModal: {
    title: string;
    subtitle: string;
    tabQuickStart: string;
    tabWiring: string;
    tabComponents: string;
    tabTools: string;
    tabShortcuts: string;
  };
  categories: {
    power: string;
    protection: string;
    contactor: string;
    relay: string;
    timer: string;
    switch: string;
    sensor: string;
    load: string;
    signaling: string;
  };
  properties: {
    title: string;
    tag: string;
    bindToMaster: string;
    none: string;
    label: string;
    rotation: string;
    timerPreset: string;
    lampColor: string;
    seconds: string;
    state: string;
    tripped: string;
    resetOverload: string;
    testOverload: string;
    open: string;
    closed: string;
  };
  multimeterModal: {
    title: string;
    acVoltage: string;
    acCurrent: string;
    dcVoltage: string;
    continuity: string;
    probeRed: string;
    probeBlack: string;
    clampTarget: string;
    clampDesc: string;
    notConnected: string;
  };
  examplesModal: {
    title: string;
    easy: string;
    medium: string;
    advanced: string;
    loadCircuit: string;
    active: string;
  };
  tooltips: {
    pinDesignation: string;
    role: string;
    status: string;
    energized: string;
    deEnergized: string;
    shiftHint: string;
    branchHint: string;
  };
  faultAlert: {
    shortCircuit: string;
    shortCircuitMsg: string;
    dismiss: string;
  };
}

export const translations: Record<'ar' | 'en', TranslationDictionary> = {
  ar: {
    appTitle: 'Classic Control Studio',
    appSubtitle: 'محاكي التحكم الآلي والكلاسيك كنترول المتطور',
    designMode: 'وضع التصميم والتحرير',
    runMode: 'وضع التشغيل الحي',
    play: 'تشغيل',
    pause: 'إيقاف مؤقت',
    step: 'خطوة',
    reset: 'إعادة ضبط',
    speed: 'السرعة',
    undo: 'تراجع',
    redo: 'إعادة',
    zoomIn: 'تكبير',
    zoomOut: 'تصغير',
    zoomFit: 'ملاءمة الشاشة',
    delete: 'حذف',
    clearAll: 'مسح اللوحة',
    examples: 'الدوائر التعليمية',
    exportPdf: 'تصدير PDF',
    exportPng: 'تصدير صورة PNG',
    soundOn: 'كتم الصوت',
    soundOff: 'تشغيل الصوت',
    themeLight: 'الوضع النهاري',
    themeDark: 'الوضع الليلي',
    langEn: 'English',
    langAr: 'العربية',
    presentationMode: 'وضع الشرح والعرض',
    laserPen: 'قلم الشرح الفسفوري',
    multimeter: 'جهاز الأفوميتر',
    clearLaser: 'مسح الرسم',
    help: 'دليل الاستخدام',
    helpModal: {
      title: 'دليل استخدام Classic Control Studio',
      subtitle: 'دليلك الشامل لتعلم وتصميم ومحاكاة دوائر التحكم الآلي والكلاسيك كنترول',
      tabQuickStart: '⚡ البداية السريعة',
      tabWiring: '🔌 توصيل الأسلاك والتفريعات',
      tabComponents: '🔘 العناصر والتحكم اللحظي',
      tabTools: '📟 أجهزة القياس والشرح',
      tabShortcuts: '⌨️ اختصارات الكيبورد',
    },
    categories: {
      power: 'مصادر القدرة والتغذية',
      protection: 'القواطع والحماية',
      contactor: 'الكونتاكتورات ونقاط التلامس',
      relay: 'الريليهات المساعدة',
      timer: 'المؤقتات الزمنية (Timers)',
      switch: 'مفاتيح التشغيل والأزرار',
      sensor: 'الحساسات ونهاية الشوط',
      load: 'الأحمال والمحركات',
      signaling: 'الإشارات والإنذار',
    },
    properties: {
      title: 'خصائص العنصر',
      tag: 'الرمز التعريفي (Tag)',
      bindToMaster: 'ربط بملف رئيسي',
      none: 'بدون ربط',
      label: 'الوصف أو المسمى',
      rotation: 'زاوية التدوير',
      timerPreset: 'زمن الضبط (ثواني)',
      lampColor: 'لون لمبة البيان',
      seconds: 'ثواني',
      state: 'الحالة',
      tripped: 'مفصول حماية (Tripped)',
      resetOverload: 'إعادة ضبط الأوفرلود (Reset)',
      testOverload: 'اختبار الفصل (Test Trip)',
      open: 'مفتوح',
      closed: 'مغلق',
    },
    multimeterModal: {
      title: 'الأفوميتر وبنسة الأمبير (Multimeter & Clamp)',
      acVoltage: 'جهد متردد (V AC)',
      acCurrent: 'شدة تيار (A AC)',
      dcVoltage: 'جهد مستمر (V DC)',
      continuity: 'فحص التوصيل (Ω)',
      probeRed: 'المجس الأحمر (+)',
      probeBlack: 'المجس الأسود (-)',
      clampTarget: 'قياس التيار (بنسة الأمبير / خط الحمل)',
      clampDesc: 'اختر المحرك أو الملف أو السلك لقياس تيار التشغيل الحقيقي',
      notConnected: 'غير متصل بطرف',
    },
    examplesModal: {
      title: 'مكتبة الدوائر الكلاسيكية الجاهزة',
      easy: 'المستوى الأول: أساسيات التحكم (سهل)',
      medium: 'المستوى الثاني: دوائر تشغيل وتتابع (متوسط)',
      advanced: 'المستوى الثالث: منظومات صناعية متقدمة (صعب)',
      loadCircuit: 'فتح وتشغيل الدائرة',
      active: 'الدائرة الحالية',
    },
    tooltips: {
      pinDesignation: 'تسمية الطرف القياسية:',
      role: 'الوظيفة الصناعية:',
      status: 'الحالة الكهربية:',
      energized: 'مشحون بجهد كهربي (Live)',
      deEnergized: 'مطفأ / بدون جهد (Off)',
      shiftHint: 'اضغط Shift لتوجيه السلك بزوايا 90° قائمة',
      branchHint: 'اضغط على أي سلك لإنشاء تفريع جديد (T-Junction)',
    },
    faultAlert: {
      shortCircuit: 'تنبيه: حدوث قفلة كهربائية (Short Circuit)!',
      shortCircuitMsg: 'تم رصد اتصال مباشر بدون حمل بين فازتين أو بين الفازة والنيوترال. تم فصل القاطع المغذي تلقائياً لحماية الدائرة.',
      dismiss: 'فهمت، متابعة التصحيح',
    }
  },
  en: {
    appTitle: 'Classic Control Studio',
    appSubtitle: 'Next-Gen Industrial Classic Control Simulator',
    designMode: 'Design Mode',
    runMode: 'Live Simulation',
    play: 'Play',
    pause: 'Pause',
    step: 'Step',
    reset: 'Reset',
    speed: 'Speed',
    undo: 'Undo',
    redo: 'Redo',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    zoomFit: 'Fit View',
    delete: 'Delete',
    clearAll: 'Clear Canvas',
    examples: 'Circuit Examples',
    exportPdf: 'Export PDF',
    exportPng: 'Export PNG',
    soundOn: 'Mute Audio',
    soundOff: 'Unmute Audio',
    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',
    langEn: 'English',
    langAr: 'العربية',
    presentationMode: 'Presentation Mode',
    laserPen: 'Laser Highlighter',
    multimeter: 'Virtual Multimeter',
    clearLaser: 'Clear Ink',
    help: 'User Guide & Help',
    helpModal: {
      title: 'Classic Control Studio User Guide',
      subtitle: 'Complete manual for designing, simulating, and teaching industrial control circuits',
      tabQuickStart: '⚡ Quick Start',
      tabWiring: '🔌 Wiring & Branching',
      tabComponents: '🔘 Components & Controls',
      tabTools: '📟 Instruments & Tools',
      tabShortcuts: '⌨️ Shortcuts',
    },
    categories: {
      power: 'Power Sources',
      protection: 'Circuit Breakers & Protection',
      contactor: 'Contactors & Aux Contacts',
      relay: 'Control Relays',
      timer: 'Timers & Time Delays',
      switch: 'Push Buttons & Switches',
      sensor: 'Sensors & Limit Switches',
      load: 'Motors & Actuators',
      signaling: 'Lamps & Horns',
    },
    properties: {
      title: 'Component Properties',
      tag: 'Component Tag',
      bindToMaster: 'Bind to Master Coil',
      none: 'None (Standalone)',
      label: 'Descriptive Label',
      rotation: 'Rotation Angle',
      timerPreset: 'Timer Preset (seconds)',
      lampColor: 'Lamp Color',
      seconds: 'sec',
      state: 'State',
      tripped: 'Tripped (Fault)',
      resetOverload: 'Reset Overload',
      testOverload: 'Test Trip',
      open: 'Open',
      closed: 'Closed',
    },
    multimeterModal: {
      title: 'Digital Multimeter & Clamp Meter',
      acVoltage: 'AC Voltage (V AC)',
      acCurrent: 'AC Current (A AC)',
      dcVoltage: 'DC Voltage (V DC)',
      continuity: 'Continuity & Ohms (Ω)',
      probeRed: 'Red Probe (+)',
      probeBlack: 'Black Probe (-)',
      clampTarget: 'Current Probe / Clamp Target',
      clampDesc: 'Select motor, coil, or line to measure true RMS operating current',
      notConnected: 'Not attached to terminal',
    },
    examplesModal: {
      title: 'Curated Classic Control Library',
      easy: 'Level 1: Control Fundamentals (Easy)',
      medium: 'Level 2: Sequence & Reversing (Medium)',
      advanced: 'Level 3: Industrial Systems (Advanced)',
      loadCircuit: 'Load Schematic',
      active: 'Current Circuit',
    },
    tooltips: {
      pinDesignation: 'Terminal Designation:',
      role: 'Industrial Role:',
      status: 'Electrical Status:',
      energized: 'Energized (Live Potential)',
      deEnergized: 'De-energized (No Potential)',
      shiftHint: 'Hold Shift for strict 90° orthogonal wire snap',
      branchHint: 'Click any existing wire to branch (T-Junction)',
    },
    faultAlert: {
      shortCircuit: 'Alert: Short Circuit Detected!',
      shortCircuitMsg: 'A zero-impedance path between phases or phase-to-neutral was detected. Upstream protection tripped to prevent fire.',
      dismiss: 'Acknowledge',
    }
  }
};
