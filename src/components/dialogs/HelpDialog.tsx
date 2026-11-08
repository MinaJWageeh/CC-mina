import React, { useState } from 'react';
import { translations } from '../../i18n/translations';
import { AppIcon } from '../common/AppIcon';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

type HelpTab = 'quickstart' | 'wiring' | 'components' | 'tools' | 'shortcuts';

export const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<HelpTab>('quickstart');

  if (!isOpen) return null;

  const t = translations[lang];
  const isAr = lang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none animate-fadeIn">
      <div
        className={`bg-industrial-900 border border-sky-500/40 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] ${
          isAr ? 'font-cairo' : 'font-sans'
        }`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-4 bg-industrial-950 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <AppIcon className="w-9 h-9 rounded-xl shadow-md shadow-sky-500/20" />
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>{t.helpModal.title}</span>
                <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                  v2.0 PRO
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">{t.helpModal.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors border border-slate-700"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-industrial-950/70 p-2 gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'quickstart'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>⚡</span>
            <span>{t.helpModal.tabQuickStart}</span>
          </button>
          <button
            onClick={() => setActiveTab('wiring')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'wiring'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🔌</span>
            <span>{t.helpModal.tabWiring}</span>
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'components'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🔘</span>
            <span>{t.helpModal.tabComponents}</span>
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'tools'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>📟</span>
            <span>{t.helpModal.tabTools}</span>
          </button>
          <button
            onClick={() => setActiveTab('shortcuts')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'shortcuts'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>⌨️</span>
            <span>{t.helpModal.tabShortcuts}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs text-slate-300 leading-relaxed">
          {/* TAB 1: QUICK START */}
          {activeTab === 'quickstart' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-xl shrink-0">
                  🎯
                </div>
                <div>
                  <h3 className="text-sm font-bold text-sky-400 mb-1">
                    {isAr ? 'نظرة عامة على البرنامج' : 'Overview of Classic Control Studio'}
                  </h3>
                  <p className="text-slate-300 text-[11px]">
                    {isAr
                      ? 'برنامج متطور لمحاكاة دوائر التحكم الآلي والكلاسيك كنترول بدقة واقعية متناهية. يتيح لك رسم الدوائر بحرية، تجربة التشغيل الحي مع حركة المحركات وانجذاب ملفات الكونتاكتور، قياس الجهد بالأفوميتر، والشرح بالقلم التفاعلي.'
                      : 'An advanced simulator for industrial classic control and ladder logic. Design schematics freely, experience real-time simulation with rotating motor inertia and contactor armature snap, test voltages with a multimeter, and teach with a presentation pen.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-100">
                    <span className="p-1 rounded bg-sky-500/20 text-sky-400 text-xs">📐 1</span>
                    <span>{isAr ? 'وضع التصميم (Design Mode)' : 'Design Mode'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isAr
                      ? 'اختر العناصر من القائمة الجانبية باليسار، واسحبها في اللوحة. وصل الأسلاك بين الأطراف، وحدد أي عنصر لتدويره أو ربطه بملف رئيسي مثل KM1.'
                      : 'Pick components from the left palette and position them on canvas. Connect terminals with wires, rotate parts, or bind contacts to master coils.'}
                  </p>
                </div>

                <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 text-xs">⚡ 2</span>
                    <span>{isAr ? 'وضع التشغيل الحي (Live Run)' : 'Live Run Mode'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isAr
                      ? 'اضغط على زر (⚡ تشغيل) للانتقال للمحاكاة الحية. تضيء الخطوط الحاملة للكهرباء فوراً، وتستطيع الضغط على أزرار Start و Stop لتشغيل المحركات وسماع أصوات النبضات الميكانيكية.'
                      : 'Switch to Live Run to activate equipotential physics. Energized wires glow vividly, motors spin with rotational inertia, and sound effects bring the panel to life.'}
                  </p>
                </div>

                <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <span className="p-1 rounded bg-amber-500/20 text-amber-400 text-xs">📚 3</span>
                    <span>{isAr ? 'المكتبة التعليمية المعتمدة' : 'Curated Circuit Library'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isAr
                      ? 'افتح قائمة (📚 الدوائر التعليمية) لاختيار دوائر جاهزة مثل التشغيل المباشر DOL، عكس الحركة، ستار دلتا، والتحكم التتابعي لتتعلم منها مباشرة.'
                      : 'Explore curated circuits across Easy, Medium, and Advanced levels, from DOL starters to reversing and star-delta systems.'}
                  </p>
                </div>

                <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-indigo-300">
                    <span className="p-1 rounded bg-indigo-500/20 text-indigo-400 text-xs">💾 4</span>
                    <span>{isAr ? 'التصدير للطباعة والوثائق' : 'Export & Documentation'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isAr
                      ? 'اضغط على زر الحفظ (💾) لتصدير دائرتك كصورة PNG فائقة الجودة أو ملف PDF ملون قياسي جاهز للطباعة وتجهيز لوحات الكنترول.'
                      : 'Export high-resolution PNG blueprints or printable PDF schematics for documentation and wiring reports.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WIRING */}
          {activeTab === 'wiring' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                  <span>🔌</span>
                  <span>{isAr ? 'كيفية توصيل الأسلاك وعمل التفرعات' : 'Wire Routing & Branching'}</span>
                </h3>

                <div className="space-y-2.5 text-[11px]">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-slate-100">{isAr ? 'بدء التوصيل:' : 'Start Wire:'}</strong>{' '}
                      {isAr
                        ? 'انقر على أي نقطة تلامس (Terminal) ملونة، أو اسحب بالماوس من النقطة مباشرة.'
                        : 'Click on any terminal pin, or hold and drag the mouse from it.'}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-amber-300">{isAr ? 'زوايا 90 درجة قائمة (Shift Key):' : '90° Orthogonal Angles (Shift Key):'}</strong>{' '}
                      {isAr
                        ? 'أثناء تحريك السلك، اضغط باستمرار على زر Shift في الكيبورد ليمشي السلك بزوايا هندسية قائمة 90° كالمخططات القياسية.'
                        : 'Hold down the Shift key while drawing a wire to snap into strict 90° orthogonal angles.'}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-emerald-300">{isAr ? 'عمل تفرعة (T-Junction Branch):' : 'T-Junction Branching:'}</strong>{' '}
                      {isAr
                        ? 'لعمل تفرعة من سلك قائم، ابدأ سلكاً جديداً ثم انقر فوق أي سلك موجود وسيتم تقسيمه وعمل نقطة تفريع صلبة (• Connection Dot) فوراً.'
                        : 'To tap into an existing wire, start a wire and click on any existing wire segment to bisect and create a junction node.'}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
                    <div>
                      <strong className="text-rose-300">{isAr ? 'حذف سلك:' : 'Delete Wire:'}</strong>{' '}
                      {isAr
                        ? 'انقر على السلك لتحديده (يتحول للأزرق السماوي)، ثم اضغط زر Delete أو Backspace في الكيبورد.'
                        : 'Click any wire to select it (turns highlighted cyan), then press Delete or Backspace.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Potential Color Code Table */}
              <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3.5 space-y-2">
                <h4 className="text-xs font-bold text-slate-200">
                  {isAr ? 'دلالات ألوان الأسلاك في وضع التشغيل (IEC Color Coding):' : 'Live Voltage Colors (IEC Standard):'}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[10px]">
                  <div className="p-2 rounded-lg bg-red-950/40 border border-red-800/60 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]" />
                    <span className="font-bold text-red-300">فاز 1 (L1)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/60 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
                    <span className="font-bold text-amber-300">فاز 2 (L2)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-800/60 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]" />
                    <span className="font-bold text-blue-300">فاز 3 (L3)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/60 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]" />
                    <span className="font-bold text-cyan-300">نيوترال (N)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/60 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
                    <span className="font-bold text-emerald-300">أرضي (PE)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPONENTS & PUSHBUTTONS */}
          {activeTab === 'components' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>🟢</span>
                    <span>{isAr ? 'أزرار التشغيل اللحظية (Pushbuttons)' : 'Momentary Push Buttons'}</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {isAr
                      ? 'تعمل بالضغط اللحظي (Spring-Return): تضغط وتثبت الماوس لتعمل النقطة، وبمجرد رفع إصبعك ترجع لوضعها الطبيعي فوراً. لتستمر الدائرة في العمل، يجب توصيل نقطة استمرارية مفتوحة (Latch Contact 13-14) بالتوازي مع زر الـ Start.'
                      : 'Push buttons feature momentary spring-return physics. Press and hold with the mouse to engage; releasing returns them to resting state. Wire a 13-14 auxiliary NO contact in parallel for latching.'}
                  </p>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <h4 className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <span>🧲</span>
                    <span>{isAr ? 'الكونتاكتورات والربط بالرموز (Tags)' : 'Contactors & Tag Binding'}</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {isAr
                      ? 'عند وضع ملف كونتاكتور KM1، فإن أي نقاط مساعدة (NO أو NC) تحمل نفس الرمز KM1 ترتبط به تلقائياً، وتتحرك ميكانيكياً فور انجذاب الملف مع مؤثرات صوتية تحاكي صوت الكنترول الحقيقي.'
                      : 'Coils and contacts are dynamically coupled through their Tag (e.g. KM1). When the coil energizes, all auxiliary contacts bearing tag KM1 switch instantaneously.'}
                  </p>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <span>🛡️</span>
                    <span>{isAr ? 'الأوفرلود الحراري (Thermal Overload)' : 'Thermal Overload Protection'}</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {isAr
                      ? 'يحتوي على نقاط القوى (1-2, 3-4, 5-6) ونقاط التحكم (95-96 NC و 97-98 NO). يمكنك النقر عليه لاختبار الفصل (Trip Test)، ثم النقر مرة أخرى لإعادة التشغيل (Reset).'
                      : 'Protects motors against excessive currents. Features 95-96 NC control contact for coil cutoff, and 97-98 NO for trip alarm indicator lamps. Click to trip or reset.'}
                  </p>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                    <span>⏱️</span>
                    <span>{isAr ? 'المؤقتات الزمنية (Timers)' : 'Pneumatic & Electronic Timers'}</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {isAr
                      ? 'يدعم تايمر On-Delay، و Off-Delay، و Star-Delta مع شاشة عد رقمية حية فوق العنصر. يمكنك تعديل زمن الضبط بالثواني من نافذة الخصائص باليمين.'
                      : 'Includes On-Delay, Off-Delay, Flasher, and Star-Delta timers with on-component digital countdown timers. Set delay presets in seconds via Properties Inspector.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INSTRUMENTS & PRESENTATION */}
          {activeTab === 'tools' && (
            <div className="space-y-4">
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <span className="text-lg">📟</span>
                  <span>{isAr ? 'جهاز الأفوميتر الافتراضي (Virtual Multimeter)' : 'Virtual Multimeter'}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {isAr
                    ? 'اضغط على زر الأفوميتر في الشريط العلوي لتفعيل الجهاز. يمكنك سحب المجس الأحمر (+) والمجس الأسود (-) وتثبيتهما على أي أطراف في اللوحة لقراءة الجهد المتردد الحقيقي (380V بين فازتين، أو 220V بين فازة ونيوترال) أو فحص التوصيلية مع صوت الصفارة (Continuity Beep).'
                    : 'Activate the floating multimeter tool to measure True RMS AC voltages across terminals (380V phase-to-phase, 220V phase-to-neutral) or test continuity with audible buzzer sound.'}
                </p>
              </div>

              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-sky-400">
                  <span className="text-lg">🖊️</span>
                  <span>{isAr ? 'أداة الشرح والقلم الفسفوري (Presentation & Annotation Pen)' : 'Presentation & Annotation Pen'}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {isAr
                    ? 'أداة ممتازة للمهندسين والمدرسين أثناء الشرح: يتيح لك شريط الأدوات العائم في الأعلى التبديل بين (قلم ثابت) لرسم أسهم وتوضيحات وملاحظات لا تختفي إلا بمسحها، أو (ليزر متلاشي) يترك ذيلاً فسفورياً متوهجاً يختفي بعد ثانيتين. يمكنك اختيار الألوان وسُمك الخط بسهولة.'
                    : 'Tailored for lecturers and instructors: switch between persistent whiteboard pen (draw arrows and notes that stay on screen) and fading laser pointer (neon glow tail disappearing in 2 seconds). Choose neon colors and stroke widths easily.'}
                </p>
              </div>

              <div className="bg-slate-950/50 border border-rose-900/40 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-rose-400">
                  <span className="text-lg">⚠️</span>
                  <span>{isAr ? 'نظام الحماية من القفلات والشورت سيركت' : 'Short-Circuit Protection'}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {isAr
                    ? 'يقوم محرك المحاكاة بحساب مسارات الجهد لحظياً. إذا قمت بخطأ في التوصيل أدى لتلامس فازتين مختلفتين (L1 مع L2) أو فازة مع نيوترال بدون حمل، يُطلق البرنامج إنذاراً أحمر بصوت صفارة ويفصل القواطع لحماية الدائرة.'
                    : 'Real-time solver checks zero-impedance phase collisions. If two distinct phases touch directly, an alarm sounds and the circuit breaker trips automatically.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: KEYBOARD SHORTCUTS */}
          {activeTab === 'shortcuts' && (
            <div className="space-y-3">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-[11px] text-left border-collapse" dir={isAr ? 'rtl' : 'ltr'}>
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono text-[10px]">
                      <th className="p-3 font-semibold">{isAr ? 'الاختصار' : 'Shortcut'}</th>
                      <th className="p-3 font-semibold">{isAr ? 'الوظيفة' : 'Action'}</th>
                      <th className="p-3 font-semibold">{isAr ? 'ملاحظات' : 'Details'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr>
                      <td className="p-3 text-sky-400 font-bold">Shift (Hold)</td>
                      <td className="p-3 text-slate-200">{isAr ? 'سلك بزوايا 90° قائمة' : '90° Orthogonal Wire Snap'}</td>
                      <td className="p-3 text-slate-400">{isAr ? 'اضغط أثناء رسم السلك لعمل زوايا هندسية' : 'Hold while routing wires'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-amber-400 font-bold">Space + Drag</td>
                      <td className="p-3 text-slate-200">{isAr ? 'تحريك اللوحة (Pan)' : 'Pan Canvas Viewport'}</td>
                      <td className="p-3 text-slate-400">{isAr ? 'أو اسحب بزر الماوس الأوسط' : 'Or drag with Middle Mouse Button'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-emerald-400 font-bold">Mouse Wheel</td>
                      <td className="p-3 text-slate-200">{isAr ? 'تكبير وتصغير (Zoom)' : 'Zoom In / Out'}</td>
                      <td className="p-3 text-slate-400">{isAr ? 'تكبير سلس حول مؤشر الماوس' : 'Smooth zooming around cursor'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-purple-400 font-bold">R / r</td>
                      <td className="p-3 text-slate-200">{isAr ? 'تدوير العنصر 90 درجة' : 'Rotate Component 90°'}</td>
                      <td className="p-3 text-slate-400">{isAr ? 'تدوير العنصر المحدد في وضع التصميم' : 'Rotates selected component'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-rose-400 font-bold">Delete / Backspace</td>
                      <td className="p-3 text-slate-200">{isAr ? 'حذف العنصر أو السلك' : 'Delete Selection'}</td>
                      <td className="p-3 text-slate-400">{isAr ? 'يحذف أي مكونات أو أسلاك محددة' : 'Deletes selected components or wires'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-sky-400 font-bold">Esc</td>
                      <td className="p-3 text-slate-200">{isAr ? 'إلغاء التحديد أو الخروج' : 'Deselect / Cancel'}</td>
                      <td className="p-3 text-slate-400">{isAr ? 'إلغاء السلك أو التحديد أو الأدوات' : 'Cancels active wire or tools'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-indigo-400 font-bold">Ctrl + Click</td>
                      <td className="p-3 text-slate-200">{isAr ? 'تحديد متعدد' : 'Multi-Select'}</td>
                      <td className="p-3 text-slate-400">{isAr ? 'تحديد عدة عناصر لتحريكها أو حذفها' : 'Selects multiple components or wires'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-industrial-950 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
          <span>{isAr ? 'Classic Control Studio • صُنع خصيصاً للمهندسين والفنيين والطلاب' : 'Classic Control Studio • Engineered for electrical professionals'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow transition-colors"
          >
            {isAr ? 'حسناً، فهمت' : 'Got it!'}
          </button>
        </div>
      </div>
    </div>
  );
};
