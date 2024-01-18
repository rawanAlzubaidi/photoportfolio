// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './Navbar';
import ImageGallery from './ImageGallery';
import Doors from './Doors'; 
import Film from './Film'; 


const App = () => {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<ImageGallery />} /> {/* Root path shows ImageGallery */}
        <Route path="/doors" element={<Doors />} />
        <Route path="/Digital" element={<ImageGallery />} /> {/* Root path shows ImageGallery */}
        <Route path="/Film" element={<Film />} /> {/* Root path shows ImageGallery */}
      </Routes>
    </Router>
  );
};

export default App;
