"""Génère des bruitages provisoires (synthétiques) dans public/sfx.
À remplacer par une vraie banque de sons : gardez simplement les mêmes noms de fichiers."""
import numpy as np, wave, os
SR = 44100
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx')
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)

def t(d): return np.linspace(0, d, int(SR * d), endpoint=False)
def env(n, a=0.004, d=0.3):
    x = np.arange(n) / SR
    return np.minimum(1, x / a) * np.exp(-x / d)
def save(name, x, peak=0.6):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    fade = np.minimum(1, np.arange(len(x))[::-1] / (0.01 * SR))
    x = (x * fade * 32767).astype(np.int16)
    with wave.open(os.path.join(OUT, name + '.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(x.tobytes())
def tone(f, d, decay, partials=((1, 1.0), (2, 0.25), (3, 0.08))):
    tt = t(d); y = sum(a * np.sin(2 * np.pi * f * k * tt) for k, a in partials)
    return y * env(len(tt), 0.004, decay)
def lowpass(x, k):
    y = np.zeros_like(x); a = 0
    for i, v in enumerate(x): a += (v - a) * k; y[i] = a
    return y

save('ding', tone(1318.5, 1.1, 0.28))
save('ping', tone(1760, 0.5, 0.12, ((1, 1.0), (2.01, 0.2))), 0.5)
tt = t(0.18); f = 700 * np.exp(-tt * 12) + 180
save('pop', np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tt), 0.002, 0.05))
d = 0.8; n = rng.standard_normal(int(SR * d)); x = np.arange(len(n)) / SR
k = 0.02 + 0.5 * np.exp(-((x - 0.35) / 0.2) ** 2)
y = np.zeros_like(n); a = 0
for i in range(len(n)): a += (n[i] - a) * k[i]; y[i] = a
save('whoosh', y * np.exp(-((x - 0.35) / 0.22) ** 2), 0.55)
tt = t(0.35); thump = np.sin(2 * np.pi * 95 * tt) * env(len(tt), 0.002, 0.09)
click = rng.standard_normal(len(tt)) * env(len(tt), 0.0005, 0.006)
save('stamp', thump + 0.4 * click, 0.7)
tt = t(0.07); save('bip', np.sin(2 * np.pi * 1850 * tt) * env(len(tt), 0.002, 0.04), 0.45)
tt = t(0.03); save('tick', rng.standard_normal(len(tt)) * env(len(tt), 0.0005, 0.006), 0.4)
tt = t(0.9)
cc = tone(1568, 0.9, 0.18) + np.concatenate([np.zeros(int(0.09 * SR)), tone(2093, 0.81, 0.22)])
save('chaching', cc, 0.55)
nt = np.concatenate([tone(880, 0.22, 0.12), tone(1174.7, 0.7, 0.25)])
save('notif', nt, 0.5)
tt = t(0.12); save('click', rng.standard_normal(len(tt)) * env(len(tt), 0.0003, 0.012) + 0.3 * np.sin(2 * np.pi * 400 * tt) * env(len(tt), 0.001, 0.02), 0.5)
print(sorted(os.listdir(OUT)))
