import { StaticImageData } from 'next/image';
import africa from '@assets/deckImages/Africa.jpg';
import asia from '@assets/deckImages/Asia.jpg';
import caribbean from '@assets/deckImages/Caribbean.jpg';
import easiest from '@assets/deckImages/Easy.jpg';
import europe from '@assets/deckImages/Europe.jpg';
import hardest from '@assets/deckImages/Hardest.jpg';
import islands from '@assets/deckImages/Islands.jpg';
import medium from '@assets/deckImages/Medium.jpg';
import northernAndCentralAmerica from '@assets/deckImages/NorthAmerica.jpg';
import oceania from '@assets/deckImages/Oceania.jpg';
import southAmerica from '@assets/deckImages/SouthAmerica.jpg';
import world from '@assets/deckImages/Worldwide.jpg';
import europeanUnion from '@assets/deckImages/europeanUnion.jpg';

type DeckImages = {
  [key: string]: StaticImageData;
};

export const DECK_IMAGES: DeckImages = {
  africa,
  europe,
  asia,
  islands,
  southAmerica,
  world,
  caribbean,
  oceania,
  northernAndCentralAmerica,
  easiest,
  medium,
  hardest,
  europeanUnion,
};
