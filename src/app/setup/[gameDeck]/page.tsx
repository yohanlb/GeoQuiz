import GameDeckInfos from '@components/setup/GameDeckInfos';
import { getGameDeckByName } from '../../queries/gameDecks';
import Link from 'next/link';

type Props = {
  params: { gameDeck: string };
};
export default async function Setup({ params }: Props) {
  const selectedGameDeck = await getGameDeckByName(params.gameDeck);

  return (
    <main className=''>
      <GameDeckInfos gameDeck={selectedGameDeck} />
      <div className='mt-12 flex justify-center md:mt-24'>
        <Link href={`/quiz/${selectedGameDeck.name || ''}?length=10`}>
          <button
            type='submit'
            className='w-60 rounded-xl border border-white py-2 text-2xl font-bold italic md:w-96 md:text-5xl'
          >
            Play !
          </button>
        </Link>
      </div>
    </main>
  );
}
