import {FPS} from './theme';

export type Cue = {phrase: string; action: string; t: number};
export type Shot = {id: string; t0: number; t1: number; vo: string; cues: Cue[]};
export type Word = {w: string; s: number; e: number};
export type SceneTiming = {
  n: number;
  title: string;
  lead: number;
  tail: number;
  adur: number;
  dur: number;
  audio: string;
  shots: Shot[];
  words: Word[];
  /** Séquences vidéo du client (lecture normale) : instant de départ dans la scène et durée. */
  clips?: {id: string; t0: number; dur: number}[];
};
export type VideoTiming = {video: number; title: string; scenes: SceneTiming[]};

export const sceneFrames = (s: SceneTiming) => Math.round(s.dur * FPS);

/** Début d'un plan, en secondes depuis le début de la scène. */
export const shotT = (s: SceneTiming, id: string) => {
  const sh = s.shots.find((x) => x.id === id);
  if (!sh) throw new Error(`Plan inconnu : ${id}`);
  return sh.t0;
};
export const shotEnd = (s: SceneTiming, id: string) => s.shots.find((x) => x.id === id)!.t1;
/** Instant du i-ème déclencheur (mot de la voix off) d'un plan. */
export const cueT = (s: SceneTiming, id: string, i: number) => {
  const sh = s.shots.find((x) => x.id === id);
  if (!sh || !sh.cues[i]) throw new Error(`Déclencheur inconnu : ${id}#${i}`);
  return sh.cues[i].t;
};

/** Fin (en secondes de la scène) du premier mot égal à `text` dans la voix off. */
export const wordEnd = (s: SceneTiming, text: string) => {
  const w = s.words.find((x) => x.w === text);
  if (!w) throw new Error(`Mot inconnu : ${text}`);
  return w.e;
};
