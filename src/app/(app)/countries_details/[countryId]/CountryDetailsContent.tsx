import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import QuickFactsSection from './components/QuickFactsSection';
import FamousLandmarksSection from './components/FamousLandmarksSection';
import NotablePeopleSection from './components/NotablePeopleSection';
import FunFactsSection from './components/FunFactsSection';
import FAQSection from './components/FAQSection';
import MapSection from './components/MapSection';
import SourcesSection from './components/SourcesSection';

type Props = {
  countryDetails: CountryDetailsRecord;
};

const CountryDetailsContent = ({ countryDetails }: Props) => {
  return (
    <div className='space-y-8'>
      {/* Main Summary */}
      {countryDetails.summary && (
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>General information about the country</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='leading-relaxed text-gray-700 dark:text-gray-300'>
              {countryDetails.summary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Capital Summary */}
      {countryDetails.capital_summary && (
        <Card>
          <CardHeader>
            <CardTitle>About the Capital</CardTitle>
            <CardDescription>Information about the capital city</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='leading-relaxed text-gray-700 dark:text-gray-300'>
              {countryDetails.capital_summary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Facts */}
      {countryDetails.quick_facts && (
        <QuickFactsSection facts={countryDetails.quick_facts} />
      )}

      {/* Map */}
      {countryDetails.map_embed_url && (
        <MapSection mapUrl={countryDetails.map_embed_url} />
      )}

      {/* Famous Landmarks */}
      {countryDetails.famous_landmarks && (
        <FamousLandmarksSection landmarks={countryDetails.famous_landmarks} />
      )}

      {/* Notable People */}
      {countryDetails.notable_people && (
        <NotablePeopleSection people={countryDetails.notable_people} />
      )}

      {/* Fun Facts */}
      {countryDetails.fun_facts && (
        <FunFactsSection facts={countryDetails.fun_facts} />
      )}

      {/* FAQs */}
      {countryDetails.faqs && (
        <FAQSection faqs={countryDetails.faqs} />
      )}

      {/* Verification Status and Last Updated */}
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400'>
            <div className='flex items-center justify-between'>
              <span>Verification Status:</span>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  countryDetails.is_verified
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}
              >
                {countryDetails.is_verified ? 'Verified' : 'Pending Review'}
              </span>
            </div>
            {countryDetails.last_updated && (
              <div className='flex items-center justify-between'>
                <span>Last Updated:</span>
                <span>
                  {new Date(countryDetails.last_updated).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sources */}
      {countryDetails.sources && (
        <SourcesSection sources={countryDetails.sources} />
      )}
    </div>
  );
};

export default CountryDetailsContent;