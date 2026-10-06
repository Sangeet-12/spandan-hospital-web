# AGENTS.md — Spandan Hospital Web Project Guidelines & Rules

> **Permanent Project Rules & Operating Principles**  
> *Target System:* Production-ready public website and lightweight admin dashboard for **Spandan Hospital**  
> *Target User/Maintainer:* Beginner solo developer using Antigravity  
> *Business Model:* Custom client delivery (~₹30,000 commercial package)  
> *Hosting Target:* **Netlify** (commercial-friendly free tier; avoid Vercel Hobby)  
> *Architecture Paradigm:* **Reusable Hospital Digital Platform** (`CORE PLATFORM + HOSPITAL CONFIGURATION + OPTIONAL FEATURE MODULES`) deployed as a Simple Modular Monolith at Repository Root

---

## 1. Prime Directive & Platform Paradigm

This project is built for a real, doctor-owned community hospital (two operating doctors) by a solo beginner developer as the first deployment of a **Reusable Hospital Digital Platform**.

The application architecture strictly separates:
$$\text{Platform} = \text{CORE PLATFORM} + \text{HOSPITAL CONFIGURATION} + \text{OPTIONAL FEATURE MODULES}$$

This allows the exact same core system to be reused for another hospital later without rewriting the application.

Every architectural and implementation decision **MUST** be optimized for:
1. **Simplicity** — Favor plain, readable, standard patterns over clever abstractions.
2. **Reliability** — Submissions must never be lost; failures must be isolated and recoverable.
3. **Security** — Zero secret leakage, database-level security (RLS), server-side validation.
4. **Data Minimization** — Strict healthcare boundary: collect only minimal operational appointment data; never collect medical records, diagnoses, prescriptions, or clinical histories.
5. **Configuration Decoupling** — Do not hardcode hospital-specific content (names, logos, numbers, colors) across React components. Hospital specifics live in database configuration (`hospital_settings`) or centralized design tokens.
6. **Maintainability & Easy Debugging** — Obvious file locations, descriptive names, clear logs, request IDs.
7. **Zero/Low Cost during Development** — Stick strictly to generous free tiers.
8. **Minimal Dependencies & No Speculation** — Do not introduce unnecessary frameworks, libraries, microservices, external queues, or speculative future tables/SDKs.
9. **Documented Decisions** — Keep all docs in `/docs/` updated as the project evolves.

---

## 2. Strict Architectural Boundaries & Single-Hospital V1 Scope

- **Architecture Style:** Clean Modular Monolith using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL + Auth + Storage)**.
- **Repository Structure:**
  - The Next.js application lives directly at the **PROJECT ROOT** (`/app`, `/components`, `/features`, `/lib`, `/types`).
  - Do **NOT** place the Next.js application inside `/website`.
  - Maintain root organizational folders:
    - `/docs` — Project documentation and guides
    - `/database` — SQL migrations and database documentation
    - `/design` — Design references and style assets
    - `/assets` — Raw assets and source imagery
    - `/references` — Hospital research and client briefs
- **Single-Hospital V1 Rule (Strictly NO Multi-Tenant SaaS):**
  - The first deployment is a single-hospital system for Spandan Hospital.
  - Do **NOT** create a multi-tenant SaaS engine.
  - Do **NOT** create:
    - Tenant routing (e.g. subdomains or path prefixes per tenant)
    - Tenant isolation framework
    - Tenant billing
    - Tenant switching
    - Tenant administration
  - Future hospital deployments will use the same repository and architecture with separate configuration and data (single-tenant per client).
- **Forbidden Additions (DO NOT USE IN V1):**
  - No Microservices or distributed architectures
  - No Kubernetes, Docker Swarm, or container orchestrators
  - No Redis, external queues (Kafka, RabbitMQ), or background worker services
  - No separate custom Express/Nest backend servers
  - No paid AI APIs, LLM medical diagnosis, or paid automation platforms (Zapier/Make)
  - No Meta WhatsApp Business Cloud API (use standard free `wa.me` links only in V1)
  - No payment SDKs (Razorpay, Stripe) in V1
  - No heavy CMS or free-form visual/drag-and-drop page builders for staff
  - No clinical EMR/EHR, prescription storage, or diagnostic file repositories

