import re
with open(r'C:\Users\sagar\.gemini\antigravity-ide\brain\82e1872c-cee8-46d4-b1f3-08c6e3536c38\.system_generated\steps\315\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's see the Preloader markup at the start of body
preloader = re.search(r'<body[^>]*>([\s\S]*?)<header', text)
if preloader:
    print("Preloader length:", len(preloader.group(1)))
    with open(r'scratch\preloader.html', 'w', encoding='utf-8') as f_out:
        f_out.write(preloader.group(1))
    print("Saved to scratch\\preloader.html")

# Let's inspect Section 0 (Hero)
sec0 = re.search(r'<section class="hero-section[\s\S]*?</section>', text)
if sec0:
    print("Hero length:", len(sec0.group(0)))
    with open(r'scratch\sec0.html', 'w', encoding='utf-8') as f_out:
        f_out.write(sec0.group(0))
    print("Saved to scratch\\sec0.html")
