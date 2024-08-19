import { loadFont } from '@remotion/google-fonts/Poppins';
import { AbsoluteFill, Sequence, Series } from 'remotion';
import { z } from 'zod';
import AnswersBackground from './AnswersBackground';
import OneCountrySequence from './OneCountrySequence';
import BackgroundImage from './components/BackgroundImage';
import HookText from './components/HookText';
import Title from './components/Title';
import VideoLayout from './components/VideoLayout';
import { videoPropsSchema } from './schemas';
import { TIMINGS_GLOBAL } from './timings';

export const MyComposition: React.FC<z.infer<typeof videoPropsSchema>> = ({
  countries,
  difficultyPercent,
}) => {
  const { fontFamily } = loadFont();

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        fontFamily,
        width: '100%',
        height: '100%',
        fontSize: '3rem',
        fontWeight: 'normal',
      }}
    >
      <Sequence from={0} name='BackgroundImage'>
        <BackgroundImage />
      </Sequence>

      {/* Intro */}
      <div>
        <Sequence from={0} name='Title'>
          <VideoLayout>
            <Title />
          </VideoLayout>
        </Sequence>

        <Sequence
          from={0}
          durationInFrames={TIMINGS_GLOBAL.questions_start}
          name='OnlyPercentPeople'
        >
          <HookText difficultyPercent={difficultyPercent} />
        </Sequence>
      </div>

      {/* Countries Series Sequence */}
      <Sequence
        from={TIMINGS_GLOBAL.questions_start}
        durationInFrames={TIMINGS_GLOBAL.question_duration * countries.length}
        name='Countries Question Series'
      >
        <Series>
          {countries.map(({ name, iso2 }) => (
            <Series.Sequence
              key={iso2}
              durationInFrames={TIMINGS_GLOBAL.question_duration}
            >
              <OneCountrySequence countryCode={iso2} countryName={name} />
            </Series.Sequence>
          ))}
        </Series>
      </Sequence>

      {/* Answers in background */}
      <Sequence name='Answers in background'>
        <VideoLayout>
          <AnswersBackground countries={countries} />
        </VideoLayout>
      </Sequence>
    </AbsoluteFill>
  );
};
