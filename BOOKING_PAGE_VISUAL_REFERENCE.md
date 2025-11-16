# 📐 Booking Page Layout Reference

## Desktop Layout (1024px+)

```
┌─────────────────────────────────────────────────────────────┐
│                   PREMIUM HERO CARD                         │
│  ┌──────┐  Dr. Ahmed Benali                 [Share] [Call] │
│  │Avatar│  Orthodontie & Implantologie                     │
│  │ 192  │  "Spécialiste avec 15 ans d'expérience..."       │
│  │  px  │  [Modern Cabinet] [5★ 4.5] [Emergency Care]      │
│  │      │  📍 Casablanca | 📞 +212... | 📧 email...       │
│  └──────┘                                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────┬──────────────────┬────────────────────┐
│   STEPPER (DEMO)    │  MAIN CONTENT    │  SERVICES (STICKY) │
│                     │                  │                    │
│ [✓] Service         │  [Service Select]│  ┌──────────────┐  │
│ [✓] Date & Heure    │  [Calendar]      │  │ Service 1    │  │
│ [✓] Détails         │  [Time Slots]    │  │ 30min • 200  │  │
│ [◐] Confirmation    │  [Patient Form]  │  ├──────────────┤  │
│                     │  [Submit Button] │  │ Service 2    │  │
│                     │                  │  │ 45min • 300  │  │
│                     │                  │  └──────────────┘  │
│                     │                  │                    │
│                     │                  │  ┌──────────────┐  │
│                     │                  │  │  ⭐⭐⭐⭐⭐    │  │
│                     │                  │  │ "Excellent!"  │  │
│                     │                  │  │ Ahmed B.      │  │
│                     │                  │  │ [◄] ●●○ [►]  │  │
│                     │                  │  └──────────────┘  │
└─────────────────────┴──────────────────┴────────────────────┘
```

## Mobile Layout (<768px)

```
┌─────────────────────────────────────┐
│      PREMIUM HERO CARD              │
│  ┌──────┐ Dr. Ahmed Benali          │
│  │Avatar│ Orthodontie...            │
│  │ 144  │ [Modern Cabinet] [5★]     │
│  │ px   │ 📍 Casablanca             │
│  │      │ [Share Button][Call Btn]  │
│  └──────┘                           │
├─────────────────────────────────────┤
│      SERVICE SELECTION              │
│  [ ] Service 1 - 30min - 200 MAD    │
│  [ ] Service 2 - 45min - 300 MAD    │
├─────────────────────────────────────┤
│      CALENDAR + TIME SLOTS          │
│      [Calendar View]                │
│      [ ] Time Slot 1                │
│      [ ] Time Slot 2                │
├─────────────────────────────────────┤
│      PATIENT INFO FORM              │
│  [Name Input]                       │
│  [Phone Input]                      │
│  [Email Input]                      │
│  [Notes Textarea]                   │
│  [Submit Button]                    │
├─────────────────────────────────────┤
│      REVIEWS CAROUSEL               │
│  ⭐⭐⭐⭐⭐                          │
│  "Excellent suivi, très"            │
│  "professionnel..."                 │
│  Ahmed B.                           │
│  [◄] ●●○ [►]                       │
│  Avis 1 sur 3                       │
└─────────────────────────────────────┘

[SUCCESS DIALOG OVERLAY]
    ✓ Rendez-vous confirmé! 🎉
    ─────────────────────────
    📅 Date: Samedi 30 novembre
    🕐 Heure: 10:30
    💼 Service: Consultation
    👤 Patient: Ahmed
    💰 200 MAD
    ─────────────────────────
    [WhatsApp Button]
    [Close Button]
```

---

## Color Palette

### Hero Card Background
```
Linear Gradient (135deg)
  ┌─ Blue 600: #2563eb
  ├─ Blue 700: #1d4ed8
  └─ Blue 900: #111e3f
```

### Form Inputs
```
Default:     border-gray-200
Filled:      border-green-300, bg-green-50
Focused:     border-blue-500
Disabled:    bg-gray-100
```

### Success States
```
Button:     bg-blue-600 hover:bg-blue-700
            shadow-lg hover:shadow-xl
            transform hover:scale-105
            
Checkmark:  text-green-500

Success BG: from-green-50 to-white
```

---

## Interactive States

### Buttons
```
Normal:     Solid color, shadow-lg
Hover:      Darker color, shadow-xl, scale(1.05)
Active:     Scale(0.95) - "press" feedback
Disabled:   Opacity 50, cursor-not-allowed
Loading:    Spinner animation
```

### Form Fields
```
Default:    Border 2px gray-200
Input:      Border green-300, bg-green-50
Checkmark:  Appears on right when filled
```

### Cards
```
Services:   border-2 gray-100
Selected:   border-2 blue-600, bg-blue-50, scale(1.05)
Hover:      shadow-md, border-blue-300
```

---

## Typography Hierarchy

```
Hero Title:       60px / bold       (Desktop: text-5xl lg:text-6xl)
                  48px / bold       (Mobile: text-4xl)
                  
Specialty:        20px / semibold  (text-xl text-blue-100)

Card Titles:      24px / bold      (text-2xl)
                  20px / semibold  (text-xl)

Body Text:        16px / normal    (text-base)
                  14px / normal    (text-sm)

Labels:           14px / semibold  (text-sm)

Small Text:       12px / normal    (text-xs)
```

---

## Spacing System (Tailwind)

```
Outer padding:      p-8 md:p-12 lg:p-16
Card padding:       p-6
Form spacing:       space-y-4 or space-y-5
Grid gaps:          gap-6 or gap-8
```

---

## Animation Keyframes

```
Bounce (Success Icon):
  @keyframes bounce { 0%, 100% { transform: translateY(0) } }

Pulse (Glow):
  @keyframes pulse { 0%, 100% { opacity: 1 } }

Spin (Loading):
  @keyframes spin { to { transform: rotate(360deg) } }

Scale (Hover):
  transition: transform 0.2s ease-out
  hover:scale-105 active:scale-95
```

---

## Responsive Breakpoints

```
Mobile:     < 640px     (sm)
            640px-767px
            
Tablet:     768px-1023px (md, lg)

Desktop:    ≥ 1024px    (lg, xl)
```

---

## Accessibility

- ✅ Color contrast ratios 4.5:1+ (WCAG AA)
- ✅ Checkmarks show validation (not just color)
- ✅ Focus visible outlines on all buttons
- ✅ Form labels linked to inputs
- ✅ Keyboard navigable
- ✅ ARIA labels on carousel buttons
- ✅ Alt text on avatars/icons
- ✅ Semantic HTML structure

---

## Performance Notes

- Smooth animations use `transform` and `opacity` (GPU accelerated)
- No heavy shadows on scroll elements
- Images lazy-loaded where applicable
- Form validation debounced
- Carousel doesn't auto-play (manual only)

---

Generated: November 16, 2025
