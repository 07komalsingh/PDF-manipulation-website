import React, { useState } from "react";
import Draggable from "react-draggable";

const ImagePopup = ({ onClose, onApplyImage }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isPositionSet, setIsPositionSet] = useState(false);

  // A4 dimensions in pixels (for preview area)
  const containerWidth = 600; // Container width
  const containerHeight = 433.95; // Container height
  const imageSize = 50; // Image size in pixels

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(URL.createObjectURL(file));
    setIsPositionSet(false); // Reset position when a new image is uploaded
  };

  const handleDragStop = (e, data) => {
    // Constrain the image within the container boundaries
    const constrainedX = Math.max(0, Math.min(data.x, containerWidth - imageSize));
    const constrainedY = Math.max(0, Math.min(data.y, containerHeight - imageSize));
    const x = (constrainedX / containerWidth) * 100;
    const y = (constrainedY / containerHeight) * 100;
    setImagePosition({ x, y });
    setIsPositionSet(true); // Position has been set by dragging
  };

  const handleApplyImage = () => {
    if (isPositionSet && imageFile) {
      const positionInPoints = {
        x: (imagePosition.x / 100) * 591, // Convert X to points
        y: (imagePosition.y / 100) * 849, // Convert Y to points
      };

      onApplyImage(imageFile, positionInPoints);
      onClose();
    }
  };

  const handleSetPosition = (corner) => {
    let x, y;

    switch (corner) {
      case 'top-left':
        x = 0;
        y = 0;
        break;
      case 'top-right':
        x = 100 - (imageSize / containerWidth) * 100;
        y = 0;
        break;
      case 'bottom-left':
        x = 0;
        y = 100 - (imageSize / containerHeight) * 100;
        break;
      case 'bottom-right':
        x = 100 - (imageSize / containerWidth) * 100;
        y = 100 - (imageSize / containerHeight) * 100;
        break;
      default:
        x = 0;
        y = 0;
        break;
    }

    setImagePosition({ x, y });
    setIsPositionSet(true); // Position has been set
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div 
        className="bg-white p-4 rounded-lg shadow-lg relative" 
        style={{ width: containerWidth, height: containerHeight }}
      >
        <button
          className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Upload and Position Image</h2>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block mx-auto mb-4"
        />

        {/* Image Container */}
        {imageFile && (
          <div
            className="relative z-30"
            style={{
              width: containerWidth,
              height: containerHeight,
              backgroundColor: '#f9f9f9',
              border: '1px solid #ddd',
              overflow: 'hidden', // Ensures that any overflow is hidden
            }}
          >
            <Draggable
              onStop={handleDragStop}
              position={{
                x: (imagePosition.x / 100) * (containerWidth - imageSize),
                y: (imagePosition.y / 100) * (containerHeight - imageSize),
              }}
              bounds="parent"
            >
              <img
                src={imageFile}
                alt="Selected"
                className="absolute"
                style={{
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                }}
              />
            </Draggable>
          </div>
        )}

        {/* Quadrant Buttons */}
        <div className="flex justify-around mt-4 z-40">
          <button
            onClick={() => handleSetPosition('top-left')}
            className="bg-[#44B7BC] text-white px-4 py-2 rounded"
          >
            Top Left
          </button>
          <button
            onClick={() => handleSetPosition('top-right')}
            className="bg-[#44B7BC] text-white px-4 py-2 rounded"
          >
            Top Right
          </button>
          <button
            onClick={() => handleSetPosition('bottom-left')}
            className="bg-[#44B7BC] text-white px-4 py-2 rounded"
          >
            Bottom Left
          </button>
          <button
            onClick={() => handleSetPosition('bottom-right')}
            className="bg-[#44B7BC] text-white px-4 py-2 rounded"
          >
            Bottom Right
          </button>
        </div>

        <button
          onClick={handleApplyImage}
          className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-4 rounded-full mt-4"
        >
          Apply Image
        </button>
      </div>
    </div>  
  );
};

export default ImagePopup;

