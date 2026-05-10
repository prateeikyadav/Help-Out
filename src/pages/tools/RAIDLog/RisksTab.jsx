import React, { useState } from 'react';
import { useRAID } from './RAIDContext';
import DataGrid from './DataGrid';
import Modal from './Modal';
import { Sparkles, Loader2 } from 'lucide-react';
import { AIEngine } from './AIEngine';

const STATUS_COLORS = {
  'Open': 'bg-red-100 text-red-700',
  'Mitigated': 'bg-green-100 text-green-700',
  'Closed': 'bg-gray-100 text-gray-700',
};

const SEVERITY_COLORS = {
  'Critical': 'bg-red-100 text-red-700 font-bold',
  'High': 'bg-orange-100 text-orange-700 font-bold',
  'Medium': 'bg-yellow-100 text-yellow-700 font-bold',
  'Low': 'bg-blue-100 text-blue-700 font-bold',
};

export default function RisksTab() {
  const { data, addItem, updateItem, deleteItem } = useRAID();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', owner: '', probability: 3, impact: 3, status: 'Open' });
  
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiContent, setAiContent] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const calculateSeverity = (prob, imp) => {
    const score = prob * imp;
    if (score >= 15) return 'Critical';
    if (score >= 10) return 'High';
    if (score >= 5) return 'Medium';
    return 'Low';
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = { ...formData, severity: calculateSeverity(formData.probability, formData.impact) };
    if (editingId) updateItem('risks', editingId, payload);
    else addItem('risks', payload);
    setIsModalOpen(false);
  };

  const openEdit = (row) => {
    setFormData(row);
    setEditingId(row.id);
    setIsModalOpen(true);
  };

  const generateMitigation = async (row) => {
    setAiModalOpen(true);
    setIsAiLoading(true);
    const plan = await AIEngine.generateMitigationPlan(row.title, row.description);
    setAiContent(plan);
    setIsAiLoading(false);
  };

  const columns = [
    { key: 'title', label: 'Risk Title', render: (v, row) => <div className="font-medium text-ink truncate w-48" title={v}>{v}</div> },
    { key: 'owner', label: 'Owner' },
    { key: 'probability', label: 'Prob', render: (v) => <span className="text-muted">{v}/5</span> },
    { key: 'impact', label: 'Impact', render: (v) => <span className="text-muted">{v}/5</span> },
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
        title="Risk Log"
        data={data.risks}
        columns={columns}
        onAdd={() => { setFormData({ title: '', description: '', owner: '', probability: 3, impact: 3, status: 'Open' }); setEditingId(null); setIsModalOpen(true); }}
        onEdit={openEdit}
        onDelete={(id) => deleteItem('risks', id)}
        aiAction={(row) => (
          <button onClick={() => generateMitigation(row)} className="p-1.5 text-accent hover:bg-accent/10 rounded-md transition-colors" title="AI Mitigation Plan">
            <Sparkles className="w-4 h-4" />
          </button>
        )}
      />

      <Modal title={editingId ? "Edit Risk" : "Add Risk"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-bold text-ink mb-1">Title *</label>
            <input required type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-ink mb-1">Description</label>
            <textarea value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" rows="3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Probability (1-5)</label>
              <input type="number" min="1" max="5" value={formData.probability} onChange={e=>setFormData({...formData, probability: parseInt(e.target.value)})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Impact (1-5)</label>
              <input type="number" min="1" max="5" value={formData.impact} onChange={e=>setFormData({...formData, impact: parseInt(e.target.value)})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Owner</label>
              <input type="text" value={formData.owner} onChange={e=>setFormData({...formData, owner: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Status</label>
              <select value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]">
                <option value="Open">Open</option>
                <option value="Mitigated">Mitigated</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mt-4 bg-ink text-cream py-2.5 rounded-lg font-bold text-[14px]">Save Risk</button>
        </form>
      </Modal>

      {/* AI Mitigation Modal */}
      <Modal title={
        <div className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent"/> AI Mitigation Strategy</div>
      } isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)}>
        {isAiLoading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted">
            <Loader2 className="w-6 h-6 animate-spin text-accent" />
            <span>Analyzing risk factors...</span>
          </div>
        ) : (
          <div className="text-[14px] leading-[1.6] text-ink whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: aiContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}} />
        )}
      </Modal>
    </>
  );
}
