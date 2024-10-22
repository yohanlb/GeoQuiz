import React from 'react';
import { RiShieldStarFill } from 'react-icons/ri';
import { RiShieldStarLine } from 'react-icons/ri';
import { CountryScoreStatus } from '@shared/utils/score';

type Props = { countryScoreStatus: CountryScoreStatus };

const BADGE_SIZE = 24;

const CountryScoreBadge = ({ countryScoreStatus }: Props) => {
  switch (countryScoreStatus) {
    case 'perfect':
      return <RiShieldStarFill size={BADGE_SIZE} className='text-green-500' />;
    case 'good':
      return <RiShieldStarLine size={BADGE_SIZE} className='text-green-500' />;
    case 'bad':
      return <RiShieldStarLine size={BADGE_SIZE} className='text-red-500' />;
    case 'veryBad':
      return <RiShieldStarFill size={BADGE_SIZE} className='text-red-500' />;

    case 'notEnoughResults':
      return <RiShieldStarLine size={BADGE_SIZE} className='text-gray-500' />;
  }
};

export default CountryScoreBadge;
