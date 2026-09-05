import re
with open(r'C:\Users\sagar\.gemini\antigravity-ide\brain\82e1872c-cee8-46d4-b1f3-08c6e3536c38\.system_generated\steps\315\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

sections = re.findall(r'<section[\s\S]*?</section>', text)
sec1 = sections[1]
with open(r'scratch\sec1.html', 'w', encoding='utf-8') as f_out:
    f_out.write(sec1)
print("Saved Section 1 to scratch\\sec1.html (len:", len(sec1), ")")
