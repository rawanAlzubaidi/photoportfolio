import React, { useState } from 'react';
// import './FlipCard.css'; // Ensure your CSS file is linked
import rawanImage from './rawan.png'; // Importing the image

const FlipCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flip-card text-center">
            <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                <div className="flip-card-front">
                    <img src={rawanImage} alt="Rawan" />
                    <button onClick={handleClick} className="about-me-button">About Me</button>
                </div>
                <div className="flip-card-back">
                    <p>My love for photography came from my sister, Haya. ... </p>
                    {/* Rest of your content */}
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
