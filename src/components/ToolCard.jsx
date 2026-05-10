import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CAT_COLORS = {
  pm: '#C94030',
  general: '#4A7C7C',
  hr: '#8A5C7A',
  accountant: '#8A7040',
  healthcare: '#5A7A5A',
  student: '#C94030'
};

export default function ToolCard({ index, name, desc, cat, url, catId = 'general', icon: Icon }) {
  const isLegacy = url.endsWith('.html');
  const targetUrl = isLegacy ? `/tools/legacy?url=${encodeURIComponent(url)}` : url;
  
  const categoryColor = CAT_COLORS[catId] || CAT_COLORS.general;

  return (
    <Link 
      to={targetUrl}
      className="bg-card border border-borderMd rounded-2xl p-8 hover:shadow-[0_12px_40px_rgba(28,25,23,0.06)] transition-all duration-500 hover:-translate-y-1 group flex flex-col no-underline"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 bg-bg text-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-borderMd">
          {Icon && <Icon className="w-6 h-6 stroke-[1.5]" />}
        </div>
        <div className="flex items-center gap-1.5 text-[9px] tracking-[0.18em] uppercase text-inkLight font-medium">
          <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ backgroundColor: categoryColor }}></span>
          {cat}
        </div>
      </div>
      
      <h3 className="font-serif text-[24px] font-bold text-ink tracking-[-0.02em] leading-tight mb-3 group-hover:text-accent transition-colors duration-300">
        {name}
      </h3>
      
      <p className="text-[14px] leading-relaxed text-inkMid mb-8 flex-1">
        {desc}
      </p>
      
      <div className="flex items-center justify-end mt-auto pt-6 border-t border-borderMd">
        <span className="text-[11px] font-bold text-accent tracking-[0.1em] uppercase flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          Open Tool <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
