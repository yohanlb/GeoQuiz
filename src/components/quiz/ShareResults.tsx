import React from 'react';
import ShareIcon from '@components/_commons/icons/ShareIcon';
import { Button } from '@components/ui/button';
import { EMOJIS, WEBSITE_URL } from '@lib/consts';

type Props = {
  questions: Question[];
  userResults: UserResults;
  deckName: string;
};

const ShareResults = ({ questions, userResults, deckName }: Props) => {
  const questionsWithResults = questions.map((question, i) => ({
    ...question,
    userResult: userResults[i],
  }));

  const generateShareText = () => {
    const resultsSummary = questionsWithResults
      .map((question) =>
        question.userResult === 'valid' ? EMOJIS.valid : EMOJIS.invalid,
      )
      .join('');

    const correctAnswers = userResults.filter(
      (result) => result === 'valid',
    ).length;
    const totalQuestions = questions.length;
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    const shareMessage = `Check out my GeoQuiz Results!\n\nScore: ${correctAnswers}/${totalQuestions} (${scorePercentage}%)\n${resultsSummary}\n\n${WEBSITE_URL}\nDeck: ${deckName}`;
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
          alert('Results copied to clipboard');
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
