import React from 'react';
import {colors, fonts} from '../theme';
import {Tile, TileState} from '../components/ui';
import {PackageIcon, StoreIcon} from '../components/Icon';

export const ShopTile: React.FC<{
  x: number;
  y: number;
  size?: number;
  state?: TileState;
  scale?: number;
  opacity?: number;
  label?: string;
  badge?: string;
  dark?: boolean;
  labelColor?: string;
}> = ({size = 150, ...rest}) => (
  <Tile size={size} {...rest}>
    <StoreIcon size={size * 0.5} strokeWidth={1.8} />
  </Tile>
);

export const ParcelTile: React.FC<{x: number; y: number; size?: number; scale?: number; opacity?: number; rotate?: number}> = ({x, y, size = 130, scale = 1, opacity = 1, rotate = 0}) => (
  <div
    style={{
      position: 'absolute',
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: size * 0.24,
      background: colors.gold,
      color: colors.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `rotate(${rotate}deg) scale(${scale})`,
      opacity,
      boxShadow: '0 16px 34px rgba(163,124,46,0.45)',
    }}
  >
    <PackageIcon size={size * 0.56} strokeWidth={1.8} />
  </div>
);

/** Pictogramme podium (3 marches). */
export const PodiumIcon: React.FC<{size?: number; color?: string}> = ({size = 90, color = colors.navy}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={2.4} strokeLinejoin="round">
    <rect x="3" y="26" width="13" height="17" />
    <rect x="17.5" y="12" width="13" height="31" />
    <rect x="32" y="32" width="13" height="11" />
  </svg>
);

/** Pastille ronde avec une lettre (produits A, B, C…). */
export const Token: React.FC<{x: number; y: number; letter: string; color: string; size?: number; scale?: number; opacity?: number}> = ({x, y, letter, color, size = 70, scale = 1, opacity = 1}) => (
  <div
    style={{
      position: 'absolute',
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      color: colors.white,
      fontFamily: fonts.main,
      fontWeight: 800,
      fontSize: size * 0.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `scale(${scale})`,
      opacity,
      boxShadow: '0 8px 18px rgba(7,29,59,0.22)',
    }}
  >
    {letter}
  </div>
);

/** Bloc « Odéis » : le logo n'ayant pas été fourni, le nom est écrit en capitales. */
export const OdeisBlock: React.FC<{x: number; y: number; scale?: number; lit?: boolean; opacity?: number; w?: number; h?: number}> = ({x, y, scale = 1, lit = false, opacity = 1, w = 400, h = 220}) => (
  <div
    style={{
      position: 'absolute',
      left: x - w / 2,
      top: y - h / 2,
      width: w,
      height: h,
      borderRadius: 40,
      background: colors.navySoft,
      border: `5px solid ${lit ? colors.gold : '#2A4570'}`,
      boxShadow: lit ? '0 0 0 18px rgba(199,153,60,0.22)' : 'none',
      color: colors.white,
      fontFamily: fonts.main,
      fontWeight: 800,
      fontSize: 78,
      letterSpacing: '0.08em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `scale(${scale})`,
      opacity,
    }}
  >
    ODÉIS
    <div style={{fontSize: 22, fontWeight: 600, letterSpacing: '0.04em', color: colors.gold, marginTop: 4}}>logiciel de gestion</div>
  </div>
);

/** Fond quadrillé façon schéma technique. */
export const GridBackground: React.FC<{opacity?: number}> = ({opacity = 1}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity}}>
    {Array.from({length: 33}).map((_, i) => (
      <line key={`v${i}`} x1={i * 60} y1={0} x2={i * 60} y2={1080} stroke="#14325C" strokeWidth={1.5} />
    ))}
    {Array.from({length: 19}).map((_, i) => (
      <line key={`h${i}`} x1={0} y1={i * 60} x2={1920} y2={i * 60} stroke="#14325C" strokeWidth={1.5} />
    ))}
  </svg>
);
