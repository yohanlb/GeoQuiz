import { FEEDBACK_FORM_LINK } from '@lib/data/navigation-links';
import { ROADMAP_DATA } from '@lib/data/roadmap-data';
import Link from 'next/link';

export const metadata = {
  title: 'Roadmap',
  description: 'GeoQuiz Roadmap.',
};

export default function Roadmap() {
  return (
    <div className='min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mb-6 text-center text-4xl font-bold text-gray-100'>
          GeoQuiz Roadmap
        </h1>
        <p className='mb-8 text-center text-lg text-gray-200'>
          These are the features and improvements currently in development.
        </p>
        <div className='mb-12 text-center'>
          <Link
            href={FEEDBACK_FORM_LINK}
            target='_blank'
            className='rounded-md bg-orange-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-orange-700'
          >
            Suggest a Feature
          </Link>
        </div>
        <div className='space-y-12'>
          {ROADMAP_DATA.map((section) => (
            <div key={section.status}>
              <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-100'>
                <section.icon className={`mr-2 ${section.color}`} />
                {section.status}
              </h2>
              <div className='overflow-hidden rounded-lg bg-black/40 shadow-md'>
                {section.items.map((item) => (
                  <div
                    key={item.title}
                    className='border-b border-gray-700 px-4 py-3 last:border-b-0'
                  >
                    <h3 className='text-lg font-medium text-gray-100'>
                      {item.title}
                    </h3>
                    <p className='mt-2 text-sm text-gray-400'>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
