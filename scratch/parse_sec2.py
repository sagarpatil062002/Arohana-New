import re
with open(r'scratch\sec2.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect the carousel component
# How are the cards positioned in 3D?
cards = re.findall(r'<div[^>]*cursor-pointer[^>]*style="([^"]*)"[^>]*>([\s\S]*?)</h4>', text)
print(f"Cards found: {len(cards)}")
for i, (style, content) in enumerate(cards):
    title = re.search(r'<h4[^>]*>(.*?)</h4>', content + '</h4>')
    print(f"\n--- Card {i+1} ---")
    print("Style:", style)
    print("Title:", title.group(1) if title else "N/A")
    # check images
    img = re.search(r'src="([^"]*)"', content)
    if img:
        print("Image:", img.group(1))

# Check pagination / controls
controls = re.findall(r'<button[^>]*>([\s\S]*?)</button>', text)
print(f"\nButtons in Section 2: {len(controls)}")
for b in controls:
    clean_b = re.sub(r'<[^>]+>', ' ', b).strip()
    print("Btn:", clean_b)
