import { Link } from 'react-router-dom';

export default function FeaturedToolCard({ icon: Icon, title, desc, url, tag, large = false }) {
  const isLegacy = url.endsWith('.html');
  const targetUrl = isLegacy ? `/tools/legacy?url=${encodeURIComponent(url)}` : url;

  return (
    <Link 
      to={targetUrl}
      className={`group bg-card border border-border rounded-[3px] cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col items-start no-underline hover:border-borderMd hover:shadow-[0_8px_32px_rgba(28,25,23,0.08)] ${large ? 'p-[36px_28px]' : 'p-[28px_24px]'}`}
    >
      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>

      <div className="w-9 h-9 bg-accentLt rounded-[6px] flex items-center justify-center mb-5 shrink-0">
        <Icon className="w-[18px] h-[18px] stroke-accent" strokeWidth={1.8} />
      </div>
      
      {tag && <div className="text-[9px] tracking-[0.18em] uppercase text-accent mb-2 font-medium">{tag}</div>}
      
      <h3 className={`font-serif font-bold text-ink tracking-[-0.02em] leading-[1.2] mb-2.5 ${large ? 'text-[28px]' : 'text-[22px]'}`}>
        {title}
      </h3>
      
      <p className="text-[13px] leading-[1.65] text-inkMid mb-6">
        {desc}
      </p>
      
      <div className="inline-flex items-center gap-[7px] text-[11px] font-semibold tracking-[0.1em] uppercase text-ink bg-transparent border border-borderMd px-[18px] py-[9px] rounded-[2px] transition-all group-hover:bg-ink group-hover:text-white group-hover:border-ink mt-auto">
        Get Started →
      </div>
    </Link>
  );
}
