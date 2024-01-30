import React from 'react';
import filmGif from './film.gif';
import cameraGif from './camera.gif'; // Import other GIFs here

const LoadingScreen = ({ type }) => {
  let gif;
  switch (type) {
    case 'film':
      gif = filmGif;
      break;
    case 'digital': // You can add more cases for different types
      gif = cameraGif;
      break;
  }
  return (
    <div className="loading-screen">
      <img src={gif} alt="Loading..." />
    </div>
  );
};

export default LoadingScreen;
