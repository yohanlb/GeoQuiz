import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import { CountryForVideo, videoPropsSchema } from './schemas';
import { FPS, TIMINGS_GLOBAL } from './timings';
import { defaultProps, getCountriesForVideo } from './utils';
import '../src/app/globals.css';

export const RemotionRoot: React.FC = () => {
  const numberOfCountries = 10;
  const duration =
    TIMINGS_GLOBAL.questions_start +
    TIMINGS_GLOBAL.question_duration * numberOfCountries;

  return (
    <Composition
      id='MyComp'
      component={MyComposition}
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
  );
};
