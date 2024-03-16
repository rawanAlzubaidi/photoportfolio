import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import Modal from 'react-bootstrap/Modal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageGallery = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesRef = ref(storage, '/');
                const result = await listAll(imagesRef);
                const urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));
                const urls = await Promise.all(urlPromises);
                setImageUrls(urls.reverse()); // Reverse the order of URLs
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };

        fetchImages();
    }, []);

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1
        );
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex < imageUrls.length - 1 ? prevIndex + 1 : 0
        );
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => goToNextImage(),
        onSwipedRight: () => goToPreviousImage(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
        trackTouch: true
    });

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    {imageUrls.map((url, index) => (
                        <div key={index} className="col-4 col-sm-4 col-md-4 col-lg-2 mb-4">
                            <div className="polaroid" onClick={() => handleImageClick(index)}>
                                <img src={url} alt={`Image ${index}`} className="img-fluid" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Bootstrap Modal for enlarged image */}
            <Modal show={showModal} onHide={handleCloseModal} centered {...swipeHandlers}>
                <Modal.Header closeButton />
                <Modal.Body>
                    {imageUrls.length > 0 && (
                        <img
                            src={imageUrls[currentImageIndex]}
                            alt={`Image ${currentImageIndex}`}
                            className="img-fluid"
                        />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ImageGallery;
