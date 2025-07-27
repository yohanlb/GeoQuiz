import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@components/ui/card';

type QuickFact = {
  label: string;
  value: string;
};

type Props = {
  facts: any; // JSON data
};

const QuickFactsSection = ({ facts }: Props) => {
  let parsedFacts: QuickFact[] = [];
  
  try {
    // Handle different possible JSON structures
    if (typeof facts === 'string') {
      parsedFacts = JSON.parse(facts);
    } else if (Array.isArray(facts)) {
      parsedFacts = facts;
    } else if (typeof facts === 'object' && facts !== null) {
      // Convert object to array of key-value pairs
      parsedFacts = Object.entries(facts).map(([key, value]) => ({
        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: String(value),
      }));
    }
  } catch (error) {
    console.error('Error parsing quick facts:', error);
    return null;
  }

  if (!parsedFacts.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Facts</CardTitle>
        <CardDescription>Key information at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {parsedFacts.map((fact, index) => (
            <div
              key={index}
              className='rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800'
            >
              <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                {fact.label}
              </dt>
              <dd className='mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100'>
                {fact.value}
              </dd>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickFactsSection;