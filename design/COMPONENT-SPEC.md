# Spandan Hospital: Reusable Component Specification

> **Document Type:** Conceptual Component Specification & Interaction Design  
> **Target Entity:** Spandan Hospital (Lalghati / Airport Road, Bhopal, MP)  
> **Platform Paradigm:** Reusable Hospital Digital Platform (`CORE PLATFORM + HOSPITAL CONFIGURATION + OPTIONAL FEATURE MODULES`)  
> **Implementation Status:** Conceptual Architecture (Specification Only — No React Code Yet)  
> **Accessibility Standard:** WCAG 2.2 Level AA  

---

## 1. Overview & Architectural Principles

This document defines the 15 core components of the reusable hospital digital platform. Every component is designed to be **hospital-agnostic**, consuming dynamic data from database configuration (`hospital_settings`, `doctors`, `services`, `testimonials`) or centralized design tokens in `app/globals.css`.

For each component, the specification details:
1. **Purpose & Context:** Clinical and functional role.
2. **Visual Hierarchy & Anatomy:** Structural breakdown and token mappings.
3. **Important States:** Default, Hover, Active, Focus-Visible, Disabled, Loading.
4. **Mobile Behavior:** Breakpoint adaptations and touch-target sizing ($\ge 48\times 48\text{px}$).
5. **Accessibility (ARIA):** Keyboard semantics and screen reader support.
6. **Platform Reusability:** How client specifics are decoupled from layout code.

---

## 2. Component Specifications

### 2.1 `Button`
- **Purpose:** Primary interactive trigger for conversions, form submissions, and external actions.
- **Visual Hierarchy & Variants:**
  - `primary`: Solid `--brand-primary` (`#0F2342`), white text. Used for "Book Appointment", "Submit Request".
  - `secondary`: Solid `--brand-secondary` (`#209689`), white text. Used for "Explore Services".
  - `emergency`: Solid `--brand-emergency` (`#E52E2E`), white text, bold weight. Used for urgent call triggers.
  - `whatsapp`: Solid `--brand-whatsapp` (`#1E9E49`), white text. Used for direct desk chat links.
  - `outline`: 1.5px solid `--brand-primary`, transparent fill, `--brand-primary` text. Used for secondary inquiries.
  - `ghost`: Transparent fill, `--brand-primary` text. Used for back links and dismissals.
- **Anatomy:** `[Leading Icon (Optional)] + [Label Text (SemiBold 15px)] + [Trailing Icon (Optional)]`
- **Important States:**
  - *Default:* Base token colors, `--radius-md` (8px), subtle border if outline.
  - *Hover:* Background lightens/darkens by 8%, cursor pointer, subtle shadow expansion (`--shadow-sm`).
  - *Active:* `transform: scale(0.98)`, immediate visual press feedback.
  - *Focus-Visible:* 2px solid `--border-focus`, 2px offset ring, high contrast against any surface.
  - *Disabled:* Opacity 50%, cursor `not-allowed`, pointer-events disabled.
  - *Loading:* Label hidden or replaced with accessible text, inline SVG spinner animated smoothly.
- **Mobile Behavior:** Full-width (`w-full`) when inside mobile drawers or action cards; minimum touch target height `48px` (`min-h-[48px]`).
- **Accessibility:** Semantic `<button type="...">` or Next.js `<Link>`. Includes `aria-busy="true"` during loading and `aria-disabled="true"` when disabled.
- **Platform Reusability:** Consumes `--brand-*` tokens; zero hospital-specific code.

---

### 2.2 `IconButton`
- **Purpose:** Compact utility triggers (close modal, open mobile drawer, quick phone dialer, social link).
- **Visual Hierarchy:** Secondary/utility level. Typically circular (`rounded-full`) or soft square (`rounded-md`).
- **Anatomy:** `[Centered Lucide Icon (20px or 24px)]` encased in an interactive surface.
- **Important States:**
  - *Default:* Transparent or subtle tint `--surface-subtle`.
  - *Hover:* Background shifts to `--surface-muted`.
  - *Active:* Scaled down 5%.
  - *Focus-Visible:* 2px offset ring.
