# Future Scalability & Architecture Extensibility Guide

> **Target:** Spandan Hospital Web Portal  
> **Architecture Paradigm:** **Reusable Hospital Digital Platform** (`CORE PLATFORM + HOSPITAL CONFIGURATION + OPTIONAL FEATURE MODULES`)  
> **V1 Deployment:** Single-Hospital Modular Monolith at Repository Root (Spandan Hospital)  
> **Hosting Target:** Netlify (Commercial Free Tier)  
> **Database:** Supabase (PostgreSQL + Auth + Storage)  
> **Golden Rule of Reusability:** **Build reusable foundations, not speculative features.** Build clean boundaries today; add features when requested tomorrow.

---

## 1. Architectural Vision: Reusable Platform Modular Monolith

Spandan Hospital is a small, doctor-owned hospital (two operating doctors). An enterprise microservice architecture, distributed service mesh, or full multi-tenant SaaS engine would create excessive operational friction and maintenance overhead for a solo beginner developer.

Instead, the system is designed as a **Reusable Hospital Digital Platform**:
$$\text{Platform} = \text{CORE PLATFORM} + \text{HOSPITAL CONFIGURATION} + \text{OPTIONAL FEATURE MODULES}$$

### The Three Architectural Layers:
1. **CORE PLATFORM:** Reusable across multiple hospital deployments:
   - Public marketing framework & pre-rendered pages (SSG/ISR)
   - Admin dashboard framework with tabular views and CSV export
   - Authentication (Supabase SSR cookies) & authorization (RLS roles)
   - Enquiry pipeline & appointment booking requests
   - Doctors, services, testimonials, and hospital settings management
   - Notification dispatching engine (`PENDING`, `SENT`, `FAILED`)
   - Media storage pipelines (Supabase Storage)
   - Validation (Zod) & security (Cloudflare Turnstile)
   - Health monitoring (`/api/health`) & error handling
   - Centralized design system token consumers
   *No core platform code contains hardcoded Spandan-specific content.*

2. **HOSPITAL CONFIGURATION:** Client-specific data and visual branding:
   - Hospital name, logo, brand colors, tagline
   - Hero headlines, subtext, and hero photography
   - Doctors, services, testimonials, and department descriptions
   - Emergency numbers, desk numbers, WhatsApp hotline (`wa.me`)
   - Address, Google Maps embed, OPD schedules, infrastructure photos
   - Homepage announcement banners
   *Rule:* Configuration is stored in database tables (`hospital_settings`, `doctors`, etc.) or defined in centralized design tokens (`globals.css`), never hardcoded in React components.

3. **OPTIONAL FEATURE MODULES:** Independent add-ons for future phases:
   - WhatsApp Cloud API automated notifications
   - SMS gateway alerts (DLT-compliant)
   - Online payments (Razorpay / Cashfree)
   - Doctor calendar sync & real appointment slot availability
   - Patient self-service portal
   - Advanced analytics
   - AI-assisted administrative tools (strictly non-clinical)
   - Hospital Information System (HIS) / EMR sync
   *Rule:* Do not install SDKs or build speculative tables in V1.

### Single-Hospital V1 Scope (Strictly NO Multi-Tenant SaaS)
- The initial deployment is strictly single-tenant for Spandan Hospital.
- **Do NOT build in V1:** Tenant routing, tenant isolation middleware, tenant billing, tenant switching, or tenant super-admin panels.
- Future hospital clients receive their own isolated deployment using the same repository and architecture with their own configuration and database.

---

## 2. Business Module Boundaries

The application is structured into 8 distinct business modules inside `/features`:

