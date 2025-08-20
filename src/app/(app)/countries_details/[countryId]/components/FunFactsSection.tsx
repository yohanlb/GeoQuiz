import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@components/ui/card';

type FunFact = {
  fact: string;
  category?: string;
};

type Props = {
  facts: any; // JSON data
};

const FunFactsSection = ({ facts }: Props) => {
  let parsedFacts: (FunFact | string)[] = [];
  
  try {
    if (typeof facts === 'string') {
      parsedFacts = JSON.parse(facts);
    } else if (Array.isArray(facts)) {
      parsedFacts = facts;
    }
  } catch (error) {
    console.error('Error parsing fun facts:', error);
    return null;
  }

  if (!parsedFacts.length) return null;

  const getRandomEmoji = () => {
    const emojis = ['🤔', '💡', '🎯', '⭐', '🌟', '✨', '🎪', '🎭', '🎨', '🎲'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fun Facts</CardTitle>
        <CardDescription>Interesting and surprising facts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {parsedFacts.map((item, index) => {
            const fact = typeof item === 'string' ? item : item.fact;
            const category = typeof item === 'object' && item.category ? item.category : null;
            
            return (
              <div
                key={index}
                className='flex gap-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4 dark:from-purple-900/20 dark:to-pink-900/20'
              >
                <span className='text-xl'>{getRandomEmoji()}</span>
                <div className='flex-1'>
                  {category && (
                    <span className='mb-1 inline-block rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200'>
                      {category}
                    </span>
                  )}
                  <p className='leading-relaxed text-gray-700 dark:text-gray-300'>
                    {fact}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunFactsSection;