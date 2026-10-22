import React from 'react';
import {colors, fonts} from '../theme';
import {ClockIcon} from './Icon';

/** Horloge « 13h » récurrente : heure limite de demande de ramasse. `pulse` (0-1) anime l'alerte. */
export const ClockAlert: React.FC<{x: number; y: number; size?: number; pulse?: number; scale?: number; opacity?: number; label?: string}> = ({x, y, size = 220, pulse = 0, scale = 1, opacity = 1, label = '13h'}) => (
  <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, transform: `scale(${scale})`, opacity}}>
    <div style={{position: 'absolute', inset: -size * 0.1 * pulse, borderRadius: '50%', border: `${size * 0.03}px solid ${colors.red}`, opacity: 1 - pulse}} />
    <div style={{width: size, height: size, borderRadius: '50%', background: colors.white, border: `${size * 0.04}px solid ${colors.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.red, boxShadow: '0 18px 44px rgba(211,51,46,0.25)'}}>
      <ClockIcon size={size * 0.72} strokeWidth={1.4} />
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: -size * 0.12, textAlign: 'center', fontFamily: fonts.main, fontWeight: 800, fontSize: size * 0.34, color: colors.red}}>{label}</div>
  </div>
);
