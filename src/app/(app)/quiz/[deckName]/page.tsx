import GameClientWrapper from '@components/quiz/GameClientWrapper';
import { getDeckByName } from '../../../../queries/gameDecks';

type Props = {
  params: { deckName: string };
  searchParams: {
    length: number;
    dynamicCountryIds: string;
  };
};
const Quiz = async ({ params, searchParams }: Props) => {
  const deck = await getDeckByName(params.deckName);

  if (deck.isDynamic && searchParams.dynamicCountryIds) {
    // to implement dynamic deck, provide it to search params: ?dynamicCountryIds=75,1
    const deckIds = searchParams.dynamicCountryIds
      .split(',')
      .map(Number) as CountryData['id'][];
    deck.countryIds = deckIds;
    deck.isDynamic = true;
  }
  return (
    <div className='h-full'>
      <GameClientWrapper
        deck={deck}
        amountOfQuestions={searchParams.length}
        deckName={params.deckName}
      />
    </div>
  );
};

export default Quiz;
