import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export type SpringConfig = {
  damping: number;
  mass: number;
  stiffness: number;
  overshootClamping: boolean;
};

const useSpringAnimation = (
  durationInFrames: number,
  springConfig: Partial<SpringConfig>,
  animationType: 'both' | 'entry' | 'exit' = 'both',
  exitStartOffset = 30,
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for entrance
  const entranceSpring = spring({
    fps,
    frame,
    config: springConfig,
  });
  const entranceScale = interpolate(entranceSpring, [0, 1], [0, 1]);

  // Calculate the frame for the exit animation start
  const exitStartFrame = durationInFrames - exitStartOffset; // Start exit animation before the end
  const exitSpring = spring({
    fps,
    frame: Math.max(0, frame - exitStartFrame),
    config: springConfig,
    reverse: true,
  });
  const exitScale = interpolate(1 - exitSpring, [0, 1], [1, 0], {
    extrapolateRight: 'clamp',
  });

  // Determine the final scale based on animation type
  let scale;
  if (animationType === 'both') {
    scale = frame < exitStartFrame ? entranceScale : exitScale;
  } else if (animationType === 'entry') {
    scale = entranceScale;
  } else if (animationType === 'exit') {
    scale = frame >= exitStartFrame ? exitScale : 1;
  }

  return scale;
};

export default useSpringAnimation;
