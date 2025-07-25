import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  LogOut, 
  User, 
  BookOpen,
  ExternalLink,
  Clock
} from 'lucide-react';

const UserDashboardPage = () => {
  const [user, setUser] = useState(null);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock user comments - in real app this would come from API
    setUserComments([
      {
        id: 1,
        articleTitle: "Climate Change Impact Assessment",
        content: "Great insights on environmental impact assessment methodologies.",
        date: "2024-01-15",
        status: "published"
      },
      {
        id: 2,
        articleTitle: "Sustainable Development Practices",
        content: "This article provides excellent guidance for implementing sustainable practices.",
        date: "2024-01-10",
        status: "published"
      }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-envGreen-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to access your dashboard.</p>
          <Link 
            to="/login" 
            className="text-envGreen-600 hover:text-envGreen-700 font-medium"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-envGreen-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-envGreen-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-envGreen-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ED</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">Environment Direct</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Client Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-envGreen-100"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">
              Engage with our environmental consulting articles and share your insights through comments.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Comments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-envGreen-100"
            >
              <div className="p-6 border-b border-envGreen-100">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-envGreen-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Your Recent Comments</h2>
                </div>
              </div>
              
              <div className="p-6">
                {userComments.length > 0 ? (
                  <div className="space-y-4">
                    {userComments.map((comment) => (
                      <div key={comment.id} className="border border-gray-200 rounded-lg p-4 hover:border-envGreen-200 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{comment.articleTitle}</h3>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{comment.content}</p>
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            comment.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {comment.status}
                          </span>
                          <button className="text-envGreen-600 hover:text-envGreen-700 text-sm font-medium">
                            View Article
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No comments yet.</p>
                    <p className="text-sm text-gray-400">Start engaging with our articles to see your comments here.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-envGreen-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/articles"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-envGreen-50 transition-colors group"
                >
                  <BookOpen className="h-5 w-5 text-envGreen-600" />
                  <span className="text-gray-700 group-hover:text-envGreen-700">Browse Articles</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                </Link>
                
                <Link
                  to="/services"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-envGreen-50 transition-colors group"
                >
                  <User className="h-5 w-5 text-envGreen-600" />
                  <span className="text-gray-700 group-hover:text-envGreen-700">Our Services</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </motion.div>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-envGreen-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Type</label>
                  <p className="text-gray-900 capitalize">{user.role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboardPage;
