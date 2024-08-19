import React from 'react';
import {
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const BackgroundImage = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const bgImagePositionX = Math.round(
    interpolate(frame, [0, durationInFrames], [0, 5000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  return (
    <div
      className='h-full w-full'
      style={{
        backgroundSize: 'cover',
        backgroundPosition: `${bgImagePositionX / 50}% 100%`,
        backgroundImage: `url(${staticFile('/assetsVideo/nasa.jpg')})`,
      }}
    />
  );
};

export default BackgroundImage;
