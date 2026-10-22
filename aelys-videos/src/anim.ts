import {Easing, interpolate, spring} from 'remotion';

const ease = Easing.bezier(0.4, 0, 0.2, 1);
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

/** Progression 0 → 1 entre deux instants (en secondes), avec accélération douce. */
export const prog = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});

/** Même chose, avec une sortie plus rapide (apparitions). */
export const progOut = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut});

/** Apparition « ressort » : 0 avant `startSec`, puis monte à 1 avec un léger dépassement. */
export const pop = (frame: number, fps: number, startSec: number, damping = 15) =>
  spring({frame: frame - Math.round(startSec * fps), fps, config: {damping, stiffness: 150, mass: 0.7}});

/** Fondu entrant puis sortant : 0 → 1 en [a,b], 1 → 0 en [c,d]. */
export const window4 = (t: number, a: number, b: number, c: number, d: number) =>
  prog(t, a, b) * (1 - prog(t, c, d));

export const lerp = (p: number, from: number, to: number) => from + (to - from) * p;