- **Mobile Behavior:** Hit area strictly padded to minimum $48\times 48\text{px}$ even if icon visual is $24\text{px}$.
- **Accessibility:** Mandatory `aria-label` attribute (e.g. `aria-label="Call Emergency Hotline"` or `aria-label="Close navigation menu"`).
- **Platform Reusability:** Pure UI primitive.

---

### 2.3 `SectionHeader`
- **Purpose:** Establishes semantic hierarchy, context, and reassurance at the top of each major content block.
- **Visual Hierarchy:** Level 2 heading hierarchy. Anchors the page rhythm.
- **Anatomy:**
  - `[Eyebrow Badge (Optional)]: Small capsule in --brand-secondary tint (e.g. "SENIOR CARDIOLOGY TEAM")`
  - `[Main Heading (H2)]: SemiBold 30px (Desktop) / 24px (Mobile), text in --text-primary`
  - `[Subtext (Optional)]: Body Regular 16px, max-w-2xl, text in --text-secondary`
- **Important States:** Static structural component.
- **Mobile Behavior:** Text centers or aligns left; font scales down smoothly to prevent awkward word wrapping.
- **Accessibility:** Uses semantic `<h2>` tag for clear document outline.
- **Platform Reusability:** Receives string props; hospital-agnostic.

---

### 2.4 `DoctorCard`
- **Purpose:** Expansive showcase card for the hospital's two principal operating cardiologists.
- **Visual Hierarchy:** High priority. Positioned as the clinical core of the hospital.
- **Anatomy:**
  - `[Top Accent Border]: 4px strip in --brand-secondary`
  - `[Portrait Container]: High-res portrait or dignified medical silhouette (rounded-xl)`
  - `[Doctor Name (H3)]: SemiBold 22px (e.g. "Dr. Shashank Dixit")`
  - `[Title & Department]: Consultant Interventional Cardiologist`
  - `[Academic Qualifications Badge]: Verified degrees (MBBS, MD, DM Cardiology, FACC)`
  - `[Specialty Focus Pills]: "Angioplasty", "Pacemaker", "Heart Failure"`
  - `[OPD Hours Block]: Visual clock icon + "Mon – Sat: 12:00 PM – 6:00 PM"`
  - `[Action Button]: "Book Consultation with Dr. [Name]" (pre-selects doctor in form)`
- **Important States:**
  - *Default:* White surface, 1px border `--border`, shadow `--shadow-card`.
  - *Hover:* Card lifts 2px, shadow shifts to `--shadow-md`, subtle border glow.
- **Mobile Behavior:** Stacks vertically (portrait on top, details below). Full width on mobile screens; button expands to 100% width.
- **Accessibility:** Structured headings (`<h3>`), accessible alt text for doctor portraits (e.g., `alt="Portrait of Dr. Shashank Dixit, Consultant Cardiologist"`).
- **Platform Reusability:** Consumes doctor data objects from Supabase (`doctors` table); automatically handles 2 or more doctors.

---

### 2.5 `DoctorProfile` (Expanded Modal / View)
- **Purpose:** Detailed biographical and clinical view for patients seeking in-depth credential verification.
- **Visual Hierarchy:** Modal overlay / dedicated view.
- **Anatomy:**
  - `[Full Bio Narrative]: 3–4 paragraphs describing clinical philosophy and background`
  - `[Procedures Performed]: Bulleted list of catheterization and diagnostic procedures`
  - `[Medical Education History]: Granting universities and year of graduation`
  - `[Fellowships & Memberships]: FACC, Cardiological Society of India, etc.`
  - `[Direct Booking Trigger]: Anchored primary CTA`
- **Important States:** Dialog open, dialog closed, ESC key dismiss, backdrop click dismiss.
- **Mobile Behavior:** Slides up as a full-height bottom sheet with a sticky top close button.
- **Accessibility:** `role="dialog"`, `aria-modal="true"`, focus trapped within dialog until closed.
- **Platform Reusability:** Rendered dynamically from `doctors.bio` and `doctors.credentials` fields.

