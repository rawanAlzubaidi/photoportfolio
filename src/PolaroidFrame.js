// PolaroidFrame.js
import React from 'react';
import './PolaroidFrame.css'; // Importing the styling for the component

const PolaroidFrame = ({ imageUrl, caption }) => (
  <div className="polaroid">
    <img src={imageUrl} alt="Polaroid" />
    <div className="caption">{caption}</div>
  </div>
);

export default PolaroidFrame;
