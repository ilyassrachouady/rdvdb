# Ocliq – All-in-One Dentist Management System (MVP)

## 🎯 Project Overview

**Ocliq** is a modern, professional web application designed for Moroccan dentists to manage appointments, patients, and offer online booking directly from social media (Instagram, Linktree, WhatsApp).

**Target Users:** Moroccan dentists (non-technical, need intuitive UX)  
**MVP Stage:** Demo with localStorage (no backend yet)  
**Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui

---

## ✨ Key Features (MVP)

### 🌐 Public Booking Page (`/dentist/:id`)
- **Premium dentist hero card** with gradient background, rating, and bio
- **Smart calendar** (Monday-first, Sundays closed, Saturday morning-only)
- **Service selection** with pricing and duration
- **Time slot picker** with real-time availability
- **Patient info form** (name, phone, email, notes)
- **Review carousel** showing authentic patient testimonials
- **One-click share button** (copy link for Instagram/Linktree/WhatsApp)
- **Success confirmation** with booking details

📖 **[See detailed booking page features →](./BOOKING_PAGE_FEATURES.md)**

### 🏥 Private Dentist Dashboard (`/dashboard/*`)
- **Dashboard Home:** Today's appointments, stats, quick add appointment
- **Appointments Page:** Full calendar + list view, filters (today/upcoming/past), status editing
- **Patients Page:** Patient list with search, appointment history, tags
- **Patient Profile:** Detailed view with info tabs, appointment history, medical notes
- **Settings Page:** (Scaffold) Clinic info, working hours, services, vacation dates

### 🔐 Authentication (Demo)
- Mock login (email: `demo@ocliq.ma`, password: `demo`)
- Protected routes (ProtectedRoute wrapper)
- Demo mode toggle with persistent session

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Install & Run
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck

# Lint
npm run lint
```

### Access the App
- **Public Booking:** http://localhost:5173/dentist/demo-dentist-1
- **Dashboard:** http://localhost:5173/dashboard (login with demo credentials)
- **Login Page:** http://localhost:5173/login

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AddAppointmentForm.tsx
│   └── ui/                    # shadcn/ui components
│       ├── calendar.tsx       # Monday-first, Sunday-disabled
│       ├── calendar-scheduler.tsx
│       └── ... (30+ UI components)
├── contexts/
│   └── AuthContext.tsx        # Mock auth with localStorage
├── hooks/
│   └── use-toast.ts
├── layouts/
│   └── DashboardLayout.tsx    # Sidebar + main content
├── lib/
│   ├── api.ts                 # Mock API with localStorage
│   ├── mock-data.ts           # Demo dentist, patients, appointments
│   └── utils.ts
├── pages/
│   ├── auth/                  # Login, Register, Forgot Password
│   ├── dashboard/             # Home, Appointments, Patients, Settings
│   └── public/                # Booking, BookingWizard, PatientDemo
├── types/
│   └── index.ts               # TypeScript interfaces
├── App.tsx                    # Routing
└── main.tsx                   # Entry point
```

---

## 🎨 Design Highlights

### Modern, Minimal, Medical-Grade
- Light mode first (white, grays, soft blues)
- Lots of white space and soft shadows
- Rounded corners (`rounded-xl`)
- lucide-react icons throughout

### Accessible & Responsive
- Touch-friendly buttons (44px min height)
- Mobile-first layout
- Clear typography (readable in clinic lighting)
- French-first UI for Moroccan users

### Performance
- Vite for fast builds
- Code splitting & lazy loading ready
- Optimized images (avatars use DiceBear API)

---

## 📊 Demo Data

### Sample Dentist
- **Name:** Dr. Ahmed Benali
- **Specialty:** Orthodontie & Implantologie
- **Location:** 123 Avenue Mohammed V, Casablanca
- **Services:** Consultation, Détartrage, Blanchiment, Implant, Orthodontie, Soin carie
- **Working Hours:** Mon–Fri 09:00–18:00, Sat 10:00–12:00, Sun Closed
- **Reviews:** 3 authentic testimonials (4–5 stars)

