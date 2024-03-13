import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import Modal from 'react-bootstrap/Modal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import the CSS for lazy-load effect

const Doors = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesRef = ref(storage, 'doors/');
                const result = await listAll(imagesRef);
                const urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));
                const urls = await Promise.all(urlPromises);
                setImageUrls(urls);
            } catch (error) {
                console.error("Error fetching images from doors folder: ", error);
            }
        };
    
        fetchImages();
    }, []);

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
            <div className="container mt-4">
                <div className="row">
                    {imageUrls.map((url, index) => (
                        <div key={index} className="col-4 col-sm-4 col-md-4 col-lg-2 mb-4">
                            <div onClick={() => handleImageClick(index)}>
                                <LazyLoadImage
                                    src={url}
                                    alt={`Image ${index}`}
                                    effect="blur"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bootstrap Modal for enlarged image */}
            <Modal show={showModal} onHide={handleCloseModal} centered {...handlers}>
                <Modal.Header closeButton></Modal.Header>
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

export default Doors;
