import React from 'react';
import { Progress } from '@nextui-org/react';

type Props = {
  value: number;
};

const getColor = (value: number) => {
  if (value > 60) {
    return 'success';
  }
  if (value > 20) {
    return 'warning';
  }
  return 'default';
};

const UserProgressBar = ({ value }: Props) => {
  return (
    <Progress aria-label={`${value}%`} value={value} color={getColor(value)} />
  );
};

export default UserProgressBar;