### Sample Patients
- Fatima Alami (VIP, regular)
- Mohammed Idrissi (new)
- Aicha Bensaid (regular)
- Youssef Amrani (VIP)

### Sample Appointments
- Mix of confirmed, pending, completed statuses
- Spread across today and future dates

---

## ⚙️ Configuration

### Environment Variables
None required for demo (everything is localStorage). For production:

```bash
# .env.local (future)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key
```

### Tailwind Config
- Custom colors: blue-600 (primary), slate-50 (background)
- Rounded corners: `rounded-xl` (default)
- Spacing: standard Tailwind scale

### TypeScript
- Strict mode enabled
- Path alias: `@/` → `src/`
- React 18.3.1 with JSX runtime

---

## 🔒 Security Notes (Demo)

⚠️ **Current Demo-Only Behavior:**
- Passwords stored in localStorage (never do in production!)
- All data client-side (localStorage)
- No encryption or server validation
- Mock auth (not real)

✅ **For Production:**
- Use Supabase Authentication or similar
- Server-side session management
- Hash passwords securely
- Validate & sanitize inputs
- Encrypt sensitive data at rest
- Implement rate limiting
- Add audit logging

---

## 📦 Dependencies

### Core
- **React:** 18.3.1 (UI framework)
- **TypeScript:** 5.5.3 (type safety)
- **Vite:** 5.4.8 (build tool)
- **Tailwind CSS:** 3.4.13 (styling)
- **shadcn/ui:** Component library (pre-built, customizable)

### Libraries
- **date-fns:** Date formatting & manipulation (fr locale)
- **react-day-picker:** Calendar component
- **react-hook-form:** Form state management
- **zod:** Schema validation
- **recharts:** Charting (for future analytics)
- **sonner:** Toast notifications
- **lucide-react:** Icon set (500+ icons)

### Dev Tools
- **ESLint:** Code linting
- **TypeScript ESLint:** TS linting
- **PostCSS & Autoprefixer:** CSS processing

---

## 🧪 Testing (Not Implemented Yet)

For production, add:
- **Vitest** for unit tests
- **React Testing Library** for component tests
- **Playwright** for E2E tests

Example test setup:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

---

## 📈 Roadmap

### Phase 1: Enhance Demo (Next)
- [ ] Booking wizard refinements
- [ ] Review management UI
- [ ] Settings page implementation
- [ ] Timezone awareness

### Phase 2: Backend Integration
- [ ] Supabase setup (auth, database, storage)
- [ ] Server-side appointment availability calculation
- [ ] Real patient & review storage
- [ ] WhatsApp Business API integration

### Phase 3: Advanced Features
- [ ] Multi-language support (Arabic, English)
- [ ] Payment processing (pre-booking deposits)
- [ ] SMS/Email notifications
- [ ] Calendar sync (Google, Outlook)
- [ ] Analytics dashboard
- [ ] Assistants & permissions

### Phase 4: Scale
- [ ] Mobile app (React Native)
- [ ] API for 3rd-party integrations
- [ ] Clinic network management
- [ ] Advanced reporting

---

## 🤝 Contributing

### Code Style
- Follow Tailwind class order (Prettier plugin for Tailwind)
- Use `rounded-xl` for buttons/cards
- Component names: PascalCase
- File names: PascalCase for components, kebab-case for utilities

### Branching
- `main`: Production-ready
- `develop`: Dev version (future)
- Feature branches: `feature/booking-enhancements`

---

## 📞 Support

For questions or issues:
- Check `/BOOKING_PAGE_FEATURES.md` for public booking details
- Review `src/types/index.ts` for data structures
- Inspect `src/lib/mock-data.ts` for demo data

---

## 📄 License

Private project. All rights reserved.

---

**Version:** 1.0 (MVP Demo)  
**Last Updated:** November 16, 2025  
**Status:** 🟢 Active Development  
**Target Launch:** Q1 2025
