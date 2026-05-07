import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove 'hidden' class from cat-section elements
content = re.sub(r'(class="cat-section) hidden"', r'\1"', content)

# Fix searchSection - switch from Tailwind hidden to inline style
content = content.replace(
    'class="relative z-10 mx-auto hidden max-w-7xl px-6 pb-24"',
    'class="relative z-10 mx-auto max-w-7xl px-6 pb-24" style="display:none"'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed!")
