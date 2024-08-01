import React from 'react';
import { shuffleArray } from '@lib/utils';
import SectionTitle from '@components/_commons/SectionTitle';
import DeckGrid from './DeckGrid';

type Props = {
  decks: Deck[];
};

const FeaturedAndPopularSection = ({ decks }: Props) => {
  const howManyToDisplay = 6;

  const sortedDecks = React.useMemo(() => {
    const featuredAndPopularDecks = decks.filter((deck) =>
      deck.categories?.includes('featured'),
    );

    const shuffledDecks = shuffleArray(featuredAndPopularDecks);

    // Sort decks by displayPriority
    // const sortedDecks = featuredAndPopularDecks
    //   .sort(
    //     (a, b) =>
    //       (a.displayPriority || defaultPriority) -
    //       (b.displayPriority || defaultPriority),
    //   )
    //   .slice(0, howManyToDisplay);

    return shuffledDecks;
  }, [decks]);

  return (
    <section>
      <SectionTitle text='Featured and Popular 🔥' />
      <SectionTitle
        text='Explore popular and featured decks, favored by the community.'
        variant='description'
      />
      <DeckGrid decks={sortedDecks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default FeaturedAndPopularSection;
