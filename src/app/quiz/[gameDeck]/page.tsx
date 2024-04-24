import { getDeckByName } from '../../../queries/gameDecks';
import GameClientWrapper from '@components/quiz/GameClientWrapper';

type Props = {
  params: { gameDeck: string };
  searchParams: { length: number };
};
const Quiz = async ({ params, searchParams }: Props) => {
  const deck = await getDeckByName(params.gameDeck);

  return (
    <div>
      <GameClientWrapper deck={deck} amountOfQuestions={searchParams.length} />
    </div>
  );
};

export default Quiz;
