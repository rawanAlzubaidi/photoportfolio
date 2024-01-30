import React, { useState } from 'react';
// import './FlipCard.css'; // Ensure your CSS file is linked
import rawanImage from './rawan.JPG'; // Importing the image

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
                    <p>My love for photography came from my sister, Haya. The camera is hers, and I somewhat 'borrowed' it permanently when she got married. She purchased it back in 2013—a year that might seem recent, but it was actually 11 years ago. It has captured special moments in my life: weddings, my own and my friends' graduations, birthdays, impromptu fashion shows with my friends in middle school, and many vacations, with Spain being the last. I thought I could start sharing some of my favorite moments that I have captured, starting with last year. For my graduation, my friends gifted me a film camera, so I am excited to start exploring with different cameras and share them on here. </p>
                    {/* Rest of your content */}
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
