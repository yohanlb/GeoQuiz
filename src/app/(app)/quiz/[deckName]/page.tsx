import QuizWrapper from '@/src/app/(app)/quiz/[deckName]/QuizWrapper';
import { getDeckByName } from '@features/decks/server/db/decks';
import { fetchAllUserGuessesHistory } from '@features/userInsights/server/db/user-guesses-history';
import { getAuthenticatedUser } from '@server/db/get-authenticated-user';

type Props = {
  params: { deckName: string };
  searchParams: {
    length: number;
    dynamicCountryIds: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { displayName } = await getDeckByName(params.deckName);
  return {
    title: `Playing: ${displayName}`,
    description: `Playing a quiz about ${displayName}!`,
  };
}

const Quiz = async ({ params, searchParams }: Props) => {
  const user = await getAuthenticatedUser();
  const deck = await getDeckByName(params.deckName);

  const userGuessesHistory = user
    ? await fetchAllUserGuessesHistory(user.id)
    : [];

  if (deck.isDynamic && searchParams.dynamicCountryIds) {
    // to implement dynamic deck, provide it to search params: ?dynamicCountryIds=75,1
    const deckIds = searchParams.dynamicCountryIds.split(',').map(Number);
    deck.countryIds = deckIds;
    deck.isDynamic = true;
  }
  return (
    <div className='h-full'>
      <QuizWrapper
        userGuessesHistory={userGuessesHistory}
        deck={deck}
        amountOfQuestions={searchParams.length}
      />
    </div>
  );
};

export default Quiz;
