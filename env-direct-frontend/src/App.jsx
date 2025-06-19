import React, { Suspense, lazy, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import EditorialAssistant from './components/AIChatbot';
import { AuthProvider } from './context/AuthContext.jsx';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-4">Something went wrong</h2>
          <details className="bg-white p-4 rounded-lg shadow">
            <summary className="font-semibold cursor-pointer">View error details</summary>
            <pre className="mt-2 text-sm overflow-auto p-2 bg-gray-100 rounded">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Import Page Components
const HomePage = lazy(() => import('./pages/HomePage'));
const EnvDashboardPage = lazy(() => import('./pages/EnvDashboardPage'));
const PredictionDashboardPage = lazy(() => import('./pages/PredictionDashboardPage'));
const AnalyticsDashboardPage = lazy(() => import('./pages/AnalyticsDashboardPage'));
// const ClimateExplorerPage = lazy(() => import('./pages/ClimateExplorerPage'));
const ReportDetailPage = lazy(() => import('./pages/ReportDetailPage'));
const ReportsListPage = lazy(() => import('./pages/ReportsListPage'));
const LiveMapPage = lazy(() => import('./pages/LiveMapPage'));
  const GreenAtlasMagazinePage = lazy(() => import('./pages/GreenAtlasMagazinePage'));
  const ClimateIntelligencePage = lazy(() => import('./pages/ClimateIntelligencePage'));
const ClimateIntelligenceHub = lazy(() => import('./pages/ClimateIntelligenceHub'));
const PlanetaryIntelligenceSystem = lazy(() => import('./pages/PlanetaryIntelligenceSystem'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'));
const SubmitArticlePage = lazy(() => import('./pages/SubmitArticlePage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ReportFormPage = lazy(() => import('./pages/ReportFormPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const TrainingCourseDetailPage = lazy(() => import('./pages/TrainingCourseDetailPage'));
const GetInvolvedPage = lazy(() => import('./pages/GetInvolvedPage'));
const RegisterCleanupPage = lazy(() => import('./pages/RegisterCleanupPage'));
const RankingsDetailsPage = lazy(() => import('./pages/RankingsDetailsPage'));
const ForecastsDetailsPage = lazy(() => import('./pages/ForecastsDetailsPage'));

// Unified Intelligence Platform - All-in-One Environmental Command Center
const UnifiedIntelligencePlatform = lazy(() => import('./components/UnifiedIntelligencePlatform'));

// AI Lab - Environmental Forensics
const AILab = lazy(() => import('./components/AILab'));

// Auth Pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-mygreen-light dark:bg-mygreen-darker">
          <Navbar />
          <main className="flex flex-col flex-grow pt-16">
            <Suspense fallback={<div className='flex justify-center items-center h-screen'><Spinner /></div>}>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  
                  {/* UNIFIED INTELLIGENCE PLATFORM - All-in-One Environmental Command Center */}
                  <Route path="/dashboard" element={
                    <ErrorBoundary>
                      <UnifiedIntelligencePlatform />
                    </ErrorBoundary>
                  } />
                  <Route path="/predictive-dashboard" element={
                    <ErrorBoundary>
                      <UnifiedIntelligencePlatform />
                    </ErrorBoundary>
                  } />
                  <Route path="/analytics-dashboard" element={
                    <ErrorBoundary>
                      <UnifiedIntelligencePlatform />
                    </ErrorBoundary>
                  } />
                  <Route path="/ops" element={
                    <ErrorBoundary>
                      <UnifiedIntelligencePlatform />
                    </ErrorBoundary>
                  } />
                  <Route path="/mission-control" element={
                    <ErrorBoundary>
                      <UnifiedIntelligencePlatform />
                    </ErrorBoundary>
                  } />
                  
                  {/* AI LAB - Environmental Forensics */}
                  <Route path="/ai-lab" element={
                    <ErrorBoundary>
                      <AILab />
                    </ErrorBoundary>
                  } />
                  
                  <Route path="/reports/:reportId" element={<ReportDetailPage />} />
                  <Route path="/reports" element={<ReportsListPage />} />
                  <Route path="/live-map" element={
                    <ErrorBoundary>
                      <LiveMapPage />
                    </ErrorBoundary>
                  } />
                                     <Route path="/green-atlas-magazine" element={<GreenAtlasMagazinePage />} />
                   <Route path="/magazine" element={<GreenAtlasMagazinePage />} />
                   <Route path="/green-atlas" element={<GreenAtlasMagazinePage />} />
                  <Route path="/climate-intelligence" element={<ClimateIntelligencePage />} />
                  <Route path="/planetary-intelligence" element={<ClimateIntelligenceHub />} />
                  <Route path="/planetary-intelligence-system" element={
                    <ErrorBoundary>
                      <PlanetaryIntelligenceSystem />
                    </ErrorBoundary>
                  } />
                  <Route path="/earth-command" element={
                    <ErrorBoundary>
                      <PlanetaryIntelligenceSystem />
                    </ErrorBoundary>
                  } />
                  <Route path="/global-climate-command" element={
                    <ErrorBoundary>
                      <PlanetaryIntelligenceSystem />
                    </ErrorBoundary>
                  } />
                  <Route path="/magazine/article/:articleId" element={<ArticleDetailPage />} />
                  <Route path="/submit-article" element={<SubmitArticlePage />} />
                  <Route path="/training" element={<TrainingPage />} />
                  <Route path="/training/:courseId" element={<TrainingCourseDetailPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/submit-report" element={<ReportFormPage />} />
                  <Route path="/get-involved" element={<GetInvolvedPage />} />
                  <Route path="/register-cleanup" element={<RegisterCleanupPage />} />
                  <Route path="/dominica-rankings-details" element={<RankingsDetailsPage />} />
                  <Route path="/dominica-forecasts-details" element={<ForecastsDetailsPage />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </main>
          <Footer />
          <EditorialAssistant />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
