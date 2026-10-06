# Spandan Hospital: Master Hospital Verification & Sign-Off Checklist

> **Document Type:** Client Information Request & Production Gatekeeper Checklist  
> **Target Entity:** Spandan Hospital (Lalghati / Airport Road, Bhopal, MP)  
> **Governance Rule:** No third-party directory assumption or placeholder data may bypass this checklist into production. Every item must be verified and signed off by the hospital operating doctors or authorized hospital administrator.

---

## PART 1: REQUIRED BEFORE DESIGN FINALIZATION

*The following items are strictly necessary to lock in the layout, design tokens, doctor presentation components, and visual identity.*

### 1. Brand & Visual Identity
| Item | Description & Baseline Context | Status / Priority | Action Required from Hospital |
| :--- | :--- | :--- | :--- |
| **Official Hospital Name** | Verify whether the legal and display name is simply "Spandan Hospital" or "Spandan Heart Hospital & Research Centre" or similar. | `REQUIRED` | Provide exact official display name for header, title tags, and legal footer. |
| **Official Logo Asset** | Vector SVG or high-resolution transparent PNG file. | `REQUIRED` | Supply vector logo or original source design files. |
| **Hospital Brand Colors** | Primary and secondary brand palette (e.g. medical navy blue, clinical teal, emergency crimson). | `OPTIONAL` | Confirm whether hospital has established brand color codes or approves the proposed medical navy & teal theme tokens. |
| **Preferred Tagline / Mission** | Short 1-sentence value proposition (e.g., "Compassionate Cardiac Care Close to Home"). | `REQUIRED` | Confirm or provide preferred tagline for the homepage hero. |
| **Hero Image / Facade Photo** | Clear, welcoming exterior building photo or modern reception visual. | `REQUIRED` | Provide 1–2 high-res exterior photos or approve curated clean clinical environment imagery. |

---

### 2. Doctors Directory Foundation
| Item | Description & Baseline Context | Status / Priority | Action Required from Hospital |
| :--- | :--- | :--- | :--- |
| **Confirmed Operating Roster** | Confirm whether Dr. Rohit Kumar Shrivastava and Dr. Shashank Dixit are the two principal operating cardiologists at Spandan Hospital. | `REQUIRED` | Confirm exact doctor list and whether any additional visiting consultants should be included. |
| **Exact Doctor Names & Titles** | Full professional names, official medical titles, and designations (e.g., "Director & Chief Cardiologist", "Senior Consultant Interventional Cardiologist"). | `REQUIRED` | Confirm exact display titles for both doctors. |
| **Verified Degrees & Qualifications** | MBBS, MD, DM (Cardiology), FACC or other post-doctoral fellowships. | `REQUIRED` | Provide verified list of medical degrees and granting institutions. |
| **Professional Doctor Portraits** | High-resolution, professional studio or clinic portraits of both doctors in medical coat / professional attire. | `REQUIRED` | Provide high-res portrait photographs (avoid phone selfies or passport scans). |
| **Doctor Biographies** | Brief 3–4 sentence clinical bio highlighting areas of expertise, procedural background, and patient care philosophy. | `REQUIRED` | Approve drafted bios or provide official summaries. |
| **Doctor OPD Schedules** | Consultation days and hours for each doctor (Third-party lists Mon–Sat 12:00 PM – 6:00 PM). | `REQUIRED` | Provide exact days, hours, and whether Sunday consultations occur. |
| **Consultation Fee Policy** | Whether OPD fees should be published transparently on the doctor card or communicated upon desk confirmation. | `OPTIONAL` | Confirm whether consultation fees (e.g., ₹500 / ₹700) should be displayed or omitted. |

---

