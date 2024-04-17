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
      {questions.map((question) => (
        <p key={question.countryData.name}>
          {question.answer}- {question.countryData.name}
        </p>
      ))}
    </div>
  );
};

export default Quiz;
