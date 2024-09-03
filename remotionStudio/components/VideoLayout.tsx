import React from 'react';

type Props = {
  children: React.ReactNode;
};

const VideoLayout = ({ children }: Props) => {
  return (
    <div className='flex h-full w-full flex-col px-24 py-40'>{children}</div>
  );
};

export default VideoLayout;
