import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-rule py-8 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-6">
        <div className="text-[12px] text-muted">
          Made with ❤️ by <Link to="/about" className="hover:text-ink transition-colors">Prateek Yadav</Link>
        </div>
        <div className="flex gap-6">
          <Link to="/about" className="text-[12px] text-muted hover:text-ink transition-colors">About</Link>
          <Link to="/contact" className="text-[12px] text-muted hover:text-ink transition-colors">Contact</Link>
          <Link to="/privacy-policy" className="text-[12px] text-muted hover:text-ink transition-colors">Privacy</Link>
        </div>
      </div>
      <span className="text-[11px] font-medium tracking-[0.8px] uppercase text-muted border border-rule px-3 py-1 rounded-full">
        All data stays on your device
      </span>
    </footer>
  );
}
