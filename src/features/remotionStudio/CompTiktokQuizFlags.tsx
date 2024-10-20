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

export const CompTiktokQuizFlags: React.FC<
  z.infer<typeof videoPropsSchema>
> = ({ countries, difficultyPercent }) => {
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
        <Sequence
          from={0}
          durationInFrames={TIMINGS_GLOBAL.questions_end}
          name='Title'
        >
          <VideoLayout>
            <Title text='What is this flag?' />
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
              <OneCountrySequence
                mode='flags'
                countryCode={iso2}
                countryName={name}
              />
            </Series.Sequence>
          ))}
        </Series>
      </Sequence>

      {/* Answers in background */}
      <Sequence
        name='Answers in background'
        durationInFrames={TIMINGS_GLOBAL.questions_end}
      >
        <VideoLayout>
          <AnswersBackground countries={countries} />
        </VideoLayout>
      </Sequence>

      {/* End Sequence */}
      <Sequence
        from={TIMINGS_GLOBAL.questions_end}
        durationInFrames={TIMINGS_GLOBAL.end_sequence_duration}
        name='End Sequence'
      >
        <div className='absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col gap-48 p-6 text-center'>
          <h2 className='-rotate-3 text-6xl font-bold'>
            Write your score in the comments,
          </h2>
          <h1 className='-rotate-6 text-9xl font-bold'>And follow for more!</h1>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
