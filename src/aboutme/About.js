import React from 'react';
import FlipCard from './FlipCard'; // Import the FlipCard component
import bike from '../assets/bikeback.jpg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const AboutComponent = () => {
  return (
    <div className="about-container" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div className="background-section" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <img src={bike} alt="bike" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <FlipCard />
        <div className="social-icons">
        <div className="icon-circle">
        <a href="https://www.rawankitabat.com/blog/9215007647074536537" className="icon-circle" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faPenToSquare} size="2x" /></a>
          </div>
          {/* <div className="icon-circle">
          <a href="https://www.rawanalzubaidi.com/" className="icon-circle" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLaptopCode} size="2x" /></a>
          </div> */}
          <div className="icon-circle">
          <a href="https://www.youtube.com/playlist?list=PLZswni9Vqi6kkxGei9INCFCebzIgxdrFB" className="icon-circle" target="_blank" rel="noopener noreferrer">
          
          <FontAwesomeIcon icon={faVideo} size="2x" style={{ margin: '10px' }} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
