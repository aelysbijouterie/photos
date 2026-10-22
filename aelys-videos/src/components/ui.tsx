import React from 'react';
import {colors, fonts} from '../theme';

/** Calque SVG plein cadre (1920×1080) pour tracer lignes et flèches. */
export const Layer: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0, ...style}}>
    {children}
  </svg>
);

export type TileState = 'idle' | 'lit' | 'dim' | 'done';

/** Tuile arrondie centrée en (x, y) : base de tous les pictogrammes. */
export const Tile: React.FC<{
  x: number;
  y: number;
  size?: number;
  state?: TileState;
  scale?: number;
  opacity?: number;
  label?: string;
  labelColor?: string;
  badge?: string;
  dark?: boolean;
  children?: React.ReactNode;
}> = ({x, y, size = 150, state = 'idle', scale = 1, opacity = 1, label, labelColor, badge, dark = false, children}) => {
  const lit = state === 'lit';
  const dim = state === 'dim';
  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        opacity: dim ? opacity * 0.38 : opacity,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.24,
          background: lit ? colors.goldSoft : dark ? colors.navySoft : colors.white,
          border: `${Math.max(3, size * 0.025)}px solid ${lit ? colors.gold : dark ? '#2A4570' : colors.grey}`,
          boxShadow: lit ? `0 0 0 ${size * 0.09}px rgba(199,153,60,0.2), 0 18px 40px rgba(163,124,46,0.28)` : '0 14px 34px rgba(7,29,59,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: lit ? colors.goldDark : dark ? colors.cream : colors.navy,
        }}
      >
        {children}
      </div>
      {badge ? (
        <div
          style={{
            position: 'absolute',
            right: -size * 0.12,
            top: -size * 0.12,
            width: size * 0.34,
            height: size * 0.34,
            borderRadius: '50%',
            background: colors.gold,
            color: colors.white,
            fontFamily: fonts.main,
            fontWeight: 800,
            fontSize: size * 0.2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 14px rgba(163,124,46,0.4)',
          }}
        >
          {badge}
        </div>
      ) : null}
      {label ? (
        <div
          style={{
            position: 'absolute',
            top: size + 14,
            left: -size * 0.5,
            width: size * 2,
            textAlign: 'center',
            fontFamily: fonts.main,
            fontWeight: 700,
            fontSize: Math.max(24, size * 0.17),
            color: labelColor ?? (dark ? colors.cream : colors.navy),
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};

/** Pastille de texte (étiquette). */
export const Chip: React.FC<{
  x: number;
  y: number;
  text: string;
  bg?: string;
  color?: string;
  size?: number;
  scale?: number;
  opacity?: number;
  border?: string;
}> = ({x, y, text, bg = colors.navy, color = colors.white, size = 34, scale = 1, opacity = 1, border}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%,-50%) scale(${scale})`,
      opacity,
      background: bg,
      color,
      border: border ? `3px solid ${border}` : undefined,
      fontFamily: fonts.main,
      fontWeight: 700,
      fontSize: size,
      padding: `${size * 0.36}px ${size * 0.8}px`,
      borderRadius: 999,
      whiteSpace: 'nowrap',
      boxShadow: '0 10px 26px rgba(7,29,59,0.16)',
    }}
  >
    {text}
  </div>
);

/** Flèche tracée progressivement (p de 0 à 1). */
export const ArrowSvg: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  p: number;
  color?: string;
  w?: number;
  dash?: string;
  head?: number;
}> = ({x1, y1, x2, y2, p, color = colors.gold, w = 8, dash, head = 26}) => {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const ex = x1 + (x2 - x1) * p;
  const ey = y1 + (y2 - y1) * p;
  return (
    <g opacity={p > 0 ? 1 : 0}>
      <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash} />
      {p > 0.02 ? (
        <polygon
          points={`0,0 ${-head},${-head * 0.55} ${-head},${head * 0.55}`}
          fill={color}
          transform={`translate(${ex},${ey}) rotate(${ang})`}
          opacity={Math.min(1, p * 3)}
        />
      ) : null}
      <title>{String(L)}</title>
    </g>
  );
};

/** Courbe (arc) tracée progressivement. */
export const ArcSvg: React.FC<{
  x1: number;
  y1: number;
  cx: number;
  cy: number;
  x2: number;
  y2: number;
  p: number;
  color?: string;
  w?: number;
  dash?: string;
}> = ({x1, y1, cx, cy, x2, y2, p, color = colors.gold, w = 8, dash}) => (
  <path
    d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`}
    fill="none"
    stroke={color}
    strokeWidth={w}
    strokeLinecap="round"
    pathLength={1}
    strokeDasharray={dash ?? '1'}
    strokeDashoffset={dash ? 0 : 1 - p}
    opacity={p > 0 ? 1 : 0}
  />
);

/** Point sur une courbe de Bézier quadratique (pour animer un objet le long d'un arc). */
export const quad = (p: number, x1: number, y1: number, cx: number, cy: number, x2: number, y2: number) => {
  const u = 1 - p;
  return {x: u * u * x1 + 2 * u * p * cx + p * p * x2, y: u * u * y1 + 2 * u * p * cy + p * p * y2};
};
