// withLoading.js
import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

const withLoading = (Component) => {
  return (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate a loading time or replace with actual data fetching logic
      const timer = setTimeout(() => setLoading(false), 1000); // Delay for loading simulation
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    if (loading) {
      return <LoadingScreen />;
    }

    return <Component {...props} />;
  };
};

export default withLoading;
