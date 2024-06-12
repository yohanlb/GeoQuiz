import React from 'react';
import { TbCardsFilled } from 'react-icons/tb';
import Link from 'next/link';
import DeckImage from '@components/_commons/DeckImage';
import DifficultyIndicator from '@components/_commons/DifficultyIndicator';
import PlayButton from '@components/_commons/PlayButton';
import SelectQuestionType from '@components/_commons/SelectQuestionType';
import UserProgress from '@components/_commons/UserProgress';

type Props = {
  deck: Deck;
  hideTitle?: boolean;
};

const DeckPageContent = ({ deck, hideTitle = false }: Props) => {
  const difficultyScore = deck.decks_stats['CountryToCapital'].averageScore;
  //TODO: switch score depending on question type, but for now there is not enough data for flags.
  // = deck.decks_stats[questionType].averageScore;

  return (
    <>
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
      <div className='flex justify-between'>
        <UserProgress countryIds={deck.countryIds} onlyCurrentQuestionType />
      </div>
      <div className='flex justify-center'>
        <SelectQuestionType />
      </div>
      <div className='flex justify-center'>
        <Link href={`/quiz/${deck.name || ''}?length=10`}>
          <PlayButton text={'Play!'} />
        </Link>
      </div>
    </>
  );
};

export default DeckPageContent;