### 3. Core Clinical Scope & Specialities
| Item | Description & Baseline Context | Status / Priority | Action Required from Hospital |
| :--- | :--- | :--- | :--- |
| **Primary Clinical Focus** | Confirm whether the public portal is positioned exclusively as a Cardiac Care Hospital or a Multispecialty Hospital with Cardiology as core. | `REQUIRED` | Choose primary positioning: "Specialized Cardiac Center" vs "Multispecialty with Cardiac Focus". |
| **Featured Procedures List** | Angiography, Angioplasty, Pacemaker, Valvuloplasty, 2D Echo, TMT, Holter, etc. | `REQUIRED` | Review and sign off on the exact list of procedures offered on-site. |
| **Sections Doctors Want Highlighted** | Particular clinical services or strengths the doctors wish to emphasize (e.g., radial angiography, 24/7 heart attack emergency, preventive heart checkups). | `REQUIRED` | Doctors to specify priority service highlights. |
| **Sections Doctors Do NOT Want** | Any modules or topics doctors explicitly want excluded (e.g., no online payment, no diagnostic fee lists, no complex departmental trees). | `REQUIRED` | Doctors to specify excluded items. |

---

## PART 2: REQUIRED BEFORE PRODUCTION LAUNCH

*The following items must be verified, tested, and legally approved before public DNS switch and live operation.*

### 4. Contact, Location & Emergency Operations
| Item | Description & Baseline Context | Status / Priority | Action Required from Hospital |
| :--- | :--- | :--- | :--- |
| **Exact Physical Address** | Discrepancy between Justdial (B-122 Indra Vihar Colony, 462030) and Bajaj Finserv (B-90, 121, 122 Indra Vihar Colony, 462001). | `REQUIRED` | Provide exact municipal door/plot numbers, colony name, landmark, and postal code. |
| **Verified Postal PIN Code** | Discrepancy between `462030` and `462001`. | `REQUIRED` | Confirm the exact postal PIN code for mail, couriers, and Google Maps pin. |
| **Official Front Desk Phone** | Direct landline or dedicated mobile phone answered by reception during operating hours. | `REQUIRED` | Confirm primary contact number (verify whether `0755-4931846` is operational). |
| **Official WhatsApp Desk Number** | Dedicated mobile number equipped with WhatsApp Business for 1-tap patient chat. | `REQUIRED` | Provide WhatsApp number for the `wa.me` quick-chat trigger. |
| **Dedicated Emergency Contact** | Direct 24/7 hotline for acute chest pain and cardiac emergencies (must bypass busy IVRs or slow desk queues). | `REQUIRED` | Provide direct emergency desk or casualty phone number. |
| **Official Hospital Email** | Dedicated email address for hospital administrative communication. | `REQUIRED` | Provide official contact email. |
| **Google Maps Location Coordinates** | Precise GPS pin on Google Maps to ensure the "Get Directions" button navigates patients to the front gate. | `REQUIRED` | Share verified Google Maps business location URL or latitude/longitude. |
| **Visiting Hours** | General ward and ICU visiting hours for patient relatives. | `REQUIRED` | Provide daily morning and evening visiting hours. |

---

### 5. Hospital Infrastructure & Fact Verification
| Item | Description & Baseline Context | Status / Priority | Action Required from Hospital |
| :--- | :--- | :--- | :--- |
| **Year Established** | Justdial lists "15 years" claim. | `DO NOT PUBLISH UNTIL VERIFIED` | Confirm exact founding year (e.g., 2009, 2011) before displaying "15+ Years" badge. |
| **Total Operational Beds** | Bajaj Finserv lists 35 beds. | `DO NOT PUBLISH UNTIL VERIFIED` | Confirm exact licensed and operational bed count. |
| **ICU / ICCU Bed Count** | Bajaj Finserv lists 10 ICU beds. | `DO NOT PUBLISH UNTIL VERIFIED` | Confirm exact intensive cardiac care unit bed capacity. |
| **Cath Lab Availability** | Whether Cath lab is fully operational on-site 24/7. | `DO NOT PUBLISH UNTIL VERIFIED` | Confirm Cath Lab specifications and availability. |
| **On-Site Diagnostics & Pharmacy** | Confirm on-site status of: Pathology Lab, X-Ray, 2D Echocardiography, TMT, In-House Pharmacy. | `REQUIRED` | Confirm which diagnostic facilities are inside the facility vs partnered externally. |
| **Ambulance Service** | Dedicated cardiac ambulance with ventilator/oxygen support. | `DO NOT PUBLISH UNTIL VERIFIED` | Confirm whether hospital owns an ambulance or has a dedicated partner service. |
| **Accreditations & Certifications** | NABH, NABL, ISO, or state healthcare board accreditations. | `DO NOT PUBLISH UNTIL VERIFIED` | Provide official certificates if any exist; do NOT publish unaccredited badges. |
| **Insurance Schemes & TPAs** | Empanelled cashless insurance providers, Ayushman Bharat (PM-JAY), MP State Government employee schemes, or corporate tie-ups. | `DO NOT PUBLISH UNTIL VERIFIED` | Provide list of officially empanelled TPAs and government schemes (if applicable). |
| **Facility Photographs** | Real photographs of reception lobby, ICU ward, private rooms, and diagnostic equipment. | `REQUIRED` | Provide 5–8 high-resolution photos of real facilities. |

