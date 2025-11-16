# Ocliq - Dentist Booking SaaS
## Vercel Deployment Guide

### Quick Start (Vercel)

1. **Connect your repository**
   - Go to https://vercel.com/new
   - Import this repository from GitHub
   - Select "Create a new project"

2. **Configure build settings**
   - Framework: **Vite** (auto-detected)
   - Build Command: `npm run build` (already in vercel.json)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (already in vercel.json)

3. **Set environment variables** (in Vercel dashboard)
   - Leave empty for demo mode (uses localStorage)
   - Or add Supabase keys if you want real backend:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_KEY`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically:
     - Install dependencies
     - Build the Vite project
     - Deploy to edge network
     - SPA routing will work on all routes ✓

---

### How Routes Work (SPA Routing)

The `vercel.json` file includes:
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

This ensures that:
- **Page reloads work** ✓ (e.g., `/dentist/demo-dentist-1` refreshes correctly)
- **Deep linking works** ✓ (can share `/demo` or `/dentist/:id` URLs)
- **Client-side routing works** ✓ (React Router handles all navigation)
- **All routes fallback to index.html** ✓ (needed for SPA)

---

### Available Routes

| Route | Purpose |
|-------|---------|
| `/login` | User login |
| `/register` | User registration |
| `/forgot-password` | Password recovery |
| `/dentist/:id` | Public booking page |
| `/demo` | Booking wizard demo |
| `/book` | Alternative booking page |
| `/wizard` | Step wizard view |
| `/dashboard` | Protected dentist dashboard |
| `/dashboard/patients` | Patient list |
| `/dashboard/appointments` | Appointment management |
| `/dashboard/settings` | Account settings |

---

### Environment Variables

Create a `.env.local` file (copied from `.env.example`):

```bash
# Optional: API URL for future backend
VITE_API_URL=https://your-api.com

# Optional: Supabase keys for real database
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_KEY=eyJxx...
```

---

### Building Locally

```bash
# Install dependencies
npm install

# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run typecheck
```

---

### Deployment Checklist

- [x] `vercel.json` configured with SPA rewrites
- [x] `.vercelignore` created (excludes unnecessary files)
- [x] Build scripts in `package.json` are correct
- [x] Environment variables template created (`.env.example`)
- [x] All routes configured in React Router
- [x] Calendar component works with Monday-first layout
- [x] Available slots show in green
- [x] Sunday is disabled in bookings
- [x] Saturday is morning-only (10:00-12:00)

---

### Testing Deployment Locally

To test that routes work correctly after build:

```bash
npm run build
npm run preview
```

Then visit routes and reload the page:
- http://localhost:4173/dentist/demo-dentist-1
- http://localhost:4173/demo
- http://localhost:4173/login
- (Reload each page - should not 404)

---

### Common Issues

**Q: Routes 404 after reload?**
A: Make sure `vercel.json` is in the root with the rewrites rule. Vercel will automatically use it.

**Q: Static assets 404?**
A: Vite auto-generates correct asset paths. The `Cache-Control` header in vercel.json helps with performance.

**Q: Environment variables not loading?**
A: Add them in Vercel dashboard → Project Settings → Environment Variables. Restart build after adding.

**Q: Build fails?**
A: Run `npm run typecheck` locally to catch TypeScript errors before pushing.

---

### Next Steps

1. Push this code to GitHub
2. Go to vercel.com/new
3. Import the repository
4. Set environment variables (if needed)
5. Click Deploy ✓

Your app will be live with working routes on every page reload!

---

### Support

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev
- React Router Docs: https://reactrouter.com
