import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Camera, 
  MapPin,
  Mail,
  ExternalLink,
  Download,
  Send,
  BookOpen,
  Award,
  Globe
} from 'lucide-react';

const GreenAtlasMagazine = () => {
  const [activeTab, setActiveTab] = useState('about');

  const submissionTypes = [
    {
      icon: FileText,
      title: "Articles & Features",
      description: "Environmental research, case studies, and analytical pieces",
      requirement: "Abstract only (150-300 words) required at this stage"
    },
    {
      icon: Camera,
      title: "Photos, Poems & Art",
      description: "Nature-inspired creative pieces and visual storytelling",
      requirement: "High-resolution images or digital artwork"
    },
    {
      icon: MapPin,
      title: "GIS & Tech",
      description: "Tools, tutorials, and technical case studies",
      requirement: "Technical documentation and visual examples"
    },
    {
      icon: Users,
      title: "Community Spotlights",
      description: "Grassroots, youth, and school projects",
      requirement: "Project overview and impact documentation"
    },
    {
      icon: Award,
      title: "Profiles & Interviews",
      description: "Eco-leaders and changemakers",
      requirement: "Interview proposal or completed piece"
    },
    {
      icon: BookOpen,
      title: "Educational Content",
      description: "Lesson plans and student campaigns",
      requirement: "Structured educational materials"
    }
  ];

  const keyDates = [
    { date: "May 31, 2025", event: "Submission Deadline", status: "upcoming" },
    { date: "June 15, 2025", event: "Editorial Review Complete", status: "upcoming" },
    { date: "July 1, 2025", event: "Launch Day", status: "target" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-envGreen-50 to-envGreen-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-envGreen-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ED</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">Environment Direct</span>
            </Link>
            
            <nav className="flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('about')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'about' 
                    ? 'text-envGreen-600 border-b-2 border-envGreen-600' 
                    : 'text-gray-600 hover:text-envGreen-600'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('submit')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'submit' 
                    ? 'text-envGreen-600 border-b-2 border-envGreen-600' 
                    : 'text-gray-600 hover:text-envGreen-600'
                }`}
              >
                Submit
              </button>
              <button
                onClick={() => setActiveTab('guidelines')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'guidelines' 
                    ? 'text-envGreen-600 border-b-2 border-envGreen-600' 
                    : 'text-gray-600 hover:text-envGreen-600'
                }`}
              >
                Guidelines
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-envGreen-600 to-envGreen-700 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-6">
              <Globe className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Caribbean Environmental Publishing</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Green Atlas
              <span className="block text-envGreen-200">Magazine</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              A bold new Caribbean-rooted platform for sustainability, innovation, and environmental action. 
              More than a magazine—it's a movement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('submit')}
                className="px-8 py-4 bg-white text-envGreen-600 font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Submit Your Work
              </button>
              <button
                onClick={() => setActiveTab('guidelines')}
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                View Guidelines
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Green Atlas Magazine</h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Green Atlas Magazine is Environment Direct Consulting Inc.'s debut publication, 
                    launching to spotlight fearless Caribbean voices on climate, conservation, 
                    community, and creative expression.
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed">
                    Our inaugural issue focuses on "Towards a Sustainable Future" and aims to 
                    showcase the Caribbean's brilliance, boldness, and resilience in environmental stewardship.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">Our Mission</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-envGreen-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Amplify Caribbean environmental voices
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-envGreen-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Share innovative sustainability solutions
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-envGreen-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Foster environmental awareness and action
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-envGreen-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Connect communities through shared environmental goals
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-envGreen-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Dates</h3>
                    <div className="space-y-3">
                      {keyDates.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-envGreen-600 mr-3" />
                            <span className="text-gray-700">{item.event}</span>
                          </div>
                          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                            item.status === 'target' 
                              ? 'bg-envGreen-100 text-envGreen-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-500 mr-3" />
                        <a href="mailto:info@environmentdir.com" className="text-envGreen-600 hover:text-envGreen-700">
                          info@environmentdir.com
                        </a>
                      </div>
                      <div className="flex items-center">
                        <ExternalLink className="w-4 h-4 text-gray-500 mr-3" />
                        <a 
                          href="https://forms.gle/ieEfek6hZ4CiWFpd7" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-envGreen-600 hover:text-envGreen-700"
                        >
                          Submission Form
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 text-gray-500 mr-3" />
                        <a 
                          href="https://bit.ly/3GKf3fu" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-envGreen-600 hover:text-envGreen-700"
                        >
                          Contributor Info Pack
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'submit' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Submit Your Work</h2>
              
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {submissionTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-envGreen-300 transition-colors">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-envGreen-100 rounded-lg flex items-center justify-center mr-3">
                          <Icon className="w-5 h-5 text-envGreen-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{type.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-3">{type.description}</p>
                      <p className="text-sm text-envGreen-600 font-medium">{type.requirement}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-envGreen-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Submit</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-envGreen-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Online Form</h4>
                    <p className="text-sm text-gray-600 mb-3">Complete our submission form</p>
                    <a 
                      href="https://forms.gle/ieEfek6hZ4CiWFpd7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-envGreen-600 hover:text-envGreen-700 text-sm font-medium"
                    >
                      Submit Form <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-envGreen-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Email Submission</h4>
                    <p className="text-sm text-gray-600 mb-3">Send directly to our editorial team</p>
                    <a 
                      href="mailto:info@environmentdir.com?subject=Submission - GreenAtlas Issue 1"
                      className="inline-flex items-center text-envGreen-600 hover:text-envGreen-700 text-sm font-medium"
                    >
                      Send Email <Mail className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-envGreen-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Get Guidelines</h4>
                    <p className="text-sm text-gray-600 mb-3">Download our contributor pack</p>
                    <a 
                      href="https://bit.ly/3GKf3fu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-envGreen-600 hover:text-envGreen-700 text-sm font-medium"
                    >
                      Download <Download className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'guidelines' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Submission Guidelines</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Theme: Towards a Sustainable Future</h3>
                  <p className="text-gray-600 mb-4">
                    Our inaugural issue focuses on innovative solutions, community-driven initiatives, 
                    and forward-thinking approaches to environmental challenges in the Caribbean and beyond.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Content Requirements</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-envGreen-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Articles & Features</h4>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Abstract submission only (150-300 words)</li>
                        <li>• Focus on environmental consulting, sustainability, or conservation</li>
                        <li>• Include key findings or recommendations</li>
                        <li>• Provide author credentials and contact information</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-envGreen-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Creative Submissions</h4>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• High-resolution images (minimum 300 DPI)</li>
                        <li>• Nature-inspired themes preferred</li>
                        <li>• Include brief description or artist statement</li>
                        <li>• Original work only</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-envGreen-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Technical Content</h4>
                      <ul className="text-gray-600 mt-2 space-y-1">
                        <li>• Include methodology and data sources</li>
                        <li>• Provide visual examples or screenshots</li>
                        <li>• Focus on practical applications</li>
                        <li>• Include contact for follow-up questions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Review Process</h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-envGreen-600 mr-3" />
                        <span className="text-gray-700">Initial review within 2 weeks of submission</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-envGreen-600 mr-3" />
                        <span className="text-gray-700">Editorial board review for selected submissions</span>
                      </div>
                      <div className="flex items-center">
                        <Send className="w-5 h-5 text-envGreen-600 mr-3" />
                        <span className="text-gray-700">Notification by June 15, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-envGreen-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notes</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• All submissions must be original work</li>
                    <li>• Authors retain copyright but grant publication rights</li>
                    <li>• Selected contributors will be contacted for full submissions</li>
                    <li>• Publication is planned for July 1, 2025</li>
                    <li>• Digital and print formats will be available</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default GreenAtlasMagazine;
