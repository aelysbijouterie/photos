"""Prépare les médias de la vidéo 2 dans public/media à partir des fichiers reçus du client.
Usage : python3 tools/prep_media.py <dossier des fichiers reçus> <dossier des images reçues>
- découpe les extraits utiles, sans le son, en 1280 px de large ;
- masque le bouton rouge « Delete order details » partout où il apparaît ;
- extrait quelques images fixes."""
import os, subprocess, sys, tempfile
import numpy as np
from PIL import Image

SRC, IMGS = sys.argv[1], sys.argv[2]
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'media')
os.makedirs(OUT, exist_ok=True)
V = {
    'voir': '490a3e61-voir_la_commande.mp4',
    'odeis': 'c9f4e00e-odeis-chercher-ref.mp4',
    'valider': '9dd5b6c4-ajout_r_f_rence_puis_valider.mp4',
    'impression': '0444c3e0-impression_des_documents.mp4',
    'refuser': 'a52b1246-refuser_commande.mp4',
    'ereserv': 'd6acb0dc-e-reservation.mp4',
    'cc': '73a658a6-clickcollect.mp4',
}
CLIPS = [  # nom, source, début, fin
    ('clip_voir', 'voir', 0.6, 5.4),
    ('clip_odeis_a', 'odeis', 13.5, 19.0), ('clip_odeis_b', 'odeis', 22.5, 32.7),
    ('clip_valider', 'valider', 0.5, 8.2),
    ('clip_imp_1', 'impression', 0.5, 2.0), ('clip_imp_2', 'impression', 2.0, 5.5),
    ('clip_imp_3', 'impression', 8.5, 13.0), ('clip_imp_4', 'impression', 16.0, 20.0),
    ('clip_refuser', 'refuser', 0.0, 6.4),
    ('clip_er_a', 'ereserv', 0.0, 4.0), ('clip_er_b', 'ereserv', 10.0, 22.9),
    ('clip_cc_a', 'cc', 0.0, 2.0), ('clip_cc_b', 'cc', 2.0, 5.0), ('clip_cc_c', 'cc', 32.0, 35.0),
]
STILLS = [('odeis_copy', 'odeis', 18.9), ('er_page', 'ereserv', 16.0), ('er_btn', 'ereserv', 22.5), ('er_list', 'ereserv', 1.5), ('cc_list', 'cc', 0.8), ('cc_one_button', 'cc', 33.6),
          ('voir_list', 'voir', 1.0), ('voir_page', 'voir', 4.0), ('refuser_before', 'refuser', 0.3), ('refuser_after', 'refuser', 4.1)]

def run(*a): subprocess.run(a, check=True, capture_output=True)

def red_boxes(path):
    """Cherche le bouton rouge en bas à gauche, image par image (5 i/s). Renvoie (boîte, [(début, fin)...])."""
    tmp = tempfile.mkdtemp()
    run('ffmpeg', '-y', '-i', path, '-vf', 'fps=5,scale=1280:-2', f'{tmp}/f_%04d.png')
    hits, box = [], None
    for i, f in enumerate(sorted(os.listdir(tmp))):
        a = np.array(Image.open(f'{tmp}/{f}').convert('RGB')).astype(int)
        h, w, _ = a.shape
        sub = a[int(h * .45):, :int(w * .3)]
        m = (sub[..., 0] > 165) & (sub[..., 1] < 75) & (sub[..., 2] < 95)
        ys, xs = np.where(m)
        if len(xs) > 60:
            b = (max(0, xs.min() - 8), int(h * .45) + ys.min() - 8, xs.max() - xs.min() + 16, ys.max() - ys.min() + 16)
            box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]), max(box[2], b[2]), max(box[3], b[3]))
            hits.append(i / 5)
    ranges = []
    for t in hits:
        if ranges and t - ranges[-1][1] <= 0.25: ranges[-1][1] = t
        else: ranges.append([t, t])
    return box, ranges

for name, key, a, b in CLIPS:
    src = os.path.join(SRC, V[key])
    # Le bouton « Delete order details » n'apparaît que sur les pages web de ces deux sources
    box, ranges = red_boxes(src) if key in ('voir', 'impression') else (None, [])
    vf = ['scale=1280:-2']
    if box:
        for (s, e) in ranges:
            if e >= a and s <= b:
                vf.append(f"drawbox=x={box[0]}:y={box[1]}:w={box[2]}:h={box[3]}:color=0xEEF0F3:t=fill:enable='between(t,{s:.2f},{e + 0.25:.2f})'")
    # le masque est appliqué sur la vidéo entière (temps source), puis on découpe
    run('ffmpeg', '-y', '-ss', str(a), '-to', str(b), '-i', src, '-vf', ','.join(vf).replace("between(t,", "between(t+" + str(a) + ","),
        '-an', '-c:v', 'libx264', '-crf', '24', '-preset', 'fast', '-g', '30', '-pix_fmt', 'yuv420p', os.path.join(OUT, name + '.mp4'))
    print('clip', name, 'masque' if box else '')

for name, key, t in STILLS:
    src = os.path.join(SRC, V[key])
    dst = os.path.join(OUT, name + '.jpg')
    run('ffmpeg', '-y', '-ss', str(t), '-i', src, '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '3', dst)
    box, ranges = red_boxes(src) if key in ('voir', 'impression') else (None, [])
    if box and any(s <= t <= e + 0.25 for s, e in ranges):
        im = Image.open(dst).convert('RGB')
        im.paste((238, 240, 244), (box[0], box[1], box[0] + box[2], box[1] + box[3])); im.save(dst, quality=92)
    print('image', name)

for name, f in (('ui_list_empty', '1.png'), ('ui_list_order', '2.png'), ('notification', '3.png')):
    Image.open(os.path.join(IMGS, f)).convert('RGB').save(os.path.join(OUT, name + '.png'))
print('ok')
