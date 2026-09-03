import json
import os

with open('extracted_content/content_summary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('extracted_content/readable_content.md', 'w', encoding='utf-8') as out:
    for key, items in data.items():
        out.write(f'# PAGE: {key}\n\n')
        for item in items:
            out.write(f'- {item}\n')
        out.write('\n\n---\n\n')

print('Wrote extracted_content/readable_content.md successfully.')
