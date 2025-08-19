import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ProjectGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projectImages = [
    {
      src: '/img/Picture1.jpg',
      title: 'Environmental Field Research',
      description: 'Our team conducting biodiversity assessments in Dominica\'s rainforest',
      category: 'Field Work'
    },
    {
      src: '/img/Picture2.jpg',
      title: 'Community Stakeholder Meeting',
      description: 'Engaging local communities in environmental planning and decision-making',
      category: 'Community Engagement'
    },
    {
      src: '/img/Picture3.jpg',
      title: 'GIS Technology Implementation',
      description: 'Advanced mapping and spatial analysis for environmental monitoring',
      category: 'Technology'
    },
    {
      src: '/img/Picture4.jpg',
      title: 'Coastal Survey Work',
      description: 'Assessing coastal erosion and implementing protection measures',
      category: 'Coastal Management'
    },
    {
      src: '/img/Picture5.jpg',
      title: 'Environmental Training Session',
      description: 'Capacity building workshops for local environmental officers',
      category: 'Training'
    },
    {
      src: '/img/Picture6.jpg',
      title: 'Marine Conservation Project',
      description: 'Monitoring and protecting marine ecosystems around Dominica',
      category: 'Marine Protection'
    },
    {
      src: '/img/Picture7.jpg',
      title: 'Data Collection Initiative',
      description: 'Systematic environmental data gathering for research and policy',
      category: 'Research'
    },
    {
      src: '/img/Picture8.jpg',
      title: 'Climate Adaptation Planning',
      description: 'Developing resilience strategies for climate change impacts',
      category: 'Climate Action'
    }
  ];

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % projectImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(projectImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(projectImages[prevIndex]);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Projects in Action</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our environmental consulting work across the Caribbean region. From field research 
            to community engagement, see how we're making a difference for sustainable development.
          </p>
        </div>

        {/* Project Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-medium text-envGreen-300 mb-1">{image.category}</div>
                    <h3 className="font-semibold text-sm">{image.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>

                {/* Image */}
                <div className="relative">
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>

                {/* Image Info */}
                <div className="p-6 bg-white">
                  <div className="text-sm font-medium text-envGreen-600 mb-2">{selectedImage.category}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-600">{selectedImage.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    Image {currentIndex + 1} of {projectImages.length}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectGallery;
