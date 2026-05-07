CATS = [
    ("General","#10b981","🛠️",[
        ("🍅","Pomodoro Tracker","Stay deep in focus. Work in sprints, rest with intent.","./General/Pomodoro Tracker/index.html",True),
        ("✅","To-Do Checklist","Keep track of tasks effectively.","./General/To do checklist/index.html",False),
        ("🎯","Goal Tracker","Set and achieve your goals.","./General/Goal Tracker/index.html",False),
        ("💧","Water Intake","Stay hydrated throughout the day.","./Medical/Water Intake Tracker/index.html",False),
        ("🛒","Shopping List","Manage your groceries effortlessly.","./General/Shopping List/index.html",False),
        ("🍱","Meal Planner","Plan your meals ahead of time.","./Medical/Meal Planner/index.html",False),
    ]),
    ("Project Managers","#3b82f6","📋",[
        ("📝","Project Charter","Define scope, objectives and participants perfectly.","./Project Managers/Project Manager Tools/Project Charter Generator/index.html",True),
        ("💼","Business Case","Build a solid business case.","./Project Managers/Project Manager Tools/Business Case Builder/index.html",False),
        ("📜","SOW Statement","Generate SOW statements quickly.","./Project Managers/Project Manager Tools/SOW Statement Generator/index.html",False),
        ("🗺️","PM Plan","Create a comprehensive PM plan.","./Project Managers/Project Manager Tools/Project Management Plan Creator/index.html",False),
        ("🎯","Scope Statement","Define your project scope clearly.","./Project Managers/Project Manager Tools/Scope Statement Tool/index.html",False),
        ("🧩","WBS Builder","Build Work Breakdown Structures.","./Project Managers/Project Manager Tools/WBS Builder/index.html",False),
        ("📅","Schedule Generator","Generate project schedules.","./Project Managers/Project Manager Tools/Project Schedule Generator/index.html",False),
        ("💰","Budget & Cost","Manage budget and costs.","./Project Managers/Project Manager Tools/Budget & Cost Plan Tool/index.html",False),
        ("⚠️","Risk Register","Track and manage project risks.","./Project Managers/Project Manager Tools/Risk Register Creator/index.html",False),
        ("👥","Stakeholder Register","Manage your stakeholders.","./Project Managers/Project Manager Tools/Stakeholder Register Tool/index.html",False),
        ("📢","Communication Plan","Plan project communications.","./Project Managers/Project Manager Tools/Communication Plan Builder/index.html",False),
        ("📊","RACI Matrix","Create RACI matrices quickly.","./Project Managers/Project Manager Tools/RACI Matrix Creator/index.html",False),
        ("🚀","Kickoff Deck","Outline kickoff presentations.","./Project Managers/Project Manager Tools/Kickoff Deck Outline/index.html",False),
        ("📝","Meeting Minutes","Log meeting minutes easily.","./Project Managers/Project Manager Tools/Meeting Minutes Template/index.html",False),
        ("📈","Weekly Status","Generate weekly status reports.","./Project Managers/Project Manager Tools/Weekly Status Report Generator/index.html",False),
        ("🐛","Issue Log","Track project issues.","./Project Managers/Project Manager Tools/Issue Log Tracker/index.html",False),
        ("⚖️","Decision Log","Log important decisions.","./Project Managers/Project Manager Tools/Decision Log Tool/index.html",False),
        ("🔄","Change Request","Manage change requests.","./Project Managers/Project Manager Tools/Change Request Form/index.html",False),
        ("🏃","Sprint Planning","Plan agile sprints.","./Project Managers/Project Manager Tools/Sprint Planning Tool/index.html",False),
        ("🔍","Retrospective","Generate retrospective notes.","./Project Managers/Project Manager Tools/Retrospective Notes Generator/index.html",False),
        ("🏁","Closure Report","Create project closure reports.","./Project Managers/Project Manager Tools/Project Closure Report/index.html",False),
        ("📚","Lessons Learned","Log lessons learned.","./Project Managers/Project Manager Tools/Lessons Learned Tool/index.html",False),
        ("🤝","Handover","Create handover documents.","./Project Managers/Project Manager Tools/Handover Document Creator/index.html",False),
        ("🔎","Post-Impl Review","Conduct post-implementation reviews.","./Project Managers/Project Manager Tools/Post-Implementation Review Tool/index.html",False),
        ("⬆️","Escalation Matrix","Build escalation matrices.","./Project Managers/Project Manager Tools/Escalation Matrix Builder/index.html",False),
    ]),
    ("Accountants","#f59e0b","💼",[
        ("🧾","Tax Estimator","Quickly estimate taxes and deductions.","./Accountants/Tax Estimator/index.html",True),
        ("💸","Expense Tracker","Track your daily expenses.","./Accountants/Expense Tracker/index.html",False),
        ("📈","SIP Calculator","Calculate mutual fund returns.","./Accountants/SIP Calculator/index.html",False),
        ("🏦","Loan / EMI","Calculate loan EMIs and schedules.","./Accountants/Loan Calculator/index.html",False),
        ("💱","Currency Converter","Convert between currencies.","./Accountants/Currency Converter/index.html",False),
    ]),
    ("HR","#14b8a6","👔",[
        ("👔","LinkedIn Bio Generator","Generate professional LinkedIn bios.","./General/LinkedIn Bio Generator/index.html",True),
        ("🎭","Tone Checker","Check the tone of communications.","./General/Tone Checker/index.html",False),
    ]),
    ("Marketing","#f43f5e","📢",[
        ("🎭","Tone Checker","Ensure your copy hits the right emotional notes.","./General/Tone Checker/index.html",True),
        ("👔","LinkedIn Bio Generator","Generate professional bios.","./General/LinkedIn Bio Generator/index.html",False),
    ]),
    ("Sales","#a855f7","🤝",[
        ("👔","LinkedIn Bio Generator","Stand out to prospects with an optimized summary.","./General/LinkedIn Bio Generator/index.html",True),
        ("🎭","Tone Checker","Check email tone before sending.","./General/Tone Checker/index.html",False),
    ]),
    ("Legal","#9ca3af","⚖️",[
        ("🎭","Tone Checker","Review legal correspondence for the right tone.","./General/Tone Checker/index.html",True),
    ]),
    ("Healthcare","#ef4444","🏥",[
        ("💧","Water Intake","Ensure you stay hydrated during long shifts.","./Medical/Water Intake Tracker/index.html",True),
        ("🍱","Meal Planner","Plan healthy meals week by week.","./Medical/Meal Planner/index.html",False),
    ]),
    ("Education","#6366f1","🎓",[
        ("✅","To-Do Checklist","Track assignments, grading, and lesson planning.","./General/To do checklist/index.html",True),
        ("🎯","Goal Tracker","Track educational and learning goals.","./General/Goal Tracker/index.html",False),
        ("🍅","Pomodoro Tracker","Study in focused sprints.","./General/Pomodoro Tracker/index.html",False),
    ]),
]

