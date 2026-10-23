import React from 'react';
import {timings} from '../scenes.config';
import {sceneFrames} from '../timing';
import {ScenesSeries, SceneEntry, totalFrames} from '../components/Transition';
import {V2_Scene01} from './V2_Scene01';
import {V2_Scene02} from './V2_Scene02';
import {V2_Scene03} from './V2_Scene03';
import {V2_Scene04} from './V2_Scene04';

const components = [V2_Scene01, V2_Scene02, V2_Scene03, V2_Scene04];
const scenes: SceneEntry[] = components.map((Component, i) => ({Component, frames: sceneFrames(timings.video2.scenes[i])}));

export const video2Frames = totalFrames(scenes);

export const Video2: React.FC = () => <ScenesSeries scenes={scenes} />;
