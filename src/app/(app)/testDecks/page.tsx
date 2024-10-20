import { getDecks } from '@lib/queries/gameDecks';
import DeckGrid from '@components/home/DeckGrid';

async function TestDecks() {
  const decks = await getDecks();

  //TODO: DELETE, Only for test purposes
  return (
    <div className='flex flex-col gap-3 px-4 py-4 text-center md:px-0'>
      <DeckGrid decks={decks} />
    </div>
  );
}

export default TestDecks;
