import { useState, useMemo } from 'react';
import { Search, ArrowRight, LayoutTemplate, Zap, Blocks, LineChart } from 'lucide-react';
import { toolsData } from '../data/tools';
import ToolCard from '../components/ToolCard';
import FeaturedToolCard from '../components/FeaturedToolCard';
import * as Icons from 'lucide-react';

const CATEGORIES = ['All', 'General', 'Project Manager', 'Accountant', 'HR', 'Healthcare'];

export default function Home() {
  const [activeCat, setActiveCat] = useState('All');
  const [searchVal, setSearchVal] = useState('');

  const filteredTools = useMemo(() => {
    const q = searchVal.trim().toLowerCase();
    return toolsData.filter(t =>
      (activeCat === 'All' || t.cat === activeCat) &&
      (!q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q))
    );
  }, [activeCat, searchVal]);

  return (
    <main className="bg-[#f0ece3] min-h-screen pb-20">
      {/* HERO */}
      <section className="pt-20 pb-16 px-6 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
        <div className="pt-8">
          <div className="text-[10px] font-bold tracking-[2px] uppercase text-muted mb-8">
            THE PRODUCTIVITY PORTFOLIO
          </div>
          <h1 className="font-display text-[clamp(4.5rem,10vw,7.5rem)] font-light leading-[0.95] tracking-[-2px] text-ink mb-6">
            Tools for <em className="italic text-accent">every</em><br />profession.
          </h1>
          <p className="text-[17px] text-ink/70 max-w-[500px] leading-[1.6] font-light mb-10">
            Access a curated ecosystem of essential productivity and creative tools. Empower your team with an all-integrated, advanced, and user-focused design system.
          </p>
          <a 
            href="#tools" 
            className="inline-flex items-center gap-3 bg-ink text-cream font-sans text-[14px] font-medium tracking-[0.3px] px-8 py-3.5 rounded-full no-underline transition-all hover:bg-[#1e1c18] hover:-translate-y-px group shadow-md"
          >
            Become a More Efficient You
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Stats Vertical Block */}
        <div className="bg-[#e2ddd1] rounded-xl p-8 min-w-[200px] flex flex-col gap-6 shadow-sm border border-[#d5cebf]">
          {[
            { num: '40+', label: 'Verified Tools' },
            { num: '28k', label: 'Commits & Contributions' },
            { num: '1.8k', label: 'Projects Managed' },
            { num: '100%', label: 'System Uptime' }
          ].map((stat, i) => (
            <div key={i} className={`flex flex-col ${i !== 0 ? 'pt-6 border-t border-[#c8c1ae]' : ''}`}>
              <div className="font-display text-[2rem] font-semibold leading-none text-ink tracking-[-1px] mb-2">
                {stat.num}
              </div>
              <div className="text-[11px] font-medium tracking-[0.2px] text-ink/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED TOOLS */}
      <section className="px-6 md:px-12 max-w-[1200px] mx-auto mb-20">
        <h2 className="font-sans text-[22px] font-bold text-ink mb-6">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeaturedToolCard 
            bg="bg-[#4f627e]" 
            icon={Icons.Bot} 
            title="Focus Ritual" 
            desc="Master your attention with intentional, uninterrupted work sprints." 
            url="/tools/General/Focus Ritual/index.html" 
          />
          <FeaturedToolCard 
            bg="bg-[#6a724d]" 
            icon={Icons.FileSignature} 
            title="Project Charter" 
            desc="Define explicit project boundaries, deliverables, and foundational authority." 
            url="/tools/Project Managers/Project Manager Tools/Project Charter Generator/index.html" 
          />
          <FeaturedToolCard 
            bg="bg-[#5b3044]" 
            icon={Icons.Wallet} 
            title="Expense Tracker" 
            desc="Monitor your spending and stay perfectly on budget with visual tracking." 
            url="/tools/Accountants/Expense Tracker/index.html" 
          />
        </div>
      </section>

      {/* TOOL EXPLORER */}
      <section className="max-w-[1200px] mx-auto py-12 px-6 md:px-12" id="tools">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[1px] uppercase text-muted mb-4">
          <ArrowRight className="w-3 h-3" /> PICK A TOOL
        </div>
        <h2 className="font-display text-[clamp(2.5rem,4vw,3.2rem)] font-light tracking-[-0.5px] text-ink mb-10 leading-[1.1]">
          Discover Your Tools
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap gap-2 bg-[#e8e4db] p-1.5 rounded-full">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`font-sans text-[12px] font-medium tracking-[0.3px] px-5 py-1.5 rounded-full cursor-pointer transition-all ${
                  activeCat === cat 
                    ? 'bg-ink text-cream shadow-md' 
                    : 'bg-transparent text-ink/70 hover:bg-black/5 hover:text-ink'
                }`}
              >
                {cat === 'All' ? 'All' : cat}
              </button>
            ))}
          </div>
          <div className="relative shrink-0 w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              autoComplete="off"
              className="bg-white border border-[#e8e4db] rounded-full py-2.5 pl-11 pr-5 font-sans text-[13px] text-ink outline-none w-full md:w-[260px] shadow-sm transition-all focus:border-ink focus:ring-1 focus:ring-ink placeholder:text-ink/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTools.length === 0 ? (
            <div className="col-span-full text-center py-20 text-muted font-display text-[1.8rem] font-light italic">
              Nothing found — try a different search.
            </div>
          ) : (
            filteredTools.map((t, i) => <ToolCard key={i} {...t} />)
          )}
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="bg-[#e8e4db] py-24 px-6 md:px-12 mt-12 border-t border-[#d8d3c8]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-[clamp(2.5rem,4vw,3.2rem)] font-light tracking-[-0.5px] text-ink leading-[1.1] mb-12">
            Built the way<br />tools <em className="italic text-accent">should</em> be.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', icon: LayoutTemplate, title: 'Modern UI', desc: 'Beautifully crafted interfaces designed for maximum productivity and minimal friction.' },
              { num: '02', icon: Zap, title: 'Effortless Workflows', desc: 'Jump straight into your work. No logins, no tracking, just instant value.' },
              { num: '03', icon: Blocks, title: 'Integration Hub', desc: 'Export your data to PDF or Excel instantly. Your work stays entirely yours.' },
              { num: '04', icon: LineChart, title: 'Scalable Tech', desc: 'Built for rigorous professional environments, from start-ups to enterprise.' }
            ].map((why, i) => {
              const IconComponent = why.icon;
              return (
                <div key={i} className="p-8 bg-[#fbf9f6] rounded-[20px] shadow-sm border border-white/50 flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="font-display text-[3.5rem] font-light text-[#c8c1ae] leading-none tracking-[-1px]">
                      {why.num}
                    </div>
                    <IconComponent className="w-6 h-6 text-ink/80" strokeWidth={1.5} />
                  </div>
                  <div className="font-heading text-[16px] font-bold text-ink mb-2">
                    {why.title}
                  </div>
                  <div className="text-[13px] text-muted leading-[1.6] font-light">
                    {why.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
