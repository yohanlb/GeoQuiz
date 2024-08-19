import React from 'react';

type Props = {
  children: React.ReactNode;
};

const VideoLayout = ({ children }: Props) => {
  return (
    <div className='flex h-full w-full flex-col px-20 py-32'>{children}</div>
  );
};

export default VideoLayout;