```text
features/
├── enquiries/          # Patient general enquiries and contact messages
│   ├── enquiries.actions.ts      # Server Actions (form handling entry points)
│   ├── enquiries.data.ts         # Supabase database queries and inserts
│   ├── enquiries.schema.ts       # Zod validation schemas
│   ├── enquiries.service.ts      # Business logic (deduplication, snapshot creation)
│   └── components/               # EnquiryTable, EnquiryStatusBadge, EnquiryNotesModal
│
├── appointments/       # Patient appointment booking requests
│   ├── appointments.actions.ts   # Server Actions (booking submission)
│   ├── appointments.data.ts      # Database queries for appointment pipeline
│   ├── appointments.schema.ts    # Zod validation (visit_reason, slot, date)
│   ├── appointments.service.ts   # Booking logic, snapshot freezing
│   └── components/               # AppointmentForm, AppointmentRoster, CsvExportButton
│
├── doctors/            # Medical staff roster & OPD schedules
│   ├── doctors.data.ts           # Fetching active doctors, updating hours/bio
│   ├── doctors.schema.ts         # Zod validation for doctor profile editing
│   ├── doctors.service.ts        # Roster ordering, draft/published status checks
│   └── components/               # DoctorCard, DoctorGrid, DoctorAdminForm
│
├── services/           # Clinical specialties and hospital facilities
│   ├── services.data.ts          # Department queries, slug lookups
│   ├── services.schema.ts        # Department edit validation
│   ├── services.service.ts       # Status lifecycle (draft/published/archived)
│   └── components/               # ServiceCard, ServiceGrid, ServiceAdminForm
│
├── testimonials/       # Curated patient reviews
│   ├── testimonials.data.ts      # Approved testimonial queries
│   ├── testimonials.schema.ts    # Review validation schemas
│   ├── testimonials.service.ts   # Privacy filtering (anonymizing names to initials)
│   └── components/               # TestimonialCarousel, TestimonialAdminTable
│
├── hospital/           # Hospital operational settings & announcement banner
│   ├── hospital.data.ts          # Reads & writes to single-row hospital_settings
│   ├── hospital.schema.ts        # Validation for phones, hours, banner text
│   ├── hospital.service.ts       # Contact phone formatting, banner state
│   └── components/               # EmergencyBanner, ContactSection, SettingsAdminForm
│
├── notifications/      # Transactional alert dispatchers
│   ├── notifications.service.ts  # Notification orchestrator (fire-and-record)
│   ├── notifications.data.ts     # Update notification status (PENDING/SENT/FAILED)
│   └── providers/                # Email provider (Resend)
│       └── resend.provider.ts    # Direct Resend API dispatcher with 3s timeout
│
└── authentication/     # Staff and admin authentication
    ├── auth.actions.ts           # Login, logout Server Actions
    ├── auth.service.ts           # Role verification helpers (developer, hospital_admin, staff)
    └── components/               # LoginForm, ProtectedLayout
```

---

## 3. UI / Business Logic / Data Separation

To ensure a solo beginner developer can easily maintain and debug the application, UI components must never contain direct database queries or complex SQL.

### Preferred Ingestion Flow
```mermaid
flowchart TD
    UI["1. UI Component<br/>(AppointmentForm.tsx)"] --> Action["2. Server Action<br/>(appointments.actions.ts)"]
    Action --> Validation["3. Schema Validation<br/>(appointments.schema.ts via Zod)"]
    Validation --> AntiSpam["4. Bot Shield<br/>(Cloudflare Turnstile Verify)"]
    AntiSpam --> Service["5. Feature Business Logic<br/>(appointments.service.ts)"]
    Service --> DataAccess["6. Data Access Layer<br/>(appointments.data.ts)"]
    DataAccess --> DB[("7. Supabase PostgreSQL<br/>(Atomic INSERT)")]
    Service -.->|Trigger Alert| Notify["8. Notification Service<br/>(Resend Email - Non-blocking)"]
```

### Responsibility Breakdown
1. **UI (`components/`):** Collects user input, displays feedback and loading spinners. Zero database code.
2. **Server Action (`*.actions.ts`):** Entry point running on the server. Extracts form payload, catches errors, returns friendly user messages and request IDs.
3. **Validation (`*.schema.ts`):** Strictly typed Zod schemas. Guarantees sanitization and enforces minimal data collection.
4. **Service / Business Logic (`*.service.ts`):** Enforces business rules (e.g., 60-second duplicate submission check, freezing `doctor_name_snapshot`, assigning `SPD-` tracking IDs).
5. **Data Access (`*.data.ts`):** Isolated Supabase SQL queries using the server client. If table columns change, only this file is updated.

