import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ImageGallery from './ImageGallery';
import Doors from './Doors';
import Film from './Film';
import FlipCard from './FlipCard';

const RouteTransition = () => {
  const location = useLocation();
  const [currentKey, setCurrentKey] = useState(location.pathname);

  useEffect(() => {
    setCurrentKey(location.pathname);
  }, [location]);

  return (
    <TransitionGroup>
      <CSSTransition key={currentKey} classNames="fade" timeout={250}>
        <Routes location={location}>
          <Route path="/" element={<ImageGallery />} />
          <Route path="/doors" element={<Doors />} />
          <Route path="/digital" element={<ImageGallery />} />
          <Route path="/film" element={<Film />} />
          <Route path="/aboutme" element={<FlipCard />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default RouteTransition;
