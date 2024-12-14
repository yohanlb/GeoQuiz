import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import { getCountriesByIds } from '@features/countries/server/db/countries';
import { getDeckByName } from '@features/decks/server/db/decks';
import AnonymousWarning from '@features/userInsights/components/deckProgression/AnonymousWarning';
import CountryProgress from '@features/userInsights/components/deckProgression/CountryProgress';
import DeckProgressWidget from '@features/userInsights/components/deckProgression/DeckProgressWidget';
import QuestionTypeLink from '@features/userInsights/components/deckProgression/QuestionTypeLink';
import { fetchUserGuessesHistoryByCountryIds } from '@features/userInsights/server/db/user-guesses-history';
import { navigationLinks } from '@lib/data/navigation-links';
import Link from 'next/link';
import SectionTitle from '@components/global/SectionTitle';

type Props = {
  params: Promise<{ deckName: string; questionTypeId?: Question['questionTypeId'] }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { displayName } = await getDeckByName(params.deckName);

  return {
    title: `Deck Progress: ${displayName}`,
    description: `Check your progress for the deck ${displayName}!`,
  };
}

const DeckProgress = async (props: Props) => {
  const params = await props.params;
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