---

### 6. Patient Trust, Reviews & Social Proof
| Item | Description & Baseline Context | Status / Priority | Action Required from Hospital |
| :--- | :--- | :--- | :--- |
| **Approved Testimonials** | 3–5 authentic patient testimonials describing real experiences (with patient consent). | `DO NOT PUBLISH UNTIL VERIFIED` | Hospital to provide written feedback records from real patients with consent to publish. |
| **Patient Privacy Safeguard** | Use only first names or initials (e.g., "R. K. Verma", "Mrs. S. Patel") to prevent patient privacy violations. | `REQUIRED` | Confirm hospital approves privacy-first initial/first-name display standard. |
| **Review Usage Authorization** | Permission to quote or summarize public reviews from Justdial / Google. | `REQUIRED` | Hospital management to authorize specific review quotes. |
| **Awards & Milestones** | Any factual clinical awards, fellowships, or public acknowledgments. | `DO NOT PUBLISH UNTIL VERIFIED` | Provide documented proof of awards before featuring on the site. |

---

### 7. Website Workflow & Enquiry Notification Protocol
| Item | Description & Baseline Context | Status / Priority | Action Required from Hospital |
| :--- | :--- | :--- | :--- |
| **Languages Required** | Default English; confirm if Hindi toggle / dual language is requested for V1. | `REQUIRED` | Confirm whether V1 should be English-only or English with Hindi translation elements. |
| **Enquiry Recipient Designation** | Name and role of staff member responsible for reviewing web appointment requests. | `REQUIRED` | Designate primary front-desk staff member (e.g., Reception Head / Hospital Manager). |
| **Preferred Notification Method** | Immediate email alert via Resend (included in V1) vs manual admin dashboard check. | `REQUIRED` | Provide the exact email inbox that will receive instant appointment alert emails. |
| **Appointment SLA / Patient Promise** | Commitment for turnaround time (e.g., "Our front desk will call you within 30 minutes during OPD hours"). | `REQUIRED` | Confirm realistic front-desk callback time to publish on the confirmation screen. |
| **Admin Dashboard User Accounts** | List of initial staff and doctor email addresses to provision in Supabase Auth. | `REQUIRED` | Provide 1 admin email (hospital director) and 1–2 staff emails (reception desk). |

---

## PART 3: SUMMARY OF CRITICAL VERIFICATION RULES

> [!CAUTION]
> **Strict Publication Moratorium:**  
> The following elements are on **strict publication hold** until explicit written confirmation is provided:
> 1. Bed count and ICU bed count numbers.
> 2. "15+ Years" establishment badge.
> 3. Specific insurance / cashless scheme empanelments.
> 4. NABH / NABL accreditation logos.
> 5. Any patient testimonial quotes or reviews.
> 6. Emergency ambulance dispatch claims.
> 
> *If an item is unverified at launch, the UI will simply omit the specific claim rather than displaying placeholders or guesses.*
