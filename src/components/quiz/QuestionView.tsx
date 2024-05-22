import React from 'react';
import { AnswerOptionButton } from './AnswerButton';
import AnswerCirclesList from './AnswerCirclesList';
import ChoiceOptionButtons from './AnswerButtonsList';
import formatCountrySuccessPercentage from '../../lib/utils/countryStats';
import CountryShape from './CountryShape';
import LastAttempts from './LastAttempts';
import RecallIndex from '@components/_commons/RecallIndex';
import { useStoreCountryResults } from '@/src/stores/countryResults';

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
  const getLastScoresForCountry = useStoreCountryResults(
    (state) => state.getLastScoresForCountry,
  );
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

  const countryCapitalScore = getLastScoresForCountry(
    currentQuestion.countryData.id,
    'capital',
  ).map((scoreObject) => scoreObject.scores);

  let displayedName = currentQuestion.countryData.name;
  if (currentQuestion.countryData.sovereignCountry) {
    displayedName += `(${currentQuestion.countryData.sovereignCountry})`;
  }

  return (
    <div className='mx-auto flex h-full max-w-lg flex-col justify-between px-4 pb-3 md:px-0 md:py-2'>
      <div className='text-left '>
        <h1 className='text-3xl md:text-5xl'>
          <span className='font-emoji'>
            {currentQuestion.countryData.emoji}
          </span>{' '}
          {displayedName}
        </h1>
        <div className='text-xs'>
          <p>
            <span>Continent: </span>
            <strong className='font-semibold italic'>
              {currentQuestion.countryData.subregion}
            </strong>
          </p>
          <div>
            <span>Last Attempts: </span>
            <div className='inline-block'>
              {countryCapitalScore ? (
                <LastAttempts results={[...countryCapitalScore].reverse()} />
              ) : (
                <strong className='font-semibold italic'>Unplayed</strong>
              )}
            </div>
          </div>
          <div>
            <span>Memorization Index: </span>
            <div className='inline-block'>
              <RecallIndex countryId={currentQuestion.countryData.id} />
            </div>
          </div>
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
