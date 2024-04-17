import GameController from '@components/quiz/GameController';
import { getQuestions } from '../../queries/questions';

type Props = {
  params: { gameDeck: string };
  searchParams: { length: number };
};
const Quiz = async ({ params, searchParams }: Props) => {
  const questions = await getQuestions(params.gameDeck, searchParams.length);

  return (
    <div>
      <GameController questions={questions} gameDeck={params.gameDeck} />
    </div>
  );
};

export default Quiz;
