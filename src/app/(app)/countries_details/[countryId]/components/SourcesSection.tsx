import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@components/ui/card';

type Source = {
  title: string;
  url?: string;
  author?: string;
  date?: string;
  description?: string;
};

type Props = {
  sources: any; // JSON data
};

const SourcesSection = ({ sources }: Props) => {
  let parsedSources: (Source | string)[] = [];
  
  try {
    if (typeof sources === 'string') {
      parsedSources = JSON.parse(sources);
    } else if (Array.isArray(sources)) {
      parsedSources = sources;
    }
  } catch (error) {
    console.error('Error parsing sources:', error);
    return null;
  }

  if (!parsedSources.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sources & References</CardTitle>
        <CardDescription>Information sources used for this content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {parsedSources.map((item, index) => {
            if (typeof item === 'string') {
              return (
                <div
                  key={index}
                  className='rounded border-l-4 border-blue-500 bg-blue-50 p-3 dark:bg-blue-900/20'
                >
                  <p className='text-sm text-gray-700 dark:text-gray-300'>{item}</p>
                </div>
              );
            }

            const source = item as Source;
            return (
              <div
                key={index}
                className='rounded border-l-4 border-blue-500 bg-blue-50 p-3 dark:bg-blue-900/20'
              >
                {source.url ? (
                  <a
                    href={source.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm font-medium text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100'
                  >
                    {source.title}
                  </a>
                ) : (
                  <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                    {source.title}
                  </p>
                )}
                {source.author && (
                  <p className='mt-1 text-xs text-gray-600 dark:text-gray-400'>
                    By: {source.author}
                  </p>
                )}
                {source.date && (
                  <p className='text-xs text-gray-600 dark:text-gray-400'>
                    {source.date}
                  </p>
                )}
                {source.description && (
                  <p className='mt-1 text-xs text-gray-700 dark:text-gray-300'>
                    {source.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SourcesSection;