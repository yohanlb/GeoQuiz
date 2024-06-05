import React from 'react';
import useGameStore from '@/src/stores/gameStore';
import { AnswerOptionButton } from './AnswerButton';
import AnswerButtonsFlagList from './AnswerButtonsFlagList';
import AnswerButtonsList from './AnswerButtonsList';
import AnswerCirclesList from './AnswerCirclesList';
import CountryDescription from './CountryDescription';
import CountryShape from './CountryShape';

type QuestionViewProps = {
  questions: Question[];
  handleClickAnswerOption: (answer: string) => void;
};

export type OptionsFlag = {
  codeIso2: string;
  state: 'Default' | 'SUCCESS' | 'DISABLED';
};

const QuestionView = ({
  questions,
  handleClickAnswerOption,
}: QuestionViewProps) => {
  const { questionType, userAnswers, currentQuestionIndex } = useGameStore();

  const currentQuestion = questions[currentQuestionIndex];

  const optionsCapital = currentQuestion.optionsCapitals.map(
    (capitalOption) => {
      let state = 'Default';
      const isAlreadyClicked = userAnswers.includes(capitalOption);
      const isCorrectAnswer = capitalOption === currentQuestion.answerCapital;
      if (isAlreadyClicked) {
        state = isCorrectAnswer ? 'SUCCESS' : 'DISABLED';
      }
      return {
        text: capitalOption,
        state,
      };
    },
  ) as AnswerOptionButton[];

  const optionsFlag = currentQuestion.optionsIso2.map((optionIso2) => {
    let state = 'Default';
    const isAlreadyClicked = userAnswers.includes(optionIso2);
    const isCorrectAnswer = optionIso2 === currentQuestion.answerIso2;
    if (isAlreadyClicked) {
      state = isCorrectAnswer ? 'SUCCESS' : 'DISABLED';
    }
    return {
      codeIso2: optionIso2,
      state,
    };
  }) as OptionsFlag[];

  return (
    <div className='mx-auto flex h-full max-w-lg flex-col justify-between px-4 pb-3 md:px-0 md:py-2'>
      <div>
        <CountryDescription
          countryData={currentQuestion.countryData}
          hideFlag={questionType === 'CountryToFlag'}
        />
      </div>
      <CountryShape countryCode={currentQuestion.countryData.iso2} />
      {questionType === 'CountryToFlag' ? (
        <AnswerButtonsFlagList
          options={optionsFlag}
          handleClick={handleClickAnswerOption}
        />
      ) : (
        <AnswerButtonsList
          options={optionsCapital}
          handleClick={handleClickAnswerOption}
        />
      )}
      <AnswerCirclesList totalNumberOfQuestions={questions.length} />
    </div>
  );
};

export default QuestionView;
