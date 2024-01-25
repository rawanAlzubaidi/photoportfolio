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
    const [combinedImages, setCombinedImages] = useState([]);


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
    

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setShowModal(true);
    };
    
    
    const handleCloseModal = () => setShowModal(false);

    const handlers = useSwipeable({
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const [isViewerOpen, setIsViewerOpen] = useState(false);
      const [selectedStackImages, setSelectedStackImages] = useState([]);
      
      const handleStackClick = (images) => {
        console.log('Opening gallery with images:', images);
        setSelectedStackImages(images);
        setIsGalleryOpen(true); // This should trigger the gallery to open
      };
      
      
      const handleCloseViewer = () => {
        setIsViewerOpen(false);
      };
      const GalleryView = ({ images, onClose }) => {
        return (
          <div className="gallery-view">
            <button onClick={onClose}>Close Gallery</button>
            <div className="gallery-grid">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Gallery image ${index}`} />
              ))}
            </div>
          </div>
        );
      };
      const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const handleCloseGallery = () => {
    setIsGalleryOpen(false); // Close the gallery view
    };

      

    return (
        <>
            <div className="gallery-grid2">
                {combinedImages.map((imageData, index) => {
                    // Random position and rotation for each image
                    const x = getRandomInt(-10, 10); // Random X offset
                    const y = getRandomInt(-10, 10); // Random Y offset
                    const rot = getRandomInt(-15, 15); // Random rotation

                    return (
                        <div 
                            key={index} 
                            className="stack" 
                            onClick={() => {
                                console.log('Stack clicked, opening gallery.');
                                handleStackClick(combinedImages.map(image => image.url));
                            }}
                            style={{ 
                                transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
                                zIndex: combinedImages.length - index 
                            }}
                            >
                            <img src={imageData.url} alt={`Image ${index}`} />
                            </div>
                    );
                })}
                {isGalleryOpen && (
                <GalleryView images={imageUrls} onClose={handleCloseGallery} />
                )}
            </div>


            {/* Bootstrap Modal for enlarged image */}
            <Modal show={showModal} onHide={handleCloseModal} centered {...handlers}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {combinedImages.length > 0 && (
                        <img
                            src={combinedImages[currentImageIndex].url}
                            alt={`Image ${combinedImages[currentImageIndex].originalIndex}`}
                            className="img-fluid"
                        />
                    )}
                </Modal.Body>
            </Modal>
            </>
            );
            };

export default Film;
                   
