import React, { useState } from 'react';
import { useRAID } from './RAIDContext';
import DataGrid from './DataGrid';
import Modal from './Modal';

export default function DecisionsTab() {
  const { data, addItem, updateItem, deleteItem } = useRAID();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({ title: '', rationale: '', owner: '', dateMade: today });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) updateItem('decisions', editingId, formData);
    else addItem('decisions', formData);
    setIsModalOpen(false);
  };

  const openEdit = (row) => {
    setFormData(row);
    setEditingId(row.id);
    setIsModalOpen(true);
  };

  const columns = [
    { key: 'title', label: 'Decision', render: (v) => <div className="font-medium text-ink truncate w-64" title={v}>{v}</div> },
    { key: 'owner', label: 'Decided By' },
    { key: 'dateMade', label: 'Date', render: (v) => new Date(v).toLocaleDateString() }
  ];

  return (
    <>
      <DataGrid
        title="Decision Log"
        data={data.decisions}
        columns={columns}
        onAdd={() => { setFormData({ title: '', rationale: '', owner: '', dateMade: today }); setEditingId(null); setIsModalOpen(true); }}
        onEdit={openEdit}
        onDelete={(id) => deleteItem('decisions', id)}
      />

      <Modal title={editingId ? "Edit Decision" : "Add Decision"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-bold text-ink mb-1">Decision *</label>
            <input required type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-ink mb-1">Rationale / Context</label>
            <textarea value={formData.rationale} onChange={e=>setFormData({...formData, rationale: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" rows="3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Decided By</label>
              <input type="text" value={formData.owner} onChange={e=>setFormData({...formData, owner: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Date</label>
              <input type="date" value={formData.dateMade} onChange={e=>setFormData({...formData, dateMade: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-ink text-cream py-2.5 rounded-lg font-bold text-[14px]">Save Decision</button>
        </form>
      </Modal>
    </>
  );
}
