// Film.js
import React, { useState, useEffect } from 'react';
import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import Stack from './Stack'; // Import the Stack component
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Film = () => {
    // ... all your useState hooks, useEffects, and functions
    const [imageUrls, setImageUrls] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [verticalImages, setVerticalImages] = useState([]);
    const [horizontalImages, setHorizontalImages] = useState([]);
    const [combinedImages, setCombinedImages] = useState([]);
    const [activeStack, setActiveStack] = useState(null); // New state to track active stack
    
    
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

    useEffect(() => {
        if (imageUrls.length > 0) {
            const tempVertical = [];
            const tempHorizontal = [];
            let loadedImages = 0; // Counter for loaded images
    
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
                        setVerticalImages(tempVertical);
                        setHorizontalImages(tempHorizontal);
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
    

    // ... your handleStackClick now needs to set the selected images for the active stack
    const handleStackClick = (index) => {
        if (activeStack === index) {
            setActiveStack(null); // Clicking the same stack will close it
        } else {
            setActiveStack(index); // Set the clicked stack as active to load and show images
        }
    }

    return (
        <>
            <div className="gallery-grid2">
                {combinedImages.map((imageData, index) => (
                    <Stack
                        key={index}
                        index={index}
                        imageData={imageData}
                        handleClick={handleStackClick}
                        isStackActive={activeStack === index}
                        stackImages={selectedStackImages}
                    />
                ))}
            </div>
            {/* Modal and other components if needed */}
        </>
    );
};

export default Film;
