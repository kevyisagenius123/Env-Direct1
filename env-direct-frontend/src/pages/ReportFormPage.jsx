import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl } from '../utils/apiUtils';

const ReportFormPage = () => {
  const navigate = useNavigate(); // For redirecting after successful submission
  const [formData, setFormData] = useState({
    location: '',
    issueType: '',
    description: '',
    reportedBy: '',
    contactEmail: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prevData => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Create FormData object for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('location', formData.location);
    formDataToSend.append('issueType', formData.issueType);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('reportedBy', formData.reportedBy);
    formDataToSend.append('contactEmail', formData.contactEmail);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post(createApiUrl('/api/reports'), formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        // Clear form
        setFormData({
          location: '',
          issueType: '',
          description: '',
          reportedBy: '',
          contactEmail: '',
          image: null
        });
        
        // Redirect to reports list page after a delay
        setTimeout(() => {
          navigate('/reports');
        }, 2000);
      }
    } catch (err) {
      console.error("Error submitting report:", err);
      setError(err.response?.data?.message || err.message || 'Failed to submit report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Submit an Environmental Report
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Help us keep our environment clean and safe.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          {success && (
            <div className="mb-4 p-4 rounded-md bg-green-100 text-green-700">
              Report submitted successfully! Thank you.
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-100 text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location of Issue</label>
              <input id="location" type="text" name="location" value={formData.location} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="issueType" className="block text-sm font-medium text-gray-700">Type of Issue</label>
              <select id="issueType" name="issueType" value={formData.issueType} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                <option value="" disabled>Select an issue type</option>
                <option value="air_pollution">Air Pollution</option>
                <option value="water_pollution">Water Pollution</option>
                <option value="waste_dumping">Illegal Waste Dumping</option>
                <option value="deforestation">Deforestation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Detailed Description</label>
              <textarea id="description" rows="4" name="description" value={formData.description} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image (Optional)</label>
              <input id="image" type="file" name="image" accept="image/*" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/>
            </div>
            
            <hr className="my-6"/>

            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Your Information (Optional)</h3>

            <div>
              <label htmlFor="reportedBy" className="block text-sm font-medium text-gray-700">Your Name</label>
              <input id="reportedBy" type="text" name="reportedBy" value={formData.reportedBy} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>

             <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input id="contactEmail" type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition duration-150 ease-in-out">
                {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportFormPage; 