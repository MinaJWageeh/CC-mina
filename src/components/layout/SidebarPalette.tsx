import React, { useState } from 'react';
import { COMPONENT_CATALOG } from '../../core/types/components';
import { ComponentCategory, ComponentType } from '../../core/types/circuit';
import { translations } from '../../i18n/translations';

interface SidebarPaletteProps {
  lang: 'ar' | 'en';
  onAddComponent: (type: ComponentType) => void;
}

export const SidebarPalette: React.FC<SidebarPaletteProps> = ({ lang, onAddComponent }) => {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>('power');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const t = translations[lang];

  const categories: { id: ComponentCategory; label: string; icon: string }[] = [
    { id: 'power', label: t.categories.power, icon: '⚡' },
    { id: 'protection', label: t.categories.protection, icon: '🛡️' },
    { id: 'contactor', label: t.categories.contactor, icon: '🧲' },
    { id: 'timer', label: t.categories.timer, icon: '⏱️' },
    { id: 'switch', label: t.categories.switch, icon: '🔘' },
    { id: 'sensor', label: t.categories.sensor, icon: '📡' },
    { id: 'load', label: t.categories.load, icon: '⚙️' },
    { id: 'signaling', label: t.categories.signaling, icon: '🚨' },
  ];

  // Filter items by active category or search query
  const allComponents = Object.values(COMPONENT_CATALOG);
  const filtered = allComponents.filter((comp) => {
    if (searchTerm.trim()) {
      const matchName = (lang === 'ar' ? comp.nameAr : comp.nameEn)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchTag = comp.defaultTagPrefix.toLowerCase().includes(searchTerm.toLowerCase());
      return matchName || matchTag;
    }
    return comp.category === activeCategory;
  });

  return (
    <aside
      className={`w-72 h-full bg-industrial-900 border-r border-slate-800 flex flex-col z-30 select-none ${
        lang === 'ar' ? 'font-cairo' : 'font-sans'
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Search Input */}
      <div className="p-3 border-b border-slate-800">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={lang === 'ar' ? '🔍 ابحث عن عنصر أو رمز...' : '🔍 Search component or tag...'}
          className="w-full bg-industrial-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Category Pills */}
      {!searchTerm && (
        <div className="flex overflow-x-auto p-2 gap-1.5 border-b border-slate-800 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Component Cards Grid */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filtered.map((item) => {
          const name = lang === 'ar' ? item.nameAr : item.nameEn;
          const desc = lang === 'ar' ? item.descriptionAr : item.descriptionEn;

          return (
            <div
              key={item.type}
              onClick={() => onAddComponent(item.type)}
              className="p-2.5 bg-industrial-950/80 border border-slate-800 rounded-lg hover:border-sky-500/70 hover:bg-slate-900 cursor-pointer transition-all group flex flex-col gap-1"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-200 group-hover:text-sky-300">
                  {name}
                </span>
                <span className="text-[10px] font-mono font-bold text-sky-400 bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700">
                  {item.defaultTagPrefix}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">
                {desc}
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
