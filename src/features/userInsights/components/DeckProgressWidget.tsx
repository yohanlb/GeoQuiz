import React from 'react';
import { CircularProgress } from '@nextui-org/react';

const getBarColor = (value: number) => {
  if (value > 99) {
    return 'success';
  }
  if (value > 50) {
    return 'primary';
  }
  return 'default';
};
type Props = {
  countriesWithUserGuesses: CountryWithUserGuesses[];
  nbOfCountriesInDeck: number;
};

const calculateCountryCorrectGuesses = (country: CountryWithUserGuesses) => {
  return (
    country.userGuesses?.guess_results?.slice(0, 3).filter(Boolean).length ?? 0
  );
};

export default function DeckProgressWidget({
  countriesWithUserGuesses,
  nbOfCountriesInDeck,
}: Readonly<Props>) {
  const amountOfCorrectGuesses = countriesWithUserGuesses.reduce(
    (totalCorrectGuesses, country) => {
      const countryCorrectGuesses = calculateCountryCorrectGuesses(country);
      return totalCorrectGuesses + countryCorrectGuesses;
    },
    0,
  );
  const overallDeckProgressRatio =
    amountOfCorrectGuesses / (nbOfCountriesInDeck * 3);
  const overallDeckProgress = Math.round(overallDeckProgressRatio * 100);

  return (
    <div className='flex items-center justify-center gap-4'>
      <CircularProgress
        classNames={{
          svg: 'w-24 h-24 drop-shadow-md',
          indicator: `${getBarColor(overallDeckProgress)}`,
          track: 'stroke-white/10',
          value: 'text-xl font-semibold text-white',
        }}
        value={overallDeckProgress}
        strokeWidth={4}
        showValueLabel={true}
        label='Overall Progress'
      />
    </div>
  );
}
