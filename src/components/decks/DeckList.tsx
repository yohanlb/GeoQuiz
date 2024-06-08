import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Link from 'next/link';
import DeckItem from '@components/_commons/DeckItem';
import DeckItemLarge from '@components/_commons/DeckItemLarge';

type DeckListProps = {
  decks: Deck[];
};

const SWITCH_SIZE = false;

const DeckList: React.FC<DeckListProps> = ({ decks }) => {
  return (
    <ul className='flex flex-col space-y-3'>
      {decks.map((deck) =>
        SWITCH_SIZE ? (
          <li key={deck.id}>
            <Link
              href={`${navigationLinks.allDecks.href}/${deck.name}`}
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
