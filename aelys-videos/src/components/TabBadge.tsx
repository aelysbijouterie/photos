import React from 'react';
import {colors, fonts, tabLabels} from '../theme';

export type TabKey = keyof typeof tabLabels;

/** Pastille d'onglet : couleur identique dans les trois vidéos (bleu, orange, vert). Les libellés sont ceux de l'application. */
export const TabBadge: React.FC<{tab: TabKey; x: number; y: number; size?: number; scale?: number; opacity?: number}> = ({tab, x, y, size = 40, scale = 1, opacity = 1}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%,-50%) scale(${scale})`,
      opacity,
      background: colors.tabs[tab],
      color: colors.white,
      fontFamily: fonts.main,
      fontWeight: 800,
      fontSize: size,
      padding: `${size * 0.35}px ${size * 0.9}px`,
      borderRadius: 999,
      whiteSpace: 'nowrap',
      boxShadow: `0 12px 28px ${colors.tabs[tab]}55`,
    }}
  >
    {tabLabels[tab]}
  </div>
);