def cid(name): return "cat-" + name.replace(" ","-")

tiles = ""
sections = ""
tool_data = []

for name,color,icon_emoji,tools in CATS:
    count = len(tools)
    tiles += f"""<button class="cat-tile" onclick="openCat('{cid(name)}')" style="--accent:{color}">
  <div class="tile-bar"></div>
  <div class="tile-icon">{icon_emoji}</div>
  <div class="tile-info"><div class="tile-name">{name}</div><div class="tile-count">{count} tools</div></div>
  <span class="tile-arrow">→</span>
</button>\n"""

    cards = ""
    for emoji,tname,desc,path,featured in tools:
        safe_name = tname.replace("'","\\'")
        safe_emoji = emoji
        seen = any(t['path']==path for t in tool_data)
        if not seen:
            tool_data.append({"name":tname,"emoji":emoji,"desc":desc,"path":path})
        if featured:
            cards += f"""<a href="{path}" class="tool-card featured" onclick="trackTool('{safe_name}','{safe_emoji}')">
  <div class="card-top"><div class="card-emoji">{emoji}</div><div class="card-name">{tname}</div><div class="card-desc">{desc}</div></div>
  <div class="card-cta">Open Tool →</div>
</a>\n"""
        else:
            cards += f"""<a href="{path}" class="tool-card" onclick="trackTool('{safe_name}','{safe_emoji}')">
  <div class="card-emoji sm">{emoji}</div>
  <div class="card-name">{tname}</div>
  <div class="card-hover-desc">{desc}<div class="card-open">Open →</div></div>
</a>\n"""

    sections += f"""<section id="{cid(name)}" class="cat-section">
<div class="cat-header">
  <button class="back-btn" onclick="closeCat()">← All categories</button>
  <span class="cat-title-text">{name}</span>
  <span class="cat-badge">{count} tools</span>
</div>
<div class="bento-grid">{cards}</div>
</section>\n"""