---

### 2.6 `ServiceCard`
- **Purpose:** Presents one of the 6 core clinical departments/facilities in clear, reassuring terms.
- **Visual Hierarchy:** Mid-level discovery card.
- **Anatomy:**
  - `[Icon Frame]: 44x44px rounded container in soft teal tint with Lucide clinical icon`
  - `[Service Title (H3)]: SemiBold 18px (e.g. "Non-Invasive Diagnostics")`
  - `[Summary Copy]: 2 sentences explaining patient benefit in plain English`
  - `[Key Capabilities List]: 3 concise bullets (e.g. "2D Echo & Color Doppler", "TMT Stress Test", "Holter")`
  - `[Inquire Action]: Subtle link trigger: "Inquire About This Service →"`
- **Important States:**
  - *Default:* White background, hairline border `--border`.
  - *Hover:* Accent border shifts to teal, subtle elevation lift.
- **Mobile Behavior:** 1 column on mobile, 2 columns on tablet, 3 columns on desktop.
- **Accessibility:** Screen reader announces service title as heading level 3. Link includes descriptive text.
- **Platform Reusability:** Data driven from `services` table.

---

### 2.7 `TestimonialCard`
- **Purpose:** Showcases authentic patient feedback while upholding strict medical privacy ethics.
- **Visual Hierarchy:** Social proof card.
- **Anatomy:**
  - `[Quotation Icon]: Subtle stylized quote mark in brand teal`
  - `[Testimonial Quote]: 2–3 sentences of genuine feedback`
  - `[Patient Attribution]: Privacy-preserving attribution (e.g. "— Patient", "— Ramesh P.", "— Patient's Family") without unnecessary medical condition or sensitive health disclosures`
  - `[Source Indicator (Optional)]: "Direct Patient Feedback" or "Verified Review"`
- **Important States:**
  - *Standard Card:* Soft background `--surface-subtle`.
  - *Featured Variant:* White background, elevated shadow, border accent.
- **Mobile Behavior:** Swipeable carousel or cleanly stacked cards. Touch-friendly swipe gesture.
- **Accessibility:** `<blockquote>` HTML element with `<cite>` attribution.
- **Platform Reusability:** Populated from `testimonials` table with privacy filtering applied.

---

### 2.8 `StatBlock`
- **Purpose:** Displays operational milestones (years of service, beds, procedures) once verified.
- **Visual Hierarchy:** Quick-scan metric component.
- **Anatomy:**
  - `[Numeric Metric]: Large Bold 36px in --brand-primary`
  - `[Metric Label]: Medium 14px in --text-secondary`
  - `[Verification Note (During Prototype)]: Sub-label if unverified`
- **Important States:** Static scan element.
- **Mobile Behavior:** 2×2 grid on mobile viewports.
- **Accessibility:** Numbers rendered with clear text labels for screen readers.
- **Platform Reusability:** Omitted automatically if database contains zero verified statistics.

---

### 2.9 `QuickAction` / Quick Action Bar
- **Purpose:** Instant 1-tap utility bar floating directly below the homepage hero.
- **Visual Hierarchy:** Extremely high utility for high-intent mobile visitors.
- **Anatomy:** 4 compact interactive cards:
  1. `Emergency Hotline:` Red icon + "Emergency: 24/7 Call"
  2. `WhatsApp Desk:` Green icon + "WhatsApp Chat"
  3. `OPD Timings:` Clock icon + "Today: 12 PM – 6 PM"
  4. `Directions:` MapPin icon + "Get Directions"
- **Important States:** High-contrast hover and active press states on each card.
- **Mobile Behavior:** 2×2 responsive grid or horizontal snap-scroll with large hit areas ($\ge 56\text{px}$ height).
- **Accessibility:** Each item is an accessible link with unambiguous labels (`tel:...`, `https://wa.me/...`, `https://maps.google.com/...`).
- **Platform Reusability:** Reads telephone numbers and hours from `hospital_settings`.

