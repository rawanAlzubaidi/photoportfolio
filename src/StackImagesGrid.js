import React from 'react';

const StackImagesGrid = ({ stackImages }) => {
    if (!Array.isArray(stackImages) || stackImages.length === 0) {
        return <div>No images to display</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {stackImages.slice(1).map((image, index) => ( // Start from second image
                    <div key={index} className="col-4 col-sm-4 col-md-4 col-lg-2 mb-4">
                        <img src={image.url} alt={`Stack Image ${index + 1}`} className="img-fluid" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StackImagesGrid;
