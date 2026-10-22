import React from 'react';
import {timings} from '../scenes.config';
import {sceneFrames} from '../timing';
import {ScenesSeries, SceneEntry, totalFrames} from '../components/Transition';
import {V1_Scene01} from './V1_Scene01';
import {V1_Scene02} from './V1_Scene02';
import {V1_Scene03} from './V1_Scene03';
import {V1_Scene04} from './V1_Scene04';
import {V1_Scene05} from './V1_Scene05';
import {V1_Scene06} from './V1_Scene06';

const components = [V1_Scene01, V1_Scene02, V1_Scene03, V1_Scene04, V1_Scene05, V1_Scene06];
const scenes: SceneEntry[] = components.map((Component, i) => ({Component, frames: sceneFrames(timings.video1.scenes[i])}));

export const video1Frames = totalFrames(scenes);

export const Video1: React.FC = () => <ScenesSeries scenes={scenes} />;
