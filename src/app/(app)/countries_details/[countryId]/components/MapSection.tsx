import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@components/ui/card';

type Props = {
  mapUrl: string;
};

const MapSection = ({ mapUrl }: Props) => {
  if (!mapUrl) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Map</CardTitle>
        <CardDescription>Geographic location and surroundings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative overflow-hidden rounded-lg'>
          <iframe
            src={mapUrl}
            width='100%'
            height='400'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='rounded-lg'
            title='Country Location Map'
          />
        </div>
        <p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
          Interactive map showing the country's location and geographic features
        </p>
      </CardContent>
    </Card>
  );
};

export default MapSection;