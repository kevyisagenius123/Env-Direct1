import React, { Suspense, lazy, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModernNavbar from './components/ModernNavbar';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import EditorialAssistant from './components/AIChatbot';
import { AuthProvider } from './context/AuthContext.jsx';
import { AuthProvider as AdminAuthProvider } from './context/AdminAuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute';
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
const AboutPage = lazy(() => import('./pages/AboutPage'));
const EnvDashboardPage = lazy(() => import('./pages/EnvDashboardPage'));
const PredictionDashboardPage = lazy(() => import('./pages/PredictionDashboardPage'));
const AnalyticsDashboardPage = lazy(() => import('./pages/AnalyticsDashboardPage'));
const UnderConstructionPage = lazy(() => import('./pages/UnderConstructionPage'));
const UserLoginPage = lazy(() => import('./pages/UserLoginPage'));
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage'));

// 🔥 FAANG-GRADE COMPONENTS
const MissionControlPage = lazy(() => import('./pages/MissionControlPage'));
const EnterpriseFeaturesPage = lazy(() => import('./pages/EnterpriseFeaturesPage'));

// const ClimateExplorerPage = lazy(() => import('./pages/ClimateExplorerPage'));
const ReportDetailPage = lazy(() => import('./pages/ReportDetailPage'));
const ReportsListPage = lazy(() => import('./pages/ReportsListPage'));
const LiveMapPage = lazy(() => import('./pages/LiveMapPage'));
const GreenAtlasMagazine = lazy(() => import('./pages/GreenAtlasMagazinePage'));
const PlanetaryIntelligenceSystem = lazy(() => import('./pages/PlanetaryIntelligenceSystem'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
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

// Admin Pages
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const CreateEditArticlePage = lazy(() => import('./pages/CreateEditArticlePage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));

// Under Construction Pages
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const SatelliteDataPage = lazy(() => import('./pages/SatelliteDataPage'));

// 3D Map Pages
const Map3DPage = lazy(() => import('./pages/Map3DPage'));
const City3DPage = lazy(() => import('./pages/City3DPage'));
const DominicaCity3DPage = lazy(() => import('./pages/DominicaCity3DPage'));
const DominicaECharts3D = lazy(() => import('./components/DominicaSmartCity3D'));

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
        <AdminAuthProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-mygreen-light dark:bg-mygreen-darker">
            <ModernNavbar />
            <main className="flex flex-col flex-grow pt-16">
              <Suspense fallback={<div className='flex justify-center items-center h-screen'><Spinner /></div>}>
                <ErrorBoundary>
                  <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={
                    <ErrorBoundary>
                      <AboutPage />
                    </ErrorBoundary>
                  } />
                  
                  {/* Main Dashboard - Under Construction */}
                  <Route path="/dashboard" element={
                    <ErrorBoundary>
                      <UnderConstructionPage />
                    </ErrorBoundary>
                  } />

                  {/* User Authentication & Dashboard */}
                  <Route path="/user/login" element={
                    <ErrorBoundary>
                      <UserLoginPage />
                    </ErrorBoundary>
                  } />
                  
                  <Route path="/user/dashboard" element={
                    <ErrorBoundary>
                      <UserDashboardPage />
                    </ErrorBoundary>
                  } />
                  
                  <Route path="/user/profile" element={
                    <ErrorBoundary>
                      <UnderConstructionPage />
                    </ErrorBoundary>
                  } />
                  
                  {/* 🔥 FAANG-GRADE MISSION CONTROL DASHBOARD */}
                  <Route path="/mission-control-v2" element={
                    <ErrorBoundary>
                      <MissionControlPage />
                    </ErrorBoundary>
                  } />
                  
                  {/* 🔥 FAANG-GRADE ENTERPRISE FEATURES SHOWCASE - HIDDEN FOR PUBLIC */}
                  {/* <Route path="/enterprise-features" element={
                    <ErrorBoundary>
                      <EnterpriseFeaturesPage />
                    </ErrorBoundary>
                  } /> */}
                  
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
                  <Route path="/live-map" element={
                    <ErrorBoundary>
                      <LiveMapPage />
                    </ErrorBoundary>
                  } />
                  
                  {/* 3D MAP - WebGL Environmental Visualization */}
                  <Route path="/map-3d" element={
                    <ErrorBoundary>
                      <Map3DPage />
                    </ErrorBoundary>
                  } />
                  
                  {/* 3D CITY - Roseau Building Visualization */}
                  <Route path="/city-3d" element={
                    <ErrorBoundary>
                      <City3DPage />
                    </ErrorBoundary>
                  } />
                  
                  {/* 3D DOMINICA - Full Island Terrain Visualization */}
                  <Route path="/dominica-3d" element={
                    <ErrorBoundary>
                      <DominicaCity3DPage />
                    </ErrorBoundary>
                  } />
                  
                  {/* 3D MAP - WebGL+DeckGL Dominica Map */}
                  <Route path="/3d-map" element={
                    <ErrorBoundary>
                      <DominicaCity3DPage />
                    </ErrorBoundary>
                  } />
                  
                  {/* 3D DOMINICA - ECharts GL Visualization */}
                  <Route path="/dominica-echarts-3d" element={
                    <ErrorBoundary>
                      <DominicaECharts3D />
                    </ErrorBoundary>
                  } />
                  
                  <Route path="/echarts-3d" element={
                    <ErrorBoundary>
                      <DominicaECharts3D />
                    </ErrorBoundary>
                  } />
                  
                  <Route path="/terrain-3d" element={
                    <ErrorBoundary>
                      <DominicaECharts3D />
                    </ErrorBoundary>
                  } />
                  
                  {/* GREEN ATLAS MAGAZINE ROUTES */}
                  <Route path="/green-atlas-magazine" element={
                    <ErrorBoundary>
                      <GreenAtlasMagazine />
                    </ErrorBoundary>
                  } />
                  <Route path="/magazine" element={
                    <ErrorBoundary>
                      <GreenAtlasMagazine />
                    </ErrorBoundary>
                  } />
                  <Route path="/green-atlas" element={
                    <ErrorBoundary>
                      <GreenAtlasMagazine />
                    </ErrorBoundary>
                  } />
                  <Route path="/magazine/submissions" element={
                    <ErrorBoundary>
                      <GreenAtlasMagazine />
                    </ErrorBoundary>
                  } />
                  <Route path="/planetary-intelligence" element={
                    <ErrorBoundary>
                      <PlanetaryIntelligenceSystem />
                    </ErrorBoundary>
                  } />
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
                  <Route path="/magazine/article/:articleId" element={
                    <ErrorBoundary>
                      <ArticleDetailPage />
                    </ErrorBoundary>
                  } />
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

                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={
                    <ErrorBoundary>
                      <AdminDashboardPage />
                    </ErrorBoundary>
                  } />
                  <Route path="/admin/articles/create" element={
                    <ErrorBoundary>
                      <CreateEditArticlePage />
                    </ErrorBoundary>
                  } />
                  <Route path="/admin/articles/edit/:id" element={
                    <ErrorBoundary>
                      <CreateEditArticlePage />
                    </ErrorBoundary>
                  } />

                  {/* Projects Sub-routes */}
                  <Route path="/projects/active" element={<UnderConstructionPage />} />
                  <Route path="/projects/case-studies" element={<UnderConstructionPage />} />
                  <Route path="/projects/success-stories" element={<UnderConstructionPage />} />
                  <Route path="/projects/testimonials" element={<UnderConstructionPage />} />
                  
                  {/* Resources Sub-routes */}
                  <Route path="/resources/reports" element={<UnderConstructionPage />} />
                  <Route path="/resources/whitepapers" element={<UnderConstructionPage />} />
                  <Route path="/resources/blog" element={<UnderConstructionPage />} />
                  <Route path="/resources/downloads" element={<UnderConstructionPage />} />
                  
                  {/* Other missing pages */}
                  <Route path="/consultation" element={<UnderConstructionPage />} />
                  <Route path="/client-portal" element={
                    <ErrorBoundary>
                      <UserLoginPage />
                    </ErrorBoundary>
                  } />
                  <Route path="/settings" element={<UnderConstructionPage />} />
                  <Route path="/articles" element={
                    <ErrorBoundary>
                      <ArticlesPage />
                    </ErrorBoundary>
                  } />
                  <Route path="/articles/:id" element={
                    <ErrorBoundary>
                      <ArticleDetailPage />
                    </ErrorBoundary>
                  } />

                  {/* Under Construction Pages */}
                  <Route path="/publications" element={<PublicationsPage />} />
                  <Route path="/case-studies" element={<CaseStudiesPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/docs" element={<DocumentationPage />} />
                  <Route path="/satellite" element={<SatelliteDataPage />} />
                  
                  {/* Missing Visualization Routes */}
                  <Route path="/climate-dashboard" element={<UnderConstructionPage />} />
                  <Route path="/maps" element={<UnderConstructionPage />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  
                  {/* Admin Auth Routes */}
                  <Route path="/admin-login" element={
                    <ErrorBoundary>
                      <AdminLoginPage />
                    </ErrorBoundary>
                  } />
                  <Route path="/admin/login" element={
                    <ErrorBoundary>
                      <AdminLoginPage />
                    </ErrorBoundary>
                  } />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </main>
          <Footer />
          <EditorialAssistant />
        </div>
        </AdminAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
