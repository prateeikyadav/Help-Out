import os

BASE = r"D:\Project\HelpOut"
MARKER = 'theme.js'

def get_rel_path(html_path):
    rel = os.path.relpath(BASE, os.path.dirname(html_path)).replace('\\', '/')
    return 'theme.js' if rel == '.' else f'{rel}/theme.js'

fixed = 0
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in ['.git', '__pycache__']]
    for f in files:
        if not f.endswith('.html'):
            continue
        path = os.path.join(root, f)
        with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
            content = fh.read()

        if MARKER in content:
            continue  # already injected

        # Only inject into pages that already have global_theme.css
        if 'global_theme.css' not in content:
            continue

        rel = get_rel_path(path)
        tag = f'    <script src="{rel}"></script>\n'

        if '</head>' in content:
            content = content.replace('</head>', tag + '</head>', 1)
            with open(path, 'w', encoding='utf-8') as fh:
                fh.write(content)
            print(f"✓ {os.path.relpath(path, BASE)}")
            fixed += 1

# Also inject into index.html (which has its own CSS, not global_theme.css)
index_path = os.path.join(BASE, 'index.html')
with open(index_path, 'r', encoding='utf-8') as fh:
    idx = fh.read()

if MARKER not in idx:
    # Add light mode vars for index.html's own color system
    light_vars = """
<style id="light-mode-index">
html[data-theme="light"] {
  --bg: #f4f5f7 !important;
  --surface: #ffffff !important;
  --surface-hover: #f0f0f5 !important;
  --text-main: #111827 !important;
  --text-muted: #6b7280 !important;
  --border: rgba(0,0,0,0.1) !important;
}
html[data-theme="light"] body { background:#f4f5f7 !important; color:#111827 !important; }
html[data-theme="light"] nav { background:rgba(244,245,247,0.9) !important; border-color:rgba(0,0,0,0.08) !important; }
html[data-theme="light"] .cat-tile { background:linear-gradient(180deg,rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.01) 100%) !important; border-color:rgba(0,0,0,0.1) !important; color:#111827 !important; }
html[data-theme="light"] .cat-tile:hover { background:rgba(0,0,0,0.06) !important; }
html[data-theme="light"] .tile-count { color:#6b7280 !important; }
html[data-theme="light"] .tool-card { background:rgba(0,0,0,0.03) !important; border-color:rgba(0,0,0,0.08) !important; }
html[data-theme="light"] .tool-card:hover { background:rgba(0,0,0,0.06) !important; }
html[data-theme="light"] .card-desc { color:#6b7280 !important; }
html[data-theme="light"] .card-hover-desc { background:rgba(240,240,245,0.97) !important; color:#374151 !important; }
html[data-theme="light"] #searchInput { background:rgba(0,0,0,0.05) !important; border-color:rgba(0,0,0,0.1) !important; color:#111827 !important; }
html[data-theme="light"] .back-btn { color:#6b7280 !important; border-color:rgba(0,0,0,0.12) !important; }
html[data-theme="light"] .back-btn:hover { color:#111827 !important; background:rgba(0,0,0,0.05) !important; }
html[data-theme="light"] .cat-badge { background:rgba(0,0,0,0.07) !important; color:#6b7280 !important; }
html[data-theme="light"] footer { color:#9ca3af !important; border-color:rgba(0,0,0,0.07) !important; }
html[data-theme="light"] .glow { opacity:0.3; }
</style>"""
    idx = idx.replace('</head>', light_vars + '\n    <script src="theme.js"></script>\n</head>', 1)
    with open(index_path, 'w', encoding='utf-8') as fh:
        fh.write(idx)
    print(f"✓ index.html (with light mode vars)")
    fixed += 1

print(f"\nDone — injected into {fixed} file(s)")
