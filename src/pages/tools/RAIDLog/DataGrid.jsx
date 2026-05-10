import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

export default function DataGrid({ title, data, columns, onAdd, onEdit, onDelete, aiAction }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((row) =>
    columns.some((col) => {
      const val = row[col.key];
      return String(val).toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e8e4db] overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      {/* Toolbar */}
      <div className="p-5 border-b border-[#e8e4db] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="font-heading text-[18px] font-bold text-ink">{title} ({data.length})</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#fbf9f6] border border-[#e8e4db] rounded-lg py-2 pl-9 pr-4 font-sans text-[13px] text-ink outline-none w-full sm:w-[200px] focus:border-ink"
            />
          </div>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-ink text-cream px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-[#1e1c18] transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#fbf9f6] sticky top-0 z-10 shadow-sm shadow-[#e8e4db]/50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-4 font-sans text-[12px] font-bold text-muted uppercase tracking-[0.5px] whitespace-nowrap">
                  {col.label}
                </th>
              ))}
              <th className="p-4 font-sans text-[12px] font-bold text-muted uppercase tracking-[0.5px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8e4db]">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="p-8 text-center text-muted font-light text-[14px]">
                  No records found.
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-[#fbf9f6]/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="p-4 text-[13px] text-ink max-w-[250px] truncate">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {aiAction && aiAction(row)}
                      <button onClick={() => onEdit(row)} className="p-1.5 text-muted hover:text-ink hover:bg-[#e8e4db] rounded-md transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(row.id)} className="p-1.5 text-muted hover:text-[#ef4444] hover:bg-[#fef2f2] rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
