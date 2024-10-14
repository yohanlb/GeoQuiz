'use client';

import React from 'react';
import { Chip } from '@nextui-org/react';
import DeckList from '@components/decks/DeckList';

type Props = {
  decks: DeckWithStatsRecord[];
};

const chipData = [
  { key: 'featured', label: 'Featured' },
  // { key: 'popular', label: 'Popular' },
  { key: 'continent', label: 'Continents' },
  { key: 'difficulty', label: 'By Difficulty' },
  { key: 'africa', label: 'Africa' },
  { key: 'americas', label: 'Americas' },
  { key: 'asia', label: 'Asia' },
  { key: 'europe', label: 'Europe' },
  { key: 'oceania', label: 'Oceania' },
];

function FilterableDeckList({ decks }: Props) {
  const [filterCategory, setFilterCategory] = React.useState<string>('');

  const handleClickFilter = (category: string) => {
    setFilterCategory((prevCategory) =>
      prevCategory === category ? '' : category,
    );
  };

  return (
    <>
      <div className='my-2 flex flex-wrap gap-2'>
        {chipData.map((chip) => (
          <Chip
            key={chip.key}
            className='cursor-pointer select-none'
            variant={filterCategory === chip.key ? 'solid' : 'bordered'}
            onClick={() => handleClickFilter(chip.key)}
          >
            {chip.label}
          </Chip>
        ))}
      </div>
      <DeckList decks={decks} filterCategory={filterCategory} />
    </>
  );
}

export default FilterableDeckList;
