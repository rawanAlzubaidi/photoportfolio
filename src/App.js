// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import withLoading from './withLoading';
import MyNavbar from './Navbar';
import ImageGallery from './ImageGallery';
import Doors from './Doors'; 
import Film from './Film'; 
import FlipCard from './FlipCard';
import './App.css'; // Your CSS file for styles

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
const LoadedImageGallery = withLoading(ImageGallery);
const LoadedDoors = withLoading(Doors);
const LoadedFilm = withLoading(Film);
const LoadedFlipCard = withLoading(FlipCard);

const App = () => {
  return (
    <Router>
      <MyNavbar />
      <BackgroundController />
      <Routes>
        <Route path="/" element={<LoadedImageGallery />} />
        <Route path="/doors" element={<LoadedDoors />} />
        <Route path="/Digital" element={<LoadedImageGallery />} />
        <Route path="/Film" element={<LoadedFilm />} />
        <Route path="/aboutme" element={<LoadedFlipCard />} />
      </Routes>
    </Router>
  );
};

export default App;
