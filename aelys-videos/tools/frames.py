"""Convertit des instants « scène:seconde » en numéros d'image de la vidéo : python3 tools/frames.py 1 2:3.5 5:20"""
import json, sys
v = sys.argv[1]; d = json.load(open(f'src/data/video{v}.timing.json'))
starts = []; acc = 0
for s in d['scenes']:
    starts.append(acc); acc += round(s['dur'] * 30) - 12
out = []
for a in sys.argv[2:]:
    n, t = a.split(':'); out.append(str(starts[int(n) - 1] + round(float(t) * 30)))
print(','.join(out))
