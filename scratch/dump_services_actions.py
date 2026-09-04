with open('c:/Users/sagar/Desktop/allure webite/js/webflow.schunk.d61b41edd968cc6d.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

import re

# Find e-73, e-74 and any action referenced
for ev in ['e-73', 'e-74']:
    idx = js.find(f'"{ev}":')
    if idx != -1:
        print(f"=== {ev} ===")
        print(js[idx:idx+1000])

for act in ['a-45', 'a-44', 'a-46', 'a-47']:
    idx = js.find(f'"{act}":')
    if idx != -1:
        print(f"\n=== {act} ===")
        print(js[idx:idx+2000])
