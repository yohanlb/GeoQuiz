'use client';

import React from 'react';
import { TbCardsFilled } from 'react-icons/tb';
import { navigationLinks } from '@lib/navigationLinks';
import { UserContext } from '@utils/contexts/UserProvider';
import useGameStore from '@utils/stores/gameStore';
import Link from 'next/link';
import DeckImage from '@components/_commons/DeckImage';
import DifficultyIndicator from '@components/_commons/DifficultyIndicator';
import PlayButton from '@components/_commons/PlayButton';
import SelectQuestionType from '@components/_commons/SelectQuestionType';
import UserDeckGuessesProgressionSection from '@components/decks/UserDeckGuessesProgressionSection';

type Props = {
  deck: Deck;
  hideTitle?: boolean;
};

const DeckPageContent = ({ deck, hideTitle = false }: Props) => {
  const { questionType } = useGameStore();

  const { user } = React.useContext(UserContext);

  // TODO: update store to return questionTypeId instead of questionType
  const questionTypeId = questionType === 'CountryToCapital' ? 1 : 2;

  const difficultyScore =
    deck.decks_stats['CountryToCapital']?.averageScore ?? 50;
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
      <div className='flex w-full justify-center'>
        <DeckImage imageName={deck.image_name} alt={deck.name} />
      </div>
      <div className='flex justify-center'>
        <SelectQuestionType />
      </div>
      <div className='flex justify-center'>
        <Link
          href={`${navigationLinks.quiz.href}/${deck.name || ''}?questionTypeId=${questionTypeId}&length=10`}
        >
          <PlayButton text={'Play!'} />
        </Link>
      </div>
      {user && (
        <UserDeckGuessesProgressionSection countryIds={deck.countryIds} />
      )}
    </div>
  );
};

export default DeckPageContent;