---

## 3. Platform Architecture: Core Platform vs Hospital Configuration vs Optional Modules

The platform is divided into three distinct architectural layers:

### A. Core Platform (Reusable Capabilities)
The following capabilities form the reusable core platform and must **NOT** contain hardcoded Spandan-specific content:
1. **Public website framework** — Responsive navigation, hero layout, section scaffolding, SEO meta structures, and accessible primitives.
2. **Admin dashboard framework** — Metric overviews, tabular listings, status filters, search bars, and CSV export engines.
3. **Authentication** — Supabase SSR cookie session handling, login flows, and token validation.
4. **Authorization** — Role-based access control (developer, hospital_admin, staff, doctor) enforced via Supabase RLS.
5. **Enquiry management** — Submission intake, phone deduplication, request ID assignment, and status tracking.
6. **Appointment requests** — Front-desk intake pipeline, date/slot preference handling, and historical name freezing (`doctor_name_snapshot`, `service_name_snapshot`).
7. **Doctors module** — Profile structures, OPD timing representations, and lifecycle states (`draft`, `published`, `archived`).
8. **Services module** — Department directories, facility descriptions, and categorization.
9. **Testimonials module** — Patient feedback structures, privacy filtering (initials/first names), and publication toggles.
10. **Hospital settings engine** — Dynamic configuration reader for operational numbers, OPD timings, and banner notices.
11. **Notifications engine** — Provider-agnostic notification orchestrator with status tracking (`PENDING`, `SENT`, `FAILED`).
12. **Media/storage** — Asset upload pipelines with size validation (Supabase Storage).
13. **Validation & Security** — Strict Zod schemas and Cloudflare Turnstile verification.
14. **Error handling & Monitoring** — Health check endpoint (`/api/health`) and structured server error logging.
15. **Design system** — Semantic token-based theme consumer (Tailwind + CSS variables).

### B. Hospital Configuration (Hospital-Specific Content)
All hospital-specific identity and operational details are treated as **configuration or database-backed content**, never hardcoded in React components:
- Hospital name, logo, brand colors, tagline
- Hero headlines, subtext, and hero imagery
- Doctor roster, qualifications, biographies, and portraits
- Clinical services, department descriptions, and facility photos
- Patient testimonials and featured reviews
- Emergency numbers, reception desk numbers, and WhatsApp numbers
- Physical clinic address, Google Maps coordinates/embed, and OPD timings
- Hospital infrastructure photographs
- Homepage announcement banners

**Rule:** UI components consume configuration via strongly typed `hospital_settings` database records (with safe fallbacks in `lib/config/hospital.ts`) and CSS variables in `app/globals.css`.

### C. Optional Feature Modules (Future Capabilities)
The platform allows future capabilities to be added as independent modules without rewriting core flows:
- WhatsApp Cloud API automated notifications
- SMS gateway integration (DLT-registered in India)
- Online consultation deposits and payments (Razorpay / Cashfree)
- Doctor calendar sync & real appointment slot availability
- Patient self-service portal
- Advanced operational analytics
- AI-assisted administrative support
- Hospital Information System (HIS) / EMR sync

> [!IMPORTANT]
> **No Speculative Implementation:** Do **NOT** implement these modules now. Do **NOT** install their SDKs. Do **NOT** create speculative database tables for them in V1.

---

## 4. Layered Separation of Concerns & Ingestion Flow

To keep code beginner-readable and prevent database queries from leaking into UI components:

### A. Modular Feature Structure (`/features/`)
Code is organized into 8 distinct business modules:
- `enquiries` — Public contact queries
- `appointments` — Patient booking requests and front-desk pipeline
- `doctors` — Medical staff profiles and OPD schedules
- `services` — Clinical departments and specialties
- `testimonials` — Curated patient feedback
- `hospital` — Operational contact settings and announcement banner
- `notifications` — Alert dispatchers (Resend email provider)
- `authentication` — Staff session management and role checks

