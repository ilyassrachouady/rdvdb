import { useState, useEffect, useCallback } from 'react';

interface ViewportScale {
  scale: number;
  isReady: boolean;
  zoomLevel: number;
  breakpoint: string;
}

interface ScaleConfig {
  baseScale: number;
  minScale: number;
  maxScale: number;
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
}

const DEFAULT_CONFIG: ScaleConfig = {
  baseScale: 1,
  minScale: 0.7,
  maxScale: 1.3,
  breakpoints: {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
};

export const useViewportScale = (config: Partial<ScaleConfig> = {}): ViewportScale => {
  const [scale, setScale] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [breakpoint, setBreakpoint] = useState('md');

  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const getBreakpoint = useCallback((width: number): string => {
    if (width < finalConfig.breakpoints.xs) return 'xs';
    if (width < finalConfig.breakpoints.sm) return 'sm';
    if (width < finalConfig.breakpoints.md) return 'md';
    if (width < finalConfig.breakpoints.lg) return 'lg';
    if (width < finalConfig.breakpoints.xl) return 'xl';
    if (width < finalConfig.breakpoints['2xl']) return '2xl';
    return '3xl';
  }, [finalConfig.breakpoints]);

  const calculateScale = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Detect zoom level (approximate)
    const detectedZoom = Math.round(devicePixelRatio * 100) / 100;
    setZoomLevel(detectedZoom);
    
    // Get current breakpoint
    const currentBreakpoint = getBreakpoint(viewportWidth);
    setBreakpoint(currentBreakpoint);
    
    // Base scale calculation
    let calculatedScale = finalConfig.baseScale;
    
    // Responsive scaling based on viewport width
    const referenceWidth = 1440; // Professional design reference
    const widthRatio = viewportWidth / referenceWidth;
    
    // Breakpoint-specific adjustments
    switch (currentBreakpoint) {
      case 'xs':
        calculatedScale = Math.min(widthRatio * 0.85, 0.9);
        break;
      case 'sm':
        calculatedScale = Math.min(widthRatio * 0.9, 0.95);
        break;
      case 'md':
        calculatedScale = Math.min(widthRatio * 0.95, 1.0);
        break;
      case 'lg':
        calculatedScale = Math.min(widthRatio * 1.0, 1.05);
        break;
      case 'xl':
        calculatedScale = Math.min(widthRatio * 1.0, 1.1);
        break;
      case '2xl':
        calculatedScale = Math.min(widthRatio * 1.05, 1.15);
        break;
      default: // 3xl+
        calculatedScale = Math.min(widthRatio * 1.1, 1.2);
    }
    
    // Zoom compensation
    if (detectedZoom > 1.25) {
      // User zoomed in - scale down UI to maintain proportions
      const zoomFactor = 1 / Math.pow(detectedZoom, 0.6);
      calculatedScale *= zoomFactor;
    } else if (detectedZoom < 0.9) {
      // User zoomed out - scale up UI slightly
      const zoomFactor = Math.min(1.2, 1 / detectedZoom * 0.7);
      calculatedScale *= zoomFactor;
    }
    
    // Height-based adjustments for very short screens
    if (viewportHeight < 600) {
      calculatedScale *= 0.85;
    } else if (viewportHeight < 768) {
      calculatedScale *= 0.9;
    } else if (viewportHeight > 1440) {
      calculatedScale *= 1.05;
    }
    
    // Apply bounds
    calculatedScale = Math.max(finalConfig.minScale, calculatedScale);
    calculatedScale = Math.min(finalConfig.maxScale, calculatedScale);
    
    // Round to avoid micro-adjustments
    return Math.round(calculatedScale * 100) / 100;
  }, [finalConfig, getBreakpoint]);

  const updateScale = useCallback(() => {
    try {
      const newScale = calculateScale();
      setScale(newScale);
      setIsReady(true);
      
      // Set CSS custom property for other components to use
      document.documentElement.style.setProperty('--viewport-scale', newScale.toString());
      
    } catch (error) {
      console.warn('Viewport scale calculation failed:', error);
      setScale(1);
      setIsReady(true);
    }
  }, [calculateScale]);

  useEffect(() => {
    // Initial calculation
    updateScale();

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScale, 150);
    };

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Listen for orientation change (mobile)
    window.addEventListener('orientationchange', () => {
      setTimeout(updateScale, 250);
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(timeoutId);
    };
  }, [updateScale]);

  return { 
    scale, 
    isReady, 
    zoomLevel, 
    breakpoint 
  };
};