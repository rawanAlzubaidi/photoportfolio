import React, { useEffect, useState } from 'react';
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebaseConfig.js';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSwipeable } from 'react-swipeable';
import Modal from 'react-bootstrap/Modal';


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const FilmFolders = () => {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const [combinedImages, setCombinedImages] = useState([]);
  const [showGalleryBelow, setShowGalleryBelow] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const filmRef = ref(storage, 'film/');
    listAll(filmRef)
      .then((res) => {
        const folderNames = res.prefixes.map(prefix => prefix.name);
        setFolders(folderNames);

        // Fetch images for each folder
        folderNames.forEach(async (folderName) => {
          const folderRef = ref(storage, `film/${folderName}/`);
          const imageListSnapshot = await listAll(folderRef);
          const imageUrls = await Promise.all(imageListSnapshot.items.map((item) => getDownloadURL(item)));

          // Set images in state
          setImages(prevImages => ({
            ...prevImages,
            [folderName]: imageUrls
          }));
        });
      })
      .catch((error) => {
        console.error("Error fetching folders: ", error);
      });
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
  // Assuming `showGalleryBelow` holds the current folder's name from which the image is clicked
  if(showGalleryBelow && images[showGalleryBelow]) {
    const selectedFolderImages = images[showGalleryBelow];
    setImageUrls(selectedFolderImages); // Make sure imageUrls is updated to current folder images
    setCurrentImageIndex(index);
    setShowModal(true);
  }
};


const handleCloseModal = () => setShowModal(false);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const [isViewerOpen, setIsViewerOpen] = useState(false);

const handleStackClick = (folderName) => {
  if (showGalleryBelow === folderName) {
    setShowGalleryBelow(null); // Hide gallery if the same folder is clicked again
  } else {
    setShowGalleryBelow(folderName); // Show new gallery
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
  // 'images' are the URLs of images in the currently selected folder
  return (
      <>
      <div className="film-container">
          <div className="row">
              {images.map((url, index) => (
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
    <div className="container mt-4">
      <div className="row">
        {Object.entries(images).map(([folderName, urls]) => (
          <div key={folderName} className="col">
            {/* <h3>{folderName}</h3> */}
            <div className="gallery-grid2">
            {urls.map((url, index) => {
                const x = getRandomInt(-10, 10); 
                const y = getRandomInt(-10, 10); 
                const rot = getRandomInt(-15, 15); 
                return (
                  <div 
                    key={index} 
                    className="stack"
                    style={{ 
                      transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
                      zIndex: urls.length - index 
                    }}
                    onClick={() => handleStackClick(folderName)}
                  >
                    <img src={url} alt={`Image from ${folderName} ${index}`} className="img-fluid" />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {showGalleryBelow !== null && (
    <GalleryView images={images[showGalleryBelow]} onClose={() => setShowGalleryBelow(null)} />
)}

    </div>
  );
};

export default FilmFolders;