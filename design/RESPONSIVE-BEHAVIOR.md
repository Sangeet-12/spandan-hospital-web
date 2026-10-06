# Spandan Hospital: Responsive Behavior & Mobile-First Strategy

> **Document Type:** Responsive Layout Architecture & Cross-Device Ergonomics  
> **Target Entity:** Spandan Hospital (Lalghati / Airport Road, Bhopal, MP)  
> **Platform Paradigm:** Reusable Hospital Digital Platform  
> **Primary Viewport Context:** Mobile-first because patients commonly discover and contact healthcare providers from phones.  
> **Compliance Target:** Zero Horizontal Scroll, 60fps Scrolling, WCAG 2.2 Touch Target Compliance ($\ge 48\times 48\text{px}$)  

---

## 1. Responsive Viewport Breakpoint System

The application uses standard Tailwind CSS mobile-first breakpoints aligned with modern device screen categories:

| Breakpoint | Viewport Range | Target Devices | Layout Behavior |
| :--- | :--- | :--- | :--- |
| **Mobile (`base`)** | `< 640px` (320px – 639px) | iPhone SE, iPhone 14/15, Samsung Galaxy, Redmi/Realme | Single-column stack, sticky bottom action bar, hamburger navigation drawer, full-width buttons. |
| **Tablet (`sm` & `md`)** | `640px – 1023px` | iPad Mini, iPad Air, Android tablets, foldable phones | 2-column service cards, side-by-side doctor cards, expanded quick action bar, persistent top bar. |
| **Desktop (`lg`)** | `1024px – 1279px` | Laptops, MacBook Air, desktop monitors | 12-column grid, full horizontal navigation, split hero (60/40), 3-column service grid, bottom bar hidden. |
| **Wide Desktop (`xl` & `2xl`)** | $\ge 1280px$ | High-res monitors, 4K displays | Maximum container capped at `1280px` (`max-w-7xl`), centered with generous auto-margins, enhanced whitespace. |

---

## 2. Mobile-First Ergonomics & Thumb Zone Architecture

In an acute healthcare scenario (e.g., sudden chest discomfort, palpitation, or family member arranging urgent transport), a user typically operates their mobile phone with **one hand** while walking, sitting in a vehicle, or managing distress.

```text
┌───────────────────────────────────────┐
│ MOBILE SCREEN ERGONOMIC THUMB ZONES   │
├───────────────────────────────────────┤
│ [ HARD TO REACH: TOP CORNERS ]        │
│ • Logo, Hamburger Menu                │
│ • Direct Emergency Call Icon          │
│                                       │
│ [ NATURAL VIEWING AREA ]              │
│ • Hero Headline & Subtext             │
│ • Doctor Qualifications               │
│ • Operational Status Badges           │
│                                       │
│ [ NATURAL ONE-HAND THUMB ZONE ]       │
│ • Quick Action Cards                  │
│ • Form Input Fields & Radios          │
│ • "Submit Request" Primary CTA        │
│                                       │
│ [ ALWAYS WITHIN IMMEDIATE REACH ]     │
│ ┌───────────────────────────────────┐ │
│ │ STICKY MOBILE ACTION BAR          │ │
│ │ [ Call ]  [ WhatsApp ]  [ Book ]  │ │
│ └───────────────────────────────────┘ │
│ [ iOS Home Indicator Safe Area ]      │
└───────────────────────────────────────┘
```

### Key Mobile Ergonomic Rules:
1. **Persistent Bottom Action Bar:** The three highest-value actions—`Call Desk`, `WhatsApp`, and `Book Appointment`—remain fixed at the bottom of the mobile screen (`bottom-0`) across all scroll positions.
2. **Safe Area Insets:** To prevent interface overlap on modern iOS and Android devices, the bottom bar accounts for hardware home indicators:
   ```css
   padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
   ```
3. **No Small Taps:** Every interactive element on mobile has a hit target of at least $48\times 48\text{px}$.
4. **Input Zoom Prevention:** Form inputs use `font-size: 16px` (`text-base`) on mobile to prevent iOS Safari from triggering disruptive auto-zoom upon focus.
5. **Numeric Keypad Defaults:** Mobile phone numbers utilize `type="tel"` and `inputMode="numeric"`, instantly displaying the oversized numeric keypad.

---

## 3. Section-by-Section Responsive Behavior Matrix

The following matrix specifies how each of the 11 homepage sections adapts from mobile to desktop:

