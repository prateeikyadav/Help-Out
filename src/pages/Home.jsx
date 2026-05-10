import { useState, useMemo } from 'react';
import { Search, ArrowRight, LayoutTemplate, Zap, Blocks, LineChart } from 'lucide-react';
import { toolsData } from '../data/tools';
import ToolCard from '../components/ToolCard';
import FeaturedToolCard from '../components/FeaturedToolCard';
import * as Icons from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'pm', label: 'Project Manager' },
  { id: 'accountant', label: 'Accountant' },
  { id: 'hr', label: 'HR' },
  { id: 'healthcare', label: 'Healthcare' }
];

export default function Home() {
  const [activeCat, setActiveCat] = useState('all');
  const [searchVal, setSearchVal] = useState('');

  const filteredTools = useMemo(() => {
    const q = searchVal.trim().toLowerCase();
    return toolsData.filter(t => {
      let tCatId = 'general';
      const tcat = t.cat.toLowerCase();
      if (tcat.includes('project')) tCatId = 'pm';
      else if (tcat.includes('accountant')) tCatId = 'accountant';
      else if (tcat.includes('hr')) tCatId = 'hr';
      else if (tcat.includes('health')) tCatId = 'healthcare';

      const isCatMatch = activeCat === 'all' || activeCat === tCatId;
      const isSearchMatch = !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q);
      return isCatMatch && isSearchMatch;
    });
  }, [activeCat, searchVal]);

  const categorySummaries = [
    { id: 'general', name: 'General Productivity', desc: 'Essential utilities for mastering focus, tracking daily habits, and deconstructing your workload into actionable tasks.', iconName: 'Target' },
    { id: 'pm', name: 'Project Management', desc: 'A comprehensive collection of tools for defining scopes, tracking budgets, mitigating risks, and managing stakeholders.', iconName: 'Briefcase' },
    { id: 'accountant', name: 'Accounting & Finance', desc: 'Professional calculators and estimators for tracking expenses, planning investments, and managing tax obligations.', iconName: 'Wallet' },
    { id: 'hr', name: 'Human Resources', desc: 'Creative generators for crafting professional bios, checking tones, and managing talent communication.', iconName: 'Users' },
    { id: 'healthcare', name: 'Healthcare & Wellness', desc: 'Personal trackers for monitoring hydration, planning meals, and maintaining optimal daily wellness routines.', iconName: 'Activity' }
  ];

  return (
    <div className="flex-1 bg-bg min-h-screen text-ink font-sans">
      
      {/* TOP NAV */}
      <header className="sticky top-0 z-30 flex flex-col md:flex-row justify-between items-center px-6 md:px-[52px] py-4 md:py-5 border-b border-border bg-[#F3F1EC]/92 backdrop-blur-md gap-4 md:gap-0">
        <span className="text-[10px] tracking-[0.2em] uppercase text-inkMid font-medium">The Productivity Portfolio</span>
        <div className="flex gap-3 items-center w-full md:w-auto">
          <div className="flex items-center gap-2 bg-card border border-border rounded-[2px] px-3.5 py-1.5 text-[12px] text-inkLight flex-1 md:w-auto">
            <Search className="w-[13px] h-[13px] stroke-inkLight" strokeWidth={2} />
            <input 
              type="text" 
              placeholder="Search tools..." 
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              className="bg-transparent border-none outline-none w-full md:w-[140px] text-ink placeholder:text-inkLight"
            />
          </div>
          <a href="#discover" className="bg-accent text-white text-[11px] font-semibold tracking-[0.08em] uppercase px-5 py-[9px] rounded-[2px] hover:opacity-85 transition-opacity shrink-0 no-underline inline-block">
            Become More Efficient →
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] border-b border-border">
        <div className="px-6 md:px-[52px] pt-[72px] pb-[64px] lg:border-r border-border border-b lg:border-b-0">
          <div className="flex items-center gap-2.5 mb-7">
            <div className="w-8 h-px bg-accent"></div>
            <span className="text-[10px] tracking-[0.22em] uppercase text-inkMid font-medium">Curated for professionals</span>
          </div>
          <h1 className="font-serif text-[clamp(3.5rem,7vw,76px)] leading-[0.96] tracking-[-0.03em] font-bold text-ink mb-8">
            Tools for<br /><em className="italic text-accent">every</em><br />profession.
          </h1>
          <p className="text-[15px] leading-[1.75] text-inkMid max-w-[380px] mb-10">
            Access a curated ecosystem of essential productivity and creative tools. Empower your team with an all-integrated, advanced, and user-focused design system.
          </p>
          <div className="flex items-center gap-3">
            <a href="#discover" className="bg-ink text-white text-[12px] font-semibold tracking-[0.08em] uppercase px-7 py-3.5 rounded-[2px] hover:bg-accent transition-colors flex items-center gap-2 no-underline">
              Explore the Suite →
            </a>
            <a href="#discover" className="text-[12px] text-inkMid tracking-[0.06em] flex items-center gap-1.5 py-1 border-b border-borderMd hover:text-ink hover:border-ink transition-colors font-medium no-underline">
              Watch demo ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col">
          {[
            { num: '40', accent: '+', label: 'Free Tools' },
            { num: '4', accent: '', label: 'Professions' },
            { num: '0', accent: '', label: 'Logins Needed' },
            { num: '100', accent: '%', label: 'Local & Private' }
          ].map((stat, i) => (
            <div key={i} className="flex-1 px-8 md:px-[36px] py-8 border-b border-border last:border-b-0 flex flex-col justify-center hover:bg-card transition-all duration-300 group cursor-default">
              <div className="font-serif text-[48px] font-bold text-ink tracking-[-0.03em] leading-none mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                {stat.num}<span className="text-accent">{stat.accent}</span>
              </div>
              <div className="text-[11px] tracking-[0.14em] uppercase text-inkLight font-medium group-hover:text-inkMid transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-surfaceDark overflow-hidden py-3.5 border-y border-surfaceDark flex">
        <div className="flex whitespace-nowrap animate-marquee w-max items-center">
          {[...toolsData, ...toolsData].map((tool, i) => (
            <div key={i} className="flex items-center">
              <span className="w-1 h-1 rounded-full bg-accent mx-6"></span>
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/60">{tool.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED TOOLS */}
      <section className="px-6 md:px-[52px] border-b border-border">
        <div className="flex justify-between items-center py-7 border-b border-border mb-7">
          <span className="text-[10px] tracking-[0.22em] uppercase text-inkMid font-medium">Featured Tools</span>
          <a href="#discover" className="text-[11px] text-accent tracking-[0.06em] flex items-center gap-1 border-b border-transparent hover:border-accent transition-colors font-medium">
            View all 40+ tools →
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-9">
          <FeaturedToolCard 
            large={true}
            tag="Focus"
            icon={Icons.CircleDot} 
            title="Focus Ritual" 
            desc="Master your attention with intentional, uninterrupted work sprints. Design the conditions for your best thinking." 
            url="/tools/General/Focus Ritual/index.html" 
          />
          <FeaturedToolCard 
            tag="Project Manager"
            icon={Icons.FileText} 
            title="Project Charter" 
            desc="Define explicit project boundaries, deliverables, and foundational authority." 
            url="/tools/Project Managers/Project Manager Tools/Project Charter Generator/index.html" 
          />
          <FeaturedToolCard 
            tag="Accountant"
            icon={Icons.Wallet} 
            title="Expense Tracker" 
            desc="Monitor your spending and stay perfectly on budget with visual tracking." 
            url="/tools/Accountants/Expense Tracker/index.html" 
          />
        </div>
      </section>

      {/* DISCOVER TOOLS */}
      <section className="px-6 md:px-[52px] pb-[60px]" id="discover">
        <div className="py-8 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <h2 className="font-serif text-[38px] font-bold tracking-[-0.03em] text-ink leading-none">Discover Your Tools</h2>
          <span className="text-[12px] text-inkLight tracking-[0.06em] font-medium">40 tools available</span>
        </div>

        <div className="flex gap-1.5 py-5 border-b border-border mb-7 items-center flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`text-[11px] font-medium px-4 py-1.5 rounded-full border transition-all tracking-[0.04em] ${
                activeCat === cat.id 
                  ? 'bg-ink text-white border-ink' 
                  : 'bg-transparent text-inkMid border-borderMd hover:border-ink hover:text-ink'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <div className="md:ml-auto flex items-center gap-2 border border-border rounded-full px-4 py-1.5 bg-card w-full md:w-auto mt-2 md:mt-0">
            <Search className="w-[13px] h-[13px] stroke-inkLight" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              className="bg-transparent border-none outline-none text-[12px] text-ink placeholder:text-inkLight w-full md:w-[140px]"
            />
          </div>
        </div>

        {activeCat === 'all' && searchVal.trim() === '' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorySummaries.map((cat) => {
              const Icon = Icons[cat.iconName];
              const toolCount = toolsData.filter(t => {
                let catId = 'general';
                const tcat = t.cat.toLowerCase();
                if (tcat.includes('project')) catId = 'pm';
                else if (tcat.includes('accountant')) catId = 'accountant';
                else if (tcat.includes('hr')) catId = 'hr';
                else if (tcat.includes('health')) catId = 'healthcare';
                return catId === cat.id;
              }).length;

              return (
                <div 
                  key={cat.id} 
                  className="bg-card border border-borderMd rounded-2xl p-8 hover:shadow-[0_12px_40px_rgba(28,25,23,0.06)] transition-all duration-500 hover:-translate-y-1 group flex flex-col cursor-pointer" 
                  onClick={() => setActiveCat(cat.id)}
                >
                  <div className="w-12 h-12 bg-bg text-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-borderMd">
                    {Icon && <Icon className="w-6 h-6 stroke-[1.5]" />}
                  </div>
                  <h3 className="font-serif text-[26px] font-bold text-ink leading-tight mb-3 group-hover:text-accent transition-colors duration-300">{cat.name}</h3>
                  <p className="text-[14px] text-inkMid leading-relaxed mb-8 flex-1">{cat.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-borderMd">
                    <span className="text-[11px] font-bold text-inkLight tracking-[0.1em] uppercase">{toolCount} Tools Available</span>
                    <span className="text-[11px] font-bold text-accent tracking-[0.1em] uppercase flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      Explore Suite <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border border-border rounded-[4px] overflow-hidden">
            {filteredTools.length === 0 ? (
              <div className="col-span-full text-center py-20 text-inkLight font-serif text-[1.5rem] italic bg-card">
                Nothing found — try a different search.
              </div>
            ) : (
              filteredTools.map((t, i) => {
                // Map category to data-cat logic
                let catId = 'general';
                const tcat = t.cat.toLowerCase();
                if (tcat.includes('project')) catId = 'pm';
                else if (tcat.includes('accountant')) catId = 'accountant';
                else if (tcat.includes('hr')) catId = 'hr';
                else if (tcat.includes('health')) catId = 'healthcare';
                
                return (
                  <ToolCard 
                    key={i} 
                    index={i + 1}
                    catId={catId}
                    {...t} 
                  />
                );
              })
            )}
          </div>
        )}
      </section>

      {/* VALUES */}
      <section className="border-t border-border px-6 md:px-[52px] py-20 md:py-[88px] grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 md:gap-[80px] items-start">
        <div>
          <h2 className="font-serif text-[48px] leading-[1.05] tracking-[-0.03em] font-bold text-ink">
            Built the way tools <em className="italic text-accent">should</em> be.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { num: '01', title: 'Modern UI', desc: 'Beautifully crafted interfaces designed for maximum productivity and minimal friction.' },
            { num: '02', title: 'Effortless Workflows', desc: 'Jump into any tool, no setup, no onboarding. Just focused, immediate value.' },
            { num: '03', title: 'Integration Hub', desc: 'Export your data to PDF or Excel instantly. Your work, your way, anywhere.' },
            { num: '04', title: 'Scalable Tech', desc: 'Enterprise-grade infrastructure, from solo practitioners to entire organisations.' }
          ].map((val, i) => (
            <div key={i} className="bg-card border border-border rounded-[4px] p-8 md:p-[36px] flex gap-6 hover:bg-bg transition-colors items-start">
              <div className="font-serif text-[40px] font-bold text-accent tracking-[-0.02em] leading-none shrink-0 w-[52px]">{val.num}</div>
              <div>
                <div className="text-[15px] font-semibold text-ink mb-2.5 tracking-[-0.01em]">{val.title}</div>
                <div className="text-[13px] leading-[1.75] text-inkMid">{val.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-surfaceDark px-6 md:px-[52px] py-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <div className="font-serif text-[22px] font-bold text-white tracking-[-0.02em]">
          Help<span className="text-accent">Out</span>
        </div>
        <div className="flex gap-6">
          <a href="/about" className="text-[11px] text-white/40 tracking-[0.08em] hover:text-white transition-colors font-medium">About</a>
          <a href="/contact" className="text-[11px] text-white/40 tracking-[0.08em] hover:text-white transition-colors font-medium">Contact</a>
          <a href="/privacy-policy" className="text-[11px] text-white/40 tracking-[0.08em] hover:text-white transition-colors font-medium">Privacy Policy</a>
        </div>
        <div className="text-[11px] text-white/30 tracking-[0.08em] font-medium">
          © 2026 HelpOut
        </div>
      </footer>

    </div>
  );
}
