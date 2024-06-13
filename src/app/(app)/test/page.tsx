import React from 'react';
import { getAllCountries } from '@/src/queries/countries';

const Test = async () => {
  const countries = await getAllCountries();

  const blurb = countries.slice(0, 5).map((country) => {
    return [country.name, Math.round(country.success_rate_capital * 100)];
  });

  return (
    <div>
      Test
      <div> {blurb.toString()}</div>
    </div>
  );
};

export default Test;
