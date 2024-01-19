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
                setImageUrls(urls);
            } catch (error) {
                console.error("Error fetching images: ", error);
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
                        // Update the class here to use col-4 for mobile and keep col-lg-2 for large screens
                        <div key={index} className="col-4 col-sm-4 col-md-4 col-lg-2 mb-4">
                            <div className="polaroid" onClick={() => handleImageClick(index)}>
                                <img src={url} alt={`Image ${index}`} className="img-fluid" />
                                {/* <div className="caption">Image {index + 1}</div> */}
                            </div>
                        </div>
                    ))}
                </div>
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

export default ImageGallery;
                   
