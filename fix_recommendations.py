import os
import re

BASE_PATH = r"D:\Project\HelpOut"

GENERAL_TOOLS = {
    "Pomodoro Tracker": "Pomodoro Tracker",
    "To do checklist": "To do checklist",
    "Goal Tracker": "Goal Tracker",
    "Water Intake Tracker": "Water Intake Tracker",
    "Shopping List": "Shopping List",
    "Tone Checker": "Tone Checker",
    "LinkedIn Bio Generator": "LinkedIn Bio Generator",
}

ACCOUNTANTS_TOOLS = {
    "Tax Estimator": "Tax Estimator",
    "Expense Tracker": "Expense Tracker",
    "SIP Calculator": "SIP Calculator",
    "Loan Calculator": "Loan Calculator",
    "Currency Converter": "Currency Converter",
}

PM_TOOLS = {
    "Project Charter Generator": "Project Charter Generator",
    "Business Case Builder": "Business Case Builder",
    "SOW Statement Generator": "SOW Statement Generator",
    "Project Management Plan Creator": "Project Management Plan Creator",
    "Scope Statement Tool": "Scope Statement Tool",
    "WBS Builder": "WBS Builder",
    "Project Schedule Generator": "Project Schedule Generator",
    "Budget & Cost Plan Tool": "Budget & Cost Plan Tool",
    "Risk Register Creator": "Risk Register Creator",
    "Stakeholder Register Tool": "Stakeholder Register Tool",
    "Communication Plan Builder": "Communication Plan Builder",
    "RACI Matrix Creator": "RACI Matrix Creator",
    "Kickoff Deck Outline": "Kickoff Deck Outline",
    "Meeting Minutes Template": "Meeting Minutes Template",
    "Weekly Status Report Generator": "Weekly Status Report Generator",
    "Issue Log Tracker": "Issue Log Tracker",
    "Decision Log Tool": "Decision Log Tool",
    "Change Request Form": "Change Request Form",
    "Sprint Planning Tool": "Sprint Planning Tool",
    "Retrospective Notes Generator": "Retrospective Notes Generator",
    "Project Closure Report": "Project Closure Report",
    "Lessons Learned Tool": "Lessons Learned Tool",
    "Handover Document Creator": "Handover Document Creator",
    "Post-Implementation Review Tool": "Post-Implementation Review Tool",
    "Escalation Matrix Builder": "Escalation Matrix Builder",
}

MEDICAL_TOOLS = {
    "Meal Planner": "Meal Planner",
    "Water Intake Tracker": "Water Intake Tracker",
}

RECOMMENDATION_CSS = """
.recommendations-widget {
  margin-top: 48px;
  padding: 24px;
  background: var(--bg);
  border-top: 2px solid var(--separator);
}

.recommendations-container {
  max-width: 900px;
  margin: 0 auto;
}

.recommendations-title {
  font-size: 1.3em;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--label-1);
}

.recommendations-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.recommendation-card {
  background: var(--card);
  border: 1px solid var(--separator);
  border-radius: var(--r-lg);
  padding: 16px;
  text-align: center;
  transition: transform .2s, box-shadow .2s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.recommendation-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.recommendation-name {
  font-weight: 600;
  font-size: 0.95em;
  color: var(--label-1);
}

.recommendation-reason {
  font-size: 0.85em;
  color: var(--label-2);
  line-height: 1.4;
}"""

RECOMMENDATION_HTML = """    <!-- Smart Recommendations Widget -->
    <div id="recommendationsWidget" class="recommendations-widget">
      <div class="recommendations-container">
        <h3 class="recommendations-title">You Might Also Need...</h3>
        <div id="recommendationsList" class="recommendations-list">
          <!-- Populated dynamically by JavaScript -->
        </div>
      </div>
    </div>
"""

