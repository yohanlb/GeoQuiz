import React from 'react';
import SectionTitle from '@components/_commons/SectionTitle';

const HowItWorksSection = () => {
  return (
    <section className=' space-y-4'>
      <SectionTitle text='How It Works' variant='h3' />
      <div className='space-y-2'>
        <h3 className='text-base font-normal'>1. Select a Deck</h3>
        <p className='text-gray-400 text-sm'>
          Choose a deck to start your quiz. Decks are collections of countries
          based on themes like continents or regions.
        </p>
      </div>

      <div className='space-y-2'>
        <h3 className='text-base font-normal'>2. Answer Questions</h3>
        <p className='text-gray-400 text-sm'>
          For each country, select the correct capital from four options. <br />
          <strong>Correct Answer:</strong> Move to the next question. <br />
          <strong>Incorrect Answer:</strong> Try again until you get it right.
        </p>
      </div>

      <div className='space-y-2'>
        <h3 className='text-base font-normal'>3. View Results</h3>
        <p className='text-gray-400 text-sm'>
          After completing the deck, check your summary, review your mistakes,
          and share your results to compete with your friends!
        </p>
      </div>

      <div className='space-y-2'>
        <h3 className='text-base font-normal'>4. Keep Playing</h3>
        <p className='text-gray-400 text-sm'>
          You can retry the same deck to improve your score or go back and
          select another deck!
        </p>
      </div>

      <p className='text-sm'>Enjoy your quiz! 🌍</p>
    </section>
  );
};

export default HowItWorksSection;
