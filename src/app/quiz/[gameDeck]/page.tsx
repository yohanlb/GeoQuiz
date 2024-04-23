import { getGameDecksFromJsonByName } from '../../../queries/gameDecks';
import GameClientWrapper from '@components/quiz/GameClientWrapper';

type Props = {
  params: { gameDeck: string };
  searchParams: { length: number };
};
const Quiz = async ({ params, searchParams }: Props) => {
  const gameDeck = await getGameDecksFromJsonByName(params.gameDeck);

  return (
    <div>
      <GameClientWrapper
        gameDeck={gameDeck}
        amountOfQuestions={searchParams.length}
      />
    </div>
  );
};

export default Quiz;
