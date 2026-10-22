"""Assemble des images fixes en planche contact : python3 tools/sheet.py sortie.jpg img1 img2 ... (3 colonnes)."""
import sys
from PIL import Image, ImageDraw
out, files = sys.argv[1], sys.argv[2:]
cols = 3; W = 640
ims = [Image.open(f).convert('RGB') for f in files]
H = round(ims[0].height * W / ims[0].width)
rows = (len(ims) + cols - 1) // cols
sh = Image.new('RGB', (cols * W, rows * H), 'white'); d = ImageDraw.Draw(sh)
for i, im in enumerate(ims):
    x, y = (i % cols) * W, (i // cols) * H
    sh.paste(im.resize((W, H)), (x, y)); d.rectangle([x, y, x + 150, y + 16], fill='black'); d.text((x + 3, y + 2), files[i].split('/')[-1][:24], fill='white')
sh.save(out, quality=82)
