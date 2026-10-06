# Spandan Hospital Web Portal

> High-trust public website and lightweight administrative dashboard for **Spandan Hospital**, a doctor-owned community hospital operated by two physicians.

---

## 1. What the Project Is

This project serves as the **Digital Front Desk** and operational management portal for Spandan Hospital. It provides:
- A responsive, fast, and patient-friendly public website (Hospital overview, Doctor roster & OPD schedules, Clinical services, Testimonials, Location & 1-tap WhatsApp consultation).
- Bot-protected appointment request and patient enquiry capture.
- A secure, lightweight administrative dashboard for hospital doctors and front-desk receptionists to track enquiries, update doctor schedules, manage clinical content, and export daily appointments to CSV.

> **Scope Boundary:** This is **not** an enterprise EHR/EMR or clinical billing platform. It collects only operational appointment requests.

---

## 2. Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling & Design Tokens:** [Tailwind CSS](https://tailwindcss.com/)
- **Hosting Target:** [Netlify](https://www.netlify.com/) (Commercial-friendly free tier)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage)
- **Spam Protection:** [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (Server-verified)
- **Transactional Notifications:** [Resend](https://resend.com/) (Email alerts to reception desk)
- **Direct Messaging:** Standard `wa.me` Click-to-Chat (Zero API billing)

---

## 3. Local Development Prerequisites

- **Node.js:** `v20.x` or `v22.x` (LTS recommended; tested on v22.18.0)
- **npm:** `v10.x` or higher
- **Git:** Installed on local machine

---

## 4. How to Install Dependencies

From the repository root directory (`C:\Spandan Hospital Web`):

```bash
npm install
```

---

## 5. How to Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 6. How to Create a Production Build

To verify TypeScript, linting, and compile the application for production:

```bash
npm run build
```

To run the compiled production build locally:

```bash
npm run start
```

---

## 7. Project Structure

The project is structured as a **Clean Modular Monolith** situated directly at the repository root:

```text
/
├── app/                  # Next.js App Router (Layouts, public pages, admin routes)
├── components/           # Shared UI primitives (buttons, cards, dialogs)
├── features/             # Business Feature Modules
│   ├── enquiries/        # Public queries & general leads
│   ├── appointments/     # Inbound appointment requests & CSV export
│   ├── doctors/          # Doctor roster & OPD timings
│   ├── services/         # Clinical specialties catalog
│   ├── testimonials/     # Patient review approvals
│   ├── hospital/         # Hospital contact settings & alert banner
│   ├── notifications/    # Email alert dispatcher (Resend)
│   └── authentication/   # Staff session handling & role authorization
├── lib/                  # Utilities, Supabase clients, formatters
├── types/                # Shared TypeScript type definitions
├── public/               # Static assets (favicons, manifests, images)
│
├── database/             # SQL migrations and database documentation
│   └── migrations/       # Versioned SQL scripts
├── docs/                 # Architectural, security, and handover documentation
├── assets/               # Raw assets and source imagery
├── design/               # Design references, style mockups
└── references/           # Hospital background and research notes
```

---

## 8. Environment Variable Instructions

1. Copy the template file `.env.example` to create your local environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the variables in `.env.local`:
   - `NEXT_PUBLIC_APP_URL`: Base URL (default `http://localhost:3000` for development).
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase public anon key.
   - `SUPABASE_SERVICE_ROLE_KEY`: Supabase server-only service role secret.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile public site key.
   - `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile server validation secret.
   - `RESEND_API_KEY`: Resend transactional email API credential.
   - `HOSPITAL_ALERT_EMAIL`: Reception desk inbox address.

> **Security Rule:** Never commit `.env` or `.env.local` to Git. Real secrets must only be entered in Netlify environment settings.

---

## 9. Patient Privacy & Data Protection Warning

> [!CAUTION]
> **STRICT HEALTHCARE DATA PROTECTION MANDATE:**
> 1. **Never use real patient names, contact numbers, or health data during development or testing.** Always use synthetic test data (e.g., `Patient Test`, `9876543210`).
> 2. **Never commit patient data, enquiry exports, or database backups to Git.**
> 3. The public appointment form collects strictly operational details (Name, Phone, Date, Time, Visit Reason). Never collect or store medical records, diagnoses, clinical histories, or prescriptions.
