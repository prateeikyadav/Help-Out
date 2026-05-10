import { Link } from 'react-router-dom';

export default function FeaturedToolCard({ bg, icon: Icon, title, desc, url }) {
  const isLegacy = url.endsWith('.html');
  const targetUrl = isLegacy ? `/tools/legacy?url=${encodeURIComponent(url)}` : url;

  return (
    <Link 
      to={targetUrl}
      className={`${bg} rounded-[20px] p-8 flex flex-col items-start gap-4 no-underline group shadow-lg hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden`}
    >
      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 mb-2">
        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-[22px] font-bold text-white tracking-[-0.2px] m-0">
        {title}
      </h3>
      <p className="text-[14px] text-white/80 leading-[1.6] font-light flex-1 m-0 pr-4">
        {desc}
      </p>
      <div className="mt-4 px-6 py-2.5 bg-white text-ink font-sans text-[13px] font-bold rounded-full transition-transform group-hover:scale-105 inline-flex">
        Get Started
      </div>
    </Link>
  );
}
