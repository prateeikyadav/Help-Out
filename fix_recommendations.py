import os
import re

BASE_PATH = r"D:\Project\HelpOut"

GENERAL_TOOLS = {
    "Pomodoro Tracker": "Pomodoro Tracker",
    "To do checklist": "To do checklist",
    "Goal Tracker": "Goal Tracker",
    "Shopping List": "Shopping List",
    "LinkedIn Bio Generator": "LinkedIn Bio Generator",
    "Tone Checker": "Tone Checker",
}

ACCOUNTANT_TOOLS = {
    "Tax Estimator": "Tax Estimator",
    "Expense Tracker": "Expense Tracker",
    "SIP Calculator": "SIP Calculator",
    "Loan Calculator": "Loan Calculator",
    "Currency Converter": "Currency Converter",
}

MEDICAL_TOOLS = {
    "Meal Planner": "Meal Planner",
    "Water Intake Tracker": "Water Intake Tracker",
}

PM_TOOLS = [
    "Project Charter Generator",
    "Business Case Builder",
    "SOW Statement Generator",
    "Project Management Plan Creator",
    "Scope Statement Tool",
    "WBS Builder",
    "Project Schedule Generator",
    "Budget & Cost Plan Tool",
    "Risk Register Creator",
    "Stakeholder Register Tool",
    "Communication Plan Builder",
    "RACI Matrix Creator",
    "Kickoff Deck Outline",
    "Meeting Minutes Template",
    "Weekly Status Report Generator",
    "Issue Log Tracker",
    "Decision Log Tool",
    "Change Request Form",
    "Sprint Planning Tool",
    "Retrospective Notes Generator",
    "Project Closure Report",
    "Lessons Learned Tool",
    "Handover Document Creator",
    "Post-Implementation Review Tool",
    "Escalation Matrix Builder",
]

