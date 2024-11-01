import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import Modal from 'react-bootstrap/Modal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
                setImageUrls(urls.reverse()); 
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
                            <div onClick={() => handleImageClick(index)}>
                                <LazyLoadImage
                                    src={url} // Use src to provide the image
                                    alt={`Image ${index}`}
                                    effect="blur" // Adds a blur effect while loading
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Bootstrap Modal for enlarged image */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton />
                <Modal.Body {...swipeHandlers}>
                    {imageUrls.length > 0 && (
                        <div className="position-relative">
                            <img
                                src={imageUrls[currentImageIndex]}
                                alt={`Image ${currentImageIndex}`}
                                className="img-fluid"
                            />
                            <button onClick={goToPreviousImage} className="btn btn-light position-absolute top-50 start-0 translate-middle-y">
                                &lt;
                            </button>
                            <button onClick={goToNextImage} className="btn btn-light position-absolute top-50 end-0 translate-middle-y">
                                &gt;
                            </button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ImageGallery;
