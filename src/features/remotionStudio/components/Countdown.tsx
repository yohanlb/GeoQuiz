import React from 'react';
import { CircularProgress } from '@nextui-org/react';
import {
  Audio,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FPS, TIMINGS_TIMER } from '../timings';

const Countdown = () => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const timer_duration_in_sec = TIMINGS_TIMER.timer_duration / FPS;

  const timerLabelValue = Math.round(
    interpolate(
      frame,
      [
        TIMINGS_TIMER.timer_start_delay,
        TIMINGS_TIMER.timer_start_delay + TIMINGS_TIMER.timer_duration,
      ],
      [timer_duration_in_sec, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    ),
  );
  const timerPercentValue = Math.round(
    interpolate(
      frame,
      [
        TIMINGS_TIMER.timer_start_delay,
        TIMINGS_TIMER.timer_start_delay + TIMINGS_TIMER.timer_duration,
      ],
      [100, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    ),
  );

  const scale = interpolate(
    frame,
    [
      TIMINGS_TIMER.timer_start_delay,
      TIMINGS_TIMER.timer_start_delay + TIMINGS_TIMER.timer_duration,
    ],
    [2, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    },
  );

  const opacity =
    frame < 60
      ? Math.min(1, frame / 10)
      : Math.max(0, (durationInFrames - frame) / 10);

  return (
    <div
      className='relative top-[720px] flex items-center justify-center text-center'
      style={{ transform: `scale(${scale})`, opacity: opacity }}
    >
      <Sequence from={TIMINGS_TIMER.timer_duration + 7} name='Ding'>
        <Audio src={staticFile('assetsVideo/ding.mp3')} />
      </Sequence>
      <Sequence
        from={TIMINGS_TIMER.timer_start_delay - 5}
        durationInFrames={TIMINGS_TIMER.timer_duration - 2}
        name='TicTac'
      >
        <Audio src={staticFile('assetsVideo/clockSound.mp3')} />
      </Sequence>
      <CircularProgress
        classNames={{
          svg: 'w-44 h-44 drop-shadow-md',
          indicator: '',
          track: 'stroke-white/10',
          value: 'text-5xl font-semibold text-white',
        }}
        disableAnimation
        value={timerPercentValue}
        strokeWidth={4}
        aria-label={timerLabelValue.toString()}
        showValueLabel={true}
        valueLabel={timerLabelValue.toString()}
        formatOptions={{ maximumSignificantDigits: 2 }}
      />
    </div>
  );
};

export default Countdown;
