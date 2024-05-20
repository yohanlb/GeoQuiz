import africa from '@assets/deckImages/Africa.jpg';
import europe from '@assets/deckImages/Europe.jpg';
import asia from '@assets/deckImages/Asia.jpg';
import islands from '@assets/deckImages/Islands.jpg';
import southAmerica from '@assets/deckImages/SouthAmerica.jpg';
import worldwide from '@assets/deckImages/Worldwide.jpg';
import caribbean from '@assets/deckImages/Caribbean.jpg';
import oceania from '@assets/deckImages/Oceania.jpg';
import easiest from '@assets/deckImages/Easy.jpg';
import medium from '@assets/deckImages/Medium.jpg';
import hardest from '@assets/deckImages/Hardest.jpg';
import northernAndCentralAmerica from '@assets/deckImages/NorthAmerica.jpg';
import { StaticImageData } from 'next/image';

type DeckImages = {
  [key: string]: StaticImageData;
};

export const DECK_IMAGES: DeckImages = {
  africa,
  europe,
  asia,
  islands,
  southAmerica,
  worldwide,
  caribbean,
  oceania,
  northernAndCentralAmerica,
  easiest,
  medium,
  hardest,
};
