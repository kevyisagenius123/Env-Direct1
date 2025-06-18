import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const API_URL = import.meta.env.VITE_API_URL;

const TrainingPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      }
      setIsLoading(false);
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Environmental Training Programs</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Empower yourself and your organization with our specialized environmental training courses. 
        From regulatory compliance to sustainable practices, we offer comprehensive programs tailored to your needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">{course.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{course.description}</p>
            <Link to={`/training/${course.id}`} className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 font-medium">
              Learn More &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPage; 