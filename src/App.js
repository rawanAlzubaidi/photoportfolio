// App.js
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import withLoading from './withLoading';
import MyNavbar from './Navbar';
import ImageGallery from './ImageGallery';
import Doors from './Doors'; 
import Film from './Film'; 
import FlipCard from './FlipCard';
import AboutComponent from './About';
import './App.css'; 

// BackgroundController Component inside App.js
const BackgroundController = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    // Update the root CSS variables based on the current route
    const root = document.documentElement;
    if (location.pathname === '/Film') {
      root.style.setProperty('--background-color', '#000'); // Dark background for '/Film' route
      root.style.setProperty('--navbar-text-color', '#fff'); // Light text for navbar on '/Film' route

    } else {
      root.style.setProperty('--background-color', '#fff'); // Light background for other routes
      root.style.setProperty('--navbar-text-color', '#000'); // Dark text for navbar on other routes

    }
  }, [location]);

  return null;
};

// Wrap your components with the withLoading HOC outside of the Route definitions
const LoadedImageGallery = withLoading(ImageGallery,'digital');
const LoadedFilm = withLoading(Film,'film');

const App = () => {
  return (
    <Router>
      <MyNavbar />
      <BackgroundController />
      <Analytics />
      <Routes>
        <Route path="/" element={<LoadedImageGallery />} />
        <Route path="/doors" element={<Doors />} />
        <Route path="/Digital" element={<LoadedImageGallery />} />
        <Route path="/Film" element={<LoadedFilm />} />
        <Route path="/aboutme" element={<AboutComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
