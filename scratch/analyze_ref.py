import re
with open(r'C:\Users\sagar\.gemini\antigravity-ide\brain\82e1872c-cee8-46d4-b1f3-08c6e3536c38\.system_generated\steps\315\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

print("File length:", len(text))

# Let's inspect sections and key headings
sections = re.findall(r'<section[\s\S]*?</section>', text)
print(f"Total sections: {len(sections)}")

sec2 = sections[2]
with open(r'scratch\sec2.html', 'w', encoding='utf-8') as f:
    f.write(sec2)

print("Wrote Section 2 to scratch\\sec2.html (len:", len(sec2), ")")

# Let's check card structure
cards = re.findall(r'<div[^>]*class="[^"]*carousel[^"]*"[\s\S]*', sec2)
print("Found carousel block:", len(cards))

for i, sec in enumerate(sections):
    h = re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', sec)
    clean_h = [re.sub(r'<[^>]+>', '', x).strip() for x in h]
    print(f"\n--- Section {i} ---")
    print("Headings:", clean_h)
    
    # Check for army references
    if any("army" in x.lower() or "command" in x.lower() or "carousel" in sec.lower() for x in clean_h):
        print("  -> Has Army / Carousel content!")
        # Let's see classes and structure
        classes = re.findall(r'class="([^"]*carousel[^"]*)"', sec, re.IGNORECASE)
        print("  Carousel classes:", classes)
