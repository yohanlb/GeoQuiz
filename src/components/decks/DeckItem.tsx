import Link from 'next/link';
type DeckItemProps = {
  deck: Deck;
};

const tempPlayerScore = null;

const DeckItem = ({ deck }: DeckItemProps) => {
  return (
    <li>
      <Link href={`./quiz/${deck.name}`} className='block'>
        <div className='flex items-center justify-between rounded-md border-[0.5px] border-gray-700 px-2 py-1 shadow-md shadow-gray-950 transition hover:border-gray-500 active:bg-gray-300 active:text-black'>
          <h2 className='max-w-52 truncate text-sm font-light'>
            {deck.displayName}
          </h2>
          <div className='flex items-center space-x-1 font-mono'>
            <span className='text-right font-mono'>
              {tempPlayerScore !== null ? `🏅${tempPlayerScore}` : '📦'}
            </span>
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
