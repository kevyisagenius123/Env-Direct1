import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaBell, 
  FaCog, 
  FaDownload,
  FaEye,
  FaEdit,
  FaShare,
  FaChartLine,
  FaBuilding,
  FaLeaf,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe
} from 'react-icons/fa';

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user] = useState({
    name: 'John Smith',
    email: 'john.smith@company.com',
    company: 'EcoTech Solutions',
    memberSince: '2023',
    avatar: null,
    location: 'New York, NY'
  });

  const [recentProjects] = useState([
    {
      id: 1,
      title: 'Environmental Impact Assessment - Solar Farm',
      status: 'In Progress',
      progress: 75,
      dueDate: '2025-08-15',
      consultant: 'Dr. Sarah Chen',
      type: 'EIA'
    },
    {
      id: 2,
      title: 'Carbon Footprint Analysis',
      status: 'Under Review',
      progress: 90,
      dueDate: '2025-07-30',
      consultant: 'Mark Johnson',
      type: 'Carbon Assessment'
    },
    {
      id: 3,
      title: 'Sustainability Strategy Development',
      status: 'Completed',
      progress: 100,
      dueDate: '2025-07-20',
      consultant: 'Lisa Wang',
      type: 'Sustainability'
    }
  ]);

  const [upcomingMeetings] = useState([
    {
      id: 1,
      title: 'Project Kickoff Meeting',
      date: '2025-07-26',
      time: '10:00 AM',
      consultant: 'Dr. Sarah Chen',
      type: 'Virtual'
    },
    {
      id: 2,
      title: 'Mid-project Review',
      date: '2025-07-28',
      time: '2:00 PM',
      consultant: 'Mark Johnson',
      type: 'In-person'
    }
  ]);

  const [documents] = useState([
    {
      id: 1,
      name: 'Environmental Assessment Report - Q2 2025',
      type: 'PDF',
      size: '2.4 MB',
      date: '2025-07-20',
      status: 'Final'
    },
    {
      id: 2,
      name: 'Sustainability Roadmap 2025-2030',
      type: 'PDF',
      size: '1.8 MB',
      date: '2025-07-15',
      status: 'Draft'
    },
    {
      id: 3,
      name: 'Carbon Inventory Data Sheet',
      type: 'Excel',
      size: '890 KB',
      date: '2025-07-12',
      status: 'Final'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Under Review': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const StatCard = ({ icon: Icon, title, value, trend, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-envGreen-600 rounded-full flex items-center justify-center">
                <FaUser className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}</h1>
                <p className="text-gray-600">
                  {user.company} • Member since {user.memberSince}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-envGreen-600 text-white rounded-lg hover:bg-envGreen-700 transition-colors">
                <FaPhone className="w-4 h-4 inline mr-2" />
                Schedule Consultation
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <FaCog className="w-4 h-4 inline mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: FaChartLine },
              { id: 'projects', name: 'Projects', icon: FaBuilding },
              { id: 'meetings', name: 'Meetings', icon: FaCalendarAlt },
              { id: 'documents', name: 'Documents', icon: FaFileAlt },
              { id: 'profile', name: 'Profile', icon: FaUser }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-envGreen-500 text-envGreen-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={FaBuilding}
                  title="Active Projects"
                  value="3"
                  trend={25}
                  color="bg-envGreen-500"
                />
                <StatCard
                  icon={FaFileAlt}
                  title="Documents"
                  value="12"
                  trend={8}
                  color="bg-blue-500"
                />
                <StatCard
                  icon={FaCalendarAlt}
                  title="Meetings This Month"
                  value="8"
                  trend={-12}
                  color="bg-purple-500"
                />
                <StatCard
                  icon={FaLeaf}
                  title="Carbon Saved (tons)"
                  value="125"
                  trend={15}
                  color="bg-green-500"
                />
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Recent Projects */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {recentProjects.slice(0, 3).map(project => (
                      <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{project.title}</h4>
                          <p className="text-sm text-gray-600">Consultant: {project.consultant}</p>
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-envGreen-500 h-2 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{project.progress}% complete</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Meetings */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {upcomingMeetings.map(meeting => (
                      <div key={meeting.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-envGreen-100 rounded-lg flex items-center justify-center">
                            <FaCalendarAlt className="w-5 h-5 text-envGreen-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                          <p className="text-sm text-gray-600">{meeting.consultant}</p>
                          <p className="text-sm text-gray-500">{meeting.date} at {meeting.time}</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {meeting.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">All Projects</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentProjects.map(project => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{project.title}</h4>
                          <p className="text-gray-600">Type: {project.type} • Due: {project.dueDate}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-envGreen-500 h-3 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Consultant: {project.consultant}</p>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <FaShare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FaFileAlt className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-600">{doc.type} • {doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          doc.status === 'Final' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.status}
                        </span>
                        <button className="p-2 text-envGreen-600 hover:text-envGreen-700">
                          <FaDownload className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-envGreen-500 focus:border-envGreen-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-envGreen-500 focus:border-envGreen-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input 
                        type="text" 
                        value={user.company}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-envGreen-500 focus:border-envGreen-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input 
                        type="text" 
                        value={user.location}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-envGreen-500 focus:border-envGreen-500"
                      />
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-envGreen-600 text-white rounded-lg hover:bg-envGreen-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                    <FaPhone className="w-5 h-5 text-envGreen-600" />
                    <span>Schedule Consultation</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                    <FaEnvelope className="w-5 h-5 text-envGreen-600" />
                    <span>Contact Support</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                    <FaFileAlt className="w-5 h-5 text-envGreen-600" />
                    <span>Request Report</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                    <FaCog className="w-5 h-5 text-envGreen-600" />
                    <span>Account Settings</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
