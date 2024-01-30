import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreenFilm';

const withLoading = (Component, loadingType = 'film') => {
  return (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);

    if (loading) {
      return <LoadingScreen type={loadingType} />;
    }

    return <Component {...props} />;
  };
};

export default withLoading;
