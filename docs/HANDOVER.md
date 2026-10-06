# Client Handover & Operations Guide: Spandan Hospital

> **Document Type:** Operational Handover Manual & Commercial Model  
> **Client:** Spandan Hospital (Doctor Owners & Administration Staff)  
> **Commercial Package Value:** ~₹30,000 (Inclusive of 1st-Year Custom Domain & Netlify Production Deployment)

---

## 1. Technical & Commercial Ownership Model

Responsibilities are clearly demarcated between Spandan Hospital and the developer:

### What Spandan Hospital Owns
1. **Custom Domain Name:** The hospital owns the custom domain (`spandanhospital.in` or similar) registered under their business identity.
2. **Business & Patient Data:** All patient appointment leads, doctor profiles, consultation schedules, and hospital settings stored in the database belong 100% to Spandan Hospital.
3. **Operational Credentials:** Administrative credentials for the dashboard and direct operational access to notification inboxes.

### What the Developer Maintains
1. **Codebase & Architecture:** The modular monolith repository, reusable components, and build configurations.
2. **Hosting & Deployment Pipeline:** Netlify CI/CD connections, Supabase project configuration, and DNS records.
3. **Technical Security & Reliability Monitoring:** Monitoring uptime, framework patches, and disaster recovery support.
4. **Maintenance Agreement (Optional Annual Retainer):** Assisting with Year 2 domain renewal, SSL maintenance, quarterly data backups, and technical support.
5. **Future Upgrades Roadmap:** Optional future commercial expansions (online payments, automated WhatsApp bots, patient portal accounts) can be added seamlessly without rebuilding the core website.

---

## 2. Hospital Staff Operational Guide

The Hospital Admin Dashboard is designed to be self-explanatory for non-technical front-desk staff and doctors.

### A. Logging In
1. Navigate to `https://spandanhospital.in/admin/login`.
2. Enter your authorized staff email and password.
3. Upon login, the **Dashboard Overview** displays today's metrics (New Enquiries Today, Confirmed Appointments, Active Doctors).

---

### B. Managing Inbound Patient Enquiries & Appointments
Every time a patient submits an appointment request online:

1. Click **"Enquiries"** in the sidebar.
2. New patient submissions appear ordered by newest first:
   - **Patient Name & Mobile Number**
   - **Requested Doctor / Department** (historical display name preserved)
   - **Preferred Date & Time Window**
   - **Brief Visit Reason** (e.g., "Routine Checkup", "Fever")
   - **Notification Status** (`SENT` or `FAILED`)
   - **Pipeline Status Badge** (`New`, `Contacted`, `Confirmed`, `Completed`, `Cancelled`)
3. **Standard Front-Desk Workflow:**
   - Click the patient entry to inspect details.
   - Click the phone number to call the patient or open direct WhatsApp to confirm appointment timing.
   - Update Status to `Contacted` after reaching out.
   - Update Status to `Confirmed` once the patient's OPD slot is booked.
   - Add an **Internal Desk Note** (e.g., *"Confirmed for 4:30 PM with Dr. Patil"*).
   - If the notification status says `FAILED`, click **"Retry Notification"** to resend the email alert.
4. **Export to CSV:**
   - Click **"Export to CSV"** at the top right of the table to download a spreadsheet for daily reception records.

---

### C. Updating Doctor Roster & Consultation Hours
When a doctor's OPD timing changes or a new physician joins the hospital:

1. Click **"Doctors"** in the sidebar.
2. To edit an existing doctor: Click **"Edit"** next to their profile.
3. Update qualifications, OPD timings (e.g., `Mon - Sat: 10:00 AM - 1:00 PM`), or upload a new photo.
4. **Content Status Lifecycle:**
   - `draft` — Hidden from the public website while preparing details.
   - `published` — Visible immediately on the public website.
   - `archived` — Inactive or on leave; hidden from public site while preserving past appointment records.
5. Click **"Save Doctor Profile"**.

---

### D. Updating Services & Testimonials
- **Services:** Manage clinical departments, descriptions, and icon representations. Support `draft`, `published`, and `archived` statuses.
- **Testimonials:** Review patient reviews. Toggle `published` to display on the website, or toggle `Featured` to highlight on the homepage.
- **Data Privacy Rule:** Testimonials should only display patient initials or first names (e.g., "Ramesh P.") to protect patient confidentiality.

---

### E. Managing Hospital Settings & Emergency Numbers
If hospital emergency phone numbers or operating hours change:

1. Click **"Settings"** in the sidebar.
2. Update **Emergency Hotline**, **Reception Desk Phone**, or **WhatsApp Contact Number**.
3. Manage the **Announcement Banner**:
   - Enter alert text (e.g., *"Free Diabetes Health Checkup Camp this Sunday 9 AM - 2 PM"*).
   - Toggle banner active/inactive.
4. Click **"Save Settings"**. Updates appear across the public website immediately.

---

## 3. Annual Renewal & Maintenance Schedule

| Milestone / Item | Frequency | Responsibility | Typical Cost |
| :--- | :--- | :--- | :--- |
| **Domain Name Renewal** | Annual | Billed to hospital / Managed by developer | ~₹800 - ₹1,200 / year (starts Year 2) |
| **Netlify Hosting** | Continuous | Free Tier | ₹0 |
| **Supabase Database & Storage** | Continuous | Free Tier (up to 500 MB DB) | ₹0 |
| **Cloudflare Turnstile** | Continuous | Free Tier | ₹0 |
| **Resend Email Dispatch** | Continuous | Free Tier (up to 3,000 emails/mo) | ₹0 |
| **SSL Security Certificate** | Automatic | Free via Let's Encrypt / Netlify | ₹0 |
| **Technical Support Agreement** | Annual | Optional maintenance retainer | As agreed with developer |

---

## 4. Formal Handover Checklist

- [ ] Hospital administrator and receptionist accounts created and tested.
- [ ] Front desk staff demonstrated the enquiry processing workflow and CSV export.
- [ ] Test enquiry submitted on live site, received in inbox, and confirmed in dashboard.
- [ ] Hospital emergency phone numbers, address, and Google Map embed verified by hospital directors.
- [ ] Custom domain DNS transferred / configured correctly on Netlify.
- [ ] Emergency contact protocol established between hospital directors and developer.