RECOMMENDATIONS = {
    "Pomodoro Tracker": [
        {"name": "Goal Tracker", "path": "./Goal%20Tracker/index.html", "reason": "Set long-term goals and track your progress"},
        {"name": "To do checklist", "path": "./To%20do%20checklist/index.html", "reason": "Break goals into daily tasks to complete"},
    ],
    "To do checklist": [
        {"name": "Pomodoro Tracker", "path": "./Pomodoro%20Tracker/index.html", "reason": "Use pomodoro method to tackle tasks faster"},
        {"name": "Goal Tracker", "path": "./Goal%20Tracker/index.html", "reason": "Link tasks back to your bigger goals"},
    ],
    "Goal Tracker": [
        {"name": "To do checklist", "path": "./To%20do%20checklist/index.html", "reason": "Break goals into daily actionable tasks"},
        {"name": "Pomodoro Tracker", "path": "./Pomodoro%20Tracker/index.html", "reason": "Execute with focused work sprints"},
    ],
    "Shopping List": [
        {"name": "Meal Planner", "path": "../Medical/Meal%20Planner/index.html", "reason": "Plan meals first, then create shopping list"},
    ],
    "LinkedIn Bio Generator": [
        {"name": "Tone Checker", "path": "./Tone%20Checker/index.html", "reason": "Polish your bio tone before publishing"},
    ],
    "Tone Checker": [
        {"name": "LinkedIn Bio Generator", "path": "./LinkedIn%20Bio%20Generator/index.html", "reason": "Ensure your professional bio matches your tone"},
    ],
    "Tax Estimator": [
        {"name": "Expense Tracker", "path": "./Expense%20Tracker/index.html", "reason": "Track deductible expenses throughout the year"},
        {"name": "SIP Calculator", "path": "./SIP%20Calculator/index.html", "reason": "Plan tax-efficient investments"},
    ],
    "Expense Tracker": [
        {"name": "Tax Estimator", "path": "./Tax%20Estimator/index.html", "reason": "Plan for tax obligations based on expenses"},
        {"name": "Loan Calculator", "path": "./Loan%20Calculator/index.html", "reason": "Account for loan EMI in your monthly budget"},
    ],
    "SIP Calculator": [
        {"name": "Tax Estimator", "path": "./Tax%20Estimator/index.html", "reason": "Understand tax implications of returns"},
        {"name": "Expense Tracker", "path": "./Expense%20Tracker/index.html", "reason": "Find surplus funds available for investment"},
    ],
    "Loan Calculator": [
        {"name": "Expense Tracker", "path": "./Expense%20Tracker/index.html", "reason": "Plan loan payments in your monthly budget"},
        {"name": "Currency Converter", "path": "./Currency%20Converter/index.html", "reason": "Convert loan rates for international comparison"},
    ],
    "Currency Converter": [
        {"name": "Loan Calculator", "path": "./Loan%20Calculator/index.html", "reason": "Calculate EMI for international loans"},
        {"name": "Expense Tracker", "path": "./Expense%20Tracker/index.html", "reason": "Track foreign exchange expenses"},
    ],
    "Meal Planner": [
        {"name": "Shopping List", "path": "../General/Shopping%20List/index.html", "reason": "Generate shopping list from meal plan"},
        {"name": "Water Intake Tracker", "path": "./Water%20Intake%20Tracker/index.html", "reason": "Track hydration alongside meal planning"},
    ],
    "Water Intake Tracker": [
        {"name": "Goal Tracker", "path": "../General/Goal%20Tracker/index.html", "reason": "Track health goals alongside hydration"},
    ],
    "Project Charter Generator": [
        {"name": "Business Case Builder", "path": "./Business%20Case%20Builder/index.html", "reason": "Build business case before creating charter"},
        {"name": "Scope Statement Tool", "path": "./Scope%20Statement%20Tool/index.html", "reason": "Define detailed scope after charter approval"},
    ],
    "Business Case Builder": [
        {"name": "Project Charter Generator", "path": "./Project%20Charter%20Generator/index.html", "reason": "Convert approved business case to charter"},
        {"name": "Budget & Cost Plan Tool", "path": "./Budget%20%26%20Cost%20Plan%20Tool/index.html", "reason": "Detail financial planning from business case"},
    ],
    "SOW Statement Generator": [
        {"name": "Project Charter Generator", "path": "./Project%20Charter%20Generator/index.html", "reason": "Reference charter when creating SOW"},
        {"name": "Scope Statement Tool", "path": "./Scope%20Statement%20Tool/index.html", "reason": "Align SOW with detailed scope statement"},
    ],
    "Project Management Plan Creator": [
        {"name": "Project Charter Generator", "path": "./Project%20Charter%20Generator/index.html", "reason": "Base PM plan on approved charter"},
        {"name": "Risk Register Creator", "path": "./Risk%20Register%20Creator/index.html", "reason": "Include risk management in PM plan"},
    ],
    "Scope Statement Tool": [
        {"name": "Project Charter Generator", "path": "./Project%20Charter%20Generator/index.html", "reason": "Reference charter for scope definition"},
        {"name": "WBS Builder", "path": "./WBS%20Builder/index.html", "reason": "Create WBS from scope statement"},
    ],
    "WBS Builder": [
        {"name": "Scope Statement Tool", "path": "./Scope%20Statement%20Tool/index.html", "reason": "Reference scope when building WBS"},
        {"name": "Project Schedule Generator", "path": "./Project%20Schedule%20Generator/index.html", "reason": "Create timeline based on WBS elements"},
    ],
    "Project Schedule Generator": [
        {"name": "WBS Builder", "path": "./WBS%20Builder/index.html", "reason": "Base schedule on WBS work packages"},
        {"name": "Budget & Cost Plan Tool", "path": "./Budget%20%26%20Cost%20Plan%20Tool/index.html", "reason": "Align resources with schedule"},
    ],
    "Budget & Cost Plan Tool": [
        {"name": "Project Schedule Generator", "path": "./Project%20Schedule%20Generator/index.html", "reason": "Align budget with project timeline"},
        {"name": "Risk Register Creator", "path": "./Risk%20Register%20Creator/index.html", "reason": "Include contingency for budget risks"},
    ],
    "Risk Register Creator": [
        {"name": "Communication Plan Builder", "path": "./Communication%20Plan%20Builder/index.html", "reason": "Communicate risks to stakeholders"},
        {"name": "Issue Log Tracker", "path": "./Issue%20Log%20Tracker/index.html", "reason": "Convert materialized risks to issues"},
    ],
    "Stakeholder Register Tool": [
        {"name": "Communication Plan Builder", "path": "./Communication%20Plan%20Builder/index.html", "reason": "Plan engagement per stakeholder"},
        {"name": "RACI Matrix Creator", "path": "./RACI%20Matrix%20Creator/index.html", "reason": "Define stakeholder roles and responsibilities"},
    ],
    "Communication Plan Builder": [
        {"name": "Stakeholder Register Tool", "path": "./Stakeholder%20Register%20Tool/index.html", "reason": "Reference stakeholder analysis"},
        {"name": "Weekly Status Report Generator", "path": "./Weekly%20Status%20Report%20Generator/index.html", "reason": "Execute communication plan with status reports"},
    ],
    "RACI Matrix Creator": [
        {"name": "Stakeholder Register Tool", "path": "./Stakeholder%20Register%20Tool/index.html", "reason": "Clarify roles from stakeholder analysis"},
        {"name": "Communication Plan Builder", "path": "./Communication%20Plan%20Builder/index.html", "reason": "Align communication with role definitions"},
    ],
    "Kickoff Deck Outline": [
        {"name": "Project Charter Generator", "path": "./Project%20Charter%20Generator/index.html", "reason": "Use charter content in kickoff presentation"},
        {"name": "Stakeholder Register Tool", "path": "./Stakeholder%20Register%20Tool/index.html", "reason": "Identify who to present to"},
    ],
    "Meeting Minutes Template": [
        {"name": "Decision Log Tool", "path": "./Decision%20Log%20Tool/index.html", "reason": "Log key decisions made in meetings"},
        {"name": "Issue Log Tracker", "path": "./Issue%20Log%20Tracker/index.html", "reason": "Track action items and issues from meetings"},
    ],
    "Weekly Status Report Generator": [
        {"name": "Issue Log Tracker", "path": "./Issue%20Log%20Tracker/index.html", "reason": "Report on open issues and status"},
        {"name": "Decision Log Tool", "path": "./Decision%20Log%20Tool/index.html", "reason": "Highlight weekly decisions"},
    ],
    "Issue Log Tracker": [
        {"name": "Decision Log Tool", "path": "./Decision%20Log%20Tool/index.html", "reason": "Track decisions on issue resolution"},
        {"name": "Change Request Form", "path": "./Change%20Request%20Form/index.html", "reason": "Convert issues into change requests"},
    ],
    "Decision Log Tool": [
        {"name": "Issue Log Tracker", "path": "./Issue%20Log%20Tracker/index.html", "reason": "Track how decisions resolve issues"},
        {"name": "Weekly Status Report Generator", "path": "./Weekly%20Status%20Report%20Generator/index.html", "reason": "Report decisions in status updates"},
    ],
    "Change Request Form": [
        {"name": "Issue Log Tracker", "path": "./Issue%20Log%20Tracker/index.html", "reason": "Link change requests to issues"},
        {"name": "Scope Statement Tool", "path": "./Scope%20Statement%20Tool/index.html", "reason": "Evaluate impact on scope"},
    ],
    "Sprint Planning Tool": [
        {"name": "Retrospective Notes Generator", "path": "./Retrospective%20Notes%20Generator/index.html", "reason": "Learn from retrospectives for next sprint"},
        {"name": "Issue Log Tracker", "path": "./Issue%20Log%20Tracker/index.html", "reason": "Address sprint blockers as issues"},
    ],
    "Retrospective Notes Generator": [
        {"name": "Sprint Planning Tool", "path": "./Sprint%20Planning%20Tool/index.html", "reason": "Apply lessons to upcoming sprints"},
        {"name": "Lessons Learned Tool", "path": "./Lessons%20Learned%20Tool/index.html", "reason": "Document improvements for future use"},
    ],
    "Project Closure Report": [
        {"name": "Lessons Learned Tool", "path": "./Lessons%20Learned%20Tool/index.html", "reason": "Capture learnings for organizational knowledge"},
        {"name": "Handover Document Creator", "path": "./Handover%20Document%20Creator/index.html", "reason": "Prepare handover before closure"},
    ],
    "Lessons Learned Tool": [
        {"name": "Project Closure Report", "path": "./Project%20Closure%20Report/index.html", "reason": "Include lessons in closure report"},
        {"name": "Post-Implementation Review Tool", "path": "./Post-Implementation%20Review%20Tool/index.html", "reason": "Compare learnings against post-implementation results"},
    ],
    "Handover Document Creator": [
        {"name": "Project Closure Report", "path": "./Project%20Closure%20Report/index.html", "reason": "Reference closure report in handover"},
        {"name": "Post-Implementation Review Tool", "path": "./Post-Implementation%20Review%20Tool/index.html", "reason": "Track post-handover performance"},
    ],
    "Post-Implementation Review Tool": [
        {"name": "Lessons Learned Tool", "path": "./Lessons%20Learned%20Tool/index.html", "reason": "Document post-implementation lessons"},
        {"name": "Project Closure Report", "path": "./Project%20Closure%20Report/index.html", "reason": "Compare against closure expectations"},
    ],
    "Escalation Matrix Builder": [
        {"name": "Risk Register Creator", "path": "./Risk%20Register%20Creator/index.html", "reason": "Escalate risks using matrix"},
        {"name": "Issue Log Tracker", "path": "./Issue%20Log%20Tracker/index.html", "reason": "Escalate critical issues"},
    ],
}

