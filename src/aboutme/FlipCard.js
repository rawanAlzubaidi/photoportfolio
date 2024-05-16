import React, { useState } from 'react';
import rawanImage from '../assets//rawan.JPG'; 

const FlipCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flip-card-container text-center"> 
            <button onClick={handleClick} className="about-me-button">About Me</button>
            <div className="flip-card">
                <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                    <div className="flip-card-front">
                        <img src={rawanImage} alt="Rawan" />
                    </div>
                    <div className="flip-card-back">
                    <p>My love for photography came from my sister, Haya. The camera is hers, and I somewhat 'borrowed' it permanently.
                         She purchased it back in 2013—a year that might seem recent, but it was actually 11 years ago.
                          It has captured special moments in my life: weddings, my own and my friends' graduations, birthdays, impromptu fashion shows with my friends in middle school, and many vacations, with Spain being the last. 
                          I thought I could start sharing some that I have captured, starting with last year. 
                          I was gifted a film camera for my graduation, so I am excited to start exploring with different cameras and share them on here. </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
