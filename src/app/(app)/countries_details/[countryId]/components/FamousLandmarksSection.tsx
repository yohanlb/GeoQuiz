import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@components/ui/card';

type Landmark = {
  name: string;
  description: string;
  location?: string;
  year_built?: string | number;
  significance?: string;
};

type Props = {
  landmarks: any; // JSON data
};

const FamousLandmarksSection = ({ landmarks }: Props) => {
  let parsedLandmarks: Landmark[] = [];
  
  try {
    if (typeof landmarks === 'string') {
      parsedLandmarks = JSON.parse(landmarks);
    } else if (Array.isArray(landmarks)) {
      parsedLandmarks = landmarks;
    }
  } catch (error) {
    console.error('Error parsing landmarks:', error);
    return null;
  }

  if (!parsedLandmarks.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Famous Landmarks</CardTitle>
        <CardDescription>Notable places and monuments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {parsedLandmarks.map((landmark, index) => (
            <div
              key={index}
              className='rounded-lg border border-gray-200 p-4 dark:border-gray-700'
            >
              <h4 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                {landmark.name}
              </h4>
              {landmark.location && (
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  📍 {landmark.location}
                </p>
              )}
              {landmark.year_built && (
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  🏗️ Built: {landmark.year_built}
                </p>
              )}
              <p className='mt-2 leading-relaxed text-gray-700 dark:text-gray-300'>
                {landmark.description}
              </p>
              {landmark.significance && (
                <div className='mt-3 rounded bg-blue-50 p-3 dark:bg-blue-900/20'>
                  <p className='text-sm text-blue-800 dark:text-blue-200'>
                    <strong>Significance:</strong> {landmark.significance}
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

export default FamousLandmarksSection;