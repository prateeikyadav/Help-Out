import os
import re

BASE_PATH = r"D:\Project\HelpOut"

CATEGORIES = {
    "General": [
        "Pomodoro Tracker",
        "To do checklist",
        "Goal Tracker",
        "Water Intake Tracker",
        "Shopping List",
        "Tone Checker",
        "LinkedIn Bio Generator"
    ],
    "Accountants": [
        "Tax Estimator",
        "Expense Tracker",
        "SIP Calculator",
        "Loan Calculator",
        "Currency Converter"
    ],
    "Medical": [
        "Meal Planner",
        "Water Intake Tracker"
    ]
}

def fix_back_link(file_path):
    """Replace ../index.html with ../../index.html for category-level tools"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix all back links - look for href="../index.html" patterns
    # This will catch back links in class attributes, onclick, etc.
    updated = content.replace('../index.html', '../../index.html')

    if updated != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated)
        return True
    return False

def main():
    total = 0

    for category, tools in CATEGORIES.items():
        cat_path = os.path.join(BASE_PATH, category)
        print(f"\nFixing {category} tools...")

        for tool in tools:
            tool_path = os.path.join(cat_path, tool, "index.html")

            if os.path.exists(tool_path):
                if fix_back_link(tool_path):
                    print(f"  [OK] {tool}")
                    total += 1
                else:
                    print(f"  [SKIP] {tool} (no changes needed)")
            else:
                print(f"  [ERR] Not found: {tool_path}")

    print(f"\nTotal files updated: {total}")

if __name__ == "__main__":
    main()
