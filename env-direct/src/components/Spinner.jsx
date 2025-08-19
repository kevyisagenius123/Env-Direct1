import React from 'react';

const Spinner = ({ size = 'medium', color = 'envGreen-600' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-${color} rounded-full animate-spin`}
      />
    </div>
  );
};

export default Spinner;
