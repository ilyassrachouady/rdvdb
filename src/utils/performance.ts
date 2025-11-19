/**
 * Performance monitoring utilities
 */

export class PerformanceMonitor {
  private static measurements: Map<string, number> = new Map();

  /**
   * Start measuring performance for a specific operation
   */
  static start(label: string): void {
    this.measurements.set(label, performance.now());
  }

  /**
   * End measurement and optionally log the result
   */
  static end(label: string, logResult = false): number {
    const startTime = this.measurements.get(label);
    if (!startTime) {
      console.warn(`Performance measurement for "${label}" was never started`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.measurements.delete(label);

    if (logResult) {
      console.log(`⚡ ${label}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  /**
   * Measure component render time
   */
  static measureComponent(componentName: string, renderFn: () => any): any {
    this.start(`${componentName} render`);
    const result = renderFn();
    this.end(`${componentName} render`, true);
    return result;
  }

  /**
   * Measure async operations
   */
  static async measureAsync<T>(
    label: string, 
    asyncFn: () => Promise<T>, 
    logResult = false
  ): Promise<T> {
    this.start(label);
    try {
      const result = await asyncFn();
      this.end(label, logResult);
      return result;
    } catch (error) {
      this.end(label, logResult);
      throw error;
    }
  }

  /**
   * Report Web Vitals if available
   */
  static reportWebVitals(): void {
    if ('web-vital' in window) {
      // This would integrate with web-vitals library if installed
      console.log('Web Vitals monitoring enabled');
    }
  }

  /**
   * Memory usage monitoring
   */
  static getMemoryUsage(): any {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  }

  /**
   * Bundle size analysis helper
   */
  static analyzeChunks(): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Analyzing bundle chunks...');
      // This helps identify large chunks during development
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      scripts.forEach(script => {
        const src = (script as HTMLScriptElement).src;
        if (src.includes('chunk')) {
          console.log(`📦 Chunk: ${src.split('/').pop()}`);
        }
      });
    }
  }
}

/**
 * React Performance Hook
 */
import { useEffect } from 'react';

export function usePerformanceMonitor(componentName: string) {
  useEffect(() => {
    PerformanceMonitor.start(`${componentName} mount`);
    return () => {
      PerformanceMonitor.end(`${componentName} mount`, true);
    };
  }, [componentName]);
}