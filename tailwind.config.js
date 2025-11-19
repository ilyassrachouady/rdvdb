/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      // Fluid Typography System - Responsive & Readable
      fontSize: {
        // Body text - never smaller than 14px, never larger than 16px
        'xs': ['clamp(0.75rem, 0.75rem + 0.1vw, 0.875rem)', { lineHeight: '1.4' }],      // 12-14px
        'sm': ['clamp(0.875rem, 0.875rem + 0.1vw, 0.9375rem)', { lineHeight: '1.5' }],  // 14-15px  
        'base': ['clamp(0.9375rem, 0.9375rem + 0.1vw, 1rem)', { lineHeight: '1.6' }],   // 15-16px (main body)
        'lg': ['clamp(1.0625rem, 1.0625rem + 0.2vw, 1.125rem)', { lineHeight: '1.5' }], // 17-18px
        'xl': ['clamp(1.1875rem, 1.1875rem + 0.3vw, 1.25rem)', { lineHeight: '1.4' }],  // 19-20px
        
        // Headings - Proportional scaling
        '2xl': ['clamp(1.375rem, 1.375rem + 0.5vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '600' }],     // 22-24px (h4)
        '3xl': ['clamp(1.625rem, 1.625rem + 0.75vw, 1.875rem)', { lineHeight: '1.2', fontWeight: '600' }],  // 26-30px (h3)
        '4xl': ['clamp(1.875rem, 1.875rem + 1vw, 2.25rem)', { lineHeight: '1.1', fontWeight: '700' }],      // 30-36px (h2)
        '5xl': ['clamp(2.25rem, 2.25rem + 1.5vw, 3rem)', { lineHeight: '1', fontWeight: '700' }],           // 36-48px (h1)
        
        // Component specific
        'button-sm': ['clamp(0.8125rem, 0.8125rem + 0.1vw, 0.875rem)', { lineHeight: '1.4', fontWeight: '500' }], // 13-14px
        'button': ['clamp(0.875rem, 0.875rem + 0.1vw, 0.9375rem)', { lineHeight: '1.4', fontWeight: '500' }],     // 14-15px
        'button-lg': ['clamp(0.9375rem, 0.9375rem + 0.2vw, 1rem)', { lineHeight: '1.4', fontWeight: '600' }],     // 15-16px
        
        'table': ['clamp(0.8125rem, 0.8125rem + 0.1vw, 0.875rem)', { lineHeight: '1.4' }],    // 13-14px (tables)
        'caption': ['clamp(0.75rem, 0.75rem + 0.1vw, 0.8125rem)', { lineHeight: '1.4' }],     // 12-13px (captions)
      },
      
      // Professional spacing system - Fluid & Proportional
      spacing: {
        'fluid-xs': 'clamp(0.5rem, 0.5rem + 0.5vw, 0.75rem)',      // 8-12px
        'fluid-sm': 'clamp(0.75rem, 0.75rem + 0.75vw, 1.25rem)',   // 12-20px  
        'fluid-md': 'clamp(1.25rem, 1.25rem + 1vw, 2rem)',         // 20-32px
        'fluid-lg': 'clamp(2rem, 2rem + 1.5vw, 3rem)',             // 32-48px
        'fluid-xl': 'clamp(3rem, 3rem + 2vw, 4.5rem)',             // 48-72px
        'fluid-2xl': 'clamp(4rem, 4rem + 3vw, 6rem)',              // 64-96px
        
        // Component spacing
        'section-padding': 'clamp(1.5rem, 1.5rem + 2vw, 3rem)',    // Section padding
        'card-padding': 'clamp(1rem, 1rem + 1vw, 1.5rem)',         // Card internal padding
        'form-spacing': 'clamp(1rem, 1rem + 0.5vw, 1.25rem)',      // Form field spacing
      },
      // Professional border radius system
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'DEFAULT': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      // Professional dental/medical color system
      colors: {
        // Background and surfaces
        background: 'rgb(255 255 255)',
        surface: 'rgb(248 250 252)',
        'surface-raised': 'rgb(255 255 255)',
        
        // Foreground colors
        foreground: 'rgb(15 23 42)',
        'foreground-muted': 'rgb(100 116 139)',
        
        // Primary Blue (Medical Trust) - keeping your blue theme
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Main primary
          600: '#2563eb',  // Your existing blue - hover states
          700: '#1d4ed8',  // Active states
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        
        // Secondary Teal (Dental Fresh) - keeping your teal theme
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',  // Main secondary
          600: '#0d9488',  // Your existing teal
          700: '#0f766e',  // Deeper teal
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
          DEFAULT: '#0d9488',
          foreground: '#ffffff',
        },
        
        // Professional neutral grays
        neutral: {
          0: '#ffffff',     // Pure white
          50: '#f8fafc',    // Light backgrounds
          100: '#f1f5f9',   // Card backgrounds
          200: '#e2e8f0',   // Borders
          300: '#cbd5e1',   // Input borders
          400: '#94a3b8',   // Placeholder text
          500: '#64748b',   // Secondary text - replacing your slate-600
          600: '#475569',   // Body text - replacing your slate-700
          700: '#334155',   // Headings - replacing your slate-800
          800: '#1e293b',   // Dark headings - replacing your slate-900
          900: '#0f172a',   // High emphasis
          950: '#020617',
        },
        
        // Semantic colors (medical meaning)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',   // Completed appointments, payments
          600: '#16a34a',   // Hover
          700: '#15803d',   // Active
          DEFAULT: '#22c55e',
          foreground: '#ffffff',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',   // Pending items, attention needed
          600: '#d97706',   // Hover
          700: '#b45309',   // Active
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',   // Cancelled, failed, errors
          600: '#dc2626',   // Hover
          700: '#b91c1c',   // Active
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        info: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',   // Information, help text
          600: '#0284c7',   // Hover
          700: '#0369a1',   // Active
          DEFAULT: '#0ea5e9',
          foreground: '#ffffff',
        },
        
        // Legacy shadcn/ui colors for compatibility
        card: {
          DEFAULT: 'rgb(255 255 255)',
          foreground: 'rgb(15 23 42)',
        },
        popover: {
          DEFAULT: 'rgb(255 255 255)',
          foreground: 'rgb(15 23 42)',
        },
        muted: {
          DEFAULT: 'rgb(248 250 252)',
          foreground: 'rgb(100 116 139)',
        },
        accent: {
          DEFAULT: 'rgb(248 250 252)',
          foreground: 'rgb(15 23 42)',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: 'rgb(226 232 240)',
        input: 'rgb(226 232 240)',
        ring: '#2563eb',
        
        // Chart colors (professional medical palette)
        chart: {
          1: '#2563eb', // Primary blue
          2: '#0d9488', // Teal
          3: '#22c55e', // Success green
          4: '#f59e0b', // Warning amber
          5: '#ef4444', // Error red
        },
      },
      // Responsive fluid typography system
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.75rem' }],
        'xl': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.75rem' }],
        '2xl': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '2rem' }],
        '3xl': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '2.25rem' }],
        '4xl': ['clamp(2rem, 4vw, 2.5rem)', { lineHeight: '2.5rem' }],
        '5xl': ['clamp(2.5rem, 5vw, 3rem)', { lineHeight: '1.1' }],
        '6xl': ['clamp(3rem, 6vw, 3.75rem)', { lineHeight: '1.1' }],
        // Medical/dental specific sizes
        'display': ['clamp(2rem, 4vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'title': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'heading': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'subheading': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.5', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      // Professional shadows
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      // Professional animations
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
      },
      // Professional screen breakpoints
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Custom plugin for professional utilities
    function({ addUtilities }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      })
    }
  ],
};
