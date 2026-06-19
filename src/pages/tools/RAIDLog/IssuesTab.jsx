import React, { useState } from 'react';
import { useRAID } from './RAIDContext';
import DataGrid from './DataGrid';
import Modal from './Modal';
import { Sparkles, Loader2 } from 'lucide-react';
import { AIEngine } from './AIEngine';

const STATUS_COLORS = {
  'Open': 'bg-red-100 text-red-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Closed': 'bg-gray-100 text-gray-700',
};

const SEVERITY_COLORS = {
  'Critical': 'bg-red-100 text-red-700 font-bold',
  'High': 'bg-orange-100 text-orange-700 font-bold',
  'Medium': 'bg-yellow-100 text-yellow-700 font-bold',
  'Low': 'bg-blue-100 text-blue-700 font-bold',
};

export default function IssuesTab() {
  const { data, addItem, updateItem, deleteItem } = useRAID();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', owner: '', severity: 'Medium', status: 'Open' });
  
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiContent, setAiContent] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleDescChange = (val) => {
    // Auto-detect severity
    const detected = AIEngine.detectSeverity(val);
    setFormData({ ...formData, description: val, severity: detected });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) updateItem('issues', editingId, formData);
    else addItem('issues', formData);
    setIsModalOpen(false);
  };

  const openEdit = (row) => {
    setFormData(row);
    setEditingId(row.id);
    setIsModalOpen(true);
  };

  const generateEscalation = async (row) => {
    setAiModalOpen(true);
    setIsAiLoading(true);
    const plan = await AIEngine.generateEscalationRecommendation(row.title, row.severity);
    setAiContent(plan);
    setIsAiLoading(false);
  };

  const columns = [
    { key: 'title', label: 'Issue Title', render: (v) => <div className="font-medium text-ink truncate w-64" title={v}>{v}</div> },
    { key: 'owner', label: 'Owner' },
    { key: 'severity', label: 'Severity', render: (v) => (
      <span className={`px-2 py-1 rounded-md text-[11px] ${SEVERITY_COLORS[v]}`}>{v}</span>
    )},
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`px-2 py-1 rounded-md text-[11px] font-medium ${STATUS_COLORS[v]}`}>{v}</span>
    )}
  ];

  return (
    <>
      <DataGrid
        title="Issue Log"
        data={data.issues}
        columns={columns}
        onAdd={() => { setFormData({ title: '', description: '', owner: '', severity: 'Medium', status: 'Open' }); setEditingId(null); setIsModalOpen(true); }}
        onEdit={openEdit}
        onDelete={(id) => deleteItem('issues', id)}
        aiAction={(row) => (
          <button onClick={() => generateEscalation(row)} className="p-1.5 text-accent hover:bg-accent/10 rounded-md transition-colors" title="AI Escalation Advice">
            <Sparkles className="w-4 h-4" />
          </button>
        )}
      />

      <Modal title={editingId ? "Edit Issue" : "Add Issue"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-bold text-ink mb-1">Title *</label>
            <input required type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
          </div>
          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="block text-[13px] font-bold text-ink">Description</label>
              <span className="text-[10px] text-muted flex items-center gap-1"><Sparkles className="w-3 h-3 text-accent"/> AI Auto-severity</span>
            </div>
            <textarea value={formData.description} onChange={e=>handleDescChange(e.target.value)} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" rows="3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Owner</label>
              <input type="text" value={formData.owner} onChange={e=>setFormData({...formData, owner: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Severity</label>
              <select value={formData.severity} onChange={e=>setFormData({...formData, severity: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]">
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-ink mb-1">Status</label>
            <select value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]">
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <button type="submit" className="mt-4 bg-ink text-cream py-2.5 rounded-lg font-bold text-[14px]">Save Issue</button>
        </form>
      </Modal>

      <Modal title={
        <div className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent"/> AI Escalation Advice</div>
      } isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)}>
        {isAiLoading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted">
            <Loader2 className="w-6 h-6 animate-spin text-accent" />
            <span>Analyzing issue parameters...</span>
          </div>
        ) : (
          <div className="text-[14px] leading-[1.6] text-ink whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: aiContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />
        )}
      </Modal>
    </>
  );
}
