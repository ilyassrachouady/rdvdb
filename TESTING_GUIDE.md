# 🧪 Quick Testing Guide – Booking Page v2

## 🚀 Get Started (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:5173/dentist/demo-dentist-1
```

---

## ✅ Test Scenarios

### Scenario 1: First-Time Visit (Trust Building)
**Goal:** Verify that a patient feels confident booking

**Steps:**
1. Visit `http://localhost:5173/dentist/demo-dentist-1`
2. ✓ See hero card with Dr. Ahmed's photo, specialty, and location
3. ✓ See 4.7-star rating and "(3 avis)"
4. ✓ Scroll to services on right: Consultation, Détartrage, Blanchiment, etc.
5. ✓ Scroll to reviews carousel: read testimonials
6. ✓ Click arrow to navigate between reviews
7. ✓ Feel confident → proceed to book

**Expected:** Hero section feels premium, reviews build trust ✓

---

### Scenario 2: Calendar Behavior (Business Hours)
**Goal:** Verify Monday-first, Sunday closed, Saturday morning-only

**Steps:**
1. On booking page, scroll to "Date et heure" section
2. ✓ Check weekday labels: **Lun, Mar, Mer, Jeu, Ven, Sam, Dim**
3. ✓ Try clicking any **Sunday** (should be disabled/grayed out)
4. ✓ Click a **Saturday** date
5. ✓ Check available time slots: should show **10:00–12:00 only** (NOT 14:00–16:00)
6. ✓ Click a **weekday** (Mon–Fri)
7. ✓ Check available time slots: should show **09:00–18:00 range**
8. ✓ See legend below calendar explaining "Dimanche: fermé" and "Samedi: matin uniquement"

**Expected:** Calendar respects business hours, Sunday disabled ✓

---

### Scenario 3: Service Selection with Pricing
**Goal:** Verify services display with prices and durations

**Steps:**
1. Scroll to top, find **"Service"** section in booking form
2. Click dropdown → see services:
   - Consultation (30 min, 200 MAD)
   - Détartrage (45 min, 300 MAD)
   - Blanchiment (60 min, 1500 MAD)
   - Implant dentaire (120 min, 5000 MAD)
   - Orthodontie (45 min, 400 MAD)
   - Soin carie (45 min, 500 MAD)
3. ✓ Select "Blanchiment"
4. ✓ Right sidebar shows updated service list with "Blanchiment" highlighted
5. ✓ Booking form shows selected service

**Expected:** Services with pricing visible and selectable ✓

---

### Scenario 4: Complete Booking Flow
**Goal:** End-to-end booking without errors

**Steps:**
1. **Service:** Select "Consultation" from dropdown
2. **Date:** Click a date (e.g., next Monday or Thursday)
3. ✓ Time slots appear for that date
4. **Time:** Click a time slot (e.g., 10:00)
5. ✓ Time highlighted in blue
6. **Patient Info:**
   - Name: Enter "Saliha Benani"
   - Phone: Enter "+212 6 12 34 56 78"
   - Email: (leave blank or enter)
   - Notes: (leave blank or enter "First-time patient")
7. ✓ Click **[✓ Confirmer ma réservation]** button
8. ✓ Success dialog appears with booking summary:
   - Date: (formatted in French, e.g., "jeudi 20 novembre 2024")
   - Heure: "10:00"
   - Service: "Consultation"
   - Patient: "Saliha Benani"
9. ✓ Dialog shows "Votre rendez-vous a été confirmé. Vous recevrez une confirmation par WhatsApp."

**Expected:** Booking completes, success dialog appears ✓

---

### Scenario 5: Form Validation
**Goal:** Verify required fields are enforced

**Steps:**
1. Leave all fields blank
2. ✓ Button **[✓ Confirmer ma réservation]** is disabled
3. Enter Name: "Saliha"
4. ✓ Button still disabled
5. Enter Phone: "+212 6 12 34 56 78"
6. ✓ Button still disabled (missing date/time/service)
7. Select Service: "Détartrage"
8. Select Date: Any date
9. Select Time: Any slot
10. ✓ Button now enabled
11. Click button → success dialog appears

**Expected:** Form validation works, button disabled until all required fields filled ✓

---

### Scenario 6: Share Button (Copy to Clipboard)
**Goal:** Verify dentist can share link on social media

**Steps:**
1. Scroll to hero card
2. ✓ See **[📤 Partager]** button next to rating
3. Click the button
4. ✓ See toast notification: "✓ Lien copié! Partagez sur Instagram ou WhatsApp"
5. Open new tab, paste URL (Ctrl+V or Cmd+V)
6. ✓ Same booking page loads (proves link was copied)

**Expected:** Link copied to clipboard, shareable on social media ✓

---

### Scenario 7: Review Carousel Navigation
**Goal:** Verify carousel navigation and display

**Steps:**
1. Scroll to right sidebar, find **"Avis des patients"** card
2. ✓ See first review displayed:
   - Name: "Saliha B."
   - Rating: 5 stars (filled)
   - Comment: "Excellent suivi, très professionnel. Cabinet propre et personnel sympathique."
   - Date: "février 2024"
