import GameDeckInfos from '@components/setup/GameDeckInfos';
import { getDeckByName } from '../../../queries/gameDecks';
import Link from 'next/link';

type Props = {
  params: { gameDeck: GameDeck['name'] };
};
export default async function Setup({ params }: Props) {
  const gameDeck = await getDeckByName(params.gameDeck);

  return (
    <div className='h-full'>
      <GameDeckInfos gameDeck={gameDeck} />
      <div className='mt-12 flex justify-center md:mt-24'>
        <Link href={`/quiz/${gameDeck.name || ''}?length=10`}>
          <button
            type='submit'
            className='w-60 rounded-xl border border-white py-2 text-2xl font-bold italic md:w-96 md:text-5xl'
          >
            Play !
          </button>
        </Link>
      </div>
    </div>
  );
}
