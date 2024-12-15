'use client';

import React from 'react';
import { CircularProgress } from '@nextui-org/react';

type Props = {
  value: number;
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showValueLabel?: boolean;
  className?: string;
};

const DeckProgressIndicator = ({
  value,
  color,
  size = 'md',
  showValueLabel = true,
  className = '',
}: Props) => {
  return (
    <CircularProgress
      classNames={{
        svg: className,
        indicator: color,
        track: 'stroke-white/10',
        value: 'text-xl font-semibold text-white',
      }}
      value={value}
      size={size}
      strokeWidth={4}
      showValueLabel={showValueLabel}
      label='Overall Progress'
    />
  );
};

export default DeckProgressIndicator;
