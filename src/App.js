// App.js
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import withLoading from './animationLoading/withLoading';
import Navbar from './Navbar.js';
import ImageGallery from './ImageGallery';
import Doors from './routes/Doors';
import Athkar from './routes/Athkar.js';
import FilmFolders from './film/rollslide.js';
import AboutComponent from './aboutme/About';
import './App.css'; 

const BackgroundController = () => {
  const location = useLocation();
  
  React.useEffect(() => {

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

// Wrapping components with the withLoading HOC outside of the Route definitions
const LoadedImageGallery = withLoading(ImageGallery,'digital');
const LoadedFilm = withLoading(FilmFolders,'film');
const LoadedDoor = withLoading(Doors,'door');

function App() {
  return (
    <Router>
      <Navbar />
      <BackgroundController />
      <Analytics />
      <Routes>
        <Route path="/" element={<LoadedImageGallery />} />
        <Route path="/doors" element={<LoadedDoor />} />
        <Route path="/Digital" element={<LoadedImageGallery />} />
        <Route path="/Film" element={<LoadedFilm />} />
        <Route path="/aboutme" element={<AboutComponent />} />
        <Route path="/athkar" element={<Athkar />} />
      </Routes>
    </Router>
  );
}

export default App;
