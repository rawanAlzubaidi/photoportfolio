import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import Modal from 'react-bootstrap/Modal';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Film = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [verticalImages, setVerticalImages] = useState([]);
    const [horizontalImages, setHorizontalImages] = useState([]);

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
        // This effect runs when imageUrls are set
        if (imageUrls.length > 0) {
            const tempVertical = [];
            const tempHorizontal = [];
            let loadedImages = 0; // Counter for loaded images

            imageUrls.forEach(url => {
                const img = new Image();
                img.onload = () => {
                    loadedImages++;
                    if (img.naturalHeight > img.naturalWidth * 1.1) {
                        tempVertical.push(url);
                    } else {
                        tempHorizontal.push(url);
                    }
                    if (loadedImages === imageUrls.length) {
                        setVerticalImages(tempVertical);
                        setHorizontalImages(tempHorizontal);
                    }
                };
                img.onerror = () => {
                    loadedImages++; // Increment counter even if image fails to load
                    // You might decide to handle the error differently here
                };
                img.src = url;
            });
        }
    }, [imageUrls]); // Depends on imageUrls

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
        );
    };

    const previousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
        );
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => nextImage(),
        onSwipedRight: () => previousImage(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <>
   <div className="gallery-grid2">
                {/* Render sorted images */}
                {verticalImages.map((url, index) => (
                    <div key={`vertical-${index}`} className="film-vertical" onClick={() => handleImageClick(index)}>
                        <img src={url} alt={`Vertical Image ${index}`} />
                    </div>
                ))}
                {horizontalImages.map((url, index) => (
                    <div key={`horizontal-${index}`} className="film-horizontal" onClick={() => handleImageClick(index)}>
                        <img src={url} alt={`Horizontal Image ${index}`} />
                    </div>
                ))}
            </div>

            {/* Bootstrap Modal for enlarged image */}
            <Modal show={showModal} onHide={handleCloseModal} centered {...handlers}>
                <Modal.Header closeButton>
                {/* <Modal.Title>Enlarged Image</Modal.Title> */}
                </Modal.Header>
            <Modal.Body>
            {imageUrls.length > 0 && (
            <img
            src={imageUrls[currentImageIndex]}
            alt={`Image ${currentImageIndex}`}
            className="img-fluid"
        /> )}
            </Modal.Body>
            </Modal>
            </>
            );
            };

export default Film;
                   
