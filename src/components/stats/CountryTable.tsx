import { Table, TableBody, TableCell, TableRow } from '@components/ui/table';

import React from 'react';

type Props = {
  countries: CountryWithScores[];
};

const CountryTable = ({ countries }: Props) => {
  return (
    <Table>
      <TableBody>
        {countries.map((country) => (
          <TableRow key={country.id} className='border-gray-600 text-xs'>
            <TableCell className='px-0 py-1 font-thin'>
              {country.name}
            </TableCell>
            <TableCell className='px-0 py-1 font-thin'>
              <span
                className={`${country.scores ? 'text-green-500' : 'text-red-500'}`}
              >
                {country.scores ? '✔' : '✘'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CountryTable;
