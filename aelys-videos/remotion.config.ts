import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(3);
// Navigateur local si le téléchargement de Chrome est bloqué (environnement cloud).
// Sur votre poste, supprimez simplement la variable AELYS_BROWSER.
if (process.env.AELYS_BROWSER) {
  Config.setBrowserExecutable(process.env.AELYS_BROWSER);
}
