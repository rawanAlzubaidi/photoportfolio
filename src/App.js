// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './Navbar';
import ImageGallery from './ImageGallery'; // Your ImageGallery component
import Doors from './Doors'; // Your Doors component

const App = () => {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<ImageGallery />} /> {/* Root path shows ImageGallery */}
        <Route path="/doors" element={<Doors />} />
        <Route path="/pictures" element={<ImageGallery />} /> {/* Root path shows ImageGallery */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
