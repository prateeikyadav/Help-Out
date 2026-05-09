import os

BASE_PATH = r"D:\Project\HelpOut"

TOOLS_DATA = [
    ("General", "Pomodoro Tracker", "Pomodoro Tracker", False),
    ("General", "To do checklist", "To do checklist", False),
    ("General", "Goal Tracker", "Goal Tracker", False),
    ("General", "Shopping List", "Shopping List", False),
    ("General", "LinkedIn Bio Generator", "LinkedIn Bio Generator", False),
    ("General", "Tone Checker", "Tone Checker", False),
    ("Accountants", "Tax Estimator", "Tax Estimator", False),
    ("Accountants", "Expense Tracker", "Expense Tracker", False),
    ("Accountants", "SIP Calculator", "SIP Calculator", False),
    ("Accountants", "Loan Calculator", "Loan Calculator", False),
    ("Accountants", "Currency Converter", "Currency Converter", False),
    ("Medical", "Meal Planner", "Meal Planner", False),
    ("Medical", "Water Intake Tracker", "Water Intake Tracker", False),
    ("Project Managers", "Project Charter Generator", "Project Manager Tools", True),
    ("Project Managers", "Business Case Builder", "Project Manager Tools", True),
    ("Project Managers", "SOW Statement Generator", "Project Manager Tools", True),
    ("Project Managers", "Project Management Plan Creator", "Project Manager Tools", True),
    ("Project Managers", "Scope Statement Tool", "Project Manager Tools", True),
    ("Project Managers", "WBS Builder", "Project Manager Tools", True),
    ("Project Managers", "Project Schedule Generator", "Project Manager Tools", True),
    ("Project Managers", "Budget & Cost Plan Tool", "Project Manager Tools", True),
    ("Project Managers", "Risk Register Creator", "Project Manager Tools", True),
    ("Project Managers", "Stakeholder Register Tool", "Project Manager Tools", True),
    ("Project Managers", "Communication Plan Builder", "Project Manager Tools", True),
    ("Project Managers", "RACI Matrix Creator", "Project Manager Tools", True),
    ("Project Managers", "Kickoff Deck Outline", "Project Manager Tools", True),
    ("Project Managers", "Meeting Minutes Template", "Project Manager Tools", True),
    ("Project Managers", "Weekly Status Report Generator", "Project Manager Tools", True),
    ("Project Managers", "Issue Log Tracker", "Project Manager Tools", True),
    ("Project Managers", "Decision Log Tool", "Project Manager Tools", True),
    ("Project Managers", "Change Request Form", "Project Manager Tools", True),
    ("Project Managers", "Sprint Planning Tool", "Project Manager Tools", True),
    ("Project Managers", "Retrospective Notes Generator", "Project Manager Tools", True),
    ("Project Managers", "Project Closure Report", "Project Manager Tools", True),
    ("Project Managers", "Lessons Learned Tool", "Project Manager Tools", True),
    ("Project Managers", "Handover Document Creator", "Project Manager Tools", True),
    ("Project Managers", "Post-Implementation Review Tool", "Project Manager Tools", True),
    ("Project Managers", "Escalation Matrix Builder", "Project Manager Tools", True),
]

