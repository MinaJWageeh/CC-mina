import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { CircuitProject } from '../../core/types/circuit';
import { translations } from '../../i18n/translations';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: CircuitProject;
  lang: 'ar' | 'en';
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onClose,
  project,
  lang,
}) => {
  const [designerName, setDesignerName] = useState<string>(project.metadata.author || 'Mina J. Wageeh');
  const [projectTitle, setProjectTitle] = useState<string>(project.metadata.title || 'Classic Control Schematic');
  const [revision, setRevision] = useState<string>('Rev 1.0');

  if (!isOpen) return null;
  const t = translations[lang];

  // 1. Export as Native JSON Project (.ccp)
  const handleSaveJson = () => {
    const updatedProject = {
      ...project,
      metadata: {
        ...project.metadata,
        title: projectTitle,
        author: designerName,
        date: new Date().toISOString().split('T')[0]
      }
    };
    const jsonStr = JSON.stringify(updatedProject, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.toLowerCase().replace(/\s+/g, '_')}.ccp`;
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  // 2. Export as PDF with Engineering Title Block (Cartouche)
  const handleExportPdf = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();

    // Border Frame
    doc.setDrawColor(40, 50, 70);
    doc.setLineWidth(1.0);
    doc.rect(10, 10, pageW - 20, pageH - 20);

    // Title Block (Cartouche) at bottom right
    const tbW = 85;
    const tbH = 28;
    const tbX = pageW - 10 - tbW;
    const tbY = pageH - 10 - tbH;

    doc.rect(tbX, tbY, tbW, tbH);
    doc.line(tbX, tbY + 9, tbX + tbW, tbY + 9);
    doc.line(tbX, tbY + 18, tbX + tbW, tbY + 18);
    doc.line(tbX + 45, tbY + 9, tbX + 45, tbY + tbH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 40, 60);
    doc.text(projectTitle, tbX + 4, tbY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Designer: ${designerName}`, tbX + 4, tbY + 14);
    doc.text(`Date: ${new Date().toISOString().split('T')[0]}`, tbX + 4, tbY + 23);
    doc.text(`Doc: ${revision}`, tbX + 49, tbY + 14);
    doc.text(`Standard: IEC 60617`, tbX + 49, tbY + 23);

    // Watermark / Header
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('CLASSIC CONTROL STUDIO - ELECTRICAL SCHEMATIC', 15, 17);

    // Save PDF
    doc.save(`${projectTitle.toLowerCase().replace(/\s+/g, '_')}.pdf`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 select-none">
      <div
        className={`bg-industrial-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-5 ${
          lang === 'ar' ? 'font-cairo' : 'font-sans'
        }`}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>💾</span>
            <span>{lang === 'ar' ? 'تصدير وحفظ المشروع' : 'Save & Export Project'}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 text-xs"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 my-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              {lang === 'ar' ? 'عنوان المخطط:' : 'Schematic Title:'}
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full bg-industrial-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              {lang === 'ar' ? 'اسم المهندس / المصمم:' : 'Designer / Student Name:'}
            </label>
            <input
              type="text"
              value={designerName}
              onChange={(e) => setDesignerName(e.target.value)}
              className="w-full bg-industrial-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              {lang === 'ar' ? 'رقم المراجعة:' : 'Revision:'}
            </label>
            <input
              type="text"
              value={revision}
              onChange={(e) => setRevision(e.target.value)}
              className="w-full bg-industrial-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-3 border-t border-slate-800">
          <button
            onClick={handleSaveJson}
            className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow"
          >
            <span>📁</span>
            <span>{lang === 'ar' ? 'حفظ ملف مشروع (.ccp)' : 'Save Project File (.ccp)'}</span>
          </button>
          <button
            onClick={handleExportPdf}
            className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow"
          >
            <span>📄</span>
            <span>{lang === 'ar' ? 'تصدير كـ PDF مع جدول بيانات Cartouche' : 'Export PDF with Title Block'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
