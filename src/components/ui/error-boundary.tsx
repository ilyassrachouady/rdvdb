import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-error-600" />
                </div>
              </div>
              <CardTitle className="text-xl text-neutral-900">
                Une erreur s'est produite
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-neutral-600">
                Désolé, quelque chose s'est mal passé. Veuillez réessayer ou retourner à l'accueil.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-neutral-50 p-4 rounded-lg text-sm">
                  <summary className="font-medium cursor-pointer">Détails de l'erreur</summary>
                  <pre className="mt-2 text-xs overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  onClick={this.handleRetry}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Réessayer
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Retour à l'accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
import { useState, useEffect } from 'react';

export const useErrorHandler = () => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const handleError = (error: Error) => {
    console.error('Error caught by useErrorHandler:', error);
    setError(error);
  };

  const resetError = () => {
    setError(null);
  };

  return { handleError, resetError };
};

// Error state components
export const ErrorState = ({ 
  title = "Une erreur s'est produite", 
  message = "Veuillez réessayer plus tard.",
  onRetry,
  showRetry = true,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}) => (
  <div className="error-state">
    <div className="flex justify-center mb-4">
      <div className="w-12 h-12 bg-error-100 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-6 h-6 text-error-600" />
      </div>
    </div>
    <h3>{title}</h3>
    <p>{message}</p>
    {showRetry && onRetry && (
      <Button onClick={onRetry} variant="outline" className="flex items-center gap-2">
        <RefreshCw className="w-4 h-4" />
        Réessayer
      </Button>
    )}
  </div>
);

export const EmptyState = ({ 
  title = "Aucun élément trouvé", 
  message = "Il n'y a rien à afficher pour le moment.",
  action,
  icon: Icon = AlertTriangle
}: {
  title?: string;
  message?: string;
  action?: ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) => (
  <div className="empty-state">
    <div className="flex justify-center mb-4">
      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-neutral-400" />
      </div>
    </div>
    <h3>{title}</h3>
    <p>{message}</p>
    {action}
  </div>
);