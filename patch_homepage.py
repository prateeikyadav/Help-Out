"""
Patches index.html with:
1. Spotlight ⌘K modal
2. Recently Used row (localStorage)
3. Animated cascade tile entry
"""
import re

PATH = r"D:\Project\HelpOut\index.html"

with open(PATH, "r", encoding="utf-8") as f:
    html = f.read()

# ── 1. Inject CSS patch before </style> ────────────────────────────────────
CSS_PATCH = """
        /* ── Cascade tile animation ─────────────────────── */
        @keyframes tileFadeIn {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .cat-tile {
            opacity: 0;
            animation: tileFadeIn 0.4s ease forwards;
        }

        /* ── Recently Used row ──────────────────────────── */
        #recentRow {
            margin-bottom: 48px;
            display: none;
        }
        #recentRow.show { display: block; }
        .recent-label {
            font-size: 0.78rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 14px;
        }
        .recent-chips {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .recent-chip {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 100px;
            padding: 8px 16px;
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--text-main);
            text-decoration: none;
            transition: all 0.18s;
        }
        .recent-chip:hover {
            background: var(--surface-hover);
            border-color: rgba(255,255,255,0.18);
            transform: translateY(-1px);
        }
        .recent-chip-emoji { font-size: 1rem; }

        /* ── Spotlight modal ─────────────────────────────── */
        #spotlight-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.65);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 9999;
            align-items: flex-start;
            justify-content: center;
            padding-top: 10vh;
        }
        #spotlight-overlay.open { display: flex; }

        #spotlight-box {
            background: #1a1a28;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 20px;
            width: 100%;
            max-width: 600px;
            box-shadow: 0 32px 80px rgba(0,0,0,0.6);
            overflow: hidden;
            animation: spotlightIn 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes spotlightIn {
            from { opacity: 0; transform: scale(0.95) translateY(-10px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        #spotlight-input-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 18px 22px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        #spotlight-input {
            flex: 1;
            background: none;
            border: none;
            outline: none;
            font-family: 'DM Sans', sans-serif;
            font-size: 1.1rem;
            color: var(--text-main);
        }
        #spotlight-input::placeholder { color: var(--text-muted); }

        #spotlight-results {
            max-height: 440px;
            overflow-y: auto;
            padding: 8px;
        }
        .sp-result {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 12px 14px;
            border-radius: 12px;
            text-decoration: none;
            color: var(--text-main);
            transition: background 0.15s;
            cursor: pointer;
        }
        .sp-result:hover, .sp-result.selected {
            background: rgba(124,106,247,0.12);
        }
        .sp-emoji { font-size: 1.4rem; width: 36px; text-align: center; flex-shrink: 0; }
        .sp-info { flex: 1; min-width: 0; }
        .sp-name { font-weight: 600; font-size: 0.95rem; }
        .sp-desc { font-size: 0.82rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }
        .sp-cat-tag {
            font-size: 0.75rem;
            font-weight: 600;
            padding: 3px 10px;
            border-radius: 20px;
            background: rgba(255,255,255,0.07);
            color: var(--text-muted);
            flex-shrink: 0;
        }
        .sp-empty {
            text-align: center;
            color: var(--text-muted);
            padding: 40px 20px;
            font-size: 0.95rem;
        }
        #spotlight-footer {
            display: flex;
            gap: 20px;
            align-items: center;
            padding: 10px 22px;
            border-top: 1px solid rgba(255,255,255,0.06);
            font-size: 0.78rem;
            color: var(--text-muted);
        }
        .sp-kbd {
            background: rgba(255,255,255,0.08);
            border-radius: 5px;
            padding: 2px 7px;
            font-size: 0.75rem;
            margin-right: 4px;
        }
"""

html = html.replace("    </style>", CSS_PATCH + "    </style>", 1)

# ── 2. Inject "Recently Used" placeholder before category-grid ──────────────
RECENT_ROW_HTML = """
        <!-- Recently Used -->
        <div id="recentRow">
            <div class="recent-label">⚡ Recently Used</div>
            <div class="recent-chips" id="recentChips"></div>
        </div>

"""
html = html.replace(
    '        <!-- Categories Grid -->',
    RECENT_ROW_HTML + '        <!-- Categories Grid -->'
)

