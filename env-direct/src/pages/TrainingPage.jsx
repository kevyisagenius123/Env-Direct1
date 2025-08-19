import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const API_URL = import.meta.env.VITE_API_URL;

const TrainingPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Our standard training offerings
  const standardTrainings = [
    {
      id: 'gis-intro',
      title: 'Intro to GIS & QGIS for Beginners',
      description: 'Learn the fundamentals of Geographic Information Systems using QGIS, perfect for environmental professionals and students.',
      duration: '2-3 days',
      format: 'In-person or Virtual',
      level: 'Beginner',
      category: 'GIS & Technology'
    },
    {
      id: 'eia-caribbean',
      title: 'Conducting Environmental Impact Assessments in the Caribbean',
      description: 'Master the EIA process specific to Caribbean regulatory frameworks and environmental conditions.',
      duration: '5 days',
      format: 'Workshop-based',
      level: 'Professional',
      category: 'Environmental Assessment'
    },
    {
      id: 'proposal-writing',
      title: 'Proposal Writing for Development Projects',
      description: 'Learn to write compelling project proposals for environmental and development initiatives.',
      duration: '3 days',
      format: 'Interactive Workshop',
      level: 'Professional',
      category: 'Professional Development'
    },
    {
      id: 'climate-gis',
      title: 'Using GIS for Climate Adaptation & Disaster Preparedness',
      description: 'Apply GIS technologies to climate change adaptation and disaster risk management in SIDS.',
      duration: '4 days',
      format: 'Hands-on Training',
      level: 'Intermediate',
      category: 'Climate & GIS'
    },
    {
      id: 'community-mapping',
      title: 'Community-Based Mapping with KoboToolbox & OpenStreetMap',
      description: 'Empower communities with participatory mapping using mobile data collection and open-source tools.',
      duration: '2 days',
      format: 'Field-based',
      level: 'Beginner to Intermediate',
      category: 'Community Mapping'
    },
    {
      id: 'nature-based-solutions',
      title: 'Nature-Based Solutions & Ecosystem-Based Adaptation',
      description: 'Design and implement nature-based solutions for climate resilience and sustainable development.',
      duration: '3 days',
      format: 'Hybrid (theory + field)',
      level: 'Professional',
      category: 'Climate Adaptation'
    }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/training-courses`);
        if (!response.ok) {
          throw new Error('Failed to fetch training courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (e) {
        setError(e.message);
        console.log('Backend not available, showing standard training offerings');
        setCourses(standardTrainings);
      }
      setIsLoading(false);
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  const displayCourses = courses.length > 0 ? courses : standardTrainings;

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Our Training & Education Services
        </h1>
        <div className="max-w-4xl">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Environment Direct is committed to building the next generation of environmental 
            and geospatial professionals across the Caribbean. We deliver flexible, hands-on 
            training programs designed for individuals, government agencies, schools, and NGOs.
          </p>
          
          {/* Training Formats */}
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">
              Training Formats Available:
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Virtual Self-Paced Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Live Webinars</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Mentorship Programs</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">On-Site Workshops</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              <strong>Custom training packages available upon request.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Available Trainings */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Available Trainings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCourses.map((course, index) => (
            <div key={course.id || index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-3 py-1 rounded-full font-medium">
                  {course.category || 'Training'}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-3">
                {course.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {course.description}
              </p>
              
              {/* Training Details */}
              <div className="space-y-2 mb-4 text-sm">
                {course.duration && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Duration:</span>
                    <span className="text-gray-600 dark:text-gray-400">{course.duration}</span>
                  </div>
                )}
                {course.format && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Format:</span>
                    <span className="text-gray-600 dark:text-gray-400">{course.format}</span>
                  </div>
                )}
                {course.level && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Level:</span>
                    <span className="text-gray-600 dark:text-gray-400">{course.level}</span>
                  </div>
                )}
              </div>
              
              <Link 
                to={`/training/${course.id}`} 
                className="inline-flex items-center text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 font-medium transition-colors"
              >
                Learn More & Enroll →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Contact for Custom Training */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">
          Need Custom Training?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We offer customized training programs tailored to your organization's specific needs, 
          whether you're a government agency, NGO, educational institution, or private company.
        </p>
        <Link 
          to="/contact" 
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Request Custom Training
        </Link>
      </div>
    </div>
  );
};

export default TrainingPage; 