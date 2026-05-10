import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-[#e8e4db] flex justify-between items-center bg-[#fbf9f6]">
          <h2 className="font-heading text-[18px] font-bold text-ink">{title}</h2>
          <button onClick={onClose} className="p-1 text-muted hover:text-ink transition-colors rounded-md hover:bg-[#e8e4db]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
