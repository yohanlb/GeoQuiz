import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import AnonymousWarning from '@/src/features/userInsights/components/AnonymousWarning';
import CountryProgress from '@/src/features/userInsights/components/CountryProgress';
import DeckProgressWidget from '@/src/features/userInsights/components/DeckProgressWidget';
import QuestionTypeLink from '@/src/features/userInsights/components/QuestionTypeLink';
import { getCountriesByIds } from '@/src/server/db/countries';
import { navigationLinks } from '@data/navigationLinks';
import { fetchUserGuessesHistoryByCountryIds } from '@features/userInsights/server/db/user-guesses-history';
import { getDeckByName } from '@lib/queries/gameDecks';
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
      params.questionTypeId ?? 1,
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

  return (
    <div className='flex flex-col gap-4'>
      <SectionTitle text={`Your Deck Progression`} />
      <div>
        <h3 className='text-center text-xl'>
          Deck:{' '}
          <Link
            href={`${navigationLinks.allDecks.href}/${deck.name}`}
            className='underline'
          >
            {deck.displayName}
          </Link>
        </h3>
        <p className='text-center text-sm text-gray-200'>
          {`(${deck.countryIds.length} countries)`}
        </p>
      </div>
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
      <AnonymousWarning />
      <DeckProgressWidget
        countriesWithUserGuesses={countriesWithUserGuesses}
        nbOfCountriesInDeck={deckCountries.length}
      />
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
