import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@components/ui/card';

type NotablePerson = {
  name: string;
  description: string;
  field?: string;
  birth_year?: string | number;
  death_year?: string | number;
  achievements?: string;
};

type Props = {
  people: any; // JSON data
};

const NotablePeopleSection = ({ people }: Props) => {
  let parsedPeople: NotablePerson[] = [];
  
  try {
    if (typeof people === 'string') {
      parsedPeople = JSON.parse(people);
    } else if (Array.isArray(people)) {
      parsedPeople = people;
    }
  } catch (error) {
    console.error('Error parsing notable people:', error);
    return null;
  }

  if (!parsedPeople.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notable People</CardTitle>
        <CardDescription>Famous individuals from this country</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 md:grid-cols-2'>
          {parsedPeople.map((person, index) => (
            <div
              key={index}
              className='rounded-lg border border-gray-200 p-4 dark:border-gray-700'
            >
              <h4 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                {person.name}
              </h4>
              {person.field && (
                <p className='mt-1 text-sm font-medium text-blue-600 dark:text-blue-400'>
                  {person.field}
                </p>
              )}
              {(person.birth_year || person.death_year) && (
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  {person.birth_year && `Born: ${person.birth_year}`}
                  {person.birth_year && person.death_year && ' • '}
                  {person.death_year && `Died: ${person.death_year}`}
                </p>
              )}
              <p className='mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300'>
                {person.description}
              </p>
              {person.achievements && (
                <div className='mt-3 rounded bg-green-50 p-3 dark:bg-green-900/20'>
                  <p className='text-sm text-green-800 dark:text-green-200'>
                    <strong>Key Achievements:</strong> {person.achievements}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotablePeopleSection;