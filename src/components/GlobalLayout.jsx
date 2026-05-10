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
    <div className="min-h-screen bg-[#f0ece3] flex font-sans text-ink">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e8e4db] flex-col hidden md:flex sticky top-0 h-screen z-40">
        <div className="p-6 border-b border-[#e8e4db]">
          <Link to="/" className="font-display text-[24px] font-bold tracking-[-1px] text-ink no-underline flex items-center gap-2">
            HelpOut<span className="text-[12px] font-sans text-muted align-top -mt-3">®</span>
          </Link>
          <div className="text-[10px] font-bold tracking-[1.5px] text-muted uppercase mt-1">
            Productivity Portfolio
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all no-underline ${
                  isActive 
                    ? 'bg-ink text-cream shadow-md' 
                    : 'text-muted hover:bg-[#f0ece3] hover:text-ink'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#e8e4db] text-[11px] text-muted font-medium">
          © 2026 HelpOut
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-[#e8e4db] px-4 py-3 flex items-center justify-between z-50">
        <Link to="/" className="font-display text-[20px] font-bold tracking-[-1px] text-ink no-underline">
          HelpOut
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-ink">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-16 px-4">
          <nav className="space-y-2 mt-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl text-[16px] font-medium transition-all no-underline ${
                    isActive 
                      ? 'bg-ink text-cream shadow-md' 
                      : 'bg-[#f0ece3] text-ink'
                  }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
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
