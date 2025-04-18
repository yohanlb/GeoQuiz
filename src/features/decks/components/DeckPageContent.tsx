'use client';

import React from 'react';
import { TbCardsFilled } from 'react-icons/tb';
import UserDeckGuessesProgressionSection from '@features/decks/components/UserDeckGuessesProgressionSection';
import { UserContext } from '@lib/contexts/UserProvider';
import { navigationLinks } from '@lib/data/navigation-links';
import useGameStore from '@stores/game-store';
import Link from 'next/link';
import DeckImage from '@components/global/DeckImage';
import DifficultyIndicator from '@components/global/DifficultyIndicator';
import PlayButton from '@components/global/PlayButton';
import SelectQuestionType from '@components/global/SelectQuestionType';

type Props = {
  deck: DeckWithStatsRecord;
  hideTitle?: boolean;
};

const DeckPageContent = ({ deck, hideTitle = false }: Props) => {
  const { questionType } = useGameStore();

  const { user } = React.useContext(UserContext);

  // TODO: update store to return questionTypeId instead of questionType
  const questionTypeId = questionType === 'CountryToCapital' ? 1 : 2;

  const difficultyScore =
    deck.decks_stats.find((stat) => stat.questionTypeId === 1)?.averageScore ??
    50;
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
        <UserDeckGuessesProgressionSection
          countryIds={deck.countryIds}
          deckName={deck.name}
          questionTypeId={questionTypeId}
        />
      )}
    </div>
  );
};

export default DeckPageContent;
