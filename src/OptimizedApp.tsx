import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { ViewportScaler } from '@/components/ViewportScaler';
import { LoadingSuspense } from '@/components/ui/LoadingSuspense';
import DashboardLayout from './layouts/DashboardLayout';
import { PerformanceMonitor } from '@/utils/performance';
import './App.css';

// Lazy load components for better performance
const LazyLoginPage = lazy(() => import('./pages/auth/LoginPage'));
const LazyRegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const LazyForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const LazyBookingPage = lazy(() => import('./pages/public/BookingPage'));
const LazyBookingWizard = lazy(() => import('./pages/public/BookingWizard'));
const LazyEnhancedBookingDemo = lazy(() => import('./pages/public/EnhancedBookingDemo'));

// Dashboard pages - lazy loaded
const LazyDashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const LazyPatientsPage = lazy(() => import('./pages/dashboard/PatientsPage'));
const LazyAppointmentsPage = lazy(() => import('./pages/dashboard/AppointmentsPage'));
const LazyServicesPage = lazy(() => import('./pages/dashboard/ServicesPage'));
const LazyBillingPage = lazy(() => import('./pages/dashboard/BillingPage'));
const LazySettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));
const LazyPatientProfilePage = lazy(() => import('./pages/dashboard/PatientProfilePage'));

// Optimized Protected Route Component
const ProtectedRoute = React.memo(({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSuspense size="lg" text="Authentification..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
});

ProtectedRoute.displayName = 'ProtectedRoute';

// Optimized Route Wrapper with Suspense
const SuspenseRoute = React.memo(({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => (
  <Suspense fallback={fallback || <LoadingSuspense />}>
    {children}
  </Suspense>
));

SuspenseRoute.displayName = 'SuspenseRoute';

// Optimized Viewport Wrapper
const ViewportWrapper = React.memo(({ children }: { children: React.ReactNode }) => (
  <ViewportScaler>{children}</ViewportScaler>
));

ViewportWrapper.displayName = 'ViewportWrapper';

function AppRoutes() {
  React.useEffect(() => {
    // Initialize performance monitoring
    PerformanceMonitor.reportWebVitals();
    PerformanceMonitor.analyzeChunks();
  }, []);

  return (
    <Routes>
      {/* Public Routes with lazy loading */}
      <Route 
        path="/login" 
        element={
          <SuspenseRoute fallback={<LoadingSuspense text="Chargement de la connexion..." />}>
            <ViewportWrapper>
              <LazyLoginPage />
            </ViewportWrapper>
          </SuspenseRoute>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <SuspenseRoute fallback={<LoadingSuspense text="Chargement de l'inscription..." />}>
            <ViewportWrapper>
              <LazyRegisterPage />
            </ViewportWrapper>
          </SuspenseRoute>
        } 
      />
      
      <Route 
        path="/forgot-password" 
        element={
          <SuspenseRoute fallback={<LoadingSuspense text="Chargement..." />}>
            <ViewportWrapper>
              <LazyForgotPasswordPage />
            </ViewportWrapper>
          </SuspenseRoute>
        } 
      />
      
      <Route 
        path="/dentist/:id" 
        element={
          <SuspenseRoute fallback={<LoadingSuspense text="Chargement de la réservation..." />}>
            <ViewportWrapper>
              <LazyBookingPage />
            </ViewportWrapper>
          </SuspenseRoute>
        } 
      />
      
      <Route 
        path="/demo" 
        element={
          <SuspenseRoute fallback={<LoadingSuspense text="Chargement de la démo..." />}>
            <ViewportWrapper>
              <LazyEnhancedBookingDemo />
            </ViewportWrapper>
          </SuspenseRoute>
        } 
      />
      
      <Route 
        path="/demo-old" 
        element={
          <SuspenseRoute fallback={<LoadingSuspense text="Chargement..." />}>
            <ViewportWrapper>
              <LazyBookingWizard />
            </ViewportWrapper>
          </SuspenseRoute>
        } 
      />
      
      <Route 
        path="/book" 
        element={
          <SuspenseRoute fallback={<LoadingSuspense text="Chargement..." />}>
            <ViewportWrapper>
              <LazyBookingWizard />
            </ViewportWrapper>
          </SuspenseRoute>
        } 
      />
      
      <Route 
        path="/wizard" 
        element={
          <SuspenseRoute fallback={<LoadingSuspense text="Chargement..." />}>
            <ViewportWrapper>
              <LazyBookingWizard />
            </ViewportWrapper>
          </SuspenseRoute>
        } 
      />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route 
          index 
          element={
            <SuspenseRoute fallback={<LoadingSuspense text="Chargement du tableau de bord..." />}>
              <LazyDashboardHome />
            </SuspenseRoute>
          } 
        />
        
        <Route 
          path="patients" 
          element={
            <SuspenseRoute fallback={<LoadingSuspense text="Chargement des patients..." />}>
              <LazyPatientsPage />
            </SuspenseRoute>
          } 
        />
        
        <Route 
          path="patients/:id" 
          element={
            <SuspenseRoute fallback={<LoadingSuspense text="Chargement du profil patient..." />}>
              <LazyPatientProfilePage />
            </SuspenseRoute>
          } 
        />
        
        <Route 
          path="appointments" 
          element={
            <SuspenseRoute fallback={<LoadingSuspense text="Chargement des rendez-vous..." />}>
              <LazyAppointmentsPage />
            </SuspenseRoute>
          } 
        />
        
        <Route 
          path="services" 
          element={
            <SuspenseRoute fallback={<LoadingSuspense text="Chargement des services..." />}>
              <LazyServicesPage />
            </SuspenseRoute>
          } 
        />
        
        <Route 
          path="billing" 
          element={
            <SuspenseRoute fallback={<LoadingSuspense text="Chargement de la facturation..." />}>
              <LazyBillingPage />
            </SuspenseRoute>
          } 
        />
        
        <Route 
          path="settings" 
          element={
            <SuspenseRoute fallback={<LoadingSuspense text="Chargement des paramètres..." />}>
              <LazySettingsPage />
            </SuspenseRoute>
          } 
        />
      </Route>

      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function OptimizedApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default OptimizedApp;