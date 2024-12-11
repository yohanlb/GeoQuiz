import React from 'react';
import { SocialShareButton } from '@/src/shared/components/global/SocialShareButton';
import { EMOJIS, WEBSITE_URL } from '@lib/data/consts';
import { navigationLinks } from '@lib/data/navigation-links';

type Props = {
  score: number;
  totalQuestions: number;
};

const ShareResultsButton = ({ score, totalQuestions }: Readonly<Props>) => {
  const generateShareText = () => {
    const url = WEBSITE_URL + navigationLinks.mysteryCountry.href;
    return `${EMOJIS.earth} GeoQuiz's Mystery Country of the day! ${EMOJIS.earth}\nCheck out my Results! ${EMOJIS.trophy} ${score}/${totalQuestions} ${EMOJIS.trophy}\n\n${url}`;
  };

  return (
    <SocialShareButton
      title='GeoQuiz Daily Mystery Country Results!'
      content={generateShareText()}
    />
  );
};

export default ShareResultsButton;
