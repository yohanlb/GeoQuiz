import React from 'react';
import Gauge from '@components/_commons/Gauge';
import RecallIndex from '@components/_commons/RecallIndex';

type Props = {
  questions: Question[];
  userResults: UserResults;
};

type QuestionWithResult = Question & { userResult: UserResultsStatus };

const ResultsTable = ({ questions, userResults }: Props) => {
  const questionsWithResults: QuestionWithResult[] = questions.map(
    (question, i) => ({ ...question, userResult: userResults[i] }),
  );

  return (
    <div className=' w-full overflow-x-auto'>
      <table className='min-w-full whitespace-nowrap text-left text-xs'>
        <thead className='border-b text-xs capitalize md:text-lg'>
          <tr>
            <th className='px-2 py-2 font-normal'>Country</th>
            <th className='px-2 py-2 font-normal'>Capital</th>
            <th className='px-2 py-2 font-normal'>Result</th>
            <th className='text-wrap px-2 py-2 font-normal'>Memory Index</th>
            <th className='px-2 py-2 font-normal'>Community</th>
          </tr>
        </thead>
        <tbody className='text-xs md:text-base'>
          {questionsWithResults.map((question, index) => (
            <tr
              className='border-b border-gray-500 hover:bg-gray-800'
              key={question.countryData.id}
            >
              <td className='text-wrap break-words px-2  py-2 font-extralight'>
                {question.countryData.name}
              </td>
              <td className='text-wrap break-words px-2 py-2 font-extralight'>
                {question.answer}
              </td>
              <td
                className='px-2 py-2 font-extralight'
                aria-label={`Result for question ${index + 1}: ${question.userResult} `}
              >
                <span
                  className={`${question.userResult === 'valid' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {question.userResult === 'valid' ? '✔' : '✘'}
                </span>
              </td>
              <td className='px-2 py-2 font-extralight'>
                <RecallIndex countryId={question.countryData.id} />
              </td>
              <td className='px-2 py-2 font-extralight'>
                <Gauge
                  value={Math.round(question.countryData.success_rate * 100)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
