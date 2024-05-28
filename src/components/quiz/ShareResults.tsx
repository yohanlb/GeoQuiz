import { Button } from '@components/ui/button';
import React from 'react';

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

  const shareUrl = window.location.href;

  const generateShareText = () => {
    const resultsSummary = questionsWithResults
      .map((question) => (question.userResult === 'valid' ? '🟩' : '⬛'))
      .join('');

    const shareMessage = `Check out my results for the ${deckName} deck!\n\n${resultsSummary}\n\n${shareUrl}`;
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
          title: 'My Results',
          text: shareText,
          url: shareUrl,
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
    <Button
      variant={'secondary'}
      onClick={handleShare}
      className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
    >
      Share Results
    </Button>
  );
};

export default ShareResults;
