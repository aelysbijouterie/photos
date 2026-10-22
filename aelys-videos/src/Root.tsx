import React from 'react';
import {Composition} from 'remotion';
import {FPS, HEIGHT, WIDTH} from './theme';
import {loadBrandFonts} from './fonts';
import {Video1, video1Frames} from './video1/Video1';
import {Video2, video2Frames} from './video2/Video2';
import {Video3, video3Frames} from './video3/Video3';
import {Socle} from './Socle';

loadBrandFonts();

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Video1" component={Video1} durationInFrames={video1Frames} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="Video2" component={Video2} durationInFrames={video2Frames} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="Video3" component={Video3} durationInFrames={video3Frames} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="Socle" component={Socle} durationInFrames={90} fps={FPS} width={WIDTH} height={HEIGHT} />
  </>
);
