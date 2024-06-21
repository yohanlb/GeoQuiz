import React from 'react';
import { TbCardsFilled } from 'react-icons/tb';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import DeckImage from '@components/_commons/DeckImage';
import DifficultyIndicator from '@components/_commons/DifficultyIndicator';
import PlayButton from '@components/_commons/PlayButton';
import SelectQuestionType from '@components/_commons/SelectQuestionType';

const DeckCountryProgressSection = dynamic(
  () => import('@components/decks/DeckCountryProgressSection'),
  {
    ssr: false,
  },
);

type Props = {
  deck: Deck;
  hideTitle?: boolean;
};

const DeckPageContent = ({ deck, hideTitle = false }: Props) => {
  const difficultyScore = deck.decks_stats['CountryToCapital'].averageScore;
  //TODO: switch score depending on question type, but for now there is not enough data for flags.
  // = deck.decks_stats[questionType].averageScore;

  return (
    <div className='flex flex-col gap-4 md:gap-8'>
      <div>
        {!hideTitle && (
          <h1 className='text-2xl font-semibold'>{deck.displayName}</h1>
        )}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <TbCardsFilled className='inline size-5' />
            <span className='font-thin'>
              <strong> {deck.countryIds.length}</strong> Countries.
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-thin'>Difficulty:</span>
            <DifficultyIndicator
              value={difficultyScore}
              type='deck'
              size='md'
            />
          </div>
        </div>
      </div>
      {deck.description && <p>{deck.description}</p>}
      <DeckImage imageName={deck.name} alt={deck.name} />
      <DeckCountryProgressSection countryIds={deck.countryIds} />
      <div className='flex justify-center'>
        <SelectQuestionType />
      </div>
      <div className='flex justify-center'>
        <Link href={`/quiz/${deck.name || ''}?length=10`}>
          <PlayButton text={'Play!'} />
        </Link>
      </div>
    </div>
  );
};

export default DeckPageContent;