---

### 2.10 `AppointmentCTA` / Appointment Form Component
- **Purpose:** Primary digital conversion mechanism for outpatient appointment requests.
- **Visual Hierarchy:** Highest conversion priority on the homepage.
- **Anatomy:**
  - `[Form Container]: max-w-xl centered container, --radius-xl, white surface`
  - `[Form Header]: "Request an Outpatient Consultation"`
  - `[Subtitle]: "Our team will contact you to confirm your request." (A specific callback SLA can be added later only after hospital approval)`
  - `[Doctor Selector]: Select input (Dr. Rohit / Dr. Shashank / Any Available)`
  - `[Date & Slot Selector]: Date picker + Time slot pills (Morning / Afternoon / Evening)`
  - `[Patient Name Input]: Text input`
  - `[Mobile Number Input]: Tel input (10 digits with +91 indicator)`
  - `[Optional Email Input]: Email input`
  - `[Visit Reason Input]: Single-line text input ("e.g. Routine Checkup, Follow-up")`
  - `[Healthcare Guardrail Box]: Warning box: "Do NOT submit medical histories, reports, or prescriptions"`
  - `[Turnstile Bot Shield]: Cloudflare Turnstile invisible/managed widget`
  - `[Submit Button]: Full-width primary button with loading spinner`
- **Important States:**
  - *Input Default:* 1px border `--border`, padding 12px, font 16px (prevents iOS auto-zoom).
  - *Input Focus:* 2px border `--border-focus`, soft blue outline.
  - *Input Error:* Red border, red inline error message below input.
  - *Submitting:* Form fields disabled, submit button displays spinner.
  - *Success Modal:* Opens confirmation dialog with `#SPD-XXXX` Request ID.
- **Mobile Behavior:** Single-column stacked inputs. Numeric keyboard triggered for phone input (`inputMode="numeric"`).
- **Accessibility:** Explicit `<label>` elements connected via `htmlFor`, `aria-required="true"`, `aria-invalid="true"` for errors, `aria-describedby` for error text.
- **Platform Reusability:** Form submission handled by generic Server Action in `features/appointments/`.

---

### 2.11 `ContactCard`
- **Purpose:** Displays structured operational contact channels.
- **Visual Hierarchy:** Operational utility card.
- **Anatomy:**
  - `[Channel Icon]: Telephone / WhatsApp / MapPin / Clock icon`
  - `[Channel Title]: "Reception Desk" / "24/7 Emergency" / "OPD Timings"`
  - `[Channel Detail]: Primary contact string or timing schedule`
  - `[Interactive Action]: "Call Now" / "Open in Maps"`
- **Important States:** Standard card states.
- **Mobile Behavior:** Collapses into vertical list with direct tap-to-call buttons.
- **Accessibility:** Clickable phone numbers formatted as `tel:+91...`.
- **Platform Reusability:** Populated from `hospital_settings`.

---

### 2.12 `EmergencyBanner`
- **Purpose:** Persistent warning strip or emergency notice for acute cardiac symptoms.
- **Visual Hierarchy:** Top-level warning component.
- **Anatomy:**
  - Background: `--brand-emergency-surface` (`#FDF2F2`)
  - Border: 1px solid `--brand-emergency`
  - Text: `--brand-emergency-hover` with bold telephone link
  - Icon: Lucide `AlertCircle` or `PhoneCall` in red
- **Important States:** Static alert banner.
- **Mobile Behavior:** Sticky or prominently positioned at top of viewport.
- **Accessibility:** `role="alert"`, high contrast text.
- **Platform Reusability:** Reusable component; emergency phone number injected via configuration/placeholder until official hospital verification.

---

### 2.13 `MapBlock`
- **Purpose:** Provides interactive navigation to the hospital gate on Airport Road, Lalghati.
- **Visual Hierarchy:** Hyperlocal utility component.
- **Anatomy:**
  - `[Interactive Map Frame]: Embedded Google Maps iframe with lazy loading`
  - `[Address Overlay Box]: Door number, street, landmark, PIN code`
  - `[One-Tap Navigation Button]: "Open GPS Route in Google Maps"`
