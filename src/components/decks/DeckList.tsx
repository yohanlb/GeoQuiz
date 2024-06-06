import React from 'react';
import DeckItem from '@components/_commons/DeckItem';

type DeckListProps = {
  decks: Deck[];
};

const DeckList: React.FC<DeckListProps> = ({ decks }) => {
  return (
    <ul className='flex flex-col space-y-2 bg-[#1C2027]'>
      {decks.map((deck) => (
        <DeckItem key={deck.id} deck={deck} />
      ))}
    </ul>
  );
};

export default DeckList;
