// App.js
import React from 'react';
import PolaroidFrame from './PolaroidFrame';
import './App.css';

// Manually list the filenames of your images
const imageFilenames = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
  "image7.jpg",
  // Add more filenames as needed
];

function App() {
  return (
    <div className="App">
      {imageFilenames.map((filename, index) => (
        <PolaroidFrame
          key={index}
          imageUrl={`${process.env.PUBLIC_URL}/images/${filename}`} // This path is relative to the public folder
          caption={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default App;
