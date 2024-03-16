import React from 'react';
import FlipCard from './FlipCard'; // Import the FlipCard component
import bike from './assets/bikeback.jpg'; 

const AboutComponent = () => {
  return (
    <div className="about-container" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div className="background-section" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <img src={bike} alt="bike" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FlipCard />
      </div>
    </div>
  );
};

export default AboutComponent;
