import os

BASE_PATH = r"D:\Project\HelpOut"

def get_relative_path(html_path):
    # Calculate relative path from html_path to BASE_PATH/global_theme.css
    rel_dir = os.path.relpath(BASE_PATH, os.path.dirname(html_path))
    # Replace backslashes with forward slashes for URLs
    rel_dir = rel_dir.replace('\\', '/')
    if rel_dir == '.':
        return 'global_theme.css'
    return f"{rel_dir}/global_theme.css"

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # If already linked, skip
    if 'global_theme.css' in content:
        return False

    relative_link = get_relative_path(file_path)
    link_tag = f'    <link rel="stylesheet" href="{relative_link}">'
    
    # Inject before </head>
    if '</head>' in content:
        content = content.replace('</head>', f'{link_tag}\n</head>')
    else:
        # Fallback if no </head>
        return False
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    return True

if __name__ == "__main__":
    count = 0
    for root, dirs, files in os.walk(BASE_PATH):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                if process_file(file_path):
                    count += 1
                    print(f"Updated: {file_path}")
    print(f"Total files updated: {count}")
