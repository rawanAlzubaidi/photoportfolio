import React from 'react';
import filmGif from './film.gif';
import cameraGif from './camera.gif'; 
import doorGif from './door.gif'; 

const LoadingScreen = ({ type }) => {
  let gif;
  switch (type) {
    case 'film':
      gif = filmGif;
      break;
    case 'digital': 
      gif = cameraGif;
      break;
    case 'door': 
      gif = doorGif;
      
      break;
  }
  return (
    <div className="loading-screen">
      <img src={gif} alt="Loading..."  style={type === 'door' ? { width: '400px', height: 'auto' } : {}} />

    </div>
  );
};

export default LoadingScreen;
