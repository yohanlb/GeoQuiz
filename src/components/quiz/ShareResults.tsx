import React from 'react';
import useGameStore from '@/src/stores/gameStore';
import { EMOJIS, WEBSITE_URL } from '@lib/consts';
import ShareIcon from '@components/_commons/icons/ShareIcon';
import { Button } from '@components/ui/button';

type Props = {
  questions: Question[];
};

const ShareResults = ({ questions }: Props) => {
  const { userResults, deck } = useGameStore();

  const questionsWithResults = questions.map((question, i) => ({
    ...question,
    userResult: userResults[i],
  }));

  const generateShareText = () => {
    const resultsSummary = questionsWithResults
      .map((question) =>
        [
          question.userResult === 'valid' ? EMOJIS.valid : EMOJIS.invalid,
          ' ' + question.countryData.emoji,
          ' ' + question.countryData.name,
          '\n',
        ].join(''),
      )
      .join('');

    const correctAnswers = userResults.filter(
      (result) => result === 'valid',
    ).length;
    const totalQuestions = questions.length;
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    const shareMessage = `Check out my GeoQuiz Results!\n\nScore: ${correctAnswers}/${totalQuestions} (${scorePercentage}%)\nDeck: ${deck?.displayName}\n${resultsSummary}\n\n${WEBSITE_URL}`;
    return shareMessage;
  };

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const handleShare = async () => {
    const shareText = generateShareText();

    if (isMobileDevice() && navigator.share) {
      try {
        await navigator.share({
          title: 'GeoQuiz Results',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          alert('Message copied to clipboard!');
        })
        .catch((error) => {
          console.error('Error copying text', error);
        });
    }
  };

  return (
    <Button variant={'secondary'} onClick={handleShare}>
      Share
      <ShareIcon className='ml-2' />
    </Button>
  );
};

export default ShareResults;
