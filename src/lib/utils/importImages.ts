import africa from '@assets/gameDeckImages/Africa.jpg';
import europe from '@assets/gameDeckImages/Europe.jpg';
import asia from '@assets/gameDeckImages/Asia.jpg';
import islands from '@assets/gameDeckImages/Islands.jpg';
import southAmerica from '@assets/gameDeckImages/SouthAmerica.jpg';
import worldwide from '@assets/gameDeckImages/Worldwide.jpg';
import caribbean from '@assets/gameDeckImages/Caribbean.jpg';
import oceania from '@assets/gameDeckImages/Oceania.jpg';
import northernAndCentralAmerica from '@assets/gameDeckImages/NorthAmerica.jpg';
import { StaticImageData } from 'next/image';

type GameDeckImages = {
  [key: string]: StaticImageData;
};

export const gameDeckImages: GameDeckImages = {
  africa,
  europe,
  asia,
  islands,
  southAmerica,
  worldwide,
  caribbean,
  oceania,
  northernAndCentralAmerica,
};
