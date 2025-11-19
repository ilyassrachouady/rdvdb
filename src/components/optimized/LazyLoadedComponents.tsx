import { lazy } from 'react';

/**
 * Lazy-loaded components for better performance
 * These components are only loaded when needed, reducing initial bundle size
 */

// Dashboard Components
export const LazyDashboardHome = lazy(() => import('@/pages/dashboard/DashboardHome'));
export const LazyAppointmentsPage = lazy(() => import('@/pages/dashboard/AppointmentsPage'));
export const LazyPatientsPage = lazy(() => import('@/pages/dashboard/PatientsPage'));
export const LazyBillingPage = lazy(() => import('@/pages/dashboard/BillingPage'));
export const LazyServicesPage = lazy(() => import('@/pages/dashboard/ServicesPage'));
export const LazySettingsPage = lazy(() => import('@/pages/dashboard/SettingsPage'));
export const LazyPatientProfilePage = lazy(() => import('@/pages/dashboard/PatientProfilePage'));

// Public Pages
export const LazyBookingPage = lazy(() => import('@/pages/public/BookingPage'));
export const LazyBookingWizard = lazy(() => import('@/pages/public/BookingWizard'));
export const LazyEnhancedBookingDemo = lazy(() => import('@/pages/public/EnhancedBookingDemo'));

// Auth Pages
export const LazyLoginPage = lazy(() => import('@/pages/auth/LoginPage'));
export const LazyRegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
export const LazyForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));

// Heavy UI Components
export const LazyCalendarScheduler = lazy(() => import('@/components/ui/calendar-scheduler'));
export const LazyEnhancedBookingFlow = lazy(() => import('@/components/ui/enhanced-booking-flow'));
export const LazyChart = lazy(() => import('@/components/ui/chart'));