import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import CountryProgress from '@/src/app/(app)/decks/[deckName]/[questionTypeId]/progress/CountryProgress';
import { getDeckByName } from '@/src/utils/queries/gameDecks';
import { getCountriesByIds } from '@utils/db/countries';
import { fetchUserGuessesHistoryByCountryIds } from '@utils/db/userGuessesHistory';
import { questionTypeIdToQuestionTypeDisplayName } from '@utils/utils';
import Link from 'next/link';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = {
  params: { deckName: string; questionTypeId?: Question['questionTypeId'] };
};

export async function generateMetadata({ params }: Props) {
  const { displayName } = await getDeckByName(params.deckName);

  return {
    title: `Deck Progress: ${displayName}`,
    description: `Check your progress for the deck ${displayName}!`,
  };
}

const DeckProgress = async ({ params }: Props) => {
  const deck = await getDeckByName(params.deckName);

  const [deckCountries, userGuessesForDeck] = await Promise.all([
    getCountriesByIds(deck.countryIds),
    fetchUserGuessesHistoryByCountryIds(
      deck.countryIds,
      params.questionTypeId || 1,
    ),
  ]);

  const countriesWithUserGuesses: CountryWithUserGuesses[] = deckCountries.map(
    (country) => {
      const userGuesses =
        userGuessesForDeck.find((guess) => guess.country_id === country.id) ||
        null;
      return {
        country,
        userGuesses,
      };
    },
  );

  const QuestionTypeLink = ({
    questionTypeId,
    currentQuestionTypeId,
    icon,
    deckName,
  }: {
    questionTypeId: number;
    currentQuestionTypeId: number;
    icon: React.ReactNode;
    deckName: DeckRecord['name'];
  }) => {
    return (
      <Link
        href={`/decks/${deckName}/${questionTypeId}/progress`}
        className={`group flex items-center gap-2 border-b hover:border-gray-50 ${currentQuestionTypeId === questionTypeId ? 'border-gray-300' : 'border-gray-600'}`}
      >
        {icon}
        <span className={`text-lg text-gray-200 group-hover:text-white`}>
          {questionTypeIdToQuestionTypeDisplayName(
            questionTypeId as Question['questionTypeId'],
          )}
        </span>
      </Link>
    );
  };

  return (
    <div className='flex flex-col gap-8'>
      <SectionTitle text={`Your Progress For Deck: ${deck.displayName}`} />
      <div className='flex w-full items-center justify-center gap-4'>
        <QuestionTypeLink
          questionTypeId={1}
          currentQuestionTypeId={Number(params.questionTypeId)}
          icon={<PiCity />}
          deckName={deck.name}
        />
        <QuestionTypeLink
          questionTypeId={2}
          currentQuestionTypeId={Number(params.questionTypeId)}
          icon={<FaRegFlag />}
          deckName={deck.name}
        />
      </div>
      {countriesWithUserGuesses && countriesWithUserGuesses.length > 0 ? (
        <div className='flex flex-col gap-1'>
          {countriesWithUserGuesses.map((countryWithUserGuesses) => (
            <CountryProgress
              key={countryWithUserGuesses.country.id}
              countryWithUserGuesses={countryWithUserGuesses}
            />
          ))}
        </div>
      ) : (
        <p>No countries to display.</p>
      )}
    </div>
  );
};

export default DeckProgress;
