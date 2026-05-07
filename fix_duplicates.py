import os, re

BASE = r"D:\Project\HelpOut"

# The duplicate block starts right after the first </script> that closes loadRecommendations
# Pattern: the second injection starts with a comment "<!-- Smart Recommendations Widget -->"
# and ends before </body>. We find files that have it twice and remove the second occurrence.

BLOCK_PATTERN = re.compile(
    r'(\s*<!-- Smart Recommendations Widget -->.*?</script>)',
    re.DOTALL
)

fixed = 0
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in ['.git']]
    for f in files:
        if not f.endswith('.html'):
            continue
        path = os.path.join(root, f)
        with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
            content = fh.read()

        matches = list(BLOCK_PATTERN.finditer(content))
        if len(matches) < 2:
            continue  # no duplicate, skip

        # Remove all occurrences after the first
        first_end = matches[0].end()
        second_start = matches[1].start()
        new_content = content[:first_end] + content[matches[-1].end():]
        
        with open(path, 'w', encoding='utf-8') as fh:
            fh.write(new_content)
        print(f"Fixed: {os.path.relpath(path, BASE)}")
        fixed += 1

print(f"\nDone — fixed {fixed} file(s)")
