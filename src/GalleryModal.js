import React from 'react';
import './GalleryModal.css'; // You'll need to create this CSS file

function GalleryModal({ isOpen, images, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="gallery-images">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Gallery image ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;
