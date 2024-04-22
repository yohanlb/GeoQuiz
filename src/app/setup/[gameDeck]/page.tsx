import GameDeckInfos from '@components/setup/GameDeckInfos';
import { getGameDecksFromJson } from '../../../queries/gameDecks';
import Link from 'next/link';

type Props = {
  params: { gameDeck: GameDeck['name'] };
};
export default async function Setup({ params }: Props) {
  const allGameDecks = await getGameDecksFromJson();
  const selectedGameDeck = allGameDecks.filter(
    (gameDeck) => gameDeck.name === params.gameDeck,
  )[0];

  if (!selectedGameDeck) {
    throw new Error('Game deck not found');
  }

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
