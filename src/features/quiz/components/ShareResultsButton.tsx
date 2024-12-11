import React from 'react';
import { SocialShareButton } from '@/src/shared/components/global/SocialShareButton';
import { EMOJIS, WEBSITE_URL } from '@lib/data/consts';
import useGameStore from '@stores/game-store';

const ShareResultsButton = () => {
  const { deck, answeredQuestions } = useGameStore();

  const generateShareText = () => {
    const resultsSummary = answeredQuestions
      .map((question) =>
        [
          question.isCorrect ? EMOJIS.valid : EMOJIS.invalid,
          ' ' + question.countryData.emoji,
          ' ' + question.countryData.name,
          '\n',
        ].join(''),
      )
      .join('');

    const correctAnswers = answeredQuestions.filter(
      (result) => result.isCorrect,
    ).length;

    const totalQuestions = answeredQuestions.length;
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    const link = WEBSITE_URL + (deck?.name ? `/decks/${deck?.name}` : '');
    return `Check out my GeoQuiz Results!\n\nScore: ${correctAnswers}/${totalQuestions} (${scorePercentage}%)\nDeck: ${deck?.displayName}\n${resultsSummary}\n\n${link}`;
  };

  return (
    <SocialShareButton title='GeoQuiz Results' content={generateShareText()} />
  );
};

export default ShareResultsButton;