# Regex patterns to detect existing/duplicate recommendation blocks
REC_WIDGET_RE = re.compile(
    r'<!--\s*Smart Recommendations Widget\s*-->.*?</div>\s*</div>',
    re.DOTALL
)
REC_CSS_RE = re.compile(
    r'<style[^>]*>\s*\.recommendation-card\s*\{.*?</style>',
    re.DOTALL
)
REC_MAP_SCRIPT_RE = re.compile(
    r'<script\s+src="[^"]*recommendationMap\.js"[^>]*>\s*</script>'
)
REC_LOGIC_SCRIPT_RE = re.compile(
    r'<script\s+src="[^"]*recommendationLogic\.js"[^>]*>\s*</script>'
)


def count_occurrences(pattern, text):
    return len(pattern.findall(text))


def fix_html_file(html_path, tool_name, is_pm_tool):
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False

    # Remove duplicate widget blocks (keep at most one, which we'll re-inject)
    widget_count = count_occurrences(REC_WIDGET_RE, content)
    if widget_count > 1:
        # Remove ALL existing widgets — we'll re-inject one clean one
        content = REC_WIDGET_RE.sub('', content)
        changed = True
        print(f"  Removed {widget_count} duplicate widget(s) from: {os.path.basename(html_path)}")
    elif widget_count == 1:
        # Remove it so we can re-inject clean
        content = REC_WIDGET_RE.sub('', content)
        changed = True

    # Remove duplicate CSS blocks
    css_count = count_occurrences(REC_CSS_RE, content)
    if css_count > 1:
        content = REC_CSS_RE.sub('', content)
        changed = True

    # Remove old script tags to re-inject them cleanly
    content = REC_MAP_SCRIPT_RE.sub('', content)
    content = REC_LOGIC_SCRIPT_RE.sub('', content)
    changed = True

    # Clean up excessive blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    # Build recommendation HTML
    recs = RECOMMENDATIONS.get(tool_name, [])
    if not recs:
        print(f"  WARNING: No recommendations found for {tool_name}")
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return

    cards_html = ""
    for rec in recs:
        cards_html += (
            f'\n    <a href="{rec["path"]}" class="recommendation-card" title="{rec["reason"]}">'
            f'\n      <div class="recommendation-name">{rec["name"]}</div>'
            f'\n      <div class="recommendation-reason">{rec["reason"]}</div>'
            f'\n    </a>'
        )

    widget_html = f"""
<!-- Smart Recommendations Widget -->
<div id="recommendationsWidget" style="margin-top:32px;padding-top:24px;border-top:1px solid var(--separator,rgba(255,255,255,.08))">
  <div class="recommendations-title" style="font-size:.8rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--label-2,#9ca3af);margin-bottom:16px">You might also need</div>
  <div id="recommendationsList" style="display:flex;flex-wrap:wrap;gap:12px">{cards_html}
  </div>
</div>"""

    widget_css = """<style>
.recommendation-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: var(--card, rgba(255,255,255,.04));
  border: 1px solid var(--separator, rgba(255,255,255,.08));
  border-radius: 12px;
  text-decoration: none;
  color: var(--label-1, #f3f4f6);
  transition: border-color .2s, transform .2s;
  min-width: 180px;
  max-width: 260px;
}
.recommendation-card:hover {
  border-color: rgba(124,58,237,.5);
  transform: translateY(-2px);
}
.recommendation-name {
  font-size: .9rem;
  font-weight: 600;
}
.recommendation-reason {
  font-size: .78rem;
  color: var(--label-2, #9ca3af);
  line-height: 1.4;
}
</style>"""

    # Correct script paths
    if is_pm_tool:
        logic_path = '../../recommendationLogic.js'
        map_path = '../../recommendationMap.js'
    else:
        logic_path = '../recommendationLogic.js'
        map_path = '../recommendationMap.js'

    # Inject CSS before </head> if not already present
    if '.recommendation-card' not in content:
        content = content.replace('</head>', widget_css + '\n</head>', 1)

    # Inject scripts and widget before </body>
    inject = (
        f'\n    <script src="{map_path}"></script>'
        f'\n    <script src="{logic_path}"></script>'
        f'\n{widget_html}'
    )
    content = content.replace('</body>', inject + '\n</body>', 1)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Fixed: {os.path.relpath(html_path, BASE_PATH)}")


