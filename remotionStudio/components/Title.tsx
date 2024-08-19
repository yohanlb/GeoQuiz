import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const Title = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springValue = spring({
    fps,
    frame,
  });

  const x = interpolate(springValue, [0, 1], [-100, 0], {});

  return (
    <div className='flex w-full flex-col gap-4 text-left'>
      <h2
        style={{ transform: `translateX(${x}%)` }}
        className='text-7xl font-bold italic'
      >
        Guess The Countries!
      </h2>
    </div>
  );
};

export default Title;
