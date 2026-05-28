# Well (Society)™ — Simple Summary (Non-Technical)

## 1. What is Well (Society)™?

A **luxury, members-only wellness club in Miami Beach** with the tagline _"Age on Your Own Terms."_

It's not a gym or a spa — it's a high-end club where wealthy, ambitious people go to:

- Get advanced medical tests (blood work, diagnostics)
- Use fancy wellness equipment (cold plunge, sauna, hyperbaric oxygen chamber)
- Get IV drips, peptide therapy, exosome treatments
- Attend exclusive events, network, and feel like a VIP

There is also a **virtual (telehealth) side** so people anywhere in the USA can become members and get video doctor appointments, lab tests, and prescriptions delivered to their home.

Brand vibe: _"Aging is optional. We don't do basic wellness. We don't do green juice. We don't do trends."_

---

## 2. What Does the Document Want Us to Build?

Right now they only have **one fancy scrolling marketing webpage**. They want to expand it into a **full digital platform** — a public website + a private member app.

### A) Public Website (anyone can see)

1. **Homepage** — fancy scrolling page with hero video and "We Don't Do" manifesto _(already built)_
2. **Membership / Pricing Page** — tiers and prices with a "Join" button
3. **About Page** — brand story, doctor bios, the science
4. **Social Life / Events Page** — calendar of private member events
5. **Waiting List Page** — simple form to capture leads
6. **Contact Form** _(already built)_

### B) Private Member Area (login required)

7. **Member Dashboard** — appointments, lab results with charts, active treatments, messages, documents, billing
8. **Booking System** — pick service → pick doctor → pick time
9. **Telehealth Video Calls** — video appointments inside the website
10. **Secure Messaging** — HIPAA-compliant chat with the medical team

### C) Backend / Admin

11. Staff dashboard to manage appointments, members, content
12. Connection to a medical records system (Healthie or Cerbo)
13. Connection to labs (LabCorp / Quest)
14. Pharmacy partner for prescriptions
15. **Stripe** for payments / subscriptions
16. **SendGrid** for email + **Twilio** for SMS reminders

---

## 3. The User Flow — Step by Step

The story of how a person becomes a member and uses the platform:

1. **Discovery** — Hears about Well Society on Instagram → visits the website.
2. **First Impression** — Sees the cinematic homepage and gets intrigued.
3. **Joins Waiting List** — Fills in name, email, and chooses _In-Club (Miami)_, _Virtual_, or _Both_. Gets a welcome email.
4. **Invitation** — Team reviews and invites them. They sign up (email/password or Google/Apple) and pick a membership tier.
5. **Onboarding** — Fills out a digital health intake form, signs consent forms, sets up payment.
6. **Books First Appointment** — Picks service (e.g. "Initial Consult"), doctor, date/time. Gets email + SMS confirmation.
7. **The Visit:**
   - **In-person** (Miami members): goes to the club, sees doctor, uses cold plunge / IV / etc.
   - **Virtual** (telehealth members): logs in to portal, clicks appointment, video call opens right there.
8. **Labs & Results** — Lab kit mailed home (or visits LabCorp). Results appear in dashboard as easy-to-read charts with the doctor's notes.
9. **Ongoing Care** — Sees active protocols (peptides, supplements, hormones). Requests refills, messages the doctor, books follow-ups. Prescriptions shipped to home.
10. **Community** — Browses Events page, RSVPs to private dinners or wellness talks.
11. **Billing** — Subscription auto-renews monthly. Can pause, upgrade, or cancel from dashboard.

---

## 4. The Big Picture — One Sentence

> **Well (Society) wants a beautiful luxury website + a private member app where rich health-conscious people can join a Miami wellness club (or its online version), book in-person or video doctor appointments, see lab results and treatments, get prescriptions delivered, message their care team, and attend exclusive events — all in a HIPAA-compliant, premium, on-brand experience.**

---

## 5. How It Will Be Built (5 Phases)

1. **Phase 1** — Polish marketing site + add waiting list + Social Life section
2. **Phase 2** — Login/signup, member profiles, digital intake & consent forms
3. **Phase 3** — Telehealth integration (Healthie or Cerbo), video appointments, lab results in dashboard
4. **Phase 4** — Full dashboard: messaging, prescriptions, billing, notifications
5. **Phase 5** — Events calendar, RSVPs, community features, Instagram integration

---

## 6. Critical Things to Keep in Mind

- **Data privacy compliance is mandatory** — medical data has strict privacy/security rules.
- **Doctors must be licensed in the member's state** — telehealth has legal restrictions.
- **The brand is luxury** — every screen must feel premium, editorial, cinematic. Not a generic medical app.
- **Reference brand studied:** _joiandblokes.com_ (31 screenshots captured for design inspiration).

---

## 7. Tech Stack (recommended in the doc)

- **Frontend:** Next.js 14+ (App Router), Tailwind CSS, GSAP for animations
- **Backend:** Node.js / Next.js API routes (or NestJS for clinical logic)
- **Database:** PostgreSQL + Redis
- **Auth:** NextAuth.js or Auth0
- **Hosting:** Vercel + AWS / Railway
- **Video:** Cloudinary or Mux
- **Payments:** Stripe
- **Email/SMS:** SendGrid + Twilio
- **Analytics:** Mixpanel + Google Analytics 4
