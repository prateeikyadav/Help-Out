import os
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

BASE_PATH = r"D:\Project\HelpOut"
REPORT_DIR = os.path.join(BASE_PATH, "Test_Reports")

# Define categories to scan
CATEGORIES = {
    "General": "General",
    "Accountants": "Accountants",
    "Medical": "Medical",
    "HR": "General",  # HR tools are in General folder
    "Project Managers": r"Project Managers\Project Manager Tools",
}

def analyze_tool(html_path):
    """Analyzes a single tool HTML file and returns its health status."""
    if not os.path.exists(html_path):
        return {"exists": False}

    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    status = {
        "exists": True,
        "has_global_theme": "global_theme.css" in content,
        "has_recommendation_widget": 'id="recommendationsWidget"' in content,
        "has_jspdf": "jspdf" in content.lower(),
        "has_input_fields": "<input" in content or "<textarea" in content,
        "has_buttons": "<button" in content
    }
    
    # Check overall health (everything should ideally be True)
    status["is_healthy"] = all([
        status["has_global_theme"],
        status["has_recommendation_widget"],
        status["has_jspdf"],
        status["has_input_fields"],
        status["has_buttons"]
    ])
    
    return status

def get_all_tools():
    """Scans predefined categories to find all tools."""
    tools = []
    
    for category_name, rel_path in CATEGORIES.items():
        cat_dir = os.path.join(BASE_PATH, rel_path)
        if not os.path.exists(cat_dir):
            continue
            
        for item in os.listdir(cat_dir):
            tool_dir = os.path.join(cat_dir, item)
            if os.path.isdir(tool_dir):
                # Ensure it's actually a tool (has index.html)
                html_path = os.path.join(tool_dir, "index.html")
                if os.path.exists(html_path):
                    tools.append({
                        "name": item,
                        "category": category_name,
                        "path": html_path
                    })
    
    # Remove duplicates if any (e.g., HR tools overlapping with General)
    unique_tools = []
    seen_paths = set()
    for t in tools:
        if t["path"] not in seen_paths:
            unique_tools.append(t)
            seen_paths.add(t["path"])
            
    return unique_tools

def generate_pdf_report(results):
    """Generates a PDF report using ReportLab."""
    if not os.path.exists(REPORT_DIR):
        os.makedirs(REPORT_DIR)
        
    date_str = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    pdf_path = os.path.join(REPORT_DIR, f"HelpOut_Test_Report_{date_str}.pdf")
    
    doc = SimpleDocTemplate(pdf_path, pagesize=letter)
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30
    )
    
    elements = []
    
    # Title
    elements.append(Paragraph("HelpOut Feature Test Report", title_style))
    elements.append(Paragraph(f"Generated on: {datetime.datetime.now().strftime('%B %d, %Y at %I:%M %p')}", styles["Normal"]))
    elements.append(Spacer(1, 20))
    
    # Summary Metrics
    total = len(results)
    healthy = sum(1 for r in results if r['status'].get('is_healthy', False))
    missing = sum(1 for r in results if not r['status'].get('exists', False))
    
    elements.append(Paragraph(f"<b>Total Tools Scanned:</b> {total}", styles["Normal"]))
    elements.append(Paragraph(f"<b>Fully Healthy Tools:</b> {healthy} ({(healthy/total)*100:.1f}%)", styles["Normal"]))
    elements.append(Paragraph(f"<b>Missing Tools:</b> {missing}", styles["Normal"]))
    elements.append(Spacer(1, 20))
    
    # Table Data
    data = [['Tool Name', 'Category', 'Theme', 'Recs', 'PDF Exp.', 'Inputs', 'Status']]
    
    for r in sorted(results, key=lambda x: (x['category'], x['name'])):
        status = r['status']
        if not status.get('exists'):
            row = [r['name'], r['category'], 'N/A', 'N/A', 'N/A', 'N/A', 'MISSING']
        else:
            row = [
                r['name'][:20] + "..." if len(r['name']) > 20 else r['name'],
                r['category'],
                "PASS" if status['has_global_theme'] else "FAIL",
                "PASS" if status['has_recommendation_widget'] else "FAIL",
                "PASS" if status['has_jspdf'] else "FAIL",
                "PASS" if status['has_input_fields'] else "FAIL",
                "HEALTHY" if status['is_healthy'] else "WARNING"
            ]
        data.append(row)
        
    # Table Style
    t = Table(data, colWidths=[130, 80, 50, 50, 60, 50, 60])
    
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0E0D0B')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('ALIGN', (0, 0), (0, -1), 'LEFT'), # Left align names
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#F7F4EE')),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#D8D3C8')),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
    ])
    
    # Apply conditional coloring for Pass/Fail
    for row_idx in range(1, len(data)):
        for col_idx in range(2, 6): # The Pass/Fail columns
            val = data[row_idx][col_idx]
            if val == 'FAIL':
                style.add('TEXTCOLOR', (col_idx, row_idx), (col_idx, row_idx), colors.red)
            elif val == 'PASS':
                style.add('TEXTCOLOR', (col_idx, row_idx), (col_idx, row_idx), colors.green)
        
        # Status column coloring
        status_val = data[row_idx][6]
        if status_val == 'HEALTHY':
            style.add('TEXTCOLOR', (6, row_idx), (6, row_idx), colors.green)
        elif status_val == 'WARNING':
            style.add('TEXTCOLOR', (6, row_idx), (6, row_idx), colors.orange)
        elif status_val == 'MISSING':
            style.add('TEXTCOLOR', (6, row_idx), (6, row_idx), colors.red)

    t.setStyle(style)
    elements.append(t)
    
    # Build PDF
    doc.build(elements)
    print(f"Report generated successfully at: {pdf_path}")
    return pdf_path

def main():
    print("Starting automated tool tests...")
    tools = get_all_tools()
    print(f"Found {len(tools)} tools across directories.")
    
    results = []
    for tool in tools:
        print(f"Testing: {tool['name']}...")
        status = analyze_tool(tool['path'])
        results.append({
            "name": tool['name'],
            "category": tool['category'],
            "status": status
        })
        
    print("\nGenerating PDF Report...")
    pdf_path = generate_pdf_report(results)
    print("Testing complete.")

if __name__ == "__main__":
    main()
