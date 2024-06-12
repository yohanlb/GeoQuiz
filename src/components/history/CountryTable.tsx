import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import useGameStore from '@/src/stores/gameStore';
import Link from 'next/link';
import DifficultyIndicator from '@components/_commons/DifficultyIndicator';
import { Table, TableBody, TableCell, TableRow } from '@components/ui/table';

type Props = {
  countries: CountryWithScores[];
};

const CountryTable = ({ countries }: Props) => {
  const { questionType } = useGameStore();
  const getScore = (country: CountryWithScores) => {
    switch (questionType) {
      case 'CountryToCapital':
        return country.success_rate_capital;
      case 'CountryToFlag':
        //TODO: switch to flag score when enough data
        return country.success_rate_capital;
      // return country.success_rate_flag;
      default:
        return country.success_rate_capital;
    }
  };

  return (
    <Table>
      <TableBody>
        {countries.map((country) => (
          <TableRow
            key={country.timestamp}
            className='group border-gray-600 text-xs md:text-base'
          >
            <TableCell className='px-0 py-1 font-thin'>
              <DifficultyIndicator value={getScore(country) * 100} />
            </TableCell>
            <TableCell className='px-0 py-1 font-thin'>
              <span
                className={`${country.scores ? 'text-green-500' : 'text-red-500'}`}
              >
                {country.scores ? '✔' : '✘'}
              </span>
            </TableCell>
            <TableCell className='px-0 py-1 font-thin'>
              <ReactCountryFlag
                countryCode={country.iso2}
                svg
                aria-label={country.name}
              />
            </TableCell>
            <TableCell className='px-0 py-1 font-thin underline-offset-2 group-hover:underline'>
              <Link href={`/countries/${country.id}`}>{country.name}</Link>
            </TableCell>
            <TableCell className='px-0 py-1 font-thin'>
              {country.capital}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CountryTable;
