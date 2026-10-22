import React from 'react';
import {Img, OffthreadVideo, Sequence, staticFile, useVideoConfig} from 'remotion';
import {colors} from '../theme';
import {prog, progOut} from '../anim';

/** Zone mise en évidence sur une capture. Coordonnées en pixels de la source. `from`/`to` : instants de la scène (s). */
export type Hl = {x: number; y: number; w: number; h: number; color: string; from: number; to?: number; pulse?: boolean};

type ScreenProps = {
  x: number;
  y: number;
  w: number;
  src: string;
  kind: 'video' | 'image';
  sw: number;
  sh: number;
  sceneT: number;
  appear?: number;
  out?: number;
  zoom?: number;
  fx?: number;
  fy?: number;
  highlights?: Hl[];
  rate?: number;
  startFromSec?: number;
  radius?: number;
  shadow?: boolean;
  /** Hauteur du cadre si on veut recadrer la source (par défaut : proportions de la source). */
  frameH?: number;
};

/**
 * Capture ou extrait vidéo du client dans un cadre arrondi, avec zoom et surlignages.
 * Pour une vidéo, placer le composant dans un <Sequence> (voir <ClipAt>) : la lecture démarre au début de la séquence.
 */
export const Screen: React.FC<ScreenProps> = ({
  x, y, w, src, kind, sw, sh, sceneT, appear = 0, out, zoom = 1, fx, fy, highlights = [], rate = 1, startFromSec = 0, radius = 26, shadow = true, frameH,
}) => {
  const {fps} = useVideoConfig();
  const h = frameH ?? (w * sh) / sw;
  const s = (w / sw) * zoom;
  const cx = fx ?? sw / 2;
  const cy = fy ?? (frameH ? (frameH / ((w / sw) * zoom)) / 2 : sh / 2);
  const ox = w / 2 - cx * s;
  const oy = h / 2 - cy * s;
  const inP = progOut(sceneT, appear, appear + 0.45);
  const outP = out === undefined ? 0 : prog(sceneT, out, out + 0.35);
  const o = inP * (1 - outP);
  if (o <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: radius,
        overflow: 'hidden',
        background: colors.white,
        boxShadow: shadow ? '0 30px 70px rgba(7,29,59,0.22)' : undefined,
        border: `3px solid rgba(7,29,59,0.12)`,
        opacity: o,
        transform: `scale(${0.96 + 0.04 * inP})`,
      }}
    >
      <div style={{position: 'absolute', left: ox, top: oy, width: sw * s, height: sh * s}}>
        {kind === 'video' ? (
          <OffthreadVideo src={staticFile(src)} muted playbackRate={rate} startFrom={Math.round(startFromSec * fps)} style={{width: '100%', height: '100%'}} />
        ) : (
          <Img src={staticFile(src)} style={{width: '100%', height: '100%'}} />
        )}
        {highlights.map((hl, i) => {
          const a = progOut(sceneT, hl.from, hl.from + 0.3);
          const b = hl.to === undefined ? 0 : prog(sceneT, hl.to, hl.to + 0.3);
          const op = a * (1 - b);
          if (op <= 0.01) return null;
          const pad = 8;
          const glow = hl.pulse ? 6 + Math.sin(sceneT * 6) * 4 : 0;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: (hl.x - pad) * s,
                top: (hl.y - pad) * s,
                width: (hl.w + 2 * pad) * s,
                height: (hl.h + 2 * pad) * s,
                border: `7px solid ${hl.color}`,
                borderRadius: 14,
                opacity: op,
                boxShadow: `0 0 0 ${glow}px ${hl.color}55`,
                transform: `scale(${1.08 - 0.08 * a})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

/** Joue un extrait vidéo à partir de l'instant `at` (s, horloge de la scène) pendant `dur` secondes. */
export const ClipAt: React.FC<ScreenProps & {at: number; dur: number}> = ({at, dur, ...props}) => {
  const {fps} = useVideoConfig();
  return (
    <Sequence from={Math.round(at * fps)} durationInFrames={Math.max(1, Math.round(dur * fps))} layout="none">
      <Screen {...props} kind="video" />
    </Sequence>
  );
};
