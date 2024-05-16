import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import Modal from 'react-bootstrap/Modal';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmFolders from './film/rollslide.js';

const Film = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [combinedImages, setCombinedImages] = useState([]);
    const [showGalleryBelow, setShowGalleryBelow] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

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

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const [isViewerOpen, setIsViewerOpen] = useState(false);
      
      const handleStackClick = (index) => {
        if (showGalleryBelow === index) {
          // If the same index is clicked, hide the gallery
          setShowGalleryBelow(null);
        } else {
          // If a different index is clicked, show the new gallery
          setShowGalleryBelow(index);
        }
      };

  const swipeHandlers = useSwipeable({
      preventDefaultTouchmoveEvent: true,
      trackMouse: true,
  });

      
      
      const handleCloseViewer = () => {
        setIsViewerOpen(false);
      };
      const GalleryView = ({ images, onClose }) => {
        return (
            <>
            <div className="film-container">
                <div className="row">
                    {imageUrls.map((url, index) => (
                        <div key={index} className="col-4 col-sm-4 col-md-4 col-lg-2">
                            <div className="film" onClick={() => handleImageClick(index)}>
                                <img src={url} alt={`Image ${index}`} className="img-fluid" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered {...swipeHandlers}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    {imageUrls.length > 0 && (
                        <img
                            src={imageUrls[currentImageIndex]}
                            alt={`Image ${currentImageIndex}`}
                            className="img-fluid"
                        />)
                    }
                </Modal.Body>
            </Modal>
            </>
            );
            };

      
    return (
        <>
        <FilmFolders />
          <div className="gallery-grid2">
            {combinedImages.map((imageData, index) => {
              const x = getRandomInt(-10, 10); // Random X offset
              const y = getRandomInt(-10, 10); // Random Y offset
              const rot = getRandomInt(-15, 15); // Random rotation
              return (
                <div 
                  key={index} 
                  className="stack"
                  style={{ 
                    transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
                    zIndex: combinedImages.length - index 
                  }}
                  onClick={() => handleStackClick(index)}
                >
                  <img src={imageData.url} alt={`Image ${index}`} />
                </div>
              );
            })}
            
          </div>
          {showGalleryBelow !== null && (
              <GalleryView images={imageUrls} onClose={() => setShowGalleryBelow(null)} />
            )}
        </>
      );
            };

export default Film;
                   