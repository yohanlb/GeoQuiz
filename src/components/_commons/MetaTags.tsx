import React from 'react';

const MetaTags: React.FC = () => {
  return (
    <>
      <meta
        property='og:title'
        content='GeoQuiz - The Ultimate Geography Quiz'
      />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://geoquiz.co' />
      <meta
        property='og:image'
        content='https://geoquiz.co/images/og-image.webp'
      />
      <meta
        property='og:description'
        content='Test your geographic knowledge with GeoQuiz. Discover capitals, flags, and much more!'
      />
      <meta property='og:site_name' content='GeoQuiz' />
      <meta property='og:locale' content='en_US' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@GeoQuiz' />
      <meta
        name='twitter:title'
        content='GeoQuiz - The Ultimate Geography Quiz'
      />
      <meta
        name='twitter:description'
        content='Test your geographic knowledge with GeoQuiz. Discover capitals, flags, and much more!'
      />
      <meta
        name='twitter:image'
        content='https://geoquiz.co/images/og-image.webp'
      />
    </>
  );
};

export default MetaTags;
