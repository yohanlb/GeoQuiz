import GameController from '@components/quiz/GameController';
import { getQuestions } from '../../queries/questions';

type Props = {
  params: { gameDeck: string };
  searchParams: { length: number };
};
const Quiz = async ({ params, searchParams }: Props) => {
  console.log(params);
  const questions = await getQuestions(params.gameDeck, searchParams.length);
  console.log(searchParams.length, questions.length);

  return (
    <div>
      <GameController questions={questions} gameDeck={params.gameDeck} />
    </div>
  );
};

export default Quiz;
