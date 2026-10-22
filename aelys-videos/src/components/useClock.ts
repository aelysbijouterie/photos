import {useCurrentFrame, useVideoConfig} from 'remotion';

/** Instant courant de la scène, en secondes. */
export const useClock = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return {frame, fps, t: frame / fps};
};
