import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-12 h-16 border-b border-rule sticky top-0 bg-cream/90 backdrop-blur-md z-50">
      <Link to="/" className="font-heading font-extrabold text-[17px] tracking-[-0.5px] text-ink decoration-transparent">
        HelpOut<sup className="text-[9px] font-normal tracking-[1px] text-muted uppercase align-super ml-1">®</sup>
      </Link>
      <div className="flex items-center gap-8">
        <span className="hidden sm:inline-block text-[11px] font-medium tracking-[0.8px] uppercase text-muted border border-rule px-3 py-1 rounded-full">
          No login · No tracking
        </span>
        <Link to="/about" className="text-[13px] text-muted hover:text-ink transition-colors">
          About
        </Link>
      </div>
    </nav>
  );
}
