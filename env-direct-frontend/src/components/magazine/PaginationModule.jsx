import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const PaginationModule = ({ 
  currentPage, 
  totalPages, 
  totalElements, 
  onPageChange, 
  articlesPerPage 
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(0, currentPage - 2);
      const end = Math.min(totalPages - 1, start + maxVisible - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (start > 0) {
        pages.unshift('...');
        pages.unshift(0);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
        pages.push(totalPages - 1);
      }
    }
    
    return pages;
  };

  const startItem = currentPage * articlesPerPage + 1;
  const endItem = Math.min((currentPage + 1) * articlesPerPage, totalElements);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-lavaGrey-800/50 backdrop-blur-sm border border-envGreen-800/30 rounded-2xl p-6"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Results Info */}
        <div className="text-skyAsh-300 text-sm">
          Showing <span className="font-semibold text-white">{startItem}</span> to{' '}
          <span className="font-semibold text-white">{endItem}</span> of{' '}
          <span className="font-semibold text-white">{totalElements.toLocaleString()}</span> articles
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
              currentPage === 0
                ? 'bg-lavaGrey-700 border-lavaGrey-600 text-skyAsh-500 cursor-not-allowed'
                : 'bg-lavaGrey-700 border-envGreen-800/30 text-white hover:border-envGreen-500 hover:bg-envGreen-600'
            }`}
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-skyAsh-400">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      page === currentPage
                        ? 'bg-envGreen-600 text-white font-semibold'
                        : 'text-skyAsh-300 hover:text-white hover:bg-lavaGrey-700'
                    }`}
                  >
                    {page + 1}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
              currentPage >= totalPages - 1
                ? 'bg-lavaGrey-700 border-lavaGrey-600 text-skyAsh-500 cursor-not-allowed'
                : 'bg-lavaGrey-700 border-envGreen-800/30 text-white hover:border-envGreen-500 hover:bg-envGreen-600'
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaginationModule; 