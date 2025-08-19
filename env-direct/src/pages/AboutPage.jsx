import React from 'react';
import { 
  MapPinIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  GlobeAltIcon,
  BeakerIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const AboutPage = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/environment-direct-consulting-inc',
      icon: 'LinkedIn',
      color: 'blue'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/environmentdir',
      icon: 'Facebook',
      color: 'blue'
    },
    {
      name: 'Website',
      url: 'https://environmentdir.com',
      icon: 'Globe',
      color: 'green'
    }
  ];

  const teamValues = [
    {
      title: 'Integrity',
      description: 'We maintain the highest standards of professional ethics and transparency in all our work.',
      icon: <HeartIcon className="h-8 w-8" />
    },
    {
      title: 'Inclusiveness',
      description: 'We believe in participatory approaches that include all stakeholders in environmental decision-making.',
      icon: <UserGroupIcon className="h-8 w-8" />
    },
    {
      title: 'Innovation',
      description: 'We combine cutting-edge technology with traditional knowledge to create practical solutions.',
      icon: <BeakerIcon className="h-8 w-8" />
    },
    {
      title: 'Environmental Stewardship',
      description: 'We are passionate advocates for sustainable development and environmental justice.',
      icon: <GlobeAltIcon className="h-8 w-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-envGreen-800 to-envGreen-600 text-white py-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/img/344572318_1520938288433169_201169774713472811_n.jpg" 
            alt="Environment Direct Team" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Environment Direct Consulting Inc.</h1>
            <p className="text-xl mb-8 opacity-90">
              Environmental and Geospatial Solutions for the Caribbean Region
            </p>
            <div className="flex items-center justify-center space-x-4 text-lg">
              <MapPinIcon className="h-6 w-6" />
              <span>Based in Dominica • Serving the Caribbean</span>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Who We Are</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              <p>
                Environment Direct Consulting Inc. is an environmental and geospatial consulting 
                company based in the Commonwealth of Dominica and serving the wider Caribbean 
                region. With deep roots in the region and a strong commitment to sustainable 
                development, our team brings over 20 years of expertise in environmental science, 
                Geographic Information Systems (GIS), project management, stakeholder engagement, 
                Disaster Risk management, and technical training.
              </p>
              <p>
                We specialize in delivering practical, innovative, and community-informed solutions 
                that strengthen climate resilience, improve planning outcomes, and promote 
                environmental justice across Small Island Developing States.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-envGreen-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AcademicCapIcon className="h-8 w-8 text-envGreen-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">20+ Years</h3>
                <p className="text-gray-600">Of combined expertise in environmental science and GIS</p>
              </div>
              <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GlobeAltIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Caribbean Focus</h3>
                <p className="text-gray-600">Deep understanding of SIDS and regional challenges</p>
              </div>
              <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Community-Centered</h3>
                <p className="text-gray-600">Participatory approaches that include all stakeholders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Approach</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We operate at the intersection of science, policy, and community action, bridging 
              local knowledge and global best practices. Whether it's conducting an environmental 
              impact assessment, designing a GIS dashboard, or facilitating a reforestation 
              program, our work is driven by integrity, inclusiveness, and a passion for 
              environmental stewardship.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-envGreen-600">
                <h3 className="text-3xl font-bold text-envGreen-800 mb-6">Our Mission</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To empower Caribbean communities and institutions to make informed, sustainable, 
                  and climate-smart decisions through tailored environmental and geospatial solutions.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-600">
                <h3 className="text-3xl font-bold text-blue-800 mb-6">Our Vision</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  A thriving Caribbean region where people and ecosystems are resilient, empowered, 
                  and supported by strong data, inclusive planning, and environmental leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Work in Action</h2>
              <p className="text-lg text-gray-600">Real projects, real impact across the Caribbean</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="relative rounded-lg overflow-hidden shadow-lg group">
                <img 
                  src="/img/Picture1.jpg" 
                  alt="Environmental Field Work"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">Field Research</h4>
                    <p className="text-sm text-gray-200">Environmental monitoring and data collection</p>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden shadow-lg group">
                <img 
                  src="/img/Picture2.jpg" 
                  alt="Community Engagement"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">Community Engagement</h4>
                    <p className="text-sm text-gray-200">Stakeholder consultation and training</p>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden shadow-lg group">
                <img 
                  src="/img/Picture3.jpg" 
                  alt="Technology Solutions"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">GIS & Technology</h4>
                    <p className="text-sm text-gray-200">Advanced mapping and analysis tools</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Work Examples */}
            <div className="grid md:grid-cols-4 gap-4">
              {[4, 5, 6, 7].map((num) => (
                <div key={num} className="relative rounded-lg overflow-hidden shadow-md group">
                  <img 
                    src={`/img/Picture${num}.jpg`} 
                    alt={`Environmental project ${num}`}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Values</h2>
              <p className="text-lg text-gray-600">The principles that guide our work</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamValues.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-envGreen-100 rounded-full flex items-center justify-center mx-auto mb-4 text-envGreen-600">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Contact */}
      <section className="py-20 bg-envGreen-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Connect With Us</h2>
            <p className="text-xl mb-12 opacity-90">
              Follow our work and stay updated on environmental developments in the Caribbean
            </p>
            
            <div className="flex justify-center space-x-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-envGreen-800 px-6 py-3 rounded-lg font-semibold hover:bg-envGreen-50 transition-colors flex items-center space-x-2"
                >
                  <span>{link.name}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-envGreen-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Instagram: Coming Soon</h3>
              <p className="text-envGreen-100">
                We're currently developing our Instagram presence to share visual stories 
                from our field work across the Caribbean.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
