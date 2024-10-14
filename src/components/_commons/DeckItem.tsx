import { TbCardsFilled } from 'react-icons/tb';
import { navigationLinks } from '@lib/navigationLinks';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import DifficultyIndicator from './DifficultyIndicator';

type DeckItemProps = {
  deck: DeckWithStatsRecord;
};
const UnplayedIndicator = dynamic(
  () => import('@components/_commons/UnplayedIndicator'),
  {
    ssr: false,
  },
);

const DeckItem = ({ deck }: DeckItemProps) => {
  return (
    <li>
      <Link
        href={`${navigationLinks.allDecks.href}/${deck.name}`}
        rel='canonical'
        className='block'
      >
        <div className='flex items-center justify-between rounded-md border-[0.5px] border-gray-700 px-2 py-1 text-gray-200 shadow-md shadow-gray-950 transition hover:border-gray-500 hover:text-white active:bg-gray-300 active:text-black'>
          <div className='inline-flex items-center'>
            <h2 className='max-w-52 truncate text-sm font-light md:max-w-96'>
              {deck.displayName}
            </h2>
            <UnplayedIndicator deckId={deck.id} />
          </div>
          <div className='flex items-center space-x-1 font-mono'>
            <span className='text-right'>
              <TbCardsFilled className='inline size-5' />
              {deck.countryIds?.length}
            </span>
            <DifficultyIndicator
              size='md'
              value={deck.decks_stats['CountryToCapital'].averageScore}
            />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default DeckItem;
