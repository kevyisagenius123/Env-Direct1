import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const API_URL = import.meta.env.VITE_API_URL;

const TrainingCourseDetailPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/training-courses/${courseId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch course details');
                }
                const data = await response.json();
                setCourse(data);
            } catch (e) {
                setError(e.message);
            }
            setIsLoading(false);
        };

        fetchCourseDetails();
    }, [courseId]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
    }

    if (!course) {
        return <div className="text-center mt-20">Course not found.</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{course.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
        </div>
    );
};

export default TrainingCourseDetailPage; 