import GameController from '@components/quiz/GameController';
import { getGameDecksFromJsonByName } from '../../../queries/gameDecks';
import { getQuestionsFromCountryIds } from '../../../queries/questions';

type Props = {
  params: { gameDeck: string };
  searchParams: { length: number };
};
const Quiz = async ({ params, searchParams }: Props) => {
  const gameDeck = await getGameDecksFromJsonByName(params.gameDeck);

  const questions = await getQuestionsFromCountryIds(
    gameDeck.countryIds,
    searchParams.length,
  );

  return (
    <div>
      <GameController questions={questions} gameDeck={params.gameDeck} />
    </div>
  );
};

export default Quiz;
