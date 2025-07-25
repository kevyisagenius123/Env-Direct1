import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Upload, 
  X,
  AlertCircle
} from 'lucide-react';

const CreateEditArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    author: '',
    summary: '',
    content: '',
    featuredImage: '',
    keyPoints: [''],
    tags: [''],
    status: 'draft',
    readingTime: 5
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    if (isEditing) {
      fetchArticle();
    } else {
      // Check for saved drafts in localStorage when creating a new article
      const savedDraft = localStorage.getItem('articleDraft');
      if (savedDraft) {
        try {
          const draftData = JSON.parse(savedDraft);
          // Ask user if they want to restore the draft
          if (window.confirm('A previously unsaved draft was found. Would you like to restore it?')) {
            setFormData(draftData);
            console.log('Draft restored from localStorage');
          } else {
            // If user doesn't want to restore, clear the saved draft
            localStorage.removeItem('articleDraft');
          }
        } catch (error) {
          console.error('Error parsing saved draft:', error);
          localStorage.removeItem('articleDraft');
        }
      }
    }
  }, [id, isEditing]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/admin/articles/${id}`);
      if (response.ok) {
        const article = await response.json();
        setFormData({
          ...article,
          keyPoints: article.keyPoints || [''],
          tags: article.tags || ['']
        });
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const handleSave = async (status = formData.status) => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      
      const articleData = {
        ...formData,
        status,
        readingTime: calculateReadingTime(formData.content),
        keyPoints: formData.keyPoints.filter(point => point.trim()),
        tags: formData.tags.filter(tag => tag.trim())
      };

      const url = isEditing 
        ? `${API_URL}/api/admin/articles/${id}`
        : `${API_URL}/api/admin/articles`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData),
          credentials: 'include' // Include credentials for authentication
        });

        if (response.ok) {
          navigate('/admin/dashboard');
        } else {
          // Handle different error status codes
          if (response.status === 403) {
            setErrors({
              ...errors,
              auth: 'Authentication error: You need to be logged in as an admin to perform this action'
            });
            console.error('Authentication error (403)');
          } else {
            // Try to parse error response as JSON, but handle case where it's not valid JSON
            try {
              const errorData = await response.json();
              console.error('Error saving article:', errorData);
              setErrors({
                ...errors,
                server: errorData.message || 'Server error occurred while saving the article'
              });
            } catch (jsonError) {
              // Response wasn't valid JSON
              console.error('Error parsing response:', jsonError);
              setErrors({
                ...errors,
                server: `Server error (${response.status}): Unable to save article`
              });
            }
          }
          
          // Save article data to localStorage as backup
          localStorage.setItem('articleDraft', JSON.stringify(articleData));
          console.log('Article draft saved to localStorage as backup');
        }
      } catch (networkError) {
        // Handle network errors (server unavailable)
        console.error('Network error:', networkError);
        setErrors({
          ...errors,
          network: 'Unable to connect to the server. Your article has been saved locally.'
        });
        
        // Save to localStorage when server is unavailable
        localStorage.setItem('articleDraft', JSON.stringify(articleData));
        console.log('Article draft saved to localStorage due to server unavailability');
        
        // Simulate successful save for better UX when backend is unavailable
        if (window.confirm('Server is currently unavailable. Would you like to continue in offline mode?')) {
          navigate('/admin/dashboard');
        }
      }
    } catch (error) {
      console.error('Error in save process:', error);
      setErrors({
        ...errors,
        general: 'An unexpected error occurred while saving the article'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-envGreen-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit Article' : 'Create New Article'}
              </h1>
              <p className="text-gray-600">
                {isEditing ? 'Update article content and settings' : 'Write and publish a new article'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {previewMode ? 'Edit' : 'Preview'}
            </button>
            
            <button
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            
            <button
              onClick={() => handleSave('published')}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-envGreen-600 text-white rounded-lg hover:bg-envGreen-700 transition-colors disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              Publish
            </button>
          </div>
        </div>
        
        {/* Error Notifications */}
        {(errors.auth || errors.server || errors.network || errors.general) && (
          <div className="mb-6">
            {errors.auth && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-3 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Authentication Error</h3>
                    <div className="mt-1 text-sm text-red-700">{errors.auth}</div>
                    <div className="mt-2">
                      <button
                        onClick={() => window.location.href = '/admin-login'}
                        className="text-sm font-medium text-red-800 hover:text-red-900"
                      >
                        Go to Login Page
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {errors.server && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-3 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Server Error</h3>
                    <div className="mt-1 text-sm text-yellow-700">{errors.server}</div>
                    <div className="mt-2 text-sm text-yellow-700">
                      Your article has been saved locally as a backup.
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {errors.network && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-3 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Network Error</h3>
                    <div className="mt-1 text-sm text-blue-700">{errors.network}</div>
                    <div className="mt-2 text-sm text-blue-700">
                      You can continue working in offline mode. Your changes will be saved locally.
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {errors.general && (
              <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-3 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">Error</h3>
                    <div className="mt-1 text-sm text-gray-700">{errors.general}</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                onClick={() => setErrors({})}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Dismiss All
              </button>
            </div>
          </div>
        )}
        
        {/* Loading/Saving Indicator */}
        {saving && (
          <div className="mb-6 bg-envGreen-50 border-l-4 border-envGreen-500 p-4 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-envGreen-700"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-envGreen-700">
                  {isEditing ? 'Updating article...' : 'Creating new article...'}
                </p>
              </div>
            </div>
          </div>
        )}

        {previewMode ? (
          /* Preview Mode */
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none">
              <h1>{formData.title}</h1>
              {formData.subtitle && <h2 className="text-xl text-gray-600">{formData.subtitle}</h2>}
              <div className="text-sm text-gray-500 mb-6">
                By {formData.author} • {formData.readingTime} min read
              </div>
              {formData.featuredImage && (
                <img 
                  src={formData.featuredImage} 
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div className="bg-envGreen-50 p-4 rounded-lg mb-6">
                <h3>Summary</h3>
                <p>{formData.summary}</p>
              </div>
              <div className="whitespace-pre-wrap">{formData.content}</div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-6">
            
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter article title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-transparent ${
                      errors.author ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Author name"
                  />
                  {errors.author && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.author}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-transparent"
                  placeholder="Optional subtitle"
                />
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Content</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary *
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-transparent ${
                    errors.summary ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Brief summary of the article"
                />
                {errors.summary && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.summary}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={20}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-transparent font-mono ${
                    errors.content ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Write your article content here..."
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.content}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Estimated reading time: {calculateReadingTime(formData.content)} minutes
                </p>
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Key Points</h2>
              
              <div className="space-y-3">
                {formData.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleArrayFieldChange('keyPoints', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-transparent"
                      placeholder="Key point"
                    />
                    {formData.keyPoints.length > 1 && (
                      <button
                        onClick={() => removeArrayField('keyPoints', index)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  onClick={() => addArrayField('keyPoints')}
                  className="text-envGreen-600 hover:text-envGreen-800 text-sm font-medium"
                >
                  + Add Key Point
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              
              <div className="space-y-3">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayFieldChange('tags', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-transparent"
                      placeholder="Tag"
                    />
                    {formData.tags.length > 1 && (
                      <button
                        onClick={() => removeArrayField('tags', index)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  onClick={() => addArrayField('tags')}
                  className="text-envGreen-600 hover:text-envGreen-800 text-sm font-medium"
                >
                  + Add Tag
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEditArticlePage;