### B. Ingestion Flow (Strict Separation)
```text
UI Component (components/)
    ↓
Server Action (features/<module>/<module>.actions.ts)
    ↓
Schema Validation (features/<module>/<module>.schema.ts via Zod)
    ↓
Business Logic & Deduplication (features/<module>/<module>.service.ts)
    ↓
Data Access (features/<module>/<module>.data.ts)
    ↓
Supabase PostgreSQL
```

### C. No Enterprise Abstractions
Do NOT build generic repository factories, universal CRUD abstractions, dependency injection containers, or complex ORM wrappers. Use plain functions and typed database calls.

---

## 5. Core Data, Privacy & Notification Principles

1. **The Database is the Source of Truth:**
   - Every patient appointment request must be committed to Supabase PostgreSQL *before* any email alert is triggered.
2. **Strict Public Form Security:**
   - Public appointment forms must **NOT** have direct anonymous `INSERT` access to the Supabase REST API.
   - All submissions must pass through the application Server Action.
   - The server-side flow must:
     1. Validate input via Zod schema.
     2. Verify Cloudflare Turnstile token via Cloudflare API.
     3. Perform deduplication checks (matching phone submitted within 60s).
     4. Write record to Supabase PostgreSQL using server client.
     5. Return a safe, friendly response with a unique `requestId`.
3. **Healthcare Data Minimization Guardrail:**
   - The public form collects **ONLY**:
     - Patient full name
     - Mobile phone number
     - Optional email address
     - Preferred doctor (choice)
     - Preferred service (choice)
     - Preferred visit date
     - Preferred time slot
     - Short visit reason (e.g., "General Checkup", "Fever", "Follow-up")
   - The UI and server must **explicitly discourage** submitting medical histories, clinical diagnoses, prescriptions, reports, or sensitive health records.
4. **Historical Enquiry Integrity:**
   - Preserves both the foreign key reference (`doctor_id`, `service_id`) and an immutable display-name snapshot (`doctor_name_snapshot`, `service_name_snapshot`). Enquiries remain readable even if doctors leave or departments are edited.
5. **Simple Queue-Free Notifications:**
   - There are **no queues, no Redis, and no background workers**.
   - V1 notification behavior:
     1. Save appointment to database first with `notification_status: 'PENDING'`.
     2. Attempt email dispatch via Resend with a **3-second timeout**.
     3. If successful → update status to `'SENT'`.
     4. If failed/timed out → update status to `'FAILED'`.
     5. Provide manual retry button in the hospital admin dashboard.
6. **Simple Activity Logging:**
   - Do NOT implement an enterprise JSON diff audit system.
   - Maintain a lightweight admin activity log table:
     `user_id`, `action`, `entity_type`, `entity_id`, `created_at`.

---

## 6. Integration Boundaries & Service Isolation

External providers and third-party dependencies are strictly isolated behind modular boundaries:

```text
Notification Service (V1)
    ↓
Resend API (3s timeout)

Notification Service (Future)
    ├── Resend (Email)
    ├── WhatsApp Cloud API (Automated WhatsApp)
    └── SMS Gateway (DLT SMS)

Appointment Service (V1)
    ↓
Manual Front-Desk Confirmation Pipeline

Appointment Service (Future)
    ├── Manual Confirmation Pipeline
    ├── Doctor Calendar Sync
    └── External HIS / EMR System

Optional Payment Service
    ↓
Future only (Razorpay / Cashfree)

Optional AI Service
    ↓
Future only (Strictly non-clinical advisory)
```

**Resilience Rule:** The core application must continue functioning normally if any optional external integration is unavailable, times out, or throws errors.

---

## 7. AI Boundary (Strict Non-Clinical Policy)

AI is strictly an optional future capability and **never** a core dependency.

### Allowed Future AI Scope (Non-Clinical Administrative Support Only):
- Enquiry categorization and desk routing
- Content drafting for hospital notices and news
- FAQ drafting and polishing
- Administrative summaries for reception shifts
- Website search assistance for patients finding OPD hours and services

