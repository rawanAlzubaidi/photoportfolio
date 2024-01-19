import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const AnimatedRoutes = ({ location, children }) => {
  const [currentKey, setCurrentKey] = useState(location.pathname);

  useEffect(() => {
    setCurrentKey(location.pathname);
  }, [location]);

  return (
    <TransitionGroup>
      <CSSTransition key={currentKey} classNames="fade" timeout={250}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(AnimatedRoutes);
