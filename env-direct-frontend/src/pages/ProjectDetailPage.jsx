import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const API_URL = import.meta.env.VITE_API_URL;

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/projects/${projectId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch project details');
                }
                const data = await response.json();
                setProject(data);
            } catch (e) {
                setError(e.message);
            }
            setIsLoading(false);
        };

        fetchProjectDetails();
    }, [projectId]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
    }

    if (!project) {
        return <div className="text-center mt-20">Project not found.</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h1>
            <div className="mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="inline-block bg-green-100 text-green-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{tag}</span>
                ))}
            </div>
            <img src={project.imageUrl} alt={project.title} className="w-full h-96 object-cover rounded-lg mb-6"/>
            <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
        </div>
    );
};

export default ProjectDetailPage; 