---

## 4. Notification Integration Boundary

### V1 Reality (Simple & Queue-Free)
There is **no Redis, Kafka, RabbitMQ, or external worker**. The system follows a **fire-and-record** model:
1. Appointment is safely committed to Supabase PostgreSQL first.
2. `notification_status` is marked as `PENDING`.
3. The Server Action invokes `notifications.service.sendAppointmentAlert()` with a strict **3-second timeout**.
4. If Resend responds OK within 3s → status updated to `SENT`.
5. If Resend times out, errors, or fails → status updated to `FAILED`.
6. Patient receives an immediate success response regardless of email outcome.
7. Staff can click **"Retry Notification"** in the dashboard at any time.

```mermaid
flowchart LR
    subgraph V1["V1 Simple Dispatch (Active)"]
        NotifyServiceV1["Notification Service"] --> ResendAdapter["Resend Email API<br/>(3s Timeout)"]
    end

    subgraph Future["Future Multi-Channel Dispatch (Pluggable)"]
        NotifyServiceV2["Notification Service"] --> ResendV2["Resend Email"]
        NotifyServiceV2 --> WhatsAppAdapter["WhatsApp Cloud API<br/>(wa.me upgrade)"]
        NotifyServiceV2 --> SMSAdapter["SMS Gateway<br/>(DLT-registered in India)"]
    end
```

### Future Extensibility
When the hospital decides to invest in paid automated SMS or WhatsApp Business API alerts:
- A new file `features/notifications/providers/whatsapp.provider.ts` is added.
- `notifications.service.ts` calls both adapters.
- **The core appointment form and database schema require zero rewriting.**

---

## 5. Future Payment Boundary

V1 does **not** collect payments. Appointments are booking requests confirmed by the front desk over the phone.

### Future Architecture Interface
When online consultation deposits or OPD registration fees are introduced:
```text
Appointment Request
       ↓
Optional Payment Gateway (Razorpay / Cashfree)
       ↓
Webhook Verification
       ↓
Update Enquiry Status: 'confirmed' (payment_status: 'paid')
```
- **Boundary:** An `appointments.payment.ts` handler can be plugged into the appointment service without altering public forms or doctor rosters.
- **V1 Action:** Do NOT install Razorpay or Stripe SDKs now.

---

## 6. Future AI Boundary

AI is strictly an **optional advisory module**. It must **never** be a core system dependency.

```mermaid
flowchart TD
    User["Patient / Hospital Staff"] --> App["Core Web Monolith"]
    App --> DB[("Supabase PostgreSQL")]

    subgraph OptionalAI["Future Optional AI Layer (Isolated)"]
        AIService["AI Assistant Service<br/>(Enquiry triage, Search, Bio polishing)"]
    end

    App -.->|Optional Query| AIService
    AIService -.->|Suggested Text| App
```

### Future Scope & Strict Medical Boundary (Post-V1)
> [!CAUTION]
> **Strict Medical Boundary:** AI must **NEVER** be used for medical diagnosis, symptom triage, clinical assessment, treatment recommendations, or medical decision-making. 

Future optional AI use cases are strictly administrative and supportive:
- General enquiry categorization (e.g., routing contact requests to desk or OPD)
- Content drafting (e.g., assisting doctors with profile biographies or clinic descriptions)
- FAQ drafting and polishing
- Administrative summaries for front desk management
- Website search assistance for finding hospital services and timings

### Architectural Rule
If any future AI API times out, throws errors, or is disabled:
- Appointments **still work**.
- Enquiries **still work**.
- Admin dashboard **still works**.
- Public website **remains 100% online**.

---

## 7. Future Hospital Information System (HIS) Integration

