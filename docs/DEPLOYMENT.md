# Deployment & Infrastructure Guide: Spandan Hospital Web

> **Status:** Approved Deployment Plan  
> **Hosting Platform:** **Netlify** (Commercial-friendly free tier)  
> **Backend & Storage:** Supabase (Mumbai Region `ap-south-1`)  
> **Commercial Package Value:** ~₹30,000 all-inclusive

---

## 1. Hosting Architecture & Free-Tier Strategy

To satisfy the zero-cost development mandate and support the commercial budget (~₹30,000 all-inclusive):

| Component | Provider | Tier | Expected Cost During Dev / Launch | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Application Hosting** | **Netlify** | Free / Starter | ₹0 | Permits commercial client deployment without violating terms (unlike Vercel Hobby). Instant rollbacks, preview branches. |
| **Database & Auth** | **Supabase** | Free Tier | ₹0 | 500 MB DB capacity, 50,000 MAU. Region: Mumbai (`ap-south-1`). |
| **Media / Storage** | **Supabase Storage** | Free Tier | ₹0 | 1 GB storage, 2 GB egress. Bucket: `hospital-assets`. |
| **Anti-Spam / Bot** | **Cloudflare Turnstile** | Free Tier | ₹0 | Unlimited free challenges, privacy-friendly. |
| **Transactional Email**| **Resend** | Free Tier | ₹0 | 3,000 emails/month (100/day). Sufficient for ~300 patient alerts/month. |
| **Custom Domain** | Namecheap / Hostinger / Cloudflare Registrar | Annual Registration | ~₹800 - ₹1,200 / 1st year | Covered within the ₹30,000 package. Hospital renews annually from Year 2. |

---

## 2. Environment Variables Configuration

The project uses a single, standardized set of environment variables:

```bash
# ==============================================================================
# SPANDAN HOSPITAL WEB — ENVIRONMENT CONFIGURATION (.env.example)
# ==============================================================================

# Application Base URL
NEXT_PUBLIC_APP_URL="https://spandanhospital.in"

# ------------------------------------------------------------------------------
# Supabase Configuration
# ------------------------------------------------------------------------------
# Public API gateway (Safe for browser)
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"

# Public Anon Key (Governed strictly by PostgreSQL RLS)
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Service Role Secret (STRICTLY SERVER-ONLY - Used in Server Actions)
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# ------------------------------------------------------------------------------
# Anti-Spam & Bot Verification (Cloudflare Turnstile)
# ------------------------------------------------------------------------------
# Public widget site key
NEXT_PUBLIC_TURNSTILE_SITE_KEY="0x4AAAAAA..."

# Turnstile private secret key (Server-only validation)
TURNSTILE_SECRET_KEY="0x4AAAAAA..."

# ------------------------------------------------------------------------------
# Transactional Notifications (Resend)
# ------------------------------------------------------------------------------
RESEND_API_KEY="re_123456789..."
HOSPITAL_ALERT_EMAIL="desk@spandanhospital.in"
NOTIFICATION_SENDER_EMAIL="Spandan Hospital <notifications@spandanhospital.in>"
```

---

## 3. Application Versioning Strategy

Deployments and releases are tagged in Git using Semantic Versioning (`vMAJOR.MINOR.PATCH`):
- `v1.0.0` — Initial production delivery (V1 Feature Boundary).
- `v1.0.1` — Patch: UI styling fixes, typo corrections, minor bug fixes.
- `v1.1.0` — Minor: New non-breaking admin features (e.g., advanced date filters, expanded CSV fields).
- `v2.0.0` — Major: Future breaking additions (e.g., patient portal, online payments).

Tagging a release in Git:
```bash
git tag -a v1.0.0 -m "Release v1.0.0 - Spandan Hospital Production Launch"
git push origin v1.0.0
```

---

## 4. Step-by-Step Deployment Roadmap (When Approved)

### Phase 1: Supabase Setup
1. Create a free Supabase project named `spandan-hospital-prod`.
2. Select region `ap-south-1` (Mumbai) for minimum latency for Indian patients.
3. In SQL Editor, execute the schema migration scripts from `/database/migrations/`:
   - `01_initial_schema.sql` (Creates tables: `enquiries`, `doctors`, `services`, `testimonials`, `hospital_settings`, `activity_logs`)
   - `02_security_rls.sql` (Applies RLS policies)
   - `03_seed_data.sql` (Initial hospital content and default settings)
4. Create public storage bucket named `hospital-assets` for doctor photos. Set file size limit to 5 MB.
5. Create the initial hospital administrator under **Authentication > Users**.

### Phase 2: Cloudflare Turnstile & Resend Setup
1. Create a Turnstile widget (Managed Challenge) configured for your production domain and local `localhost`.
2. Register hospital domain on Resend and add standard SPF, DKIM, and DMARC DNS records for reliable delivery.

### Phase 3: Netlify Deployment
1. Connect Git repository to Netlify.
2. Build configuration (configured via `netlify.toml` at repository root):
   - **Build Command:** `npm run build`
   - **Publish Directory:** `.next` (handled natively by the `@netlify/plugin-nextjs` runtime)
3. Enter Environment Variables in **Netlify Site Configuration > Environment variables**.
4. Deploy the site.

---

## 5. Custom Domain & DNS Mapping

When the hospital acquires its custom domain (e.g., `spandanhospital.in`):

1. **DNS Records for Website (Netlify):**
   - Point `@` (Apex) to Netlify load balancer IP: `75.2.60.5` (or use Netlify DNS)
   - Point `www` (CNAME) to `<site-name>.netlify.app`
2. **DNS Records for Email (Resend):**
   - `TXT` record for SPF
   - `TXT` record for DKIM
   - `TXT` record for DMARC
3. **SSL Certificate:**
   - Automatically provisioned and renewed for free via Let's Encrypt through Netlify.

---

## 6. Pre-Launch Verification Checklist

- [ ] All forms tested with Indian mobile numbers (+91 format).
- [ ] Turnstile prevents bot submissions; direct REST insert on Supabase is rejected.
- [ ] Database stores enquiry with display-name snapshots and status `PENDING`.
- [ ] Email notification delivers successfully to hospital desk inbox; status updates to `SENT`.
- [ ] Failure recovery verified: when Resend key is invalid, enquiry remains stored with status `FAILED` and retry button appears in dashboard.
- [ ] Admin dashboard authentication requires password; protected routes reject unauthenticated visitors.
- [ ] Marketing pages are pre-rendered statically and load quickly.
- [ ] Google Maps iframe displays exact hospital location.
- [ ] WhatsApp 1-tap link opens WhatsApp with pre-filled enquiry text.
- [ ] CSV Export button downloads patient appointment list cleanly.
- [ ] Lighthouse score: Performance > 90, Accessibility > 95, SEO > 95.
