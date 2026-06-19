import React, { useState } from 'react';
import { LayoutDashboard, AlertTriangle, CheckSquare, Bug, Scale, FileDown, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RAIDProvider, useRAID } from './RAIDContext';
import DashboardView from './DashboardView';
import RisksTab from './RisksTab';
import ActionsTab from './ActionsTab';
import IssuesTab from './IssuesTab';
import DecisionsTab from './DecisionsTab';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function RAIDContent() {
  const { data } = useRAID();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'risks', label: 'Risks', icon: AlertTriangle },
    { id: 'actions', label: 'Actions', icon: CheckSquare },
    { id: 'issues', label: 'Issues', icon: Bug },
    { id: 'decisions', label: 'Decisions', icon: Scale },
  ];

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('RAID Log Report', 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

    let yPos = 40;

    const addTable = (title, cols, rows) => {
      if (rows.length === 0) return;
      doc.setFontSize(14);
      doc.text(title, 14, yPos);
      doc.autoTable({
        startY: yPos + 5,
        head: [cols],
        body: rows,
        theme: 'grid',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [31, 26, 20] } // text-ink color
      });
      yPos = doc.lastAutoTable.finalY + 15;
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
    };

    addTable('Risks', ['Title', 'Owner', 'Severity', 'Status'], data.risks.map(r => [r.title, r.owner, r.severity, r.status]));
    addTable('Actions', ['Title', 'Owner', 'Due Date', 'Status'], data.actions.map(a => [a.title, a.owner, new Date(a.dueDate).toLocaleDateString(), a.status]));
    addTable('Issues', ['Title', 'Owner', 'Severity', 'Status'], data.issues.map(i => [i.title, i.owner, i.severity, i.status]));
    addTable('Decisions', ['Decision', 'Owner', 'Date'], data.decisions.map(d => [d.title, d.owner, new Date(d.dateMade).toLocaleDateString()]));

    doc.save('RAID_Log_Report.pdf');
  };

  return (
    <div className="flex-1 flex flex-col font-sans text-ink bg-[#f0ece3]">
      {/* Header */}
      <header className="bg-white border-b border-[#e8e4db] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-muted hover:text-ink transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-heading text-[20px] font-bold text-ink leading-none">RAID Log Manager</h1>
            <div className="text-[12px] text-muted font-medium tracking-[0.5px] uppercase mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent" /> AI-Powered
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportPDF} className="flex items-center gap-2 bg-white border border-[#e8e4db] px-4 py-2 rounded-lg text-[13px] font-medium text-ink hover:bg-[#f0ece3] transition-colors shadow-sm cursor-pointer">
            <FileDown className="w-4 h-4" /> Export Report
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#e8e4db] p-4 flex flex-col gap-2 shrink-0 hidden md:flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all ${
                  isActive ? 'bg-ink text-cream shadow-md' : 'text-muted hover:bg-[#f0ece3] hover:text-ink'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Mobile Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e4db] flex justify-around p-2 z-20 pb-safe">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg min-w-[60px] ${
                  isActive ? 'text-accent' : 'text-muted'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 md:pb-10">
          <div className="max-w-[1200px] mx-auto">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'risks' && <RisksTab />}
            {activeTab === 'actions' && <ActionsTab />}
            {activeTab === 'issues' && <IssuesTab />}
            {activeTab === 'decisions' && <DecisionsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function RAIDLayout() {
  return (
    <RAIDProvider>
      <RAIDContent />
    </RAIDProvider>
  );
}