V1 operates completely standalone. Most small 2-doctor community clinics in India manage OPD via physical registers or simple desk Excel sheets.

### Conceptual Future Integration Layer
```text
Spandan Hospital Platform
          ↓
Integration Adapter Layer (features/integrations/his.adapter.ts)
          ↓
External Hospital HIS / EMR / Lab Reporting System
```
- When the hospital adopts an external HIS, an outbound webhook or scheduled sync script reads confirmed appointments from Supabase and pushes them to the HIS.
- V1 is completely decoupled from any vendor-specific EMR format.

---

## 8. Multi-Hospital Reusability Strategy

While this project's initial deployment is built exclusively for Spandan Hospital, the architecture is engineered as a **Reusable Hospital Digital Platform**. The developer can deliver an identical, production-ready portal for **Hospital B** in the future in just a few hours without touching application code.

### The Reusable Platform Pattern (Single-Tenant Reusability)
Instead of building an error-prone, complex multi-tenant SaaS engine with tenant routing and shared tables, reusability is achieved through clean separation:

$$\text{Instance} = \text{Core Platform Code (Reusable)} + \text{Hospital Database & Config (Client-Specific)}$$

1. **Independent Deployments:** Each hospital receives an isolated Next.js deployment on Netlify and an isolated Supabase project. There is zero risk of cross-tenant patient data leakage.
2. **Configurable Hospital Settings:** All business identifiers (name, tagline, phone numbers, emergency hotlines, OPD hours, map links, announcements) live in `hospital_settings` and `lib/config/hospital.ts`.
3. **Structured Content Tables:** Doctors, services, and testimonials are populated via migrations or the admin UI per client.
4. **Theme Customization:** Re-theming is accomplished strictly by adjusting design tokens (`globals.css`), requiring zero changes to UI components.
5. **Rapid Client Onboarding:**
   - Clone/fork the repository for Hospital B.
   - Run standard migrations in `/database/migrations/`.
   - Update 5 brand color tokens in `globals.css`.
   - Seed Hospital B's initial doctors, services, and contact numbers.
   - Connect to Netlify and assign the client's custom domain.

### The Future Reuse Principle
> **"Build reusable foundations, not speculative features."**  
>  
> A capability becomes part of the core platform only when it is:  
> 1. Needed by the current product (Spandan Hospital), OR  
> 2. Clearly reusable infrastructure required by multiple real features.  
>  
> Do **NOT** implement something only because it may be useful years later. Speculative code adds testing overhead, maintenance debt, and confusion.

---

## 9. Content Governance Model

A core principle of platform stability is strict boundary enforcement between code structure and hospital content:

```text
Development Team ─── controls ─── Layout, Components, Responsive Design, Code
Hospital Staff   ─── controls ─── Approved Structured Content (Doctors, Hours, Numbers)
```

### Content Boundaries:
- **What Staff Controls:**
  - Doctor profiles, qualifications, and consultation hours.
  - Clinical department descriptions and facilities.
  - Approving and featuring patient testimonials.
  - Emergency, desk, and WhatsApp phone numbers.
  - Homepage announcement banner message and active toggle.
- **What Staff CANNOT Access (Strict Safeguards):**
  - **No HTML or script injection:** Inputs are validated and sanitized strings.
  - **No CSS or style editors:** Prevents brand distortion or contrast accessibility failures.
  - **No drag-and-drop page builders:** Prevents broken responsive grids on mobile viewports.
  - **No unrestricted layout changes:** Core page layouts remain rock-solid.

---

## 10. Centralized Design System & Design Tokens Strategy

Branding colors, typography, and geometry must never be hardcoded across components.

### Token Hierarchy:
```css
/* app/globals.css */
:root {
  /* Brand Identity Tokens */
  --brand-primary: 215 80% 28%;      /* Hospital A Primary: Deep Trust Navy */
  --brand-secondary: 178 78% 38%;    /* Hospital A Secondary: Medical Teal */
  --brand-accent: 199 89% 48%;       /* Action Highlight: Cerulean */
  --brand-emergency: 0 84% 60%;      /* Emergency Alert: Coral Red */

  /* Neutral Surface Tokens */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  --card: 0 0% 100%;
  --border: 214 32% 91%;

  /* Geometry & Radius Tokens */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}
```

