import React from 'react';
import { Button } from '@/src/shared/components/ui/button';
import { EMOJIS, WEBSITE_URL } from '@lib/data/consts';
import useGameStore from '@stores/game-store';
import { motion } from 'framer-motion';
import ShareIcon from '@components/global/icons/ShareIcon';

const ShareResults = () => {
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
    const shareMessage = `Check out my GeoQuiz Results!\n\nScore: ${correctAnswers}/${totalQuestions} (${scorePercentage}%)\nDeck: ${deck?.displayName}\n${resultsSummary}\n\n${link}`;
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
    <motion.div
      initial={{ opacity: 0.7, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        repeatType: 'reverse',
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        transition={{
          duration: 0.3,
        }}
      >
        <Button variant={'secondary'} onClick={handleShare}>
          Share
          <ShareIcon className='ml-2' />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ShareResults;
