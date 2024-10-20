import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Sequence } from 'remotion';
import Countdown from './components/Countdown';
import CountryShape from './components/CountryShape';
import VideoLayout from './components/VideoLayout';
import { TIMINGS_GLOBAL, TIMINGS_QUESTION } from './timings';

type Props = {
  countryName: string;
  countryCode: string;
  mode?: 'shapes' | 'flags';
};

const OneCountrySequence = ({
  mode = 'shapes',
  countryName,
  countryCode,
}: Props) => {
  return (
    <>
      <Sequence
        from={0}
        durationInFrames={TIMINGS_GLOBAL.question_duration}
        name='Timer'
      >
        <VideoLayout>
          <Countdown />
        </VideoLayout>
      </Sequence>

      <Sequence
        name='Country SVG'
        from={TIMINGS_QUESTION.show_question}
        durationInFrames={
          TIMINGS_GLOBAL.question_duration - TIMINGS_QUESTION.show_question
        }
      >
        {mode === 'shapes' && <CountryShape countryCode={countryCode} />}
        {mode === 'flags' && (
          <div className='absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 transform'>
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{
                width: '24rem',
                height: '24rem',
              }}
            />
          </div>
        )}
      </Sequence>

      <Sequence
        from={TIMINGS_QUESTION.answer_reveal}
        durationInFrames={TIMINGS_QUESTION.answerDuration}
        name='Answer'
      >
        <VideoLayout>
          <div className='relative h-full'>
            <span className='absolute left-1/2 top-[1200px] -translate-x-1/2 -rotate-6 transform rounded-3xl bg-green-700 p-8 text-9xl font-extrabold italic underline'>
              {countryName}
            </span>
          </div>
        </VideoLayout>
      </Sequence>
    </>
  );
};

export default OneCountrySequence;