def fix_tool_file(file_path, tool_name, is_pm_tool=False):
    """Remove old broken recommendations and add them correctly"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove all old recommendation-related code that was inserted incorrectly
    # Remove misplaced script tags and widget inside the main script section
    content = re.sub(r'    <script src="\.\./?recommendationMap\.js"></script>\s*', '', content)
    content = re.sub(r'    <script src="\.\./?recommendationLogic\.js"></script>\s*', '', content)
    content = re.sub(r'    <script>\s*// Load recommendations after page loads\s*window\.addEventListener\(\'load\', function\(\) \{\s*loadRecommendations\([^)]+\);\s*\}\);\s*</script>\s*', '', content)
    content = re.sub(r'    <!-- Smart Recommendations Widget -->.*?</div>\s*</div>\s*', '', content, flags=re.DOTALL)

    # Remove extra closing </script> tags that were added
    # Find all </script> tags and keep only the ones that match opening <script> tags
    script_count = content.count('<script')
    close_script_count = content.count('</script>')

    if close_script_count > script_count:
        # Remove extra closing tags
        while content.count('</script>') > content.count('<script'):
            content = content.replace('    </script>\n    </script>', '    </script>', 1)
            content = content.replace('</script>\n    </script>', '</script>', 1)

    # Determine correct paths
    if is_pm_tool:
        map_path = '../../recommendationMap.js'
        logic_path = '../../recommendationLogic.js'
    else:
        map_path = '../recommendationMap.js'
        logic_path = '../recommendationLogic.js'

    # 1. Add CSS to </style> (if not already there)
    if 'recommendations-widget' not in content:
        style_insert = RECOMMENDATION_CSS + "\n    "
        content = content.replace('</style>', style_insert + '</style>', 1)

    # 2. Add widget HTML before </body>
    if 'recommendationsWidget' not in content:
        content = content.replace('</body>', RECOMMENDATION_HTML + '</body>', 1)

    # 3. Add script references before </body> (not inside other script tags)
    script_section = f'''    <script src="{map_path}"></script>
    <script src="{logic_path}"></script>
    <script>
        // Load recommendations after page loads
        window.addEventListener('load', function() {{
            loadRecommendations('{tool_name}');
        }});
    </script>
'''
    content = content.replace('</body>', script_section + '</body>', 1)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("[OK] Fixed: {}".format(tool_name))

def main():
    total = 0

    print("\nFixing General Tools...")
    general_path = os.path.join(BASE_PATH, "General")
    for folder, tool_name in GENERAL_TOOLS.items():
        file_path = os.path.join(general_path, folder, "index.html")
        if os.path.exists(file_path):
            fix_tool_file(file_path, tool_name, is_pm_tool=False)
            total += 1

    print("\nFixing Accountants Tools...")
    accountants_path = os.path.join(BASE_PATH, "Accountants")
    for folder, tool_name in ACCOUNTANTS_TOOLS.items():
        file_path = os.path.join(accountants_path, folder, "index.html")
        if os.path.exists(file_path):
            fix_tool_file(file_path, tool_name, is_pm_tool=False)
            total += 1

    print("\nFixing Medical Tools...")
    medical_path = os.path.join(BASE_PATH, "Medical")
    if os.path.exists(medical_path):
        for folder, tool_name in MEDICAL_TOOLS.items():
            file_path = os.path.join(medical_path, folder, "index.html")
            if os.path.exists(file_path):
                fix_tool_file(file_path, tool_name, is_pm_tool=False)
                total += 1

    print("\nFixing Project Manager Tools...")
    pm_base_path = os.path.join(BASE_PATH, "Project Managers", "Project Manager Tools")
    for folder, tool_name in PM_TOOLS.items():
        file_path = os.path.join(pm_base_path, folder, "index.html")
        if os.path.exists(file_path):
            fix_tool_file(file_path, tool_name, is_pm_tool=True)
            total += 1

    print("\n" + "="*50)
    print("Total files fixed: {}".format(total))
    print("="*50 + "\n")

if __name__ == "__main__":
    main()
