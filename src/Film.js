import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import Modal from 'react-bootstrap/Modal';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import GalleryModal from './GalleryModal'; // You'll need to create this component
import './Film.css'; // Make sure to create this CSS file if it doesn't exist

const Film = () => {
    // State variables
    const [imageUrls, setImageUrls] = useState([]); // Stores URLs of all images
    const [combinedImages, setCombinedImages] = useState([]); // Stores processed image data
    const [activeGallery, setActiveGallery] = useState(null); // 'popup', 'modal', etc.
    const [selectedImages, setSelectedImages] = useState([]); // Stores selected images for gallery
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Tracks current image in modal

    // Fetch images from Firebase storage
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesRef = ref(storage, 'film/roll1');
                const result = await listAll(imagesRef);
                const urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));
                const urls = await Promise.all(urlPromises);
                setImageUrls(urls);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };
        fetchImages();  
    }, []);

    // Process images to determine orientation and combine vertical and horizontal images
    useEffect(() => {
        if (imageUrls.length > 0) {
            const tempVertical = [];
            const tempHorizontal = [];
            let loadedImages = 0;

            imageUrls.forEach(url => {
                const img = new Image();
                img.onload = () => {
                    loadedImages++;
                    const orientation = img.naturalHeight > img.naturalWidth * 1.1 ? 'vertical' : 'horizontal';
                    const imageObject = { url, orientation, originalIndex: imageUrls.indexOf(url) };

                    if (orientation === 'vertical') {
                        tempVertical.push(imageObject);
                    } else {
                        tempHorizontal.push(imageObject);
                    }

                    if (loadedImages === imageUrls.length) {
                        // Combine vertical and horizontal images
                        setCombinedImages([...tempVertical, ...tempHorizontal]);
                    }
                };
                img.onerror = () => {
                    loadedImages++;
                };
                img.src = url;
            });
        }
    }, [imageUrls]);

    // Helper function to get random integer
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    // Handler for opening different gallery views
    const openGallery = (galleryType, images, index = 0) => {
        setSelectedImages(images);
        setCurrentImageIndex(index);
        setActiveGallery(galleryType);
    };

    // Handler for closing gallery views
    const closeGallery = () => {
        setActiveGallery(null);
    };

    // Main render function
    return (
        <>
            <div className="gallery-grid2">
                {combinedImages.map((imageData, index) => {
                    // Generate random offsets and rotation for each image
                    const x = getRandomInt(-10, 10);
                    const y = getRandomInt(-10, 10);
                    const rot = getRandomInt(-15, 15);
                    return (
                        <div 
                            key={index} 
                            className="stack"
                            style={{ 
                                transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
                                zIndex: combinedImages.length - index 
                            }}
                            onClick={() => openGallery('popup', [imageData.url])}
                        >
                            <img src={imageData.url} alt={`Image ${index}`} />
                        </div>
                    );
                })}
            </div>

            {/* Render gallery based on active state */}
            {activeGallery === 'popup' && (
                <GalleryView 
                    images={selectedImages} 
                    onClose={closeGallery} 
                />
            )}
            {activeGallery === 'modal' && (
                <GalleryModal 
                    isOpen={true}
                    images={selectedImages}
                    currentIndex={currentImageIndex}
                    onClose={closeGallery}
                />
            )}
        </>
    );
};

// Gallery view component
const GalleryView = ({ images, onClose }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="gallery-popup-overlay">
            <div className="gallery-popup-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="gallery-popup-images">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Gallery image ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Film;
