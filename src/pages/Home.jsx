import React from 'react';
import TImages from '../utils/images';

const Home = () => {
  return (
    <div className="home-container font-athiti text-3xl">
      <img 
        src={TImages.BACKGROUNDS.HERO_PATTERN} 
        alt="Hero Background"
        className="w-full h-auto relative -top-10"
      />
      <h1>Welcome to Himalkom</h1>
      <p>This is the home page of the Himalkom website.</p>
      {/* Add more content here as needed */}
    </div>
  );
};

export default Home;