# ── 3. Inject Spotlight modal before </body> ────────────────────────────────
SPOTLIGHT_HTML = """
    <!-- Spotlight Modal -->
    <div id="spotlight-overlay" onclick="closeSpotlight(event)">
        <div id="spotlight-box">
            <div id="spotlight-input-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted);flex-shrink:0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input id="spotlight-input" placeholder="Search tools, categories..." autocomplete="off" spellcheck="false">
                <kbd style="background:rgba(255,255,255,0.08);padding:4px 8px;border-radius:6px;font-size:0.75rem;color:var(--text-muted);cursor:pointer" onclick="closeSpotlight()">Esc</kbd>
            </div>
            <div id="spotlight-results"></div>
            <div id="spotlight-footer">
                <span><kbd class="sp-kbd">↑↓</kbd>Navigate</span>
                <span><kbd class="sp-kbd">↵</kbd>Open</span>
                <span><kbd class="sp-kbd">Esc</kbd>Close</span>
            </div>
        </div>
    </div>
"""
html = html.replace("</body>", SPOTLIGHT_HTML + "\n</body>")

# ── 4. Replace the old <script> block with upgraded version ─────────────────
OLD_SCRIPT_START = "    <script>"
NEW_SCRIPT = """    <script>
        /* ── All tool data for Spotlight ─────────────────── */
        const ALL_TOOLS = [
"""

# Build tool data from the existing data-name/data-desc/href attributes at runtime via JS
# We'll inject inline JS data array by scanning the page DOM

