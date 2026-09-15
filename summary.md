# Project Summary — "HOUSINGJOB" (bd-job-serach)

## What this site is
A **static HTML/CSS/jQuery prototype of a mobile job-search + meeting-arrangement app**, branded **"HOUSINGJOB"**. It is a **front-end UI demo / template only** — there is no backend, no database, and no real logic. Every page is hardcoded dummy content, and navigation is just plain links between `.html` files. Much of the text is in **Bangla (Bengali)**, so the target audience is the **Bangladesh job market**.

It is essentially a clickable design mockup ("BD template", per the page metadata) that a designer/developer built to show how the app would look and flow on a phone screen.

## Purpose
Demonstrate the user journey of a job-seeking app where a candidate:
1. Browses job **categories** (Programmer, Content Writer, Game Developer, Operator, Guard, Network).
2. Views a **list of job openings** in a category.
3. **Books a meeting/appointment** (interview) with date, time, duration, and purpose.
4. Fills in **personal details** (name, mobile, photo via camera).
5. Receives a **confirmation** and manages **meeting notifications**.

> Note: the app mixes two concepts — a **job board** and a **meeting/appointment scheduler**. The page titles all say *"Meeting Arrengment"* (sic), and the appointment/notification screens reuse a doctor-appointment template (`dr1.jpg`, `choose-doctor`, "decline meeting", "Dr. Smith / Room no #250"). So it looks like a **job-search UI built on top of a recycled doctor-appointment booking template**.

## Tech stack
- Plain **HTML5** pages (one file per screen)
- **CSS**: `css/style.css` + `css/font-awesome5.css` (Font Awesome 5 icons), Google "Overpass" font
- **JavaScript**: `js/jquery-3.4.1.min.js` + `js/scripts.js` (small UI helpers: modals, ripple effect, radio-button states, slideshow)
- No build tools, no framework, no server-side code. Served as static files via WAMP/Apache.

## Page-by-page flow
| Page | Role |
|------|------|
| `index.html` | **Desktop wrapper** — shows a QR code and a phone mock-up. Loads the real app inside an `<iframe>`. ⚠️ The iframe + several buttons point to a hardcoded LAN IP `http://192.168.0.103/biplab/mob-app/git/job-search/...` that does not resolve here, so this page shows a timeout. |
| `index2.html` | **App splash screen** — HOUSINGJOB logo, banner slideshow, and a "GO" (play) button. The real entry point. |
| `job-category.html` | **Job categories** grid (6 categories, in Bangla). |
| `choose-job.html` | **Job listings** for a category (e.g. "Sr. Game Artist", vacancies, experience, location Dhaka, deadline — all in Bangla, all identical dummy rows). |
| `book-appointment.html` | **Book a meeting** form: date, start time, duration (15/20/30/60 min), purpose. → `about-yourself.html` |
| `about-yourself.html` | **Applicant info** form: name, mobile, "from", and a camera/photo upload. → `choose-doctor.html` |
| `choose-doctor.html` / `choose-doctor - Copy.html` | Reused "choose person" screen (leftover from the doctor template). |
| `choose-doctor-details.html` | **Meeting details** — participants, subject, attachments, decline button. |
| `confirmation.html` | **"Thank You!"** confirmation; auto-redirects to `choose-doctor-details.html` after 5s. |
| `notification-list.html` | **Notifications** list of meetings. |
| `notification-details.html` | A single notification with Accept/Decline → `confirmation.html`. |
| `profile.html` | **User profile** (name, mobile, mail, social links) — hardcoded to "Biplab Paul". |

## Key observations / issues
- **Not production software** — it's a UI prototype with placeholder ("Lorem ipsum", repeated dummy) content.
- **Broken/hardcoded links**: `index.html`, `index2.html`, and `job-category.html` link to the developer's old machine IP (`192.168.0.103/biplab/mob-app/...`) instead of relative paths. These break on any other host. To make the demo fully clickable on this machine, those URLs should be changed to local relative links (e.g. `job-category.html`, `choose-job.html`).
- **Inconsistent identity**: job-search content layered over a doctor-appointment template (page titles, doctor images, "decline meeting" wording).
- **Author**: Biplab Paul (per `profile.html` and git history); metadata author "BD template".

## How to run it
WAMP/Apache already serves the folder. Open in a browser:
- Full app entry: **`http://localhost/local-project/bd-job-serach/index2.html`**
- Desktop QR wrapper (iframe is broken): `http://localhost/local-project/bd-job-serach/index.html`