RECOMMENDATIONS_MAP = {
    "Pomodoro Tracker": [
        {"name": "Goal Tracker", "folder": "Goal Tracker", "cat": "General", "reason": "Set long-term goals and track your progress"},
        {"name": "To do checklist", "folder": "To do checklist", "cat": "General", "reason": "Break goals into daily tasks to complete"},
    ],
    "To do checklist": [
        {"name": "Pomodoro Tracker", "folder": "Pomodoro Tracker", "cat": "General", "reason": "Use pomodoro method to tackle tasks faster"},
        {"name": "Goal Tracker", "folder": "Goal Tracker", "cat": "General", "reason": "Link tasks back to your bigger goals"},
    ],
    "Goal Tracker": [
        {"name": "To do checklist", "folder": "To do checklist", "cat": "General", "reason": "Break goals into daily actionable tasks"},
        {"name": "Pomodoro Tracker", "folder": "Pomodoro Tracker", "cat": "General", "reason": "Execute with focused work sprints"},
    ],
    "Shopping List": [
        {"name": "Meal Planner", "folder": "Meal Planner", "cat": "Medical", "reason": "Plan meals first, then create shopping list"},
    ],
    "Tone Checker": [
        {"name": "LinkedIn Bio Generator", "folder": "LinkedIn Bio Generator", "cat": "General", "reason": "Ensure your professional bio matches your tone"},
    ],
    "LinkedIn Bio Generator": [
        {"name": "Tone Checker", "folder": "Tone Checker", "cat": "General", "reason": "Polish your bio tone before publishing"},
    ],
    "Tax Estimator": [
        {"name": "Expense Tracker", "folder": "Expense Tracker", "cat": "Accountants", "reason": "Track deductible expenses throughout the year"},
        {"name": "SIP Calculator", "folder": "SIP Calculator", "cat": "Accountants", "reason": "Plan tax-efficient investments"},
    ],
    "Expense Tracker": [
        {"name": "Tax Estimator", "folder": "Tax Estimator", "cat": "Accountants", "reason": "Plan for tax obligations based on expenses"},
        {"name": "Loan Calculator", "folder": "Loan Calculator", "cat": "Accountants", "reason": "Account for loan EMI in your monthly budget"},
    ],
    "SIP Calculator": [
        {"name": "Tax Estimator", "folder": "Tax Estimator", "cat": "Accountants", "reason": "Understand tax implications of returns"},
        {"name": "Expense Tracker", "folder": "Expense Tracker", "cat": "Accountants", "reason": "Find surplus funds available for investment"},
    ],
    "Loan Calculator": [
        {"name": "Expense Tracker", "folder": "Expense Tracker", "cat": "Accountants", "reason": "Plan loan payments in your monthly budget"},
        {"name": "Currency Converter", "folder": "Currency Converter", "cat": "Accountants", "reason": "Convert loan rates for international comparison"},
    ],
    "Currency Converter": [
        {"name": "Loan Calculator", "folder": "Loan Calculator", "cat": "Accountants", "reason": "Calculate EMI for international loans"},
        {"name": "Expense Tracker", "folder": "Expense Tracker", "cat": "Accountants", "reason": "Track foreign exchange expenses"},
    ],
    "Meal Planner": [
        {"name": "Shopping List", "folder": "Shopping List", "cat": "General", "reason": "Generate shopping list from meal plan"},
        {"name": "Water Intake Tracker", "folder": "Water Intake Tracker", "cat": "Medical", "reason": "Track hydration alongside meal planning"},
    ],
    "Water Intake Tracker": [
        {"name": "Goal Tracker", "folder": "Goal Tracker", "cat": "General", "reason": "Track health goals alongside hydration"},
    ],
}