SCRIPT_BODY = r"""
        const searchInput = document.getElementById('searchInput');
        const categoryGrid = document.getElementById('categoryGrid');
        const heroSection = document.getElementById('heroSection');
        const searchResults = document.getElementById('searchResults');
        const searchResultsGrid = document.getElementById('searchResultsGrid');
        const categorySections = document.querySelectorAll('.category-section');

        /* ── Build tool index from DOM ─────────────────── */
        const toolIndex = [];
        const seenPaths = new Set();
        document.querySelectorAll('.tool-item').forEach(el => {
            const path = el.getAttribute('href');
            if (seenPaths.has(path)) return;
            seenPaths.add(path);
            // get category from parent section
            const section = el.closest('.category-section');
            const cat = section ? section.id.replace('cat-','').replace(/-/g,' ') : '';
            toolIndex.push({
                name: el.getAttribute('data-name'),
                displayName: el.querySelector('.tool-name') ? el.querySelector('.tool-name').textContent : '',
                desc: el.getAttribute('data-desc'),
                emoji: el.querySelector('.tool-emoji') ? el.querySelector('.tool-emoji').textContent : '',
                path,
                cat
            });
        });

        /* ── Recently Used (localStorage) ──────────────── */
        function getRecent() {
            try { return JSON.parse(localStorage.getItem('ho_recent') || '[]'); } catch { return []; }
        }
        function addRecent(item) {
            let r = getRecent().filter(x => x.path !== item.path);
            r.unshift(item);
            r = r.slice(0, 6);
            localStorage.setItem('ho_recent', JSON.stringify(r));
        }
        function renderRecent() {
            const r = getRecent();
            const row = document.getElementById('recentRow');
            const chips = document.getElementById('recentChips');
            if (!r.length) { row.classList.remove('show'); return; }
            row.classList.add('show');
            chips.innerHTML = r.map(item =>
                `<a class="recent-chip" href="${item.path}" onclick="trackClick(event,'${item.path}','${item.name}','${item.emoji}')">
                    <span class="recent-chip-emoji">${item.emoji}</span>${item.name}
                </a>`
            ).join('');
        }
        function trackClick(e, path, name, emoji) {
            addRecent({ path, name, emoji });
        }

        // Track clicks on all tool cards
        document.querySelectorAll('.tool-item').forEach(el => {
            el.addEventListener('click', () => {
                const section = el.closest('.category-section');
                addRecent({
                    path: el.getAttribute('href'),
                    name: el.querySelector('.tool-name') ? el.querySelector('.tool-name').textContent : '',
                    emoji: el.querySelector('.tool-emoji') ? el.querySelector('.tool-emoji').textContent : ''
                });
            });
        });

        renderRecent();

        /* ── Cascade animation delay on tiles ────────────── */
        document.querySelectorAll('.cat-tile').forEach((tile, i) => {
            tile.style.animationDelay = `${i * 60}ms`;
        });

        /* ── Spotlight ──────────────────────────────────── */
        const overlay = document.getElementById('spotlight-overlay');
        const spInput = document.getElementById('spotlight-input');
        const spResults = document.getElementById('spotlight-results');
        let spIndex = -1;

        function openSpotlight() {
            overlay.classList.add('open');
            spInput.focus();
            renderSpotlight('');
            spIndex = -1;
        }
        function closeSpotlight(e) {
            if (e && e.target !== overlay) return;
            overlay.classList.remove('open');
            spInput.value = '';
        }
        document.addEventListener('keydown', e => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                openSpotlight();
                return;
            }
            if (e.key === 'Escape') {
                overlay.classList.remove('open');
                spInput.value = '';
                return;
            }
            if (!overlay.classList.contains('open')) return;
            const items = spResults.querySelectorAll('.sp-result');
            if (e.key === 'ArrowDown') { e.preventDefault(); spIndex = Math.min(spIndex+1, items.length-1); highlightSp(items); }
            if (e.key === 'ArrowUp')   { e.preventDefault(); spIndex = Math.max(spIndex-1, 0); highlightSp(items); }
            if (e.key === 'Enter' && spIndex >= 0 && items[spIndex]) { items[spIndex].click(); }
        });
        function highlightSp(items) {
            items.forEach((it,i) => it.classList.toggle('selected', i === spIndex));
            if (items[spIndex]) items[spIndex].scrollIntoView({ block: 'nearest' });
        }
        function renderSpotlight(query) {
            const q = query.trim().toLowerCase();
            const results = q ? toolIndex.filter(t => t.name.includes(q) || t.desc.includes(q)) : toolIndex.slice(0, 10);
            if (!results.length) {
                spResults.innerHTML = '<div class="sp-empty">No tools found.</div>';
                return;
            }
            spResults.innerHTML = results.map((t, i) =>
                `<a class="sp-result" href="${t.path}" onclick="onSpClick('${t.path}','${t.displayName.replace(/'/g,"\\'")}','${t.emoji}')">
                    <div class="sp-emoji">${t.emoji}</div>
                    <div class="sp-info">
                        <div class="sp-name">${t.displayName}</div>
                        <div class="sp-desc">${t.desc}</div>
                    </div>
                    <div class="sp-cat-tag">${t.cat}</div>
                </a>`
            ).join('');
            spIndex = -1;
        }
        function onSpClick(path, name, emoji) {
            addRecent({ path, name, emoji });
            overlay.classList.remove('open');
        }
        spInput.addEventListener('input', e => renderSpotlight(e.target.value));

        /* ── Header search (inline) ─────────────────────── */
        searchInput.addEventListener('focus', () => {
            openSpotlight();
            searchInput.blur();
        });

        /* ── Category open/close ────────────────────────── */
        function openCategory(catName) {
            categoryGrid.style.display = 'none';
            heroSection.style.display = 'none';
            document.getElementById('recentRow').classList.remove('show');
            searchResults.style.display = 'none';

            categorySections.forEach(sec => {
                sec.classList.remove('active', 'visible');
            });

            const target = document.getElementById('cat-' + catName.replace(/ /g, '-'));
            if (target) {
                target.classList.add('active');
                setTimeout(() => target.classList.add('visible'), 10);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function closeCategory() {
            categorySections.forEach(sec => {
                sec.classList.remove('visible');
                setTimeout(() => sec.classList.remove('active'), 200);
            });
            setTimeout(() => {
                categoryGrid.style.display = 'grid';
                heroSection.style.display = 'block';
                // Replay cascade animation
                document.querySelectorAll('.cat-tile').forEach((tile, i) => {
                    tile.style.animation = 'none';
                    tile.offsetHeight; // reflow
                    tile.style.animation = '';
                    tile.style.animationDelay = `${i * 60}ms`;
                });
                renderRecent();
            }, 200);
        }
    </script>"""

# Replace old script tag
html = re.sub(r'<script>.*?</script>', SCRIPT_BODY, html, count=1, flags=re.DOTALL)

with open(PATH, "w", encoding="utf-8") as f:
    f.write(html)

print("Patch applied successfully!")
