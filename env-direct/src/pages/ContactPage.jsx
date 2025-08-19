import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Globe, 
  Linkedin, 
  Twitter,
  CheckCircle,
  AlertCircle,
  Users,
  Calendar,
  FileText,
  Zap
} from 'lucide-react';

const contactFormSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  organization: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  category: z.enum(['general', 'partnership', 'support', 'media', 'research'], {
    errorMap: () => ({ message: 'Please select a category' })
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  urgency: z.enum(['low', 'medium', 'high']).optional()
});

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      urgency: 'medium'
    }
  });

  const watchedCategory = watch('category');

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Contact Form Data:', data);
      setFormSubmitted(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'info@environmentdir.com',
      action: 'mailto:info@environmentdir.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team during business hours',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant answers to your questions',
      contact: 'Available 9 AM - 5 PM EST',
      action: '#',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Calendar,
      title: 'Schedule Meeting',
      description: 'Book a consultation with our experts',
      contact: 'Available slots this week',
      action: '#',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const quickActions = [
    {
      icon: FileText,
      title: 'Download Brochure',
      description: 'Learn more about our services',
      color: 'bg-slate-100 hover:bg-slate-200'
    },
    {
      icon: Users,
      title: 'Join Our Community',
      description: 'Connect with fellow environmental advocates',
      color: 'bg-envGreen-100 hover:bg-envGreen-200'
    },
    {
      icon: Zap,
      title: 'Request Demo',
      description: 'See our platform in action',
      color: 'bg-blue-100 hover:bg-blue-200'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: '💬', description: 'Questions about our services or platform' },
    { value: 'partnership', label: 'Partnership', icon: '🤝', description: 'Collaboration and business opportunities' },
    { value: 'support', label: 'Technical Support', icon: '🛠️', description: 'Help with platform or technical issues' },
    { value: 'media', label: 'Media & Press', icon: '📰', description: 'Press inquiries and media requests' },
    { value: 'research', label: 'Research Collaboration', icon: '🔬', description: 'Academic and research partnerships' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white py-20"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to make an environmental impact? Let's start a conversation about how we can work together.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-16">
        
        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 -mt-10"
        >
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.action}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">{method.title}</h3>
              <p className="text-slate-600 text-sm mb-3">{method.description}</p>
              <p className="text-envGreen-600 font-medium">{method.contact}</p>
            </motion.a>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              
              {/* Success Message */}
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">Message Sent Successfully!</h4>
                    <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}

              <h2 className="text-3xl font-bold text-slate-900 mb-2">Send us a Message</h2>
              <p className="text-slate-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">What can we help you with?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <label
                        key={category.value}
                        className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          watchedCategory === category.value
                            ? 'border-envGreen-500 bg-envGreen-50'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          value={category.value}
                          {...register('category')}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-2xl">{category.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">{category.label}</div>
                            <div className="text-xs text-slate-500">{category.description}</div>
                          </div>
                        </div>
                        {watchedCategory === category.value && (
                          <CheckCircle className="w-5 h-5 text-envGreen-600 absolute top-3 right-3" />
                        )}
                      </label>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      {...register('fullName')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-envGreen-500 transition-colors ${
                        errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-envGreen-500 transition-colors ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-slate-700 mb-2">
                      Organization
                    </label>
                    <input
                      id="organization"
                      type="text"
                      {...register('organization')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-envGreen-500 transition-colors"
                      placeholder="Your organization (optional)"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-envGreen-500 transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-envGreen-500 transition-colors ${
                      errors.subject ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-envGreen-500 focus:border-envGreen-500 transition-colors resize-none ${
                      errors.message ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priority Level</label>
                  <div className="flex gap-4">
                    {[
                      { value: 'low', label: 'Low', color: 'text-green-600 border-green-300' },
                      { value: 'medium', label: 'Medium', color: 'text-yellow-600 border-yellow-300' },
                      { value: 'high', label: 'High', color: 'text-red-600 border-red-300' }
                    ].map((urgency) => (
                      <label key={urgency.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={urgency.value}
                          {...register('urgency')}
                          className="text-envGreen-600 focus:ring-envGreen-500"
                        />
                        <span className={`text-sm font-medium ${urgency.color}`}>{urgency.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-envGreen-600 to-envGreen-700 hover:from-envGreen-700 hover:to-envGreen-800 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="space-y-8"
          >
            
            {/* Office Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Office Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-envGreen-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-slate-900">Address</h4>
                    <p className="text-slate-600 text-sm">123 Environmental Way<br />Green City, EC 12345<br />United States</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-envGreen-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-slate-900">Business Hours</h4>
                    <p className="text-slate-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-envGreen-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-slate-900">Follow Us</h4>
                    <div className="flex gap-3 mt-2">
                      <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full p-4 rounded-lg transition-all duration-200 text-left ${action.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="w-5 h-5 text-slate-600" />
                      <div>
                        <h4 className="font-medium text-slate-900">{action.title}</h4>
                        <p className="text-slate-600 text-sm">{action.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-envGreen-50 to-envGreen-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-envGreen-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3 text-sm">
                <details className="group">
                  <summary className="font-medium text-envGreen-800 cursor-pointer group-open:text-envGreen-900">
                    How quickly do you respond to inquiries?
                  </summary>
                  <p className="text-envGreen-700 mt-2 pl-4">We typically respond within 24 hours during business days.</p>
                </details>
                <details className="group">
                  <summary className="font-medium text-envGreen-800 cursor-pointer group-open:text-envGreen-900">
                    Do you offer custom solutions?
                  </summary>
                  <p className="text-envGreen-700 mt-2 pl-4">Yes, we provide tailored environmental solutions for organizations of all sizes.</p>
                </details>
                <details className="group">
                  <summary className="font-medium text-envGreen-800 cursor-pointer group-open:text-envGreen-900">
                    Can I schedule a demo?
                  </summary>
                  <p className="text-envGreen-700 mt-2 pl-4">Absolutely! Use the "Schedule Meeting" option above or mention it in your message.</p>
                </details>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 