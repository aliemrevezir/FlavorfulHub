import React from 'react';
import { Helmet } from 'react-helmet';

const Favicon: React.FC = () => {
  return (
    <Helmet>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#FF6F61" />
    </Helmet>
  );
};

export default Favicon; 