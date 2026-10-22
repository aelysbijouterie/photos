import React from 'react';
import {Img, staticFile} from 'remotion';

export const Logo: React.FC<{width?: number; style?: React.CSSProperties}> = ({width = 320, style}) => (
  <Img src={staticFile('brand/logo.png')} style={{width, height: 'auto', ...style}} />
);

export type AvatarName = 'camille' | 'helene' | 'thomas' | 'transporteur';
export const Avatar: React.FC<{who: AvatarName; size?: number; style?: React.CSSProperties}> = ({who, size = 260, style}) => (
  <Img src={staticFile(`avatars/${who}.png`)} style={{width: size, height: size, ...style}} />
);