def main():
    processed = 0
    not_found = 0

    # General tools
    for tool_name in GENERAL_TOOLS:
        path = os.path.join(BASE_PATH, "General", tool_name, "index.html")
        if not os.path.exists(path):
            print(f"NOT FOUND: {path}")
            not_found += 1
            continue
        fix_html_file(path, tool_name, is_pm_tool=False)
        processed += 1

    # Accountant tools
    for tool_name in ACCOUNTANT_TOOLS:
        path = os.path.join(BASE_PATH, "Accountants", tool_name, "index.html")
        if not os.path.exists(path):
            print(f"NOT FOUND: {path}")
            not_found += 1
            continue
        fix_html_file(path, tool_name, is_pm_tool=False)
        processed += 1

    # Medical tools
    for tool_name in MEDICAL_TOOLS:
        path = os.path.join(BASE_PATH, "Medical", tool_name, "index.html")
        if not os.path.exists(path):
            print(f"NOT FOUND: {path}")
            not_found += 1
            continue
        fix_html_file(path, tool_name, is_pm_tool=False)
        processed += 1

    # PM tools
    pm_base = os.path.join(BASE_PATH, "Project Managers", "Project Manager Tools")
    for tool_name in PM_TOOLS:
        path = os.path.join(pm_base, tool_name, "index.html")
        if not os.path.exists(path):
            print(f"NOT FOUND: {path}")
            not_found += 1
            continue
        fix_html_file(path, tool_name, is_pm_tool=True)
        processed += 1

    print(f"\nDone. Processed: {processed}, Not found: {not_found}")


if __name__ == "__main__":
    main()
