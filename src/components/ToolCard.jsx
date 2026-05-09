import { MoreHorizontal, Clock } from 'lucide-react';

export default function ToolCard({ icon: Icon, name, desc, cat, url }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-[#fbf9f6] border border-[#e8e4db] rounded-[16px] p-5 flex flex-col gap-4 no-underline relative group overflow-hidden transition-all hover:shadow-md hover:border-[#d8d3c8]"
    >
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-lg bg-[#efebdf] flex items-center justify-center text-ink/70">
          {Icon ? <Icon className="w-4 h-4" strokeWidth={2} /> : <span className="w-2 h-2 bg-rule rounded-full" />}
        </div>
        <button className="text-muted/60 hover:text-ink transition-colors p-1" aria-label="More options" onClick={(e) => e.preventDefault()}>
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1">
        <h3 className="font-heading text-[15px] font-bold text-ink tracking-[-0.2px] leading-snug mb-1.5">
          {name}
        </h3>
        <p className="text-[13px] text-muted leading-relaxed font-light line-clamp-2">
          {desc}
        </p>
      </div>

      {/* Footer info (Default State) */}
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted/80 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
        <Clock className="w-3.5 h-3.5" />
        <span>{cat}</span>
      </div>

      {/* Hover Button Overlay */}
      <div className="absolute bottom-4 left-5 right-5 translate-y-[150%] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex justify-center">
        <div className="bg-ink text-cream font-sans text-[12px] font-medium tracking-[0.3px] px-6 py-2 rounded-full shadow-lg w-full text-center">
          Go to Tool
        </div>
      </div>
    </a>
  );
}
