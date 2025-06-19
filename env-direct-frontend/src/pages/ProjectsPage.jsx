import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const API_URL = import.meta.env.VITE_API_URL;

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (e) {
        setError(e.message);
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Our Flagship Projects</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Discover some of our impactful environmental projects that have made a difference in communities and ecosystems.
      </p>
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden md:flex hover:shadow-xl transition-shadow">
            <img src={project.imageUrl} alt={project.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-md md:rounded-l-lg md:rounded-r-none"/>
            <div className="md:pl-6 pt-4 md:pt-0">
              <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-2">{project.title}</h2>
              <div className="mb-3">
                {project.tags.map(tag => (
                  <span key={tag} className="inline-block bg-green-100 text-green-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{tag}</span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
              <Link to={`/projects/${project.id}`} className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 font-medium">
                View Project Details &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage; 