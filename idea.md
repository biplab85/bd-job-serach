# HOUSINGJOB — Full Project Plan (Page Map)

Goal: build the **complete job-search mobile app** as **static HTML pages first**, then wire it up dynamic later.
This file lists **every page** needed, grouped by module, with status.

## Conventions
- **Stack (Phase 1 / static):** plain HTML + `css/style.css` + jQuery (same as now). One `.html` file per screen.
- **Naming:** lowercase `kebab-case.html` (e.g. `job-details.html`).
- **Shared pieces to build once and reuse on every page:** top **header**, **bottom navigation bar** (Home / Search / Applications / Notifications / Profile), and the **side menu**. Build these as a copy-paste block (Phase 1) → convert to includes/components (Phase 2).
- **Status legend:** ✅ exists · 🔁 exists but needs rename/repurpose · 🆕 new page to create.

---

## Module 1 — Onboarding & Authentication (7)
| Page | Status | Purpose |
|------|--------|---------|
| `index.html` | ✅ | Desktop QR wrapper (phone mock-up with iframe) |
| `index2.html` | ✅ | Splash screen (logo + banner slideshow + GO) |
| `onboarding.html` | 🆕 | 2–3 intro slides explaining the app, "Get Started" |
| `login.html` | 🆕 | Login (mobile/email + password) |
| `register.html` | 🆕 | Sign up / create account |
| `otp-verification.html` | 🆕 | Verify phone/email with OTP code |
| `forgot-password.html` | 🆕 | Request password reset |
| `reset-password.html` | 🆕 | Set a new password |

## Module 2 — Home & Job Discovery (6)
| Page | Status | Purpose |
|------|--------|---------|
| `home.html` | 🆕 | Dashboard: search bar, featured jobs, categories, recent jobs |
| `job-category.html` | ✅ | Grid of job categories |
| `choose-job.html` | ✅ | Job listings inside a category |
| `search.html` | 🆕 | Search screen with filters (location, salary, type, experience) |
| `search-results.html` | 🆕 | Results list for a search/filter |
| `job-details.html` | 🆕 | Full single-job page: description, requirements, company, **Apply** button |

## Module 3 — Job Application Flow (6)
| Page | Status | Purpose |
|------|--------|---------|
| `apply-job.html` | 🆕 | Application form for a job (cover note, attach CV) |
| `about-yourself.html` | ✅ | Applicant personal info + photo |
| `book-appointment.html` | ✅ | Book interview/meeting (date, time, duration, purpose) |
| `confirmation.html` | ✅ | "Thank You" / application submitted confirmation |
| `my-applications.html` | 🆕 | List of jobs the user applied to + status (Applied / Shortlisted / Interview / Rejected) |
| `application-details.html` | 🆕 | Single application status & timeline |

## Module 4 — Interview / Meeting (2)
| Page | Status | Purpose |
|------|--------|---------|
| `interview-details.html` | 🔁 | Interview details + participants (**rename `choose-doctor-details.html`**) |
| `choose-doctor.html`, `choose-doctor - Copy.html` | 🔁 | Leftover doctor-template files → **delete or repurpose** |

## Module 5 — Profile & Account (9)
| Page | Status | Purpose |
|------|--------|---------|
| `profile.html` | ✅ | User profile overview |
| `edit-profile.html` | 🆕 | Edit name, contact, photo, bio |
| `my-cv.html` | 🆕 | View CV/resume (education, experience, skills) |
| `create-cv.html` | 🆕 | Build/edit CV |
| `saved-jobs.html` | 🆕 | Bookmarked / saved jobs |
| `settings.html` | 🆕 | App settings (language BN/EN, notifications toggle) |
| `change-password.html` | 🆕 | Change account password |
| `about-us.html` | 🆕 | About the app/company |
| `help-support.html` | 🆕 | FAQ / contact support |

## Module 6 — Notifications & Messages (4)
| Page | Status | Purpose |
|------|--------|---------|
| `notification-list.html` | ✅ | Notifications list |
| `notification-details.html` | ✅ | Single notification (Accept / Decline) |
| `messages.html` | 🆕 | Chat list (conversations with employers) |
| `chat.html` | 🆕 | One conversation thread |

## Module 7 — Legal (optional but recommended) (2)
| Page | Status | Purpose |
|------|--------|---------|
| `terms.html` | 🆕 | Terms & conditions |
| `privacy.html` | 🆕 | Privacy policy |

---

## ✅ Implemented in the Next.js app (`housingjob/`)
Beyond the original job-seeker pages, these modules are now built:
- **Employer / Recruiter:** `/employer` (dashboard), `/employer/post-job`, `/employer/applicants`, `/employer/applicants/[id]`
- **Company directory:** `/companies`, `/companies/[id]` (about, culture, benefits, reviews, open roles)
- **Salary insights:** `/salary` (range-bar charts by level + location)
- **Premium / billing:** `/premium` (pricing tiers), `/wallet` (billing history)
- Working **Share** (Web Share API + copy-link fallback) on job & company pages.

## Phase 2 — Employer side (now built ✅; ideas below for future)
A second user type (companies posting jobs). Skip for the first static pass.
| Page | Purpose |
|------|---------|
| `employer-dashboard.html` | Company home / posted jobs |
| `post-job.html` | Create a new job posting |
| `company-profile.html` | Company info page |
| `applicants-list.html` | Candidates who applied to a job |

---

## Counts
- **Already have (✅/🔁):** 11 files
- **New to create — Phase 1 (job-seeker app):** ~27 pages
- **Total Phase 1:** ~36 pages
- **Phase 2 (employer):** +4 pages

## Suggested build order (static)
1. **Auth flow** — onboarding → register → otp → login → forgot/reset password
2. **Home & discovery** — home → search → search-results → job-details
3. **Application flow** — apply-job → (about-yourself / book-appointment) → confirmation → my-applications → application-details
4. **Profile & CV** — profile → edit-profile → my-cv → create-cv → saved-jobs
5. **Notifications & messages** — notification-list/details → messages → chat
6. **Settings & static** — settings → change-password → about-us → help-support → terms → privacy
7. **Cleanup** — rename `choose-doctor-details.html` → `interview-details.html`, remove leftover doctor copies, fix all page `<title>` ("Meeting Arrengment" → "HOUSINGJOB")

## Notes before going dynamic (Phase 2 prep)
- Decide backend: **PHP + MySQL** (fits your WAMP setup) is the simplest path.
- Plan core data tables early: `users`, `jobs`, `categories`, `companies`, `applications`, `notifications`, `messages`.
- Replace hardcoded/repeated dummy blocks (e.g. the 7 identical job cards in `choose-job.html`) with one template that loops over data.
- Extract the shared header / bottom-nav / side-menu into a single included file so you edit it once.
