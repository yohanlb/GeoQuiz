import { Table, TableBody, TableCell, TableRow } from '@components/ui/table';
import Link from 'next/link';

import React from 'react';

type Props = {
  countries: CountryWithScores[];
};

const CountryTable = ({ countries }: Props) => {
  return (
    <Table>
      <TableBody>
        {countries.map((country) => (
          <TableRow
            key={country.timestamp}
            className='group border-gray-600 text-xs md:text-base'
          >
            <TableCell className='px-0 py-1 font-thin'>
              <span
                className={`${country.scores ? 'text-green-500' : 'text-red-500'}`}
              >
                {country.scores ? '✔' : '✘'}
              </span>
            </TableCell>
            <TableCell className='px-0 py-1 font-emoji font-thin'>
              {country.emoji}
            </TableCell>
            <Link href={`/countries/${country.id}`}>
              <TableCell className='px-0 py-1 font-thin underline-offset-2 group-hover:underline'>
                {country.name}
              </TableCell>
            </Link>
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