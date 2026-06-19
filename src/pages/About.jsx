import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-[#f6f1e7] text-[#1f1a14] flex-1 font-sans pb-20 w-full">
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <header className="flex justify-between items-center border-b border-[#d8cfbf] pb-4 font-['JetBrains_Mono'] font-medium text-[11px] tracking-[.25em] uppercase text-[#6b6256]">
          <span>PY · 01</span>
          <span className="hidden md:inline">Satara · Maharashtra · India</span>
          <span>2026 / About</span>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-14">
          <div>
            <p className="font-['Inter'] font-medium text-[11px] tracking-[.3em] uppercase text-[#c0532a] m-0 mb-6">
              About — Product Manager
            </p>
            <h1 className="font-['Fraunces'] text-[clamp(3rem,9vw,7.5rem)] leading-[.95] font-semibold tracking-[-0.02em] m-0">
              Prateek<br/><em className="italic text-[#c0532a]">Niwas</em> Yadav.
            </h1>
            <p className="mt-8 max-w-[560px] text-[1.125rem] leading-[1.65] text-[#6b6256]">
              I build enterprise SaaS that engineers actually want to ship and customers actually want to use. Two years deep into product — equal parts customer obsession, sharp specs, and ruthless prioritisation.
            </p>
          </div>
          <aside className="border border-[#d8cfbf] bg-[#fbf7ef] rounded-[10px] p-5 font-['JetBrains_Mono'] font-medium text-[14px] leading-[1.6] mt-0 md:mt-24">
            <div className="text-[11px] tracking-[.2em] uppercase text-[#6b6256] mb-2">Contact</div>
            <a href="mailto:prateeikyadav11@gmail.com" className="hover:text-[#c0532a] transition-colors">prateeikyadav11@gmail.com</a><br/>
            <a href="https://linkedin.com/in/prateeikyadav" target="_blank" rel="noreferrer" className="hover:text-[#c0532a] transition-colors">linkedin.com/in/prateeikyadav</a><br/>
            <span>+91 99221 23973</span>
          </aside>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { k: '2+ yrs', v: 'Product Experience' },
            { k: '80+', v: 'Backlog items shipped' },
            { k: '30%', v: 'Delivery predictability ↑' },
            { k: '25%', v: 'Dev rework ↓' },
          ].map((stat, i) => (
            <div key={i} className="border-t border-[#d8cfbf] pt-3.5">
              <div className="font-['Fraunces'] text-[2rem] font-semibold">{stat.k}</div>
              <div className="text-[11px] uppercase tracking-[.2em] text-[#6b6256] mt-1.5">{stat.v}</div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-10 mt-20">
          <div>
            <h2 className="font-['Fraunces'] text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.02em] mb-4 m-0">How I work.</h2>
            <p className="text-[17px] leading-[1.7] mb-4">
              I enjoy turning ambiguous problems into structured execution plans that teams can actually ship against. My work usually starts with understanding customer pain points, breaking them into measurable outcomes, and converting them into clear product requirements, workflows, and developer-ready user stories.
            </p>
            <p className="text-[17px] leading-[1.7] mb-4">
              I believe good product management sits between strategy and execution — balancing business goals, user needs, and engineering realities without overcomplicating the process. I rely heavily on iterative delivery, data-backed decision making, and clear stakeholder communication using tools like SQL, JQL, dashboards, and sprint analytics.
            </p>
            <p className="text-[17px] leading-[1.7] mb-4">
              My foundation comes from managing large-scale enterprise deployments for organizations including ICICI Bank and HDFC Bank, where execution quality mattered as much as delivery speed. That experience taught me the value of precision, ownership, realistic timelines, and keeping teams aligned even under pressure.
            </p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-[11px] tracking-[.25em] uppercase text-[#6b6256] m-0 mb-4 font-['Fraunces'] font-semibold">Toolbelt</h3>
              <div className="flex flex-wrap gap-2">
                {['Jira', 'Confluence', 'SQL', 'JQL', 'Python', 'AWS', 'Figma', 'Miro', 'Claude', 'Kiro'].map(tag => (
                  <span key={tag} className="font-['JetBrains_Mono'] font-medium text-[12px] leading-none py-2 px-3 border border-[#d8cfbf] rounded-full bg-[#fbf7ef]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[11px] tracking-[.25em] uppercase text-[#6b6256] m-0 mb-4 font-['Fraunces'] font-semibold">Certified</h3>
              <ul className="list-none p-0 m-0 text-[14px] leading-[1.9]">
                <li>· Professional Scrum Product Owner (PSPO)</li>
                <li>· AWS Certified Cloud Practitioner</li>
                <li>· Microsoft Azure Fundamentals</li>
                <li>· Google Cloud — Networking & IAM</li>
                <li>· Jira Advanced 2025 (JQL & Admin)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20 pt-10 border-t border-[#d8cfbf]">
          <h2 className="font-['Fraunces'] text-[clamp(1.5rem,3vw,2rem)] font-semibold mb-3 m-0">Also — I built HelpOut.</h2>
          <p className="text-[16px] leading-[1.7] text-[#6b6256] max-w-[600px] mb-6">
            A free, no-login productivity toolkit with 40+ tools covering 9 professions. Everything runs in your browser. No data leaves your device.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-[#1f1a14] text-[#f6f1e7] font-['JetBrains_Mono'] font-medium text-[13px] tracking-[.1em] uppercase py-3 px-5 rounded-[8px] transition-colors hover:bg-[#c0532a] hover:text-white">
            Explore the tools →
          </Link>
        </section>

        <footer className="mt-20 pt-6 border-t border-[#d8cfbf] flex flex-wrap justify-between items-center gap-3 font-['JetBrains_Mono'] font-medium text-[11px] text-[#6b6256]">
          <span>B.Tech Electronics · Dr. BATU · 2023</span>
          <span className="font-['Fraunces'] italic text-[1rem] text-[#1f1a14] hidden md:inline">"Customer-obsessed. Data-driven. Shipped."</span>
          <span>© Prateek Yadav</span>
        </footer>
      </div>
    </div>
  );
}
