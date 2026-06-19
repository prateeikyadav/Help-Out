import React, { useState } from 'react';
import { useRAID } from './RAIDContext';
import DataGrid from './DataGrid';
import Modal from './Modal';
import { AlertCircle } from 'lucide-react';

const STATUS_COLORS = {
  'Open': 'bg-gray-100 text-gray-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Closed': 'bg-green-100 text-green-700',
};

const PRIORITY_COLORS = {
  'High': 'text-red-600 font-bold',
  'Medium': 'text-yellow-600 font-bold',
  'Low': 'text-blue-600 font-bold',
};

export default function ActionsTab() {
  const { data, addItem, updateItem, deleteItem } = useRAID();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Format today's date for default input
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({ title: '', owner: '', dueDate: today, priority: 'Medium', status: 'Open' });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) updateItem('actions', editingId, formData);
    else addItem('actions', formData);
    setIsModalOpen(false);
  };

  const openEdit = (row) => {
    setFormData(row);
    setEditingId(row.id);
    setIsModalOpen(true);
  };

  const isOverdue = (dateStr, status) => {
    if (status === 'Closed') return false;
    return new Date(dateStr) < new Date(new Date().setHours(0,0,0,0));
  };

  const columns = [
    { key: 'title', label: 'Action Title', render: (v) => <div className="font-medium text-ink truncate w-64" title={v}>{v}</div> },
    { key: 'owner', label: 'Owner' },
    { key: 'dueDate', label: 'Due Date', render: (v, row) => (
      <div className={`flex items-center gap-1.5 ${isOverdue(v, row.status) ? 'text-red-600 font-bold' : 'text-muted'}`}>
        {isOverdue(v, row.status) && <AlertCircle className="w-3.5 h-3.5" />}
        {new Date(v).toLocaleDateString()}
      </div>
    )},
    { key: 'priority', label: 'Priority', render: (v) => <span className={PRIORITY_COLORS[v]}>{v}</span> },
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`px-2 py-1 rounded-md text-[11px] font-medium ${STATUS_COLORS[v]}`}>{v}</span>
    )}
  ];

  return (
    <>
      <DataGrid
        title="Action Log"
        data={data.actions}
        columns={columns}
        onAdd={() => { setFormData({ title: '', owner: '', dueDate: today, priority: 'Medium', status: 'Open' }); setEditingId(null); setIsModalOpen(true); }}
        onEdit={openEdit}
        onDelete={(id) => deleteItem('actions', id)}
      />

      <Modal title={editingId ? "Edit Action" : "Add Action"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-bold text-ink mb-1">Title *</label>
            <input required type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Owner</label>
              <input type="text" value={formData.owner} onChange={e=>setFormData({...formData, owner: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Due Date</label>
              <input type="date" value={formData.dueDate} onChange={e=>setFormData({...formData, dueDate: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Priority</label>
              <select value={formData.priority} onChange={e=>setFormData({...formData, priority: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-ink mb-1">Status</label>
              <select value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})} className="w-full p-2 border border-[#e8e4db] rounded-lg bg-[#fbf9f6] text-[13px]">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mt-4 bg-ink text-cream py-2.5 rounded-lg font-bold text-[14px]">Save Action</button>
        </form>
      </Modal>
    </>
  );
}
