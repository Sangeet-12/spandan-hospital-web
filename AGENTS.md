# AGENTS.md — Spandan Hospital Web Project Guidelines & Rules

> **Permanent Project Rules & Operating Principles**  
> *Target System:* Production-ready public website and lightweight admin dashboard for **Spandan Hospital**  
> *Target User/Maintainer:* Beginner solo developer using Antigravity  
> *Business Model:* Custom client delivery (~₹30,000 commercial package)  
> *Hosting Target:* **Netlify** (commercial-friendly free tier; avoid Vercel Hobby)  
> *Architecture:* Simple Modular Monolith at Repository Root

---

## 1. Prime Directive

This project is built for a real, doctor-owned community hospital (two operating doctors) by a solo beginner developer.  
Every architectural and implementation decision **MUST** be optimized for:
1. **Simplicity** — Favor plain, readable, standard patterns over clever abstractions.
2. **Reliability** — Submissions must never be lost; failures must be isolated and recoverable.
3. **Security** — Zero secret leakage, database-level security (RLS), server-side validation.
4. **Data Minimization** — Strict healthcare boundary: collect only minimal operational appointment data; never collect medical records, diagnoses, prescriptions, or clinical histories.
5. **Maintainability & Easy Debugging** — Obvious file locations, descriptive names, clear logs, request IDs.
6. **Zero/Low Cost during Development** — Stick strictly to generous free tiers.
7. **Minimal Dependencies** — Do not introduce unnecessary frameworks, libraries, microservices, or external queues.
8. **Documented Decisions** — Keep all docs in `/docs/` updated as the project evolves.

---

## 2. Strict Architectural Boundaries

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
- **Forbidden Additions (DO NOT USE IN V1):**
  - No Microservices or distributed architectures
  - No Kubernetes, Docker Swarm, or container orchestrators
  - No Redis, external queues (Kafka, RabbitMQ), or background worker services
  - No separate custom Express/Nest backend servers
  - No paid AI APIs, LLM medical diagnosis, or paid automation platforms (Zapier/Make)
  - No Meta WhatsApp Business Cloud API (use standard free `wa.me` links only)
  - No payment SDKs (Razorpay, Stripe) in V1
  - No heavy CMS or free-form visual/drag-and-drop page builders for staff
  - No clinical EMR/EHR, prescription storage, or diagnostic file repositories

---

## 3. Business Modules & Layered Separation of Concerns

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

## 4. Core Data, Privacy & Notification Principles

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

## 5. Future Extensibility Boundaries (Do Not Build Now)

The architecture is built so future enhancements can be added without rewriting V1:
- **Notifications:** Pluggable adapter boundary allows adding WhatsApp or SMS alongside Resend later.
- **Payments:** Clear boundary between appointment booking and optional payment services (Razorpay).
- **AI Integration:** Strictly an optional advisory layer. Future AI capabilities must **NOT** include medical diagnosis, symptom triage, treatment recommendations, or clinical decision-making. Future scope is limited strictly to: enquiry categorization, content drafting, FAQ drafting, administrative summaries, and website search assistance. The core site must work 100% if AI is offline.
- **Hospital Systems (HIS/EMR):** Conceptual integration adapter layer. V1 remains completely standalone.
- **Multi-Hospital Reuse:** Single-tenant modular monolith. Reusable UI components, design tokens, and migrations allow duplicating the system for a second clinic without building a multi-tenant SaaS.

---

## 6. Design System & Feature Flags

- **Design System:** Controlled via CSS variables in `globals.css` and tokens in `tailwind.config.ts`. The development team controls design; hospital staff controls structured content.
- **Feature Flags:** Future option only. Do **NOT** build a feature-flag system in V1; do not create `lib/config/features.ts` yet. Keep V1 minimal and lean.
- **Versioning:** Semantic Versioning (`v1.0.0`, `v1.1.0`, `v2.0.0`) tracked via Git tags.

---

## 7. Roles & Access Control

Keep V1 user roles straightforward:
1. `developer` — System maintenance and initial technical administrator.
2. `hospital_admin` — Doctor owners / Medical directors with full management access.
3. `staff` — Front desk receptionists managing enquiries, updating status, and exporting CSV.
4. `doctor` — Consulting doctors viewing assigned requests and checking schedules.

Authorization is enforced at the database level via Supabase Row Level Security (RLS).

---

## 8. Public Website Reliability & Performance

- Marketing pages use Next.js Static Generation / ISR.
- Normal public visitors must **NOT** trigger a live database query on every page request.
- The public website remains online and accessible even during Supabase pauses or maintenance.

---

## 9. Security & Secret Hygiene

- **Client-Side Secrets:** NEVER expose private API keys, service role keys, or database credentials.
- **Environment Variables:** `NEXT_PUBLIC_*` strictly for public keys; server secrets (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) strictly on server.
- **Repository Hygiene:** `.env` and `.env.local` in `.gitignore`. Clean `.env.example` maintained.
- **Patient Privacy:** **NEVER put patient or business data into Git.**

---

## 10. Solo-Developer Navigation Map ("Where is X?")

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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
