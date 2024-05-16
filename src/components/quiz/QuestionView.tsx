import React from 'react';
import { AnswerOptionButton } from './AnswerButton';
import AnswerCirclesList from './AnswerCirclesList';
import ChoiceOptionButtons from './AnswerButtonsList';
import formatCountrySuccessPercentage from '../../lib/utils/countryStats';
import CountryShape from './CountryShape';
import { useCountryScores } from '@/src/hooks/useCountryScores';
import LastAttempts from './LastAttempts';
import RecallIndex from '@components/_commons/RecallIndex';

type QuestionViewProps = {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: string[];
  userResults: UserResults;
  handleClickAnswerOption: (answer: string) => void;
};

const QuestionView = ({
  questions,
  currentQuestionIndex,
  userAnswers,
  handleClickAnswerOption,
  userResults,
}: QuestionViewProps) => {
  const { getCountryScores } = useCountryScores();

  const currentQuestion = questions[currentQuestionIndex];

  const options = currentQuestion.answerOptions.map((option) => {
    let state = 'Default';
    const isAlreadyClicked = userAnswers.includes(option);
    const isCorrectAnswer = option === currentQuestion.answer;
    if (isAlreadyClicked) {
      state = isCorrectAnswer ? 'SUCCESS' : 'DISABLED';
    }
    return {
      text: option,
      state,
    };
  }) as AnswerOptionButton[];

  const countryCapitalScore = getCountryScores(
    currentQuestion.countryData.id,
  ).capital;

  return (
    <div className='mx-auto flex h-full max-w-lg flex-col justify-between px-4 pb-3 md:px-0 md:py-2'>
      <div className='text-left '>
        <h1 className='text-3xl md:text-5xl'>
          <span className='font-emoji'>
            {currentQuestion.countryData.emoji}
          </span>{' '}
          {currentQuestion.countryData.name}
        </h1>
        <div className='text-xs'>
          <p>
            <span>Continent: </span>
            <strong className='font-semibold italic'>
              {currentQuestion.countryData.subregion}
            </strong>
          </p>
          <p>
            <span>Last Attempts: </span>
            <div className='inline-block'>
              {countryCapitalScore ? (
                <LastAttempts results={countryCapitalScore} />
              ) : (
                <strong className='font-semibold italic'>Unplayed</strong>
              )}
            </div>
          </p>
          <p>
            <span>Recall Index: </span>
            <div className='inline-block'>
              <RecallIndex countryId={currentQuestion.countryData.id} />
            </div>
          </p>
          <p>
            <span>Community average: </span>
            <strong className='font-semibold italic'>
              {formatCountrySuccessPercentage(currentQuestion.countryData)}
            </strong>
          </p>
        </div>
      </div>
      <CountryShape countryCode={currentQuestion.countryData.iso2} />
      <ChoiceOptionButtons
        options={options}
        handleClick={handleClickAnswerOption}
      />
      <AnswerCirclesList
        userResults={userResults}
        totalNumberOfQuestions={questions.length}
        currentQuestionIndex={currentQuestionIndex}
      />
    </div>
  );
};

export default QuestionView;