| # | Section | Mobile Behavior (`< 640px`) | Tablet Behavior (`640px – 1023px`) | Desktop Behavior (`\ge 1024px`) |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Header** | Sticky 56px height. Logo left, Emergency Call icon right, Hamburger button. Nav links hidden in slide-over drawer. | Sticky 64px height. Logo + Emergency pill badge + compact menu links + "Book Consultation" button. | Sticky 72px height. Full logo, 6 text navigation links, Red Emergency Call button, Solid "Book Appointment" CTA. |
| **2** | **Hero** | Stacked single-column. Doctor credential badge, Display headline (36px), 2 full-width stacked buttons, visual frame below. | 2-column or stacked with larger headline (44px), side-by-side action buttons, visual frame (50% height). | Split 60/40 layout. Left: Headline (52px), subtext, side-by-side CTAs. Right: High-res visual container with floating credibility badge. |
| **3** | **Quick Actions** | 2×2 grid of touch cards (min height 64px) or horizontal snap carousel directly beneath hero. | 4-column horizontal bar with icon + 2-line label per card. | 4-column horizontal floating bar elevated over hero junction (`--shadow-lg`). |
| **4** | **Why Spandan** | Single-column stack of 4 cards with 16px vertical gap. Centered header. | 2×2 grid of cards with subtle teal icons and border outlines. | 4-column horizontal grid across full container width with hover elevation. |
| **5** | **Meet the Doctors** | **Stacked 1-column:** Dr. Rohit profile card followed by Dr. Shashank profile card. Portraits fill top 45% of card. Full-width "Book" buttons. | Side-by-side 2-column grid. Doctors displayed symmetrically. Full credentials and OPD hours visible. | **Prominent 2-column showcase:** Large expansive cards (580px width each) with horizontal layout (portrait left, qualifications right) and direct CTA. |
| **6** | **Cardiac Care / Services** | Single-column accordion or compact stacked cards. "Inquire" button on each. | 2-column grid of 6 service blocks with 20px gap. | 3-column grid of 6 service blocks with 24px gutter. Subtle hover lift on each card. |
| **7** | **Patient Stories** | Swipeable 1-card carousel with touch gesture and pagination indicator dots. | 2-column cards showing featured review + supporting review. | Featured review (60% width) paired with 2 stacked supporting reviews (40% width). |
| **8** | **Hospital Experience** | Vertical step-by-step timeline (1 to 4) with connecting dashed line. Visiting hours in a clean card below. | Vertical timeline alongside visiting hours card in a 2-column split. | Horizontal 4-step progression process with icons, followed by side-by-side visiting hours and amenities guide. |
| **9** | **Appointment CTA** | Full-width single-column form. Large date inputs, native select menus, full-width primary submit button. | Centered container (`max-w-lg`). 2-column inputs for Date and Time Slot. | Centered high-trust container (`max-w-xl`) with subtle border, 2-column inputs for Name/Phone and Date/Slot. |
| **10** | **Contact & Location** | Embedded Google Map (260px height) + Stacked contact buttons (Tap to Call, WhatsApp, Get Directions). | 2-column split: Left: Contact details & OPD hours; Right: Embedded map (320px height). | 2-column split (50/50): Left: Full address, desk phones, emergency hours; Right: Large interactive map (420px height). |
| **11** | **Footer** | Single-column stack. Identity block ➔ Quick links ➔ OPD hours ➔ Legal disclaimers & Staff login link. | 2-column layout collapsing into full-width disclaimer bottom strip. | 4-column layout: About, Quick Links, Clinical Services, Emergency & OPD. Full-width bottom bar with disclaimers and staff login. |
| **—** | **Mobile Action Bar** | **Visible & Sticky** at viewport bottom (`h-14` + safe area). Call, WhatsApp, Book Appointment. | Visible on smaller tablets (`< 768px`); hidden on larger tablets. | **Strictly Hidden** (`hidden md:hidden`). Desktop uses persistent header CTAs. |

---

## 4. Tablet Intermediate Optimization (`640px – 1023px`)

Tablet devices represent an essential demographic (older patients using iPads at home, or adult children researching on couches).
- **Avoiding Stretched Full-Width Elements:** Single-column mobile cards that stretch to 900px wide on a tablet look empty and unpolished.
- **Card Clustering:** At `sm` (640px), services automatically shift into a balanced 2-column grid (`grid-cols-2`), and doctor cards sit side-by-side.
- **Form Containment:** The appointment request form never stretches wider than `540px`, remaining centered with clean side gutters.

---

## 5. Touch Target Sizes & Accidental Tap Prevention

Accidental taps are especially frustrating for elderly patients or anxious family members:
- **Spacing Between Clickables:** A minimum margin of $12\text{px}$ is enforced between any two adjacent interactive controls.
- **Emergency Button Isolation:** In the mobile action bar and quick action bar, the Emergency Call button is visually isolated with distinct color coding and clear text (`"Emergency: Call Desk"`) to prevent accidental 911/emergency dial mis-taps.
- **Form Select Inputs:** Native dropdown controls (`<select>`) are used on mobile devices to trigger the native operating system picker wheel (iOS Wheel / Android Sheet), which is far more accessible and reliable than custom JavaScript dropdowns on mobile viewports.

---

## 6. Layout Stability & Cumulative Layout Shift (CLS) Strategy

Zero visual shifting during page load is mandatory for high-trust healthcare portals:
1. **Explicit Aspect Ratios:** All doctor portrait containers and hero media containers specify explicit CSS aspect ratios (`aspect-[4/3]` or `aspect-[1/1]`) and responsive widths to reserve layout space before images load.
2. **Font Loading Stability:** Uses Next.js font optimization (`next/font/google`) with `display: swap` and fallback size adjust values to prevent layout flash during font rendering.
3. **Lazy Loaded Maps:** The Google Maps embed is wrapped in a fixed-height container with a light gray placeholder skeleton, preventing page height jumps when the Google Maps iframe finishes initialization.
4. **Predictable Mobile Action Bar:** The bottom bar reserves viewport margin on the page wrapper (`pb-20 md:pb-0`), guaranteeing that footer links and disclaimers are never obscured by the floating bar.
