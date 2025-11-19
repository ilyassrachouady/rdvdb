import { useCallback, useRef } from 'react';

/**
 * Enhanced useCallback that memoizes the callback with stable dependencies
 * Helps prevent unnecessary re-renders in child components
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  const ref = useRef<T>();
  const depsRef = useRef(deps);

  // Check if dependencies have changed
  const depsChanged = depsRef.current.some((dep, index) => dep !== deps[index]);

  if (depsChanged || !ref.current) {
    ref.current = callback;
    depsRef.current = deps;
  }

  return useCallback(ref.current, deps);
}