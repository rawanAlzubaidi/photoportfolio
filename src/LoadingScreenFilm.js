import React from 'react';
import filmGif from './assets/film.gif';
import cameraGif from './assets/camera.gif'; 
import doorGif from './assets/door.gif'; 

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
      <img src={gif} alt="Loading..."  style={type === 'door' ? {paddingTop:'250px', width: '300px', height: 'auto' } : {}} />

    </div>
  );
};

export default LoadingScreen;