- **Important States:** Map loading skeleton, loaded iframe.
- **Mobile Behavior:** Height $280\text{px}$ on mobile, $400\text{px}$ on desktop. "Open in Maps" button opens native Google Maps app on iOS/Android.
- **Accessibility:** `iframe` includes descriptive `title="Google Maps Location for Spandan Hospital, Lalghati, Bhopal"`.
- **Platform Reusability:** Google Maps embed URL and address read from `hospital_settings`.

---

### 2.14 `Header`
- **Purpose:** Primary navigation, identity anchor, and emergency contact trigger.
- **Visual Hierarchy:** Sticky top navigation bar.
- **Anatomy:**
  - `[Hospital Brand Logo]: Left aligned, crisp vector or high-res graphic`
  - `[Navigation Anchors (Desktop)]: "Home", "About", "Doctors", "Cardiac Care", "Patient Stories", "Contact"`
  - `[Emergency Phone Trigger]: High-contrast red/dark button with phone icon (reads from configuration/placeholder, never hardcoded)`
  - `[Primary Book CTA]: "Book Appointment" solid button`
  - `[Mobile Controls]: Direct call icon + Hamburger menu toggle button`
- **Important States:** Sticky on scroll with subtle background blur and bottom border shadow.
- **Mobile Behavior:** Collapses navigation links into a slide-over mobile drawer; keeps emergency call icon visible at all times.
- **Accessibility:** Semantic `<header>` and `<nav aria-label="Main Navigation">`. Hamburger button includes `aria-expanded` and `aria-controls`.
- **Platform Reusability:** Navigation links and logo driven by configuration.

---

### 2.15 `Footer`
- **Purpose:** Institutional credibility, legal disclaimers, statutory notices, and administrative staff login.
- **Visual Hierarchy:** Grounding base section.
- **Anatomy:**
  - Background: Deep Navy (`#0F2342`), white typography.
  - Column 1: Hospital identity, doctor directors, address.
  - Column 2: Quick Links (Doctors, Services, Appointments, Emergency).
  - Column 3: OPD Timings & Direct Contact numbers.
  - Full-Width Bottom Bar: Statutory medical disclaimer, copyright notice, data privacy statement, discreet "Hospital Staff Login" link.
- **Important States:** Static footer.
- **Mobile Behavior:** 3 columns collapse into a single stacked vertical sequence with ample spacing.
- **Accessibility:** Semantic `<footer>` landmark.
- **Platform Reusability:** Disclaimers and copyright text pull from `hospital_settings`.

---

### 2.16 `MobileActionBar` (Sticky Bottom Navigation)
- **Purpose:** Keeps essential patient actions within immediate thumb reach at all times on mobile devices.
- **Visual Hierarchy:** Fixed viewport bottom bar on mobile screens ($< 768\text{px}$).
- **Anatomy:** 3 equal-height action buttons:
  1. `Call Desk:` Phone icon + "Call Desk" (triggers `tel:...`)
  2. `WhatsApp:` WhatsApp icon + "WhatsApp" (triggers `wa.me`)
  3. `Book Appointment:` Calendar icon + "Book Slot" (smooth-scrolls to form)
- **Important States:**
  - Fixed at `bottom: 0`, elevated with `--shadow-bottom-bar`.
  - Background: White (`#FFFFFF`) with top hairline border `--border`.
- **Mobile Behavior:** Hidden on desktop viewports ($\ge 768\text{px}$); visible exclusively on mobile/tablet. Accommodates iOS bottom home indicator safe area (`pb-[env(safe-area-inset-bottom)]`).
- **Accessibility:** `role="navigation"`, `aria-label="Quick Mobile Actions"`. Minimum touch height $56\text{px}$.
- **Platform Reusability:** Core platform capability; links automatically bound to active hospital numbers.
