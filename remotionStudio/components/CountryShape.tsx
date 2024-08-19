import React from 'react';
import InlineSVG from 'react-inlinesvg';
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import VideoLayout from './VideoLayout';

type Props = {
  countryCode: string;
};

const CountryShape = ({ countryCode = 'FR' }: Props) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpring = spring({
    fps,
    frame,
  });
  const entranceScale = interpolate(entranceSpring, [0, 1], [0, 1]);

  const exitStartFrame = durationInFrames - 30; // Start exit animation 30 frames before the end
  const exitSpring = spring({
    fps,
    frame: Math.max(0, frame - exitStartFrame),
    reverse: true,
  });

  const exitScale = interpolate(1 - exitSpring, [0, 1], [1, 0], {
    extrapolateRight: 'clamp',
  });

  const scale = frame < exitStartFrame ? entranceScale : exitScale;

  return (
    <VideoLayout>
      <div
        className='flex h-full w-full items-center justify-center'
        style={{ transform: `scale(${scale})` }}
      >
        <div className='mt-[850px] rounded-[100px] bg-slate-800/90 p-10'>
          <InlineSVG
            src={staticFile(`/CountryShapes/${countryCode}.svg`)}
            preProcessor={(code: string) =>
              code.replace(
                'fill="none" stroke="white" stroke-width="1"',
                `fill="white" stroke="white" stroke-width="1px"`,
              )
            }
            height='500px'
            width='500px'
            title='Country shape'
          />
        </div>
      </div>
    </VideoLayout>
  );
};

export default CountryShape;