PM_RECOMMENDATIONS = {
    "Project Charter Generator": [
        {"name": "Business Case Builder", "folder": "Business Case Builder", "reason": "Build business case before creating charter"},
        {"name": "Scope Statement Tool", "folder": "Scope Statement Tool", "reason": "Define detailed scope after charter approval"},
    ],
    "Business Case Builder": [
        {"name": "Project Charter Generator", "folder": "Project Charter Generator", "reason": "Convert approved business case to charter"},
        {"name": "Budget & Cost Plan Tool", "folder": "Budget & Cost Plan Tool", "reason": "Detail financial planning from business case"},
    ],
    "SOW Statement Generator": [
        {"name": "Project Charter Generator", "folder": "Project Charter Generator", "reason": "Reference charter when creating SOW"},
        {"name": "Scope Statement Tool", "folder": "Scope Statement Tool", "reason": "Align SOW with detailed scope statement"},
    ],
    "Project Management Plan Creator": [
        {"name": "Project Charter Generator", "folder": "Project Charter Generator", "reason": "Base PM plan on approved charter"},
        {"name": "Risk Register Creator", "folder": "Risk Register Creator", "reason": "Include risk management in PM plan"},
    ],
    "Scope Statement Tool": [
        {"name": "Project Charter Generator", "folder": "Project Charter Generator", "reason": "Reference charter for scope definition"},
        {"name": "WBS Builder", "folder": "WBS Builder", "reason": "Create WBS from scope statement"},
    ],
    "WBS Builder": [
        {"name": "Scope Statement Tool", "folder": "Scope Statement Tool", "reason": "Reference scope when building WBS"},
        {"name": "Project Schedule Generator", "folder": "Project Schedule Generator", "reason": "Create timeline based on WBS elements"},
    ],
    "Project Schedule Generator": [
        {"name": "WBS Builder", "folder": "WBS Builder", "reason": "Base schedule on WBS work packages"},
        {"name": "Budget & Cost Plan Tool", "folder": "Budget & Cost Plan Tool", "reason": "Align resources with schedule"},
    ],
    "Budget & Cost Plan Tool": [
        {"name": "Project Schedule Generator", "folder": "Project Schedule Generator", "reason": "Align budget with project timeline"},
        {"name": "Risk Register Creator", "folder": "Risk Register Creator", "reason": "Include contingency for budget risks"},
    ],
    "Risk Register Creator": [
        {"name": "Communication Plan Builder", "folder": "Communication Plan Builder", "reason": "Communicate risks to stakeholders"},
        {"name": "Issue Log Tracker", "folder": "Issue Log Tracker", "reason": "Convert materialized risks to issues"},
    ],
    "Stakeholder Register Tool": [
        {"name": "Communication Plan Builder", "folder": "Communication Plan Builder", "reason": "Plan engagement per stakeholder"},
        {"name": "RACI Matrix Creator", "folder": "RACI Matrix Creator", "reason": "Define stakeholder roles and responsibilities"},
    ],
    "Communication Plan Builder": [
        {"name": "Stakeholder Register Tool", "folder": "Stakeholder Register Tool", "reason": "Reference stakeholder analysis"},
        {"name": "Weekly Status Report Generator", "folder": "Weekly Status Report Generator", "reason": "Execute communication plan with status reports"},
    ],
    "RACI Matrix Creator": [
        {"name": "Stakeholder Register Tool", "folder": "Stakeholder Register Tool", "reason": "Clarify roles from stakeholder analysis"},
        {"name": "Communication Plan Builder", "folder": "Communication Plan Builder", "reason": "Align communication with role definitions"},
    ],
    "Kickoff Deck Outline": [
        {"name": "Project Charter Generator", "folder": "Project Charter Generator", "reason": "Use charter content in kickoff presentation"},
        {"name": "Stakeholder Register Tool", "folder": "Stakeholder Register Tool", "reason": "Identify who to present to"},
    ],
    "Meeting Minutes Template": [
        {"name": "Decision Log Tool", "folder": "Decision Log Tool", "reason": "Log key decisions made in meetings"},
        {"name": "Issue Log Tracker", "folder": "Issue Log Tracker", "reason": "Track action items and issues from meetings"},
    ],
    "Weekly Status Report Generator": [
        {"name": "Issue Log Tracker", "folder": "Issue Log Tracker", "reason": "Report on open issues and status"},
        {"name": "Decision Log Tool", "folder": "Decision Log Tool", "reason": "Highlight weekly decisions"},
    ],
    "Issue Log Tracker": [
        {"name": "Decision Log Tool", "folder": "Decision Log Tool", "reason": "Track decisions on issue resolution"},
        {"name": "Change Request Form", "folder": "Change Request Form", "reason": "Convert issues into change requests"},
    ],
    "Decision Log Tool": [
        {"name": "Issue Log Tracker", "folder": "Issue Log Tracker", "reason": "Track how decisions resolve issues"},
        {"name": "Weekly Status Report Generator", "folder": "Weekly Status Report Generator", "reason": "Report decisions in status updates"},
    ],
    "Change Request Form": [
        {"name": "Issue Log Tracker", "folder": "Issue Log Tracker", "reason": "Link change requests to issues"},
        {"name": "Scope Statement Tool", "folder": "Scope Statement Tool", "reason": "Evaluate impact on scope"},
    ],
    "Sprint Planning Tool": [
        {"name": "Retrospective Notes Generator", "folder": "Retrospective Notes Generator", "reason": "Learn from retrospectives for next sprint"},
        {"name": "Issue Log Tracker", "folder": "Issue Log Tracker", "reason": "Address sprint blockers as issues"},
    ],
    "Retrospective Notes Generator": [
        {"name": "Sprint Planning Tool", "folder": "Sprint Planning Tool", "reason": "Apply lessons to upcoming sprints"},
        {"name": "Lessons Learned Tool", "folder": "Lessons Learned Tool", "reason": "Document improvements for future use"},
    ],
    "Project Closure Report": [
        {"name": "Lessons Learned Tool", "folder": "Lessons Learned Tool", "reason": "Capture learnings for organizational knowledge"},
        {"name": "Handover Document Creator", "folder": "Handover Document Creator", "reason": "Prepare handover before closure"},
    ],
    "Lessons Learned Tool": [
        {"name": "Project Closure Report", "folder": "Project Closure Report", "reason": "Include lessons in closure report"},
        {"name": "Post-Implementation Review Tool", "folder": "Post-Implementation Review Tool", "reason": "Compare learnings against post-implementation results"},
    ],
    "Handover Document Creator": [
        {"name": "Project Closure Report", "folder": "Project Closure Report", "reason": "Reference closure report in handover"},
        {"name": "Post-Implementation Review Tool", "folder": "Post-Implementation Review Tool", "reason": "Track post-handover performance"},
    ],
    "Post-Implementation Review Tool": [
        {"name": "Lessons Learned Tool", "folder": "Lessons Learned Tool", "reason": "Document post-implementation lessons"},
        {"name": "Project Closure Report", "folder": "Project Closure Report", "reason": "Compare against closure expectations"},
    ],
    "Escalation Matrix Builder": [
        {"name": "Risk Register Creator", "folder": "Risk Register Creator", "reason": "Escalate risks using matrix"},
        {"name": "Issue Log Tracker", "folder": "Issue Log Tracker", "reason": "Escalate critical issues"},
    ],
}

