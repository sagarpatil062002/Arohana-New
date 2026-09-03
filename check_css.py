import urllib.request
import re

html = urllib.request.urlopen("http://localhost:3000/").read().decode("utf-8")
css_urls = re.findall(r'href="(/_next/static/css/[^"]+)"', html)
print("Found CSS files:", css_urls)
for u in css_urls:
    css = urllib.request.urlopen("http://localhost:3000" + u).read().decode("utf-8")
    print(f"{u}: {len(css)} bytes")
    print("Contains grid-cols-12:", "grid-cols-12" in css)
    print("Contains bg-[#ECE7DE]:", "ECE7DE" in css)
    print("Contains max-w-[1320px]:", "1320px" in css)
    print("Contains flex:", "display:flex" in css)
