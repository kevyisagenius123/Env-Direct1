import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfessionalServicesSection = () => {
  const services = [
    {
      id: 'monitoring',
      title: 'Environmental Monitoring',
      tagline: 'Real-Time Intelligence Network',
      description: 'Comprehensive 24/7 monitoring of air quality, water systems, forest coverage, and climate indicators across Dominica using our network of advanced sensors and satellite data.',
      features: ['156 Active Sensors', 'Satellite Integration', 'Real-Time Alerts', 'Historical Analysis'],
      link: '/climate-intelligence',
      icon: (
        <svg className="w-8 h-8 text-envGreen-600 dark:text-envGreen-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'reporting',
      title: 'Policy & Reporting',
      tagline: 'Ministry-Grade Analysis',
      description: 'Executive briefings, environmental impact assessments, and policy recommendations tailored for government decision-makers and international organizations.',
      features: ['Government Reports', 'Impact Assessments', 'Policy Briefs', 'Compliance Tracking'],
      link: '/reports',
      icon: (
        <svg className="w-8 h-8 text-envGreen-600 dark:text-envGreen-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'intelligence',
      title: 'Satellite Intelligence',
      tagline: 'Advanced Earth Observation',
      description: 'High-resolution satellite imagery analysis for deforestation tracking, urban planning, disaster response, and infrastructure development planning.',
      features: ['Satellite Imagery', 'Change Detection', 'Predictive Modeling', 'Risk Assessment'],
      link: '/satellite-intelligence',
      icon: (
        <svg className="w-8 h-8 text-envGreen-600 dark:text-envGreen-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'consulting',
      title: 'Strategic Consulting',
      tagline: 'Environmental Leadership',
      description: 'Expert consultation for sustainable development projects, climate adaptation strategies, and environmental compliance for government agencies and private sector.',
      features: ['Strategic Planning', 'Project Management', 'Compliance Support', 'Capacity Building'],
      link: '/consulting',
      icon: (
        <svg className="w-8 h-8 text-envGreen-600 dark:text-envGreen-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'training',
      title: 'Professional Training',
      tagline: 'Capacity Development',
      description: 'Training programs for government officials, environmental professionals, and community leaders on environmental monitoring, data analysis, and sustainable practices.',
      features: ['Executive Training', 'Technical Workshops', 'Certification Programs', 'Knowledge Transfer'],
      link: '/training',
      icon: (
        <svg className="w-8 h-8 text-envGreen-600 dark:text-envGreen-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'emergency',
      title: 'Emergency Response',
      tagline: 'Crisis Management',
      description: 'Rapid environmental assessment and response coordination for natural disasters, environmental emergencies, and climate-related incidents.',
      features: ['24/7 Response', 'Risk Coordination', 'Impact Assessment', 'Recovery Planning'],
      link: '/emergency-response',
      icon: (
        <svg className="w-8 h-8 text-envGreen-600 dark:text-envGreen-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-envGreen-700 dark:bg-envGreen-800">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive environmental intelligence and consulting services designed for government agencies, 
            international organizations, and private sector clients committed to sustainable development.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/10 dark:bg-white/5 rounded-lg border border-white/20 dark:border-white/10 hover:border-white/40 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl backdrop-blur-sm p-6 h-full flex flex-col">
                
                {/* Icon & Header */}
                <div className="mb-6">
                  <div className="mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm font-medium text-envGreen-200 dark:text-envGreen-100 uppercase tracking-wide">
                    {service.tagline}
                  </p>
                </div>

                {/* Description */}
                <div className="flex-1 mb-6">
                  <p className="text-white/90 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-white/80">
                        <div className="w-1.5 h-1.5 bg-envGreen-200 dark:bg-envGreen-100 rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to={service.link}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-envGreen-700 dark:text-envGreen-800 font-medium rounded-lg hover:bg-white/90 transition-colors duration-300 group-hover:shadow-md"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-white/5 dark:bg-white/10 rounded-lg border border-white/10 dark:border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Partner with Environment Direct?
          </h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Contact our team to discuss how our environmental intelligence services can support your organization's sustainability goals and compliance requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-envGreen-700 dark:text-envGreen-800 font-semibold rounded-lg hover:bg-white/90 transition-colors duration-300"
            >
              Contact Our Team
            </Link>
            <Link
              to="/case-studies"
              className="px-8 py-3 border-2 border-white/30 dark:border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors duration-300"
            >
              View Case Studies
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProfessionalServicesSection; 
