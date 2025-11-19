import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { ViewportScaler } from '@/components/ViewportScaler';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import BookingPage from './pages/public/BookingPage';
import BookingWizard from './pages/public/BookingWizard';
import EnhancedBookingDemo from './pages/public/EnhancedBookingDemo';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import PatientsPage from './pages/dashboard/PatientsPage';
import AppointmentsPage from './pages/dashboard/AppointmentsPage';
import ServicesPage from './pages/dashboard/ServicesPage';
import BillingPage from './pages/dashboard/BillingPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import PatientProfilePage from './pages/dashboard/PatientProfilePage';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-muted-foreground mb-2">Chargement...</div>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<ViewportScaler><LoginPage /></ViewportScaler>} />
      <Route path="/register" element={<ViewportScaler><RegisterPage /></ViewportScaler>} />
      <Route path="/forgot-password" element={<ViewportScaler><ForgotPasswordPage /></ViewportScaler>} />
      <Route path="/dentist/:id" element={<ViewportScaler><BookingPage /></ViewportScaler>} />
      <Route path="/demo" element={<ViewportScaler><EnhancedBookingDemo /></ViewportScaler>} />
      <Route path="/demo-old" element={<ViewportScaler><BookingWizard /></ViewportScaler>} />
      <Route path="/book" element={<ViewportScaler><BookingWizard /></ViewportScaler>} />
      <Route path="/wizard" element={<ViewportScaler><BookingWizard /></ViewportScaler>} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="patients/:id" element={<PatientProfilePage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Default redirect - redirect to login if not authenticated */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
