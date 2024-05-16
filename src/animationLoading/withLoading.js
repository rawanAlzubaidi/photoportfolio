import React, { useState, useEffect } from 'react';
import LoadingScreen from '../animationLoading/LoadingScreenFilm';

const withLoading = (Component, loadingType = 'film') => {
  return (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }, []);

    if (loading) {
      return <LoadingScreen type={loadingType} />;
    }

    return <Component {...props} />;
  };
};

export default withLoading;