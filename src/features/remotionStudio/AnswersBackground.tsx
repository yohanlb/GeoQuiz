import React from 'react';
import { useCurrentFrame } from 'remotion';
import { CountryForVideo } from './schemas';
import { TIMINGS_GLOBAL, TIMINGS_QUESTION } from './timings';

type Props = {
  countries: CountryForVideo[];
};

const calculateTimingsForAnswers = (numberOfCountries: number) => {
  const timeToDisplayAnswerBeforeEndOfQuestion =
    TIMINGS_GLOBAL.question_duration - TIMINGS_QUESTION.answer_reveal;
  return Array(numberOfCountries)
    .fill(0)
    .map(
      (_, index) =>
        TIMINGS_GLOBAL.questions_start +
        (index + 1) * TIMINGS_GLOBAL.question_duration -
        timeToDisplayAnswerBeforeEndOfQuestion,
    );
};

const categoriesLevel = ['Easy', 'Medium', 'Difficult', 'Expert'];
const cateoryTextColors = [
  'text-green-500',
  'text-yellow-500',
  'text-orange-500',
  'text-red-500',
];
const categoryIndexes = [0, 3, 6, 9];

const AnswersBackground = ({ countries }: Props) => {
  const frame = useCurrentFrame();

  const timings = React.useMemo(() => {
    return calculateTimingsForAnswers(countries.length);
  }, [countries.length]);

  return (
    <div className='my-20 h-full'>
      <div className='flex columns-2 flex-col gap-1 text-4xl font-bold italic'>
        {countries.map(({ name }, index) => (
          <React.Fragment key={name}>
            {categoryIndexes.includes(index) && (
              <p>
                <span
                  className={cateoryTextColors[categoryIndexes.indexOf(index)]}
                >
                  {categoriesLevel[categoryIndexes.indexOf(index)]}
                </span>
              </p>
            )}
            <p key={name}>
              {index + 1}. {frame > timings[index] && <span>{name}</span>}
            </p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AnswersBackground;
