// Durées et paramètres de chaque scène.
// Les valeurs viennent de src/data/video{1,2,3}.timing.json, calées sur les fichiers de voix off.
// Pour recaler une scène : remplacez le fichier audio dans public/voiceover/, mettez à jour le JSON
// (leadSec = silence avant la voix, tailSec = respiration après la voix), la durée suit.
import v1 from './data/video1.timing.json';
import v2 from './data/video2.timing.json';
import v3 from './data/video3.timing.json';
import type {VideoTiming} from './timing';

export type SceneConfig = {
  voiceover: string;
  leadSec: number;
  tailSec: number;
  audioSec: number;
  durationSec: number;
};

const build = (data: VideoTiming): Record<string, SceneConfig> =>
  Object.fromEntries(
    data.scenes.map((s) => [
      `scene${String(s.n).padStart(2, '0')}`,
      {voiceover: s.audio, leadSec: s.lead, tailSec: s.tail, audioSec: s.adur, durationSec: s.dur},
    ]),
  );

export const timings = {
  video1: v1 as unknown as VideoTiming,
  video2: v2 as unknown as VideoTiming,
  video3: v3 as unknown as VideoTiming,
};

export type MediaConfig = {src?: string; type: 'image' | 'video'; durationSec?: number; fit?: 'cover' | 'contain'};

export const scenesConfig = {
  video1: build(timings.video1),
  video2: build(timings.video2),
  video3: build(timings.video3),
  // Médias du client : renseignez `src` (chemin relatif à public/) quand le fichier est déposé dans public/media/.
  media: {
    v2_interface: {src: undefined, type: 'image'},
    v2_voir_commande: {src: undefined, type: 'video'},
    v2_odeis_interro: {src: undefined, type: 'video'},
    v2_scan_valider: {src: undefined, type: 'video'},
    v2_impression: {src: undefined, type: 'video'},
    v3_enveloppe_bulle: {src: undefined, type: 'video'},
    v3_carton: {src: undefined, type: 'video'},
    v3_click_collect: {src: undefined, type: 'video'},
  } as Record<string, MediaConfig>,
};

/** Interrupteur global des sous-titres incrustés. */
export const SUBTITLES_ENABLED = true;
/** Jingle de fond (facultatif) : déposez le fichier dans public/music/ puis renseignez son chemin. */
export const MUSIC_SRC: string | undefined = undefined;
