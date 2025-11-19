import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'date-fns',
      'clsx',
      'tailwind-merge'
    ],
    exclude: ['lucide-react'],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React chunks
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          
          // UI Component chunks
          'radix-core': [
            '@radix-ui/react-slot', 
            '@radix-ui/react-dialog', 
            '@radix-ui/react-select',
            '@radix-ui/react-dropdown-menu'
          ],
          'radix-ui': [
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-tabs'
          ],
          
          // Utility chunks
          'date-utils': ['date-fns'],
          'form-utils': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'style-utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          
          // Chart and visualization
          'charts': ['recharts'],
          
          // Icons (kept separate due to tree-shaking)
          'icons': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 500, // Lower threshold for better performance monitoring
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
});
