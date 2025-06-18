import React, { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Interactive Image Comparison Component
 * 
 * This component allows users to compare two images using a slider.
 * It's useful for showing before/after environmental changes.
 * 
 * @param {Object} props - Component props
 * @param {string} props.beforeImage - URL of the "before" image
 * @param {string} props.afterImage - URL of the "after" image
 * @param {string} props.beforeLabel - Label for the "before" image
 * @param {string} props.afterLabel - Label for the "after" image
 * @param {string} props.title - Title for the comparison
 * @param {string} props.description - Description of what's being compared
 */
const ImageComparison = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  title,
  description
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  // Memoize event handlers with useCallback to avoid unnecessary re-renders
  // and to properly handle dependencies in useEffect
  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const offsetX = e.clientX - containerRect.left;
      const newPosition = Math.max(0, Math.min(100, (offsetX / containerWidth) * 100));
      setSliderPosition(newPosition);
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (containerRef.current && e.touches[0]) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const offsetX = e.touches[0].clientX - containerRect.left;
      const newPosition = Math.max(0, Math.min(100, (offsetX / containerWidth) * 100));
      setSliderPosition(newPosition);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleTouchEnd = useCallback(() => {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchMove]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  const handleTouchStart = useCallback((e) => {
    // Prevent default to avoid page scrolling while dragging
    if (e && e.preventDefault) e.preventDefault();
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, [handleTouchMove, handleTouchEnd]);

  // Clean up event listeners on unmount
  useEffect(() => {
    // No need to define handlers here as they're already memoized with useCallback
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="image-comparison-container mb-6">
      {title && <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>}
      {description && <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>}

      <div 
        className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-md" 
        ref={containerRef}
      >
        {/* Before Image (Full width) */}
        <div className="absolute top-0 left-0 w-full h-full">
          <img 
            src={beforeImage} 
            alt={beforeLabel} 
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {beforeLabel}
          </span>
        </div>

        {/* After Image (Partial width based on slider) */}
        <div 
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={afterImage} 
            alt={afterLabel} 
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ width: `${100 / (sliderPosition / 100)}%` }}
          />
          <span className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {afterLabel}
          </span>
        </div>

        {/* Slider */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
        <div>{beforeLabel}</div>
        <div>Drag slider to compare</div>
        <div>{afterLabel}</div>
      </div>
    </div>
  );
};

export default ImageComparison;
