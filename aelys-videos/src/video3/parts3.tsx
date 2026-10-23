import React from 'react';
import {colors, fonts} from '../theme';
import {Chip} from '../components/ui';
import {prog} from '../anim';

export type Cap = {a: number; b: number; text: string; bg?: string};

/** Étiquettes d'étape (pastilles) qui s'affichent entre deux instants de la scène. */
export const Caps: React.FC<{t: number; items: Cap[]; x?: number; y?: number; size?: number}> = ({t, items, x = 1160, y = 78, size = 38}) => (
  <>
    {items.map((c, i) => {
      const o = prog(t, c.a, c.a + 0.35) * (1 - prog(t, c.b - 0.3, c.b));
      if (o <= 0.01) return null;
      return <Chip key={i} x={x} y={y} text={c.text} bg={c.bg ?? colors.navy} size={size} opacity={o} scale={0.92 + 0.08 * o} />;
    })}
  </>
);

/** Numéro d'étape en haut à gauche (même style que la vidéo 2). */
export const StepBadge: React.FC<{n: number; label: string; opacity?: number}> = ({n, label, opacity = 1}) => (
  <div style={{position: 'absolute', left: 70, top: 62, display: 'flex', alignItems: 'center', gap: 22, opacity, fontFamily: fonts.main}}>
    <div style={{width: 84, height: 84, borderRadius: 42, background: colors.navy, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 44}}>{n}</div>
    <div style={{fontWeight: 800, fontSize: 40, color: colors.navy}}>{label}</div>
  </div>
);
