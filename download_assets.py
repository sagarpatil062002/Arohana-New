import urllib.request
import re
import os

os.makedirs('public/images', exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

# 1. Download logo
logo_url = 'https://arohana-eight.vercel.app/images/arohana-logo.png'
try:
    req = urllib.request.Request(logo_url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        with open('public/images/arohana-logo.png', 'wb') as f:
            f.write(resp.read())
    print('Downloaded arohana-logo.png successfully!')
except Exception as e:
    print('Logo download error:', e)

# 2. Extract image paths
img_urls = set()
for fn in os.listdir('extracted_content'):
    if fn.endswith('.html'):
        with open(os.path.join('extracted_content', fn), 'r', encoding='utf-8') as f:
            text = f.read()
            matches = re.findall(r'/images/[a-zA-Z0-9_\-\./]+(?:\.jpg|\.png|\.webp|\.svg)', text)
            for m in matches:
                img_urls.add(m)

print(f'Found {len(img_urls)} unique image paths')
for img_path in sorted(img_urls):
    full_url = 'https://arohana-eight.vercel.app' + img_path
    local_path = os.path.join('public', img_path.lstrip('/').replace('/', os.sep))
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    try:
        req = urllib.request.Request(full_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            with open(local_path, 'wb') as f:
                f.write(resp.read())
        print(f'Saved {img_path}')
    except Exception as e:
        print(f'Failed {img_path}: {e}')
