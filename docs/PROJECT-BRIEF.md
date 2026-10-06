# PROJECT BRIEF: Spandan Hospital Digital Presence & Front Desk Management

---

## 1. Executive Summary

**Client:** Spandan Hospital (Doctor-owned community hospital operated by two doctors)  
**Project Goal:** Deliver a premium, fast, trustworthy public web portal paired with an intuitive, lightweight administrative dashboard for hospital staff.  
**Developer Profile:** Solo beginner developer using Antigravity  
**Commercial Scope:** Commercial package priced at approximately ₹30,000 (inclusive of first-year domain setup), serving as a showcase-quality client deliverable.  
**Architecture Paradigm:** **Reusable Hospital Digital Platform** (`CORE PLATFORM + HOSPITAL CONFIGURATION + OPTIONAL FEATURE MODULES`) deployed as a Single-Hospital Modular Monolith for Spandan Hospital.  
**Core Purpose:** Act as the hospital's **digital front desk** to present services, profile doctors, build patient trust, and reliably capture patient appointment requests and enquiries.

---

## 2. Core Philosophy & Working Rules

1. **Reusable Platform Architecture (Not Multi-Tenant SaaS):**  
   The application is architected into three distinct layers:
   - **CORE PLATFORM:** Generic, reusable capabilities (public website framework, admin dashboard framework, authentication, authorization, enquiry management, appointments, doctors, services, testimonials, hospital settings engine, notifications engine, storage, validation, security, error handling, design system). Free of hardcoded hospital content.
   - **HOSPITAL CONFIGURATION:** Hospital-specific content and styling (name, logo, brand colors, tagline, hero content, imagery, doctors, services, testimonials, phone numbers, WhatsApp, address, emergency number, OPD timings, announcements). Treated as database records or design tokens.
   - **OPTIONAL FEATURE MODULES:** Future independent extensions (WhatsApp Cloud API, SMS, Payments, Calendar, Patient Portal, Analytics, Non-Clinical AI, HIS Sync). Not implemented in V1; no speculative tables or SDKs.
   *Single-Hospital V1 Scope:* The initial system is deployed strictly for Spandan Hospital. No multi-tenant SaaS features (no tenant routing, isolation, billing, switching, or administration).

2. **Future Reuse Principle:**  
   > **"Build reusable foundations, not speculative features."**  
   > A feature becomes part of the core only when it is needed by the current product (Spandan Hospital) or is clearly reusable infrastructure required by multiple real features. Do not implement something only because it may be useful years later.

3. **Not an Enterprise EHR/HMS:**  
   This project is **not** an electronic health record (EHR) system, clinical diagnosis tool, billing engine, or pharmacy management platform. It is a modern, high-trust **Digital Front Desk** and operational enquiry portal.

4. **Developer Constraints (Beginner Solo Developer):**  
   Every engineering choice is prioritized for:
   - Simplicity and readability
   - High reliability (zero enquiry loss)
   - Zero or near-zero cost during development
   - Minimal third-party dependencies (no microservices, queues, or Redis)
   - Straightforward local debugging and failure recovery

5. **Database as the Sole Source of Truth:**  
   Enquiries and appointment bookings must be validated, spam-filtered, and committed to PostgreSQL *before* any email or external notification is triggered.

6. **Structured Content Control (Strict Safeguards):**  
   Hospital staff manage live website information (doctors, consultation hours, contact numbers, notices) through restricted, structured admin forms. Staff do **NOT** receive HTML editors, CSS editors, or drag-and-drop page builders. The development team controls layouts and styling; the hospital controls approved structured content.

7. **Healthcare Data Minimization:**  
   Public appointment forms collect only operational contact details and a short reason for visit. The system strictly avoids collecting clinical diagnoses, medical records, or prescriptions.

8. **Integration Boundaries & Resilience:**  
   External services are kept behind clear service boundaries (Notification Service -> Resend; Appointment Service -> Manual confirmation). Core platform operations remain 100% resilient if external APIs fail or are offline.

9. **Strict Non-Clinical AI Policy:**  
   Future AI assistance is strictly non-clinical (enquiry categorization, content drafting, FAQ drafting, admin summaries, search assistance). AI is **never** used for medical diagnosis, symptom triage, treatment recommendations, or clinical decisions, and is never a required core dependency.

10. **Design System Reusability:**  
    Centralized design tokens in `globals.css` (CSS variables) and `tailwind.config.ts` allow re-theming the platform for other hospital clients without altering component code.

---

## 3. Public Website Scope

The public website serves prospective patients, returning families, and emergency lookups. It must look clean, calm, medical-grade, and load instantly on mobile networks.

### Required Public Sections:
- **Header & Navigation:** Clean navbar with Hospital Logo, Contact CTA, emergency phone highlight, and mobile drawer.
- **Hero Section:** Clear hospital tagline, welcoming imagery, rapid Call/WhatsApp CTAs, and immediate "Request Appointment" trigger.
- **About Hospital:** Brief hospital history, philosophy, leadership/director doctor's vision, clinical standards, and facilities overview.
- **Doctor Profiles Directory:**
  - Doctor name, photo, qualifications (e.g., MBBS, MD)
  - Department / Specialization
  - Experience and brief bio
  - Consultation hours and OPD schedule
  - "Book Consultation" direct link
