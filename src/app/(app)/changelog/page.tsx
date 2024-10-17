import { CHANGELOG_DATA, ChangelogEntry } from '@lib/data/changelog-data';
import Image from 'next/image';
import { Separator } from '@components/ui/separator';

const ChangelogEntryComponent = ({ entry }: { entry: ChangelogEntry }) => {
  return (
    <div className='py-8'>
      <div className='mb-2 flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>{entry.version}</h2>
        <span className='text-sm text-gray-300'>{entry.date}</span>
      </div>
      <h3 className='mb-4 text-xl text-gray-100'>{entry.title}</h3>
      <ul className='list-inside list-disc space-y-2 text-gray-300'>
        {entry.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {entry.image && (
        <div className='mt-6'>
          <Image
            src={entry.image}
            alt={`Update ${entry.version} preview`}
            width={600}
            height={400}
            className='rounded-lg'
          />
        </div>
      )}
    </div>
  );
};

export const metadata = {
  title: 'Changelog',
  description: 'GeoQuiz changelog.',
};

export default function Changelog() {
  return (
    <div className='px-4 py-12 text-gray-100 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mb-4 text-center text-3xl font-bold'>
          What is new on GeoQuiz?
        </h1>
        <h2 className='mb-4 text-center text-xl text-gray-300'>
          Here you can find the latest updates and changes to GeoQuiz.
        </h2>
        {CHANGELOG_DATA.map((entry, index) => (
          <div key={entry.version}>
            <ChangelogEntryComponent entry={entry} />
            {index < CHANGELOG_DATA.length - 1 && (
              <Separator className='bg-gray-700' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
