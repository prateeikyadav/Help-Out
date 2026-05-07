import os
import re

BASE_PATH = r"D:\Project\HelpOut"

TOOLS_MAP = {
    "General": {
        "Pomodoro Tracker": "Pomodoro Tracker",
        "To do checklist": "To do checklist",
        "Goal Tracker": "Goal Tracker",
        "Water Intake Tracker": "Water Intake Tracker",
        "Shopping List": "Shopping List",
        "Tone Checker": "Tone Checker",
        "LinkedIn Bio Generator": "LinkedIn Bio Generator",
    },
    "Accountants": {
        "Tax Estimator": "Tax Estimator",
        "Expense Tracker": "Expense Tracker",
        "SIP Calculator": "SIP Calculator",
        "Loan Calculator": "Loan Calculator",
        "Currency Converter": "Currency Converter",
    },
    "Medical": {
        "Meal Planner": "Meal Planner",
        "Water Intake Tracker": "Water Intake Tracker",
    },
    "PM": {
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

def clean_and_fix_file(file_path, tool_name, is_pm_tool=False):
    """Completely remove old broken code and add recommendations correctly"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # STEP 1: Remove ALL recommendation-related code (old broken version)
    # Remove recommendation CSS from style section
    content = re.sub(
        r'\n\.recommendations-widget \{[^}]*\}[^.]*\.recommendation-reason \{[^}]*\}',
        '',
        content,
        flags=re.DOTALL
    )

    # Remove recommendation widget HTML
    content = re.sub(
        r'\s*<!-- Smart Recommendations Widget -->.*?</div>\s*</div>\s*',
        '',
        content,
        flags=re.DOTALL
    )

    # Remove recommendation script references and event listeners
    content = re.sub(
        r'\s*<script src="[^"]*recommendationMap\.js"></script>\s*',
        '',
        content
    )
    content = re.sub(
        r'\s*<script src="[^"]*recommendationLogic\.js"></script>\s*',
        '',
        content
    )
    content = re.sub(
        r'\s*<script>\s*// Load recommendations after page loads\s*window\.addEventListener\([^)]*\) \{[^}]*\};\s*</script>\s*',
        '',
        content,
        flags=re.DOTALL
    )

    # Remove extra closing </script> tags
    content = re.sub(r'(\s*</script>)\s*\1+', r'\1', content)

    # STEP 2: Add CSS properly (before </style>)
    if '.recommendations-widget' not in content:
        content = content.replace('</style>', '\n    ' + RECOMMENDATION_CSS + '\n    </style>')

    # STEP 3: Add widget and scripts properly (before </body>)
    script_path_map = '../../recommendationMap.js' if is_pm_tool else '../recommendationMap.js'
    script_path_logic = '../../recommendationLogic.js' if is_pm_tool else '../recommendationLogic.js'

    new_content = f'''    <!-- Smart Recommendations Widget -->
    <div id="recommendationsWidget" class="recommendations-widget">
      <div class="recommendations-container">
        <h3 class="recommendations-title">You Might Also Need...</h3>
        <div id="recommendationsList" class="recommendations-list">
          <!-- Populated dynamically by JavaScript -->
        </div>
      </div>
    </div>

    <script src="{script_path_map}"></script>
    <script src="{script_path_logic}"></script>
    <script>
        window.addEventListener('load', function() {{
            loadRecommendations('{tool_name}');
        }});
    </script>
</body>'''

    content = re.sub(r'\s*</body>\s*</html>\s*$', new_content + '\n</html>', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("[OK] Cleaned and fixed: {}".format(tool_name))

def main():
    total = 0

    print("\nCleaning General Tools...")
    general_path = os.path.join(BASE_PATH, "General")
    for folder, tool_name in TOOLS_MAP["General"].items():
        file_path = os.path.join(general_path, folder, "index.html")
        if os.path.exists(file_path):
            clean_and_fix_file(file_path, tool_name, is_pm_tool=False)
            total += 1

    print("\nCleaning Accountants Tools...")
    accountants_path = os.path.join(BASE_PATH, "Accountants")
    for folder, tool_name in TOOLS_MAP["Accountants"].items():
        file_path = os.path.join(accountants_path, folder, "index.html")
        if os.path.exists(file_path):
            clean_and_fix_file(file_path, tool_name, is_pm_tool=False)
            total += 1

    print("\nCleaning Medical Tools...")
    medical_path = os.path.join(BASE_PATH, "Medical")
    if os.path.exists(medical_path):
        for folder, tool_name in TOOLS_MAP["Medical"].items():
            file_path = os.path.join(medical_path, folder, "index.html")
            if os.path.exists(file_path):
                clean_and_fix_file(file_path, tool_name, is_pm_tool=False)
                total += 1

    print("\nCleaning Project Manager Tools...")
    pm_base_path = os.path.join(BASE_PATH, "Project Managers", "Project Manager Tools")
    for folder, tool_name in TOOLS_MAP["PM"].items():
        file_path = os.path.join(pm_base_path, folder, "index.html")
        if os.path.exists(file_path):
            clean_and_fix_file(file_path, tool_name, is_pm_tool=True)
            total += 1

    print("\n" + "="*50)
    print("Total files cleaned and fixed: {}".format(total))
    print("="*50 + "\n")

if __name__ == "__main__":
    main()
