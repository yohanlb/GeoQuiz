import React from 'react';
import { CompTiktokQuizFlags } from '@features/remotionStudio/CompTiktokQuizFlags';
import { Composition, Folder } from 'remotion';
import { CompTiktokQuizTerritories } from './CompTiktokQuizTerritories';
import { CountryForVideo, videoPropsSchema } from './schemas';
import { FPS, TIMINGS_GLOBAL } from './timings';
import { defaultProps, getCountriesForVideo } from './utils';
import '../src/app/globals.css';

export const NB_OF_COUNTRIES = 10;

export const RemotionRoot: React.FC = () => {
  const duration =
    TIMINGS_GLOBAL.questions_start +
    TIMINGS_GLOBAL.question_duration * NB_OF_COUNTRIES;

  const durationFlags =
    TIMINGS_GLOBAL.questions_start +
    TIMINGS_GLOBAL.question_duration * NB_OF_COUNTRIES +
    TIMINGS_GLOBAL.end_sequence_duration;

  return (
    <Folder name='TiktokQuiz'>
      <Composition
        id='TiktokQuizTerritories'
        component={CompTiktokQuizTerritories}
        durationInFrames={duration}
        fps={FPS}
        width={1080}
        height={1920}
        schema={videoPropsSchema}
        defaultProps={defaultProps}
        calculateMetadata={async ({ props }) => {
          const countries = await getCountriesForVideo();
          const percent = Math.round(Math.random() * 40 + 1) / 10;
          return {
            props: {
              ...props,
              difficultyPercent: percent,
              countries: countries as CountryForVideo[],
            },
          };
        }}
      />
      <Composition
        id='TiktokQuizFlags'
        component={CompTiktokQuizFlags}
        durationInFrames={durationFlags}
        fps={FPS}
        width={1080}
        height={1920}
        schema={videoPropsSchema}
        defaultProps={defaultProps}
        calculateMetadata={async ({ props }) => {
          const countries = await getCountriesForVideo();
          const percent = Math.round(Math.random() * 40 + 1) / 10;
          return {
            props: {
              ...props,
              difficultyPercent: percent,
              countries: countries as CountryForVideo[],
            },
          };
        }}
      />
    </Folder>
  );
};
