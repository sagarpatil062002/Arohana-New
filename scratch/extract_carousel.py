import re
with open(r'scratch\sec2.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect everything between collins-carousel-wrapper and the end of the section
match = re.search(r'collins-carousel-wrapper[\s\S]*', text)
if match:
    snippet = match.group(0)
    print("Length of carousel snippet:", len(snippet))
    # print the first 2500 chars
    with open(r'scratch\carousel_markup.html', 'w', encoding='utf-8') as f_out:
        f_out.write(snippet)
    print("Saved to scratch\\carousel_markup.html")