import json
tool_json = json.dumps(tool_data, ensure_ascii=False)

html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>HelpOut — Tools for every profession</title>
<meta name="description" content="Curated tools for every profession. No login, no tracking, all local."/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:#0b0d12;color:#fff;font-family:'Inter',system-ui,sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased}}
a{{text-decoration:none;color:inherit}}

/* Glows */
.glow{{position:fixed;pointer-events:none;border-radius:50%;filter:blur(80px)}}
.g1{{top:-150px;left:50%;transform:translateX(-50%);width:800px;height:400px;background:rgba(124,58,237,.18)}}
.g2{{top:30%;left:-150px;width:350px;height:350px;background:rgba(14,165,233,.08)}}
.g3{{bottom:0;right:0;width:350px;height:350px;background:rgba(217,70,239,.08)}}

/* Nav */
nav{{position:sticky;top:0;z-index:100;background:rgba(11,13,18,.8);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 32px}}
.nav-logo{{display:flex;align-items:center;gap:10px;font-size:1.2rem;font-weight:700;letter-spacing:-.02em;cursor:pointer}}
.logo-icon{{width:36px;height:36px;background:linear-gradient(135deg,#7c3aed,#4f46e5);border-radius:10px;display:grid;place-items:center}}
.search-wrap{{position:relative;flex:1;max-width:480px}}
.search-wrap svg{{position:absolute;left:14px;top:50%;transform:translateY(-50%);opacity:.4;pointer-events:none}}
#searchInput{{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;padding:11px 48px 11px 42px;border-radius:12px;font-size:.9rem;font-family:inherit;outline:none;transition:border-color .2s,background .2s}}
#searchInput:focus{{border-color:rgba(124,58,237,.6);background:rgba(255,255,255,.09)}}
#searchInput::placeholder{{color:rgba(255,255,255,.35)}}
.kbd{{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:3px 8px;font-size:.7rem;color:rgba(255,255,255,.5)}}
.about-link{{font-size:.88rem;color:rgba(255,255,255,.6);white-space:nowrap;transition:color .2s}}
.about-link:hover{{color:#fff}}

/* Main */
main{{max-width:1200px;margin:0 auto;padding:0 32px 80px}}

/* Hero */
#hero{{text-align:center;padding:64px 0 48px}}
.pill{{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:6px 16px;font-size:.78rem;color:rgba(255,255,255,.65);margin-bottom:24px}}
.dot{{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 8px #34d399}}
#hero h1{{font-size:clamp(2.5rem,7vw,5rem);font-weight:800;letter-spacing:-.04em;line-height:1;background:linear-gradient(180deg,#fff 40%,rgba(255,255,255,.5) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px}}
#hero p{{color:rgba(255,255,255,.55);font-size:1.05rem;max-width:480px;margin:0 auto;line-height:1.65}}

/* Category grid */
#catGrid{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:48px}}
.cat-tile{{position:relative;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.02) 100%);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:28px;cursor:pointer;text-align:left;transition:transform .25s,border-color .25s,box-shadow .25s;color:#fff}}
.cat-tile:hover{{transform:translateY(-4px);border-color:rgba(255,255,255,.2);box-shadow:0 20px 60px rgba(0,0,0,.4)}}
.tile-bar{{position:absolute;top:0;left:0;right:0;height:3px;background:var(--accent)}}
.tile-icon{{width:52px;height:52px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:14px;margin-bottom:20px;display:flex;align-items:center;justify-content:center;font-size:1.6rem}}
.tile-name{{font-size:1.15rem;font-weight:700;margin-bottom:4px}}
.tile-count{{font-size:.85rem;color:rgba(255,255,255,.45)}}
.tile-arrow{{position:absolute;bottom:28px;right:28px;font-size:1.2rem;opacity:0;transform:translateX(8px);transition:opacity .25s,transform .25s;color:rgba(255,255,255,.7)}}
.cat-tile:hover .tile-arrow{{opacity:1;transform:translateX(0)}}

/* Search results */
#searchSection{{display:none;margin-bottom:48px}}
#searchSection h2{{font-size:1rem;color:rgba(255,255,255,.5);margin-bottom:20px;font-weight:600;letter-spacing:.05em;text-transform:uppercase}}

/* Cat sections */
.cat-section{{display:none;opacity:0;transform:translateY(16px);transition:opacity .25s ease,transform .25s ease;margin-bottom:48px}}
.cat-section.open{{display:block}}
.cat-section.visible{{opacity:1;transform:translateY(0)}}
.cat-header{{display:flex;align-items:center;gap:16px;margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,.08)}}
.back-btn{{background:none;border:1px solid rgba(255,255,255,.12);border-radius:8px;color:rgba(255,255,255,.55);padding:8px 16px;cursor:pointer;font:500 .85rem 'Inter',sans-serif;transition:all .2s}}
.back-btn:hover{{color:#fff;border-color:rgba(255,255,255,.3);background:rgba(255,255,255,.06)}}
.cat-title-text{{font-size:1.3rem;font-weight:700}}
.cat-badge{{background:rgba(255,255,255,.08);border-radius:999px;padding:4px 14px;font-size:.78rem;color:rgba(255,255,255,.55)}}

/* Bento grid */
.bento-grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;grid-auto-rows:175px}}
.tool-card{{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:20px;display:flex;flex-direction:column;overflow:hidden;position:relative;transition:transform .2s,border-color .2s,background .2s}}
.tool-card:hover{{transform:translateY(-3px);border-color:rgba(255,255,255,.2);background:rgba(255,255,255,.07)}}
.tool-card.featured{{grid-column:span 2;grid-row:span 2;justify-content:space-between}}
.card-emoji{{font-size:1.8rem;margin-bottom:12px}}
.card-emoji.sm{{font-size:1.5rem;margin-bottom:8px}}
.card-name{{font-size:1rem;font-weight:700;line-height:1.3}}
.card-desc{{font-size:.88rem;color:rgba(255,255,255,.55);margin-top:10px;line-height:1.5}}
.card-cta{{font-size:.85rem;font-weight:600;color:#7c6af7;display:flex;align-items:center;gap:6px}}
.card-hover-desc{{position:absolute;inset:0;background:rgba(20,20,35,.95);padding:20px;display:flex;flex-direction:column;justify-content:center;gap:10px;opacity:0;transition:opacity .2s;font-size:.85rem;color:rgba(255,255,255,.7);line-height:1.5}}
.tool-card:not(.featured):hover .card-hover-desc{{opacity:1}}
.card-open{{color:#7c6af7;font-weight:600;font-size:.85rem;margin-top:4px}}
.card-top{{flex:1}}

/* Search results grid */
#searchGrid{{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;grid-auto-rows:160px}}

/* Footer */
footer{{border-top:1px solid rgba(255,255,255,.06);text-align:center;padding:28px 32px;font-size:.85rem;color:rgba(255,255,255,.3)}}
footer a{{color:#7c6af7;font-weight:500;transition:color .2s}}
footer a:hover{{color:#fff}}

/* Responsive */
@media(max-width:900px){{
  nav{{padding:14px 20px}}
  main{{padding:0 20px 60px}}
  #catGrid{{grid-template-columns:repeat(2,1fr)}}
  .bento-grid{{grid-template-columns:repeat(2,1fr)}}
  .tool-card.featured{{grid-column:span 2;grid-row:span 1}}
  #searchGrid{{grid-template-columns:repeat(2,1fr)}}
}}
@media(max-width:600px){{
  #catGrid{{grid-template-columns:1fr}}
  .bento-grid{{grid-template-columns:1fr}}
  .tool-card.featured{{grid-column:span 1}}
  #searchGrid{{grid-template-columns:1fr}}
  .search-wrap{{display:none}}
}}
</style>
</head>
<body>
<div class="glow g1"></div>
<div class="glow g2"></div>
<div class="glow g3"></div>

<nav>
  <div class="nav-logo" onclick="closeCat()">
    <div class="logo-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
    </div>
    HelpOut
  </div>
  <div class="search-wrap">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    <input type="text" id="searchInput" placeholder="Search tools…" autocomplete="off"/>
    <span class="kbd">⌘K</span>
  </div>
  <a href="./Homepage/about.html" class="about-link">About</a>
</nav>

<main>
  <div id="hero">
    <div class="pill"><span class="dot"></span>40+ curated tools across 9 professions</div>
    <h1>Tools for every<br>profession.</h1>
    <p>Pick a category to discover handpicked tools that streamline your daily workflow.</p>
  </div>

  <div id="catGrid">{tiles}</div>

  <div id="searchSection">
    <h2>Results</h2>
    <div id="searchGrid"></div>
    <p id="searchEmpty" style="display:none;color:rgba(255,255,255,.4);font-size:.9rem;margin-top:16px">No tools found.</p>
  </div>

  {sections}
</main>

<footer>Made with ❤️ by <a href="./Homepage/about.html">Prateek Yadav</a> &nbsp;·&nbsp; <a href="./Homepage/contact.html">Contact</a> &nbsp;·&nbsp; <a href="./Homepage/privacy-policy.html">Privacy Policy</a> &nbsp;·&nbsp; All data stays on your device</footer>

<script>
const TOOLS = {tool_json};
const hero = document.getElementById('hero');
const catGrid = document.getElementById('catGrid');
const searchSec = document.getElementById('searchSection');
const searchGrid = document.getElementById('searchGrid');
const searchEmpty = document.getElementById('searchEmpty');
const catSections = document.querySelectorAll('.cat-section');

function openCat(id) {{
  hero.style.display = 'none';
  catGrid.style.display = 'none';
  searchSec.style.display = 'none';
  catSections.forEach(s => {{ s.classList.remove('open','visible'); }});
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
  window.scrollTo({{top:0,behavior:'smooth'}});
}}

function closeCat() {{
  catSections.forEach(s => {{
    s.classList.remove('visible');
    setTimeout(() => s.classList.remove('open'), 260);
  }});
  searchSec.style.display = 'none';
  hero.style.display = '';
  catGrid.style.display = '';
  document.getElementById('searchInput').value = '';
}}

document.getElementById('searchInput').addEventListener('input', function() {{
  const q = this.value.trim().toLowerCase();
  if (!q) {{ closeCat(); return; }}
  hero.style.display = 'none';
  catGrid.style.display = 'none';
  catSections.forEach(s => s.classList.remove('open','visible'));
  searchSec.style.display = 'block';
  const hits = TOOLS.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
  searchEmpty.style.display = hits.length ? 'none' : 'block';
  searchGrid.innerHTML = hits.map(t => `
    <a href="${{t.path}}" class="tool-card">
      <div class="card-emoji sm">${{t.emoji}}</div>
      <div class="card-name">${{t.name}}</div>
      <div class="card-hover-desc">${{t.desc}}<div class="card-open">Open →</div></div>
    </a>`).join('');
}});

document.addEventListener('keydown', e => {{
  if ((e.metaKey||e.ctrlKey) && e.key==='k') {{ e.preventDefault(); document.getElementById('searchInput').focus(); }}
  if (e.key==='Escape') closeCat();
}});

function trackTool(name,emoji) {{
  try {{
    let r = JSON.parse(localStorage.getItem('ho_recent')||'[]').filter(x=>x.name!==name);
    r.unshift({{name,emoji}}); localStorage.setItem('ho_recent',JSON.stringify(r.slice(0,6)));
  }} catch{{}}
}}
</script>
</body>
</html>"""

with open(r"D:\Project\HelpOut\index.html","w",encoding="utf-8") as f:
    f.write(html)
print(f"Done — {len(html)} bytes")
