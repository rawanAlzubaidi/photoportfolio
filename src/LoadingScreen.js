// LoadingScreen.js

import doorImage from './door.png'; // Make sure to use the correct path
import React, { useEffect } from 'react';
import gsap from 'gsap';
import BounceLoader from 'react-spinners/BounceLoader';



const LoadingScreen = () => {
    return (
      <div className="loading-screen">
      <BounceLoader
        color="#36d7b7"
        size={200}
        />
      </div>
    );
  };
  
  export default LoadingScreen;