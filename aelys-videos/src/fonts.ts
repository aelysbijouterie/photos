import {loadFont} from '@remotion/fonts';
import {continueRender, delayRender, staticFile} from 'remotion';

const WEIGHTS = [400, 600, 700, 800] as const;

/** Charge Montserrat depuis public/fonts avant le premier rendu. */
export const loadBrandFonts = () => {
  const handle = delayRender('Chargement des polices');
  Promise.all(
    WEIGHTS.map((w) =>
      loadFont({
        family: 'Montserrat',
        url: staticFile(`fonts/montserrat-latin-${w}-normal.woff2`),
        weight: String(w),
      }),
    ),
  )
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
};
