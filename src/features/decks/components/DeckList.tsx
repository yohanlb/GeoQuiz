import React from 'react';
import { navigationLinks } from '@lib/data/navigation-links';
import DeckItem from '@shared/components/global/DeckItem';
import DeckItemLarge from '@shared/components/global/DeckItemLarge';
import Link from 'next/link';

type DeckListProps = {
  decks: DeckWithStatsRecord[];
  filterCategory?: string;
};

const SWITCH_SIZE = false;

const DeckList: React.FC<DeckListProps> = ({ decks, filterCategory }) => {
  const filteredDecks = decks.filter((deck) => {
    if (filterCategory) {
      return !!deck.categories && deck.categories.includes(filterCategory);
    } else return true;
  });

  return (
    <ul className='mx-auto flex w-full max-w-96 flex-col space-y-3'>
      {filteredDecks.map((deck) =>
        SWITCH_SIZE ? (
          <li key={deck.id}>
            <Link
              href={`${navigationLinks.allDecks.href}/${deck.name}`}
              rel='canonical'
              className='block'
            >
              <DeckItemLarge key={deck.id} deck={deck} />
            </Link>
          </li>
        ) : (
          <DeckItem key={deck.id} deck={deck} />
        ),
      )}
    </ul>
  );
};

export default DeckList;
