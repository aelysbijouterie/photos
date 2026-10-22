import React from 'react';
import {Img, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../theme';
import {scenesConfig} from '../scenes.config';
import {prog} from '../anim';
import {CameraIcon} from './Icon';

/**
 * Emplacement d'un média fourni par le client.
 * - `id` : identifiant du média dans scenes.config.ts (v2_interface, v3_carton…). Le chemin y est configuré.
 * - sans fichier (`src` absent) : cadre gris en pointillés avec le nom du média attendu, pour que la vidéo reste lisible.
 * - `trimStartSec` / `trimEndSec` : partie de la vidéo à garder.
 */
export const MediaSlot: React.FC<{
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  src?: string;
  type?: 'image' | 'video';
  fit?: 'cover' | 'contain';
  trimStartSec?: number;
  trimEndSec?: number;
  playbackRate?: number;
  durationInFrames?: number;
}> = ({id, label, x, y, width, height, src, type, fit, trimStartSec = 0, trimEndSec, playbackRate = 1, durationInFrames}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames: total} = useVideoConfig();
  const cfg = scenesConfig.media[id];
  const file = src ?? cfg?.src;
  const kind = type ?? cfg?.type ?? 'image';
  const mode = fit ?? cfg?.fit ?? 'cover';
  const dur = durationInFrames ?? (cfg?.durationSec ? cfg.durationSec * fps : total);
  // Entrée et sortie harmonisées avec le reste de la vidéo (fondu + léger zoom)
  const t = frame / fps;
  const inP = prog(t, 0, 0.4);
  const outP = 1 - prog(t, dur / fps - 0.4, dur / fps);
  const o = Math.min(inP, outP);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        opacity: o,
        transform: `scale(${0.97 + 0.03 * o})`,
        borderRadius: 28,
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(7,29,59,0.22)',
        background: file ? colors.white : '#ECEDF0',
        border: file ? 'none' : `5px dashed ${colors.greyText}`,
        fontFamily: fonts.main,
      }}
    >
      {file ? (
        kind === 'video' ? (
          <OffthreadVideo
            src={staticFile(file)}
            startFrom={Math.round(trimStartSec * fps)}
            endAt={trimEndSec === undefined ? undefined : Math.round(trimEndSec * fps)}
            playbackRate={playbackRate}
            muted
            style={{width: '100%', height: '100%', objectFit: mode}}
          />
        ) : (
          <Img src={staticFile(file)} style={{width: '100%', height: '100%', objectFit: mode}} />
        )
      ) : (
        <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, color: colors.greyText}}>
          <CameraIcon size={Math.min(width, height) * 0.2} strokeWidth={1.6} />
          <div style={{fontWeight: 800, fontSize: 30, letterSpacing: '0.08em'}}>MÉDIA À INSÉRER</div>
          <div style={{fontWeight: 600, fontSize: 28}}>{label}</div>
        </div>
      )}
    </div>
  );
};
