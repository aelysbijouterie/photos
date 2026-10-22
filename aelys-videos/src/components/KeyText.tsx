import React from 'react';
import {colors, fonts, sizes} from '../theme';
import {prog, progOut} from '../anim';

/**
 * Texte clé animé. `*mot*` met le mot en évidence (or).
 * `t` est l'instant courant de la scène, `at` l'instant d'apparition, `out` l'instant de sortie (facultatif).
 */
export const KeyText: React.FC<{
  text: string;
  t: number;
  at: number;
  out?: number;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  align?: 'center' | 'left';
  weight?: number;
  maxWidth?: number;
}> = ({text, t, at, out, x = 960, y = 140, size = sizes.key, color = colors.navy, align = 'center', weight = 800, maxWidth = 1500}) => {
  const lines = text.split('\n');
  const inP = progOut(t, at, at + 0.5);
  const outP = out === undefined ? 0 : prog(t, out, out + 0.35);
  const o = inP * (1 - outP);
  if (o <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(${align === 'center' ? '-50%' : '0'}, calc(-50% + ${(1 - inP) * 26}px))`,
        opacity: o,
        textAlign: align,
        fontFamily: fonts.main,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.12,
        color,
        maxWidth,
        whiteSpace: 'nowrap',
        letterSpacing: '-0.01em',
      }}
    >
      {lines.map((l, i) => (
        <div key={i}>
          {l.split('*').map((part, j) => (
            <span key={j} style={{color: j % 2 === 1 ? colors.gold : undefined}}>
              {part}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