### Forbidden AI Scope (Zero Tolerance):
> [!CAUTION]
> AI must **NEVER** be used for:
> - Medical diagnosis
> - Symptom triage or severity scoring
> - Treatment or medication recommendations
> - Clinical decision-making or advice
> 
> The core hospital platform must operate 100% reliably even if AI services are completely offline or absent.

---

## 8. Centralized Design System Reusability

Visual styling is centralized into tokens to enable re-skinning across different hospitals without editing components:
- **CSS Variables:** Declared in `app/globals.css` (primary, secondary, accent, emergency, surface colors).
- **Typography Tokens:** Defined in `tailwind.config.ts`.
- **Color Tokens:** Semantic Tailwind mapping (`bg-primary`, `text-primary-foreground`, `border-border`).
- **Spacing, Radius & Shadow Tokens:** Standardized surface radii (`--radius-sm`, `--radius-md`, `--radius-lg`) and shadows.
- **Responsive Breakpoints:** Consistent mobile-first breakpoints (`sm`, `md`, `lg`, `xl`).

**Multi-Hospital Theming Flow:**
$$\text{Hospital A} \rightarrow \text{Theme Tokens A} \quad | \quad \text{Hospital B} \rightarrow \text{Theme Tokens B}$$
Components consume tokens rather than hardcoded hospital colors. Re-theming requires updating CSS variables, not rewriting UI components.

---

## 9. Content Governance Model

Hospital staff manage **structured content** through dedicated, validated admin forms.
- **Allowed Staff Control:** Doctor profiles, OPD hours, department summaries, contact numbers, banner notices, testimonial approvals.
- **Forbidden Staff Capabilities:** Hospital staff do **NOT** receive:
  - HTML or script editors
  - CSS style editors
  - Drag-and-drop page builders
  - Unrestricted layout editors
- **Division of Control:** The development team controls layouts, responsive behavior, and design templates; hospital staff controls approved business content.

---

## 10. Future Reuse Principle

> **Golden Rule of Reusability:**  
> **Build reusable foundations, not speculative features.**  
>  
> A capability becomes part of the core platform only when it is:  
> 1. Needed by the current product (Spandan Hospital), OR  
> 2. Clearly reusable infrastructure required by multiple real features.  
>  
> Do **NOT** implement something only because it may be useful years later.

---

## 11. Roles & Access Control

Keep V1 user roles straightforward:
1. `developer` — System maintenance and initial technical administrator.
2. `hospital_admin` — Doctor owners / Medical directors with full management access.
3. `staff` — Front desk receptionists managing enquiries, updating status, and exporting CSV.
4. `doctor` — Consulting doctors viewing assigned requests and checking schedules.

Authorization is enforced at the database level via Supabase Row Level Security (RLS).

---

## 12. Public Website Reliability & Performance

- Marketing pages use Next.js Static Generation / ISR.
- Normal public visitors must **NOT** trigger a live database query on every page request.
- The public website remains online and accessible even during Supabase pauses or maintenance.

---

## 13. Security & Secret Hygiene

- **Client-Side Secrets:** NEVER expose private API keys, service role keys, or database credentials.
- **Environment Variables:** `NEXT_PUBLIC_*` strictly for public keys; server secrets (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) strictly on server.
- **Repository Hygiene:** `.env` and `.env.local` in `.gitignore`. Clean `.env.example` maintained.
- **Patient Privacy:** **NEVER put patient or business data into Git.**

---

## 14. Solo-Developer Navigation Map ("Where is X?")

| Question | File Location |
| :--- | :--- |
| **Where is appointment logic?** | `features/appointments/appointments.service.ts` |
| **Where is form validation?** | `features/appointments/appointments.schema.ts` |
| **Where are database queries?** | `features/<feature>/<feature>.data.ts` |
| **Where is authentication?** | `features/authentication/` & `lib/supabase/` |
| **Where are notifications?** | `features/notifications/providers/resend.provider.ts` |
| **Where are feature flags?** | Future option only; not created in V1 |
| **Where are migrations?** | `database/migrations/` |
| **Where are design tokens?** | `app/globals.css` & `tailwind.config.ts` |
| **Where is hospital configuration?** | `hospital_settings` DB table & `lib/config/hospital.ts` |

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
