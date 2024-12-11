import React from 'react';
import { Button } from '@/src/shared/components/ui/button';
import { motion } from 'framer-motion';
import ShareIcon from '@components/global/icons/ShareIcon';

interface SocialShareButtonProps {
  title: string;
  content: string;
}

export const SocialShareButton = ({
  title,
  content,
}: SocialShareButtonProps) => {
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const handleShare = async () => {
    if (isMobileDevice() && navigator.share) {
      try {
        await navigator.share({
          title,
          text: content,
        });
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      navigator.clipboard
        .writeText(content)
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
