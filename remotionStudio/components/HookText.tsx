import React from 'react';
import { SpringConfig, useVideoConfig } from 'remotion';
import useSpringAnimation from '../useSpringAnimation';
import VideoLayout from './VideoLayout';

const HookText = ({ difficultyPercent }: { difficultyPercent: number }) => {
  const { durationInFrames } = useVideoConfig();

  const springConfig: Partial<SpringConfig> = {
    damping: 10,
    // mass: 1,
    // stiffness: 100,
  };

  const scale = useSpringAnimation(durationInFrames, springConfig, 'both', 30);

  return (
    <VideoLayout>
      <div
        style={{ transform: `scale(${scale})` }}
        className='flex h-full w-full items-center justify-center p-4'
      >
        <p className='-rotate-6 text-center text-8xl font-extrabold italic'>
          Only {difficultyPercent}% of people know all the answers!
        </p>
      </div>
    </VideoLayout>
  );
};

export default HookText;