- **Services & Specialties:**
  - Clinical departments (e.g., General Medicine, Pediatrics, Critical Care)
  - Clear descriptions of treatments and diagnostic facilities available
- **Patient Testimonials & Reviews:**
  - Real patient feedback displaying only first names/initials
  - Featured reviews prominently showcased for social proof
- **Appointment Request & Enquiry Form:**
  - Patient Full Name, Mobile Phone Number, Optional Email
  - Preferred Doctor or Specialty
  - Preferred Date & Time Slot
  - Short visit reason (e.g., "General Checkup", "Fever", "Follow-up")
  - Explicit guidance discouraging submission of confidential medical histories
  - Cloudflare Turnstile anti-bot verification
  - Clear submission confirmation modal with realistic next steps
- **Contact & Location:**
  - Physical hospital address with embedded Google Maps iframe
  - Primary landline and mobile emergency desk number
  - Direct 1-tap WhatsApp consultation link (`wa.me`)
  - OPD timing and 24/7 Emergency notice
- **Footer:** Legal notices, copyright, quick links, emergency contact reiteration.

### Performance & UX Standards:
- Static generation (SSG / ISR) for fast loading on Indian mobile networks (LCP < 2.5s).
- Fully responsive on mobile viewports.
- Essential semantic SEO tags (OpenGraph, meta descriptions, localized Schema.org markup for MedicalOrganization/Hospital).

---

## 4. Hospital Admin Dashboard Scope

The dashboard is accessible only to authenticated hospital administrators (doctors, front-desk receptionists).

### Required Modules:
1. **Overview / Dashboard:**
   - Quick counters: Total New Enquiries Today, Confirmed Appointments, Total Doctors Active.
2. **Appointment & Enquiry Management:**
   - Unified list of all patient submissions with historical doctor/service display name snapshots.
   - Status tracking pipeline: `New` ➔ `Contacted` ➔ `Confirmed` ➔ `Completed` ➔ `Cancelled`.
   - Internal notes feature for desk staff (e.g., *"Called patient at 11:30 AM, confirmed for Dr. Patil at 4 PM"*).
   - Filter by date and status.
   - Resend notification retry button for submissions marked `FAILED`.
   - **Export to CSV** button for daily front-desk printouts and Excel tracking.
3. **Doctor Roster Management:**
   - Add/Edit doctor profiles, qualifications, photos, and consultation hours.
   - Content status lifecycle: `draft`, `published`, `archived`.
4. **Services & Specialties Management:**
   - Add/Edit clinical departments, descriptions, and icon badges.
5. **Testimonial Management:**
   - Review patient testimonials, toggle "Featured" status, publish or archive.
6. **Website Content & Settings (`hospital_settings`):**
   - Emergency contact numbers, reception desk phone, WhatsApp hotline.
   - Hospital operating hours and announcement banner (e.g., *"Sunday Vaccination Camp"*).
7. **Admin Activity Log:**
   - Simple chronological view of recent operational updates.

---

## 5. Content Control Rules for Staff

| Content Item | Admin Editable via Form? | Notes / Constraints |
| :--- | :--- | :--- |
| Doctor Details & Hours | Yes | Structured fields (text, hours, photo upload, draft/published) |
| Services & Treatments | Yes | Structured fields (title, summary, icon picker) |
| Testimonials | Yes | Staff can approve, feature, or archive reviews |
| Emergency & Desk Phone | Yes | Single-field telephone inputs in `hospital_settings` |
| WhatsApp Link Number | Yes | Validated phone format |
| Hospital Address & Hours | Yes | Structured plain text fields |
| Announcement Banner | Yes | Optional text string + active toggle |
| Page Layouts & Styles | **NO** | Fixed in code to prevent visual breakage |
| Custom HTML / CSS scripts | **NO** | Strictly prohibited for security and layout integrity |

---

## 6. Technical Stack & Service Boundaries

- **Framework:** Next.js (App Router, TypeScript) at repository root with `/features` architecture
- **Styling:** Tailwind CSS + Lucide Icons + accessible primitives with design tokens
- **Database:** Supabase PostgreSQL (Row Level Security enforced, no direct public REST insert)
- **Authentication:** Supabase Auth (SSR Cookie sessions)
- **File Storage:** Supabase Storage (`hospital-assets` bucket)
- **Spam Protection:** Cloudflare Turnstile (Managed challenge)
- **Transactional Notifications:** Resend (Free tier for desk alerts with 3s timeout)
- **Deployment Target:** **Netlify** (Commercial-friendly free tier)
- **Instant Messaging:** Standard `wa.me` links (₹0 API cost)

---

## 7. Commercial & Ownership Model

- **Commercial Handover Price:** ~₹30,000 package.
- **Client Ownership:** Spandan Hospital owns their custom domain name, their database, and all business assets.
- **Developer Role:** Maintains codebase, deployment configuration, and optional annual support.
