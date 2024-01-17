// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageGallery from './ImageGallery'; // Adjust the path based on where your ImageGallery component is located
import MyNavbar from './Navbar';

const App = () => (
  <div classname="app">
      <MyNavbar />
      <ImageGallery />
  </div>
);

export default App;
