import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

const services = [
    { title: 'Environmental Impact Assessments (EIA)', description: 'Comprehensive EIAs for new projects and developments.' },
    { title: 'Air Quality Monitoring & Management', description: 'Real-time air quality testing, analysis, and mitigation strategies.' },
    { title: 'Water Quality Testing & Remediation', description: 'Solutions for contaminated water bodies and drinking water safety.' },
    { title: 'Soil Contamination Assessment', description: 'Identifying and managing soil pollutants for land redevelopment.' },
    { title: 'Ecological Surveys & Biodiversity Plans', description: 'Protecting and enhancing natural habitats and wildlife.' },
    { title: 'Sustainability & ESG Consulting', description: 'Helping organizations integrate ESG principles into their operations.' }
];

const ServiceRequestModal = ({ service, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        message: '',
        serviceName: service.title
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Request: {service.title}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Form fields */}
                    <input type="text" name="userName" placeholder="Your Name" onChange={handleChange} required className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    <input type="email" name="userEmail" placeholder="Your Email" onChange={handleChange} required className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    <input type="tel" name="userPhone" placeholder="Your Phone (Optional)" onChange={handleChange} className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    <textarea name="message" placeholder="Your Message" rows="4" onChange={handleChange} required className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600"></textarea>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Submit Request</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

const ServicesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', isError: false });

    const handleOpenModal = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    const handleSubmitRequest = async (formData) => {
        try {
            const response = await fetch(`${API_URL}/api/service-requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to submit request');
            }
            setNotification({ show: true, message: 'Request submitted successfully!', isError: false });
        } catch (error) {
            setNotification({ show: true, message: error.message, isError: true });
        } finally {
            handleCloseModal();
            setTimeout(() => setNotification({ show: false, message: '', isError: false }), 5000);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Our Environmental Services</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
                We provide a wide range of environmental consulting and field services to help businesses and communities achieve their sustainability goals.
            </p>

            <AnimatePresence>
                {notification.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white ${notification.isError ? 'bg-red-500' : 'bg-green-500'}`}
                    >
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                        <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">{service.title}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{service.description}</p>
                        <button onClick={() => handleOpenModal(service)} className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 font-medium">
                            Request Service &rarr;
                        </button>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {isModalOpen && selectedService && (
                    <ServiceRequestModal
                        service={selectedService}
                        onClose={handleCloseModal}
                        onSubmit={handleSubmitRequest}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ServicesPage; 