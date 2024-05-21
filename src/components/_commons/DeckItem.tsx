import Link from 'next/link';
import dynamic from 'next/dynamic';
type DeckItemProps = {
  deck: Deck;
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
      <Link href={`./quiz/${deck.name}`} className='block'>
        <div className='flex items-center justify-between rounded-md border-[0.5px] border-gray-700 px-2 py-1 shadow-md shadow-gray-950 transition hover:border-gray-500 active:bg-gray-300 active:text-black'>
          <div className='inline-flex items-center'>
            <UnplayedIndicator deckId={deck.id} />
            <h2 className='max-w-52 truncate text-sm font-light'>
              {deck.displayName}
            </h2>
          </div>
          <div className='flex items-center space-x-1 font-mono'>
            <span className='text-right'>🌍{deck.countryIds.length}</span>
            <span className='text-right'>
              📈{Math.round(deck.averageSuccessRatio)}%
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default DeckItem;
