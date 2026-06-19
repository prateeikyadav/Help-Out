import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Mail, Shield, Menu, X } from 'lucide-react';

export default function GlobalLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/contact', label: 'Contact', icon: Mail },
    { path: '/privacy-policy', label: 'Privacy Policy', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-bg flex font-sans text-ink">
      {/* Desktop Sidebar */}
      <aside className="w-[180px] bg-surfaceDark border-r border-white/5 flex-col hidden md:flex sticky top-0 h-screen z-40 py-8">
        <div className="px-[22px] pb-6 mb-5 border-b border-white/5 w-full">
          <Link to="/" className="font-display text-[28px] font-normal tracking-[-0.01em] text-white no-underline flex items-start gap-[2px] leading-none">
            HelpOut<sup className="text-[10px] font-sans font-light text-white/35 mt-[5px]">®</sup>
          </Link>
          <div className="font-sans text-[8.5px] tracking-[0.22em] uppercase text-white/30 mt-2 font-normal">
            Productivity Portfolio
          </div>
        </div>
        
        <nav className="flex flex-col gap-[2px] w-full px-3 mb-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[3px] text-[12px] tracking-[0.04em] font-normal transition-all no-underline ${
                  isActive 
                    ? 'bg-white/5 text-white' 
                    : 'text-white/35 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'stroke-accent' : 'stroke-current'}`} strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="w-1.5 h-1.5 bg-accent rounded-full ml-[22px] mt-4 shrink-0"></div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-surfaceDark border-b border-white/5 px-4 py-3 flex items-center justify-between z-50">
        <Link to="/" className="font-display text-[20px] font-normal tracking-[-0.01em] text-white no-underline flex items-start gap-[2px] leading-none">
          HelpOut<sup className="text-[8px] font-sans font-light text-white/35 mt-[2px]">®</sup>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-white">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-surfaceDark pt-16 px-4">
          <nav className="flex flex-col gap-2 w-full mt-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-[4px] text-[14px] tracking-[0.04em] font-normal transition-all no-underline ${
                    isActive 
                      ? 'bg-white/5 text-white' 
                      : 'text-white/35 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'stroke-accent' : 'stroke-current'}`} strokeWidth={1.5} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
