import os

BASE_PATH = r"D:\Project\HelpOut"

TOOLS_DATA = [
    ("General", "Pomodoro Tracker", "Pomodoro Tracker", False),
    ("General", "To do checklist", "To do checklist", False),
    ("General", "Goal Tracker", "Goal Tracker", False),
    ("General", "Water Intake Tracker", "Water Intake Tracker", False),
    ("General", "Shopping List", "Shopping List", False),
    ("General", "Tone Checker", "Tone Checker", False),
    ("General", "LinkedIn Bio Generator", "LinkedIn Bio Generator", False),
    ("Accountants", "Tax Estimator", "Tax Estimator", False),
    ("Accountants", "Expense Tracker", "Expense Tracker", False),
    ("Accountants", "SIP Calculator", "SIP Calculator", False),
    ("Accountants", "Loan Calculator", "Loan Calculator", False),
    ("Accountants", "Currency Converter", "Currency Converter", False),
    ("Medical", "Meal Planner", "Meal Planner", False),
    ("Medical", "Water Intake Tracker", "Water Intake Tracker", False),
    ("PM", "Project Charter Generator", "Project Charter Generator", True),
    ("PM", "Business Case Builder", "Business Case Builder", True),
    ("PM", "SOW Statement Generator", "SOW Statement Generator", True),
    ("PM", "Project Management Plan Creator", "Project Management Plan Creator", True),
    ("PM", "Scope Statement Tool", "Scope Statement Tool", True),
    ("PM", "WBS Builder", "WBS Builder", True),
    ("PM", "Project Schedule Generator", "Project Schedule Generator", True),
    ("PM", "Budget & Cost Plan Tool", "Budget & Cost Plan Tool", True),
    ("PM", "Risk Register Creator", "Risk Register Creator", True),
    ("PM", "Stakeholder Register Tool", "Stakeholder Register Tool", True),
    ("PM", "Communication Plan Builder", "Communication Plan Builder", True),
    ("PM", "RACI Matrix Creator", "RACI Matrix Creator", True),
    ("PM", "Kickoff Deck Outline", "Kickoff Deck Outline", True),
    ("PM", "Meeting Minutes Template", "Meeting Minutes Template", True),
    ("PM", "Weekly Status Report Generator", "Weekly Status Report Generator", True),
    ("PM", "Issue Log Tracker", "Issue Log Tracker", True),
    ("PM", "Decision Log Tool", "Decision Log Tool", True),
    ("PM", "Change Request Form", "Change Request Form", True),
    ("PM", "Sprint Planning Tool", "Sprint Planning Tool", True),
    ("PM", "Retrospective Notes Generator", "Retrospective Notes Generator", True),
    ("PM", "Project Closure Report", "Project Closure Report", True),
    ("PM", "Lessons Learned Tool", "Lessons Learned Tool", True),
    ("PM", "Handover Document Creator", "Handover Document Creator", True),
    ("PM", "Post-Implementation Review Tool", "Post-Implementation Review Tool", True),
    ("PM", "Escalation Matrix Builder", "Escalation Matrix Builder", True),
]

RECOMMENDATION_CSS = """        .recommendations-widget {
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

def add_recommendations(category, folder, tool_name, is_pm, file_path):
    """Add recommendations widget to a single tool file"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine script paths
    if is_pm:
        map_src = '../../recommendationMap.js'
        logic_src = '../../recommendationLogic.js'
    else:
        map_src = '../recommendationMap.js'
        logic_src = '../recommendationLogic.js'

    # Add CSS before </style>
    if '.recommendations-widget' not in content:
        content = content.replace(
            '</style>',
            RECOMMENDATION_CSS + '\n    </style>',
            1
        )

    # Add HTML and scripts before </body>
    new_section = '''    <!-- Smart Recommendations Widget -->
    <div id="recommendationsWidget" class="recommendations-widget">
      <div class="recommendations-container">
        <h3 class="recommendations-title">You Might Also Need...</h3>
        <div id="recommendationsList" class="recommendations-list"></div>
      </div>
    </div>

    <script src="''' + map_src + '''"></script>
    <script src="''' + logic_src + '''"></script>
    <script>
      window.addEventListener('load', function() {
        loadRecommendations(\'''' + tool_name + '''\');
      });
    </script>
'''

    content = content.replace('</body>', new_section + '</body>', 1)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("[OK] {}".format(tool_name))

def main():
    count = 0

    for category, folder, tool_name, is_pm in TOOLS_DATA:
        if category == "PM":
            file_path = os.path.join(BASE_PATH, "Project Managers", "Project Manager Tools", folder, "index.html")
        else:
            file_path = os.path.join(BASE_PATH, category, folder, "index.html")

        if os.path.exists(file_path):
            add_recommendations(category, folder, tool_name, is_pm, file_path)
            count += 1
        else:
            print("[ERR] Not found: {}".format(file_path))

    print("\nTotal: {} files updated".format(count))

if __name__ == "__main__":
    main()
