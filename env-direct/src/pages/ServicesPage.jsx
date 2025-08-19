import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

const services = [
    { 
        title: 'Environmental Consulting', 
        description: 'We provide Environmental Impact Assessments (EIAs), Environmental and Social Management Plans (ESMPs), and site assessments tailored to Caribbean regulatory frameworks and global standards.',
        icon: '🌿',
        features: ['Environmental Impact Assessments', 'Environmental & Social Management Plans', 'Site Assessments', 'Regulatory Compliance']
    },
    { 
        title: 'GIS & Spatial Analysis', 
        description: 'Our GIS experts support land use mapping, hazard and vulnerability assessments, ecological modelling, and custom dashboards to empower data-driven decisions.',
        icon: '🗺️',
        features: ['Land Use Mapping', 'Hazard & Vulnerability Assessments', 'Ecological Modelling', 'Custom GIS Dashboards']
    },
    { 
        title: 'Climate Resilience & Adaptation', 
        description: 'We design nature-based solutions, support climate policy, and implement resilience planning for coastal communities and SIDS (Small Island Developing States).',
        icon: '🌊',
        features: ['Nature-Based Solutions', 'Climate Policy Support', 'Resilience Planning', 'SIDS Adaptation Strategies']
    },
    { 
        title: 'Training & Capacity Building', 
        description: 'We offer in-person and online training in GIS, EIA procedures, proposal writing, environmental education, and community mapping.',
        icon: '🎓',
        features: ['GIS Training', 'EIA Procedures', 'Proposal Writing', 'Environmental Education']
    },
    { 
        title: 'Technical Writing & Reporting', 
        description: 'From project proposals and policy briefs to donor reports and stakeholder presentations, we ensure clear, persuasive, and impactful documentation.',
        icon: '📝',
        features: ['Project Proposals', 'Policy Briefs', 'Donor Reports', 'Stakeholder Presentations']
    },
    { 
        title: 'Stakeholder Engagement & Public Outreach', 
        description: 'We facilitate inclusive community consultations, workshops, and participatory planning processes that strengthen local ownership and project success.',
        icon: '🤝',
        features: ['Community Consultations', 'Participatory Workshops', 'Public Engagement', 'Stakeholder Mapping']
    }
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
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                Environment Direct Consulting Inc. provides comprehensive environmental and geospatial 
                consulting services tailored to the Caribbean region. Our expertise spans over 20 years 
                in environmental science, GIS, project management, and stakeholder engagement. We deliver 
                practical, innovative solutions that strengthen climate resilience and promote sustainable 
                development across Small Island Developing States.
            </p>

            {/* Company Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">20+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Years of Experience</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Caribbean</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Regional Focus</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">SIDS</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Specialized in Small Island States</div>
                </div>
            </div>

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
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{service.icon}</span>
                        <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">{service.title}</h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                    
                    {/* Service Features */}
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Services:</h4>
                        <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            {service.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <button onClick={() => handleOpenModal(service)} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-medium transition-colors">
                        Request Service →
                    </button>
                </div>
            ))}
        </div>            <AnimatePresence>
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