3. ✓ See navigation buttons (< and >) and dots (•••)
4. Click **[>]** (next) button
5. ✓ Review changes to second review: "Youssef A." (4 stars)
6. Click **[>]** again
7. ✓ Review changes to third: "Nadia R." (5 stars)
8. Click **[>]** again
9. ✓ Wraps back to first review (carousel loops)
10. ✓ Dot indicator shows "1 sur 3 avis"

**Expected:** Carousel navigates smoothly, dots track position ✓

---

### Scenario 8: Responsive Design (Mobile)
**Goal:** Verify mobile layout stacks properly

**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Set to iPhone 12 (390px)
4. ✓ Hero card is full-width
5. ✓ Booking form stacks on top (no side-by-side)
6. ✓ Services + reviews stack below
7. ✓ All buttons are large (touch-friendly, 44px+)
8. ✓ No horizontal scrolling
9. Scroll to test all sections load properly

**Expected:** Mobile layout is clean, no overflow ✓

---

### Scenario 9: Tablet Layout
**Goal:** Verify medium-screen responsiveness

**Steps:**
1. DevTools → iPad (768px)
2. ✓ Booking form on left, services on right (2-column)
3. ✓ Reviews card is responsive
4. ✓ All text readable
5. ✓ Buttons properly sized

**Expected:** Tablet layout is balanced ✓

---

### Scenario 10: French Localization
**Goal:** Verify all text is in French and correct

**Steps:**
1. Review all visible text:
   - ✓ "Service" (not "Service Selection")
   - ✓ "Date et heure" (not "Date and Time")
   - ✓ "Vos informations" (not "Your Info")
   - ✓ "Nom complet *" (not "Full Name")
   - ✓ "Téléphone *" (not "Phone")
   - ✓ "✓ Confirmer ma réservation" (not "Book Appointment")
2. ✓ Check date format: "jeudi 20 novembre 2024" (not "November 20, 2024")
3. ✓ Check French locale in reviews: "février 2024" (not "February 2024")

**Expected:** All text in French ✓

---

## 🐛 Common Issues & Fixes

### Issue: Calendar shows all dates, including Sunday
**Fix:** Check `src/components/ui/calendar.tsx` for `mergedDisabled` function. Sundays (date.getDay() === 0) should be disabled.

### Issue: Saturday shows slots beyond 12:00
**Fix:** Check `src/lib/mock-data.ts`. Saturday working hours should be `{ start: '10:00', end: '12:00', enabled: true }`.

### Issue: Share button doesn't copy
**Fix:** Verify `navigator.clipboard` is supported (Chrome 63+, Safari 13.1+). Check browser console for errors.

### Issue: Reviews carousel doesn't navigate
**Fix:** Check `reviewCarouselIndex` state and `handleNextReview`/`handlePrevReview` functions in BookingPage.tsx.

### Issue: Form submit button always disabled
**Fix:** Verify all state variables are set (selectedDate, selectedTime, selectedService, patientName, patientPhone).

---

## 📊 Performance Checks

```bash
# TypeScript compilation (no errors)
npm run typecheck

# ESLint (code quality)
npm run lint

# Build size
npm run build
# Output shows: app-*.js, vendor-*.js files
```

---

## 📱 Screenshot Checklist

- [ ] Take screenshot of hero card (premium feeling)
- [ ] Take screenshot of booking form (clean layout)
- [ ] Take screenshot of calendar (Monday-first)
- [ ] Take screenshot of review carousel (trust-building)
- [ ] Take screenshot of mobile layout
- [ ] Take screenshot of success dialog

---

## ✨ Success Criteria (All Should Pass)

- ✅ Booking page loads without errors
- ✅ Hero card displays beautifully (blue gradient, large avatar)
- ✅ Calendar is Monday-first (Lun → Dim)
- ✅ Sundays are disabled (can't select)
- ✅ Saturday shows morning slots only (10:00–12:00)
- ✅ Services display with pricing (6 services total)
- ✅ Time slots update when date changes
- ✅ Form validation works (button disabled until required fields filled)
- ✅ Booking success dialog appears with summary
- ✅ Share button copies link to clipboard
- ✅ Review carousel navigates with prev/next buttons
- ✅ All text is in French
- ✅ Mobile layout stacks properly (no overflow)
- ✅ All buttons are large (touch-friendly)

---

## 🎥 Demo Script (For Client/Team)

> "Meet Ocliq—the all-in-one booking solution for Moroccan dentists."
>
> **[Open booking page]**
> "Here's the public booking page that dentists share on Instagram or Linktree. Notice the premium hero section with Dr. Ahmed's photo, specialty, and location. Right below the bio, we show an average rating (4.7 stars) and patient reviews to build trust."
>
> **[Scroll to reviews]**
> "Here are real testimonials from patients. Dentists can now browse reviews, and with one click, they share this link—which shows their expertise and patient satisfaction."
>
> **[Click Share button]**
> "Boom—link copied. They can paste it on Instagram, WhatsApp, or their Linktree, and patients can book directly without leaving social media."
>
> **[Select service and date]**
> "When patients book, they pick a service, a date, and a time. Notice the calendar respects Moroccan business hours: Sunday is closed (grayed out), Saturday is morning-only (10:00–12:00 only), and weekdays run 09:00–18:00."
>
> **[Fill form and book]**
> "They fill in their name and phone, click confirm, and get a WhatsApp confirmation. Done. Simple. Professional."

---

**Last Updated:** November 16, 2025  
**Status:** Ready for Testing ✅
