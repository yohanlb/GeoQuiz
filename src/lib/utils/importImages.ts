import africa from '@assets/gameDeckImages/africa.jpg';
import europe from '@assets/gameDeckImages/europe.jpg';
import asia from '@assets/gameDeckImages/asia.jpg';
import islands from '@assets/gameDeckImages/islands.jpg';
import south_america from '@assets/gameDeckImages/south_america.jpg';
import worldwide from '@assets/gameDeckImages/worldwide.jpg';
import caribbean from '@assets/gameDeckImages/caribbean.jpg';
import oceania from '@assets/gameDeckImages/oceania.jpg';
import northernAndCentralAmerica from '@assets/gameDeckImages/northernAndCentralAmerica.jpg';
import { StaticImageData } from 'next/image';

type GameDeckImages = {
  [key: string]: StaticImageData;
};

export const gameDeckImages: GameDeckImages = {
  africa,
  europe,
  asia,
  islands,
  south_america,
  worldwide,
  caribbean,
  oceania,
  northernAndCentralAmerica,
};
