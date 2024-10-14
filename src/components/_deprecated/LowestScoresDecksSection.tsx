// 'use client';

// import React from 'react';
// import { useDeckHistory } from '@/src/stores/deckHistoryStore';
// import { isBreakpoint } from '@utils/screen';
// import SectionTitle from '@components/_commons/SectionTitle';
// import DeckGrid from './DeckGrid';

// type Props = {
//   decks: DeckRecord[];
// };

// const LowestScoresDecksSection = ({ decks }: Props) => {
//   const howManyToDisplay = isBreakpoint('md') ? 3 : 4;

//   if (lowestScoreDecks.length === 0) {
//     return null;
//   }
//   return (
//     <section>
//       <SectionTitle text='We need to practice those! 📖' />
//       <SectionTitle
//         text='Review decks where your scores were low to improve your performance.'
//         variant='description'
//       />
//       <DeckGrid decks={lowestScoreDecks.slice(0, howManyToDisplay)} />
//     </section>
//   );
// };

// export default LowestScoresDecksSection;
