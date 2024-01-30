import React from 'react';
import FlipCard from './FlipCard'; // Import the FlipCard component

const AboutComponent = () => {
  return (
    <div className="about-container">
      <div className="background-section">
        {/* Background image will be set via CSS */}
      </div>

        <FlipCard /> 

    </div>
  );
};

export default AboutComponent;