WIDGET_HTML = """
<!-- Smart Recommendations Widget -->
<div id="recommendationsWidget" style="margin-top:32px;padding-top:24px;border-top:1px solid var(--separator,rgba(255,255,255,.08))">
  <div class="recommendations-title" style="font-size:.8rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--label-2,#9ca3af);margin-bottom:16px">You might also need</div>
  <div id="recommendationsList" style="display:flex;flex-wrap:wrap;gap:12px"></div>
</div>
"""

WIDGET_CSS = """
<style>
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
</style>
"""


def get_tool_html_path(category, tool_folder, is_pm_tool):
    if is_pm_tool:
        return os.path.join(BASE_PATH, "Project Managers", "Project Manager Tools", tool_folder, "index.html")
    else:
        return os.path.join(BASE_PATH, category, tool_folder, "index.html")


def build_rec_html(recs, tool_path):
    """Build recommendation card HTML with correct relative paths."""
    cards = []
    tool_dir = os.path.dirname(tool_path)
    for rec in recs:
        cat = rec.get("cat", "")
        folder = rec["folder"]
        if cat == "General":
            target = os.path.join(BASE_PATH, "General", folder, "index.html")
        elif cat == "Accountants":
            target = os.path.join(BASE_PATH, "Accountants", folder, "index.html")
        elif cat == "Medical":
            target = os.path.join(BASE_PATH, "Medical", folder, "index.html")
        else:
            # PM tool
            target = os.path.join(BASE_PATH, "Project Managers", "Project Manager Tools", folder, "index.html")
        rel = os.path.relpath(target, tool_dir).replace("\\", "/")
        cards.append(
            f'<a href="{rel}" class="recommendation-card" title="{rec["reason"]}">'
            f'<div class="recommendation-name">{rec["name"]}</div>'
            f'<div class="recommendation-reason">{rec["reason"]}</div>'
            f'</a>'
        )
    return "\n    ".join(cards)


def inject_recommendations(html_path, tool_name, recs):
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if already injected
    if "recommendationsWidget" in content:
        print(f"  SKIP (already has widget): {os.path.relpath(html_path, BASE_PATH)}")
        return

    rec_html = build_rec_html(recs, html_path)
    widget = WIDGET_HTML.replace(
        '<div id="recommendationsList" style="display:flex;flex-wrap:wrap;gap:12px"></div>',
        f'<div id="recommendationsList" style="display:flex;flex-wrap:wrap;gap:12px">\n    {rec_html}\n  </div>'
    )

    # Inject CSS before </style> first occurrence (tool's own style)
    if WIDGET_CSS not in content:
        content = content.replace("</head>", WIDGET_CSS + "\n</head>", 1)

    # Inject widget before </body>
    content = content.replace("</body>", widget + "\n</body>", 1)

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  OK: {os.path.relpath(html_path, BASE_PATH)}")


def main():
    processed = 0
    skipped = 0

    for category, tool_name, tool_folder, is_pm in TOOLS_DATA:
        html_path = get_tool_html_path(category, tool_folder, is_pm)

        if not os.path.exists(html_path):
            print(f"  NOT FOUND: {html_path}")
            skipped += 1
            continue

        # Get recommendations
        if is_pm:
            recs = PM_RECOMMENDATIONS.get(tool_name, [])
        else:
            recs = RECOMMENDATIONS_MAP.get(tool_name, [])

        if not recs:
            print(f"  NO RECS for: {tool_name}")
            skipped += 1
            continue

        inject_recommendations(html_path, tool_name, recs)
        processed += 1

    print(f"\nDone. Processed: {processed}, Skipped: {skipped}")


if __name__ == "__main__":
    main()