### Reusability Rules:
- **Component Independence:** Components consume semantic classes (`bg-primary`, `text-primary-foreground`, `border-border`).
- **Token Scope:** Covers CSS variables, typography tokens, color tokens, spacing tokens, radius tokens, shadow tokens, and responsive breakpoints.
- **Client Theming:** Changing from Spandan Hospital (Navy/Teal) to a second client (e.g., Emerald/Gold) requires altering CSS variable definitions in `globals.css` without modifying a single JSX/TSX component.

---

## 11. Feature Flags Strategy (Future Option — Not Built in V1)

**V1 Status:** No feature-flag system or `lib/config/features.ts` is created for V1. The initial product has a lean, fixed V1 feature boundary.

If future feature additions eventually require runtime toggling, a lightweight, zero-dependency configuration object can be introduced without external SaaS services:

```typescript
// Future conceptual option (Do NOT create in V1)
// lib/config/features.ts
export const FEATURE_FLAGS = {
  appointmentRequests: true,
  publicEnquiries: true,
  doctorRoster: true,
  servicesCatalog: true,
  testimonials: true,
  
  // Future experimental additions
  onlinePayments: false,
  automatedWhatsAppApi: false,
  smsNotifications: false,
  patientPortal: false,
  aiAssistant: false,
} as const;
```
- For V1, keep the application minimal and do not build this abstraction prematurely.

---

## 12. Application Semantic Versioning

The project uses clean Semantic Versioning (`MAJOR.MINOR.PATCH`) tracked via Git tags:

| Version Type | When to Increment | Example |
| :--- | :--- | :--- |
| **PATCH (`1.0.x`)** | Bug fixes, typo corrections, styling tweaks, minor copy changes that do not alter database schemas or workflows. | `v1.0.1` (fix mobile drawer padding) |
| **MINOR (`1.x.0`)** | Adding new backwards-compatible capabilities, adding a new public section, CSV export enhancements, or new admin filters. | `v1.1.0` (add CSV export feature) |
| **MAJOR (`x.0.0`)** | Breaking changes, database restructuring, introduction of online payments, patient portal accounts, or complete architectural shifts. | `v2.0.0` (launch of Patient Portal) |

---

## 13. Solo-Developer Maintainability: "Where is X?" Guide

Whenever you or another developer need to find or modify code, use this direct map:

| Question | File / Directory Location |
| :--- | :--- |
| **Where is the appointment booking logic?** | `features/appointments/appointments.service.ts` |
| **Where is public form validation?** | `features/appointments/appointments.schema.ts` |
| **Where are the database queries?** | `features/<feature-name>/<feature-name>.data.ts` |
| **Where is staff authentication?** | `features/authentication/` & `lib/supabase/` |
| **Where are notification dispatchers?** | `features/notifications/providers/resend.provider.ts` |
| **Where are external service credentials?** | Netlify Site Settings & `.env.local` |
| **Where are feature flags?** | Future option only; not built in V1 (see `docs/FUTURE-SCALABILITY.md`) |
| **Where are database migrations?** | `database/migrations/` |
| **Where are branding colors & fonts?** | `app/globals.css` & `tailwind.config.ts` |
| **Where is hospital configuration?** | `hospital_settings` DB table & `lib/config/hospital.ts` |
| **How do I test a build locally?** | Run `npm run build` in terminal |
| **How do I deploy?** | Push to `main` branch on GitHub; Netlify builds automatically |
| **How do I roll back a broken deploy?** | In Netlify Dashboard > **Deploys**, click previous deploy > **Publish deploy** |
| **How do I troubleshoot production issues?** | Check `docs/TROUBLESHOOTING.md` & visit `https://spandanhospital.in/api/health` |
