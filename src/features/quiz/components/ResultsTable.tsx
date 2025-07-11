import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import ResultsTableResultCell from '@features/quiz/components/ResultsTableResultCell';
import { navigationLinks } from '@lib/data/navigation-links';
import useGameStore from '@stores/game-store';
import { User } from '@supabase/supabase-js';
import { calculateCountrySuccessPercentage } from '@utils/countryStats';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DifficultyIndicator from '@components/global/DifficultyIndicator';

const ResultsTable = ({ user }: { user: User | null }) => {
  const { answeredQuestions } = useGameStore();

  return (
    <div className='w-full overflow-x-auto'>
      <table
        className='min-w-full whitespace-nowrap text-left text-xs'
        data-test='results-table'
      >
        <thead className='border-b text-xs capitalize md:text-lg'>
          <tr>
            <th className='px-2 py-2 font-normal'>Country</th>
            <th className='px-2 py-2 font-normal'>Flag</th>
            <th className='px-2 py-2 font-normal'>Capital</th>
            <th className='px-2 py-2 font-normal'>Result</th>
          </tr>
        </thead>
        <tbody className='text-xs md:text-base'>
          {answeredQuestions.map((question, index) => (
            <motion.tr
              className='border-b border-gray-500 hover:bg-gray-800'
              key={question.countryData.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: 'spring',
                delay: index * 0.3,
              }}
            >
              <td className='flex gap-x-2 text-wrap break-words px-2 py-2 font-extralight'>
                <Link
                  href={
                    navigationLinks.countries.href +
                    '/' +
                    question.countryData.id
                  }
                  className='underline underline-offset-1'
                >
                  {question.countryData.name}
                </Link>
                {/* TODO: WE ARE ONLY DISPLAYING CAPITAL SUCCESS RATE FOR NOW. Switch based on question.questionTypeId */}
                <DifficultyIndicator
                  value={
                    calculateCountrySuccessPercentage(question.countryStats)
                      .successRateCapital
                  }
                />
              </td>
              <td className='text-wrap break-words px-2 py-2 font-extralight'>
                <ReactCountryFlag
                  aria-label={question.countryData.name}
                  svg
                  countryCode={question.countryData.iso2}
                  className='align-middle text-xl md:text-3xl'
                />
              </td>
              <td className='text-wrap break-words px-2 py-2 font-extralight'>
                {question.countryData.capital}
              </td>
              <td
                className='px-2 py-2 font-extralight'
                aria-label={`Result for question ${index + 1}: ${question.isCorrect} `}
              >
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 15,
                    stiffness: 300,
                    restDelta: 0.001,
                    delay: answeredQuestions.length * 0.3 + index * 0.02,
                  }}
                  className={`inline-block ${question.isCorrect ? 'text-green-500' : 'text-red-500'}`}
                >
                  <ResultsTableResultCell
                    user={user}
                    countryId={question.countryData.id}
                    questionIndex={index}
                  />
                </motion.span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
