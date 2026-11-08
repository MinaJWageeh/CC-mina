import React, { useMemo, useState } from 'react';
import { COMPONENT_CATALOG } from '../../core/types/components';
import { ComponentCategory, ComponentType } from '../../core/types/circuit';
import { translations } from '../../i18n/translations';

interface SidebarPaletteProps {
  lang: 'ar' | 'en';
  theme?: 'dark' | 'light';
  onAddComponent: (type: ComponentType) => void;
}

export const SidebarPalette: React.FC<SidebarPaletteProps> = ({
  lang,
  theme = 'dark',
  onAddComponent,
}) => {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const t = translations[lang];
  const isAr = lang === 'ar';
  const isLight = theme === 'light';

  const categories: { id: ComponentCategory; label: string; icon: string }[] = useMemo(
    () => [
      { id: 'power', label: t.categories.power, icon: '⚡' },
      { id: 'protection', label: t.categories.protection, icon: '🛡️' },
      { id: 'contactor', label: t.categories.contactor, icon: '🧲' },
      { id: 'timer', label: t.categories.timer, icon: '⏱️' },
      { id: 'switch', label: t.categories.switch, icon: '🔘' },
      { id: 'sensor', label: t.categories.sensor, icon: '📡' },
      { id: 'load', label: t.categories.load, icon: '⚙️' },
      { id: 'signaling', label: t.categories.signaling, icon: '🚨' },
    ],
    [t]
  );

  const allComponents = useMemo(() => Object.values(COMPONENT_CATALOG), []);

  // Filtered components
  const filtered = useMemo(() => {
    return allComponents.filter((comp) => {
      const matchSearch = searchTerm.trim()
        ? (isAr ? comp.nameAr : comp.nameEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
          comp.defaultTagPrefix.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comp.type.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchCat = activeCategory === 'all' || comp.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [allComponents, searchTerm, activeCategory, isAr]);

  // Group by category when 'all' is selected and no search
  const groupedCategories = useMemo(() => {
    if (searchTerm.trim() || activeCategory !== 'all') return null;
    return categories.map((cat) => ({
      ...cat,
      items: allComponents.filter((c) => c.category === cat.id),
    }));
  }, [categories, allComponents, searchTerm, activeCategory]);

  return (
    <aside
      className={`w-80 h-full flex flex-col z-30 select-none border-r transition-colors duration-200 ${
        isLight
          ? 'bg-slate-50/95 border-slate-200 text-slate-800'
          : 'bg-industrial-900 border-slate-800 text-slate-100'
      } ${isAr ? 'font-cairo' : 'font-sans'}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header & Search */}
      <div className={`p-3 border-b ${isLight ? 'border-slate-200 bg-white/60' : 'border-slate-800 bg-industrial-950/40'}`}>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 text-xs">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'ابحث عن عنصر أو رمز (مثل KM, Timer, Motor)...' : 'Search component or tag...'}
            className={`w-full rounded-xl pl-8 pr-8 py-2 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
              isLight
                ? 'bg-white border border-slate-300 text-slate-800 placeholder-slate-400 focus:border-sky-500 shadow-sm'
                : 'bg-slate-950/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-sky-500'
            }`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-200 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills - Wrapping layout without awkward horizontal scrolling */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
              activeCategory === 'all'
                ? 'bg-sky-500 text-white shadow-sm'
                : isLight
                ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>📁</span>
            <span>{isAr ? 'الكل' : 'All'} ({allComponents.length})</span>
          </button>

          {categories.map((cat) => {
            const count = allComponents.filter((c) => c.category === cat.id).length;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-sm'
                    : isLight
                    ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label.split(' ')[0]}</span>
                <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-white/20' : isLight ? 'bg-slate-100' : 'bg-slate-900'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Components List / Accordion Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {groupedCategories ? (
          // Grouped Section View
          groupedCategories.map((group) => (
            <div key={group.id} className="space-y-1.5">
              <div className="flex items-center justify-between px-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span>{group.icon}</span>
                  <span>{group.label}</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/50 font-mono">
                  {group.items.length}
                </span>
              </div>

              <div className="space-y-1.5">
                {group.items.map((item) => renderComponentCard(item))}
              </div>
            </div>
          ))
        ) : (
          // Flat Filtered / Search Results
          <div className="space-y-1.5">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                <span>🔍 {isAr ? 'لم يتم العثور على عنصر مطابق' : 'No components found'}</span>
              </div>
            ) : (
              filtered.map((item) => renderComponentCard(item))
            )}
          </div>
        )}
      </div>

      {/* Quick Usage Tip */}
      <div className={`p-2.5 border-t text-[11px] flex items-center gap-2 ${
        isLight ? 'border-slate-200 bg-white/70 text-slate-600' : 'border-slate-800 bg-industrial-950/60 text-slate-400'
      }`}>
        <span className="text-amber-400">💡</span>
        <span>{isAr ? 'انقر على أي عنصر لإضافته مباشرة للوحة الرسم' : 'Click any component to drop it on canvas'}</span>
      </div>
    </aside>
  );

  function renderComponentCard(item: typeof COMPONENT_CATALOG[keyof typeof COMPONENT_CATALOG]) {
    const name = isAr ? item.nameAr : item.nameEn;
    const desc = isAr ? item.descriptionAr : item.descriptionEn;

    return (
      <div
        key={item.type}
        onClick={() => onAddComponent(item.type)}
        className={`p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-1.5 group ${
          isLight
            ? 'bg-white border-slate-200 hover:border-sky-500 hover:shadow-md hover:bg-sky-50/20'
            : 'bg-industrial-950/70 border-slate-800/90 hover:border-sky-500/80 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-sky-500/10'
        }`}
      >
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold transition-colors group-hover:text-sky-400">
              {name}
            </span>
          </div>
          <span
            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${
              isLight
                ? 'bg-sky-50 text-sky-700 border-sky-200'
                : 'bg-slate-800 text-sky-400 border-slate-700'
            }`}
          >
            {item.defaultTagPrefix}
          </span>
        </div>

        <p className={`text-[10px] leading-relaxed line-clamp-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          {desc}
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-slate-800/40 text-[9px] text-slate-400 font-mono">
          <span>{item.pins.length} {isAr ? 'أطراف توصيل' : 'Pins'}</span>
          <span className="group-hover:text-sky-400 transition-colors flex items-center gap-0.5">
            <span>+</span> {isAr ? 'إضافة' : 'Add'}
          </span>
        </div>
      </div>
    );
  }
};
