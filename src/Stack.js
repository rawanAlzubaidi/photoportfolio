import React from 'react';
import StackImagesGrid from './StackImagesGrid'; // Import the StackImagesGrid component

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Stack = ({ index, imageData, handleClick, isStackActive, stackImages }) => {
    // Random transformations for the "scattered" look
    console.log("Is Stack Active:", isStackActive); // Add this line
    const x = getRandomInt(-10, 10); // Random X offset
    const y = getRandomInt(-10, 10); // Random Y offset
    const rot = getRandomInt(-15, 15); // Random rotation


    return (
        <div className="stack-container">
            <div className="stack" onClick={() => handleClick(index)}>
                <img src={imageData.url} alt={`Image ${index}`} /* ... other styles */ />
            </div>
            {isStackActive && <StackImagesGrid stackImages={stackImages} />}
        </div>
    );
};

export default Stack;