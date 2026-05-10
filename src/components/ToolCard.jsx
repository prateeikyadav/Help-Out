import { Link } from 'react-router-dom';

const CAT_COLORS = {
  pm: '#C94030',
  general: '#4A7C7C',
  hr: '#8A5C7A',
  accountant: '#8A7040',
  healthcare: '#5A7A5A'
};

export default function ToolCard({ index, name, desc, cat, url, catId = 'general', icon: Icon }) {
  const isLegacy = url.endsWith('.html');
  const targetUrl = isLegacy ? `/tools/legacy?url=${encodeURIComponent(url)}` : url;
  
  const categoryColor = CAT_COLORS[catId] || CAT_COLORS.general;

  // Format index to be two digits (e.g. 01, 02)
  const formattedIndex = index.toString().padStart(2, '0');

  return (
    <Link 
      to={targetUrl}
      className="group bg-card p-[36px_32px_32px] cursor-pointer border-l-[3px] border-transparent flex flex-col min-h-[170px] no-underline transition-all duration-250 ease-[cubic-bezier(.4,0,.2,1)] hover:bg-surfaceDark hover:border-l-[color:var(--cc)]"
      style={{ '--cc': categoryColor }}
    >
      <div className="flex justify-between items-start mb-5">
        <div className="text-[11px] text-inkLight tracking-[0.12em] font-medium transition-colors duration-250 group-hover:text-white/18">
          {formattedIndex}
        </div>
        {Icon && (
          <div className="text-inkLight transition-colors duration-250 group-hover:text-white/18">
            <Icon className="w-[15px] h-[15px]" strokeWidth={1.5} />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-1.5 text-[9px] tracking-[0.18em] uppercase text-inkLight mb-[9px] transition-colors duration-250 group-hover:text-white/30 font-medium">
        <span className="w-[5px] h-[5px] rounded-full shrink-0 transition-colors duration-250 group-hover:bg-white/30" style={{ backgroundColor: categoryColor }}></span>
        {cat}
      </div>
      
      <h3 className="font-serif text-[18px] font-bold text-ink tracking-[-0.02em] leading-[1.25] transition-colors duration-250 group-hover:text-white">
        {name}
      </h3>
      
      <p className="text-[13px] leading-[1.7] text-inkMid mt-3 flex-1 opacity-0 translate-y-[6px] transition-all duration-250 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-white/55">
        {desc}
      </p>
      
      <div className="text-[18px] mt-5 opacity-0 transition-all duration-250 group-hover:opacity-100" style={{ color: 'var(--cc)' }}>
        →
      </div>
    </Link>
  );
}
