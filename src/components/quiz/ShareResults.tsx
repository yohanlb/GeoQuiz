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

  const websiteUrl = 'https://geoquiz.co';

  const generateShareText = () => {
    const resultsSummary = questionsWithResults
      .map((question) => (question.userResult === 'valid' ? '🟩' : '🟥'))
      .join('');

    const correctAnswers = userResults.filter(
      (result) => result === 'valid',
    ).length;
    const totalQuestions = questions.length;
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    const shareMessage = `GeoQuiz Results\n\nScore: ${correctAnswers}/${totalQuestions} (${scorePercentage}%)\n${resultsSummary}\n\n${websiteUrl}\nDeck: ${deckName}`;
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
      Share Results
    </Button>
  );
};

export default ShareResults;
