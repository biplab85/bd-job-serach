/* ------------------------------------------------------------------
   HousingJob — mock data (static phase).
   Swap these arrays for API/DB calls when going dynamic.
------------------------------------------------------------------- */

import {
  FiCode,
  FiEdit3,
  FiPenTool,
  FiTrendingUp,
  FiShield,
  FiServer,
  FiHeadphones,
  FiDatabase,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export type Category = {
  slug: string;
  name: string;
  icon: IconType;
  openings: number;
  tint: string; // tailwind-ish bg class token
};

export type Job = {
  id: string;
  title: string;
  company: string;
  companyLogo: string; // emoji / initial mark color
  logoBg: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  level: string;
  salary: string;
  category: string;
  posted: string;
  deadline: string;
  featured?: boolean;
  tags: string[];
  about: string;
  responsibilities: string[];
  requirements: string[];
  openings: number;
};

export type Application = {
  id: string;
  jobId: string;
  status: "Applied" | "Reviewed" | "Shortlisted" | "Interview" | "Rejected";
  appliedOn: string;
  step: number; // 0-4 timeline
};

export type Notification = {
  id: string;
  kind: "interview" | "status" | "message" | "tip";
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export type Conversation = {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  initials: string;
  preview: string;
  time: string;
  unread: number;
  online: boolean;
  messages: { me: boolean; text: string; time: string }[];
};

export const categories: Category[] = [
  { slug: "programmer", name: "Programmer", icon: FiCode, openings: 184, tint: "bg-brand-50" },
  { slug: "content-writer", name: "Content Writer", icon: FiEdit3, openings: 92, tint: "bg-accent-50" },
  { slug: "designer", name: "Designer", icon: FiPenTool, openings: 121, tint: "bg-brand-50" },
  { slug: "marketing", name: "Marketing", icon: FiTrendingUp, openings: 76, tint: "bg-accent-50" },
  { slug: "security", name: "Security", icon: FiShield, openings: 44, tint: "bg-brand-50" },
  { slug: "devops", name: "DevOps", icon: FiServer, openings: 58, tint: "bg-accent-50" },
  { slug: "support", name: "Support", icon: FiHeadphones, openings: 63, tint: "bg-brand-50" },
  { slug: "data", name: "Data & AI", icon: FiDatabase, openings: 88, tint: "bg-accent-50" },
];

export const jobs: Job[] = [
  {
    id: "sr-product-designer",
    title: "Senior Product Designer",
    company: "Lumen Studio",
    companyLogo: "L",
    logoBg: "#0f5a43",
    location: "Dhaka, BD",
    type: "Full-time",
    level: "Senior · 4–6 yrs",
    salary: "৳90k–130k",
    category: "designer",
    posted: "2d ago",
    deadline: "Jun 30, 2026",
    featured: true,
    tags: ["Figma", "Design Systems", "Mobile"],
    about:
      "Lumen Studio is a product design partner for fast-growing fintech and health startups across South Asia. We craft interfaces people genuinely love to use.",
    responsibilities: [
      "Own end-to-end design for flagship mobile products",
      "Evolve and maintain our cross-platform design system",
      "Partner with engineering to ship pixel-true interfaces",
      "Mentor two mid-level designers",
    ],
    requirements: [
      "4+ years designing consumer mobile products",
      "A portfolio that shows craft and systems thinking",
      "Fluency in Figma, prototyping and motion",
      "Strong written communication",
    ],
    openings: 2,
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer (React)",
    company: "Northwind",
    companyLogo: "N",
    logoBg: "#ff6a3d",
    location: "Remote",
    type: "Remote",
    level: "Mid · 2–4 yrs",
    salary: "৳70k–110k",
    category: "programmer",
    posted: "5h ago",
    deadline: "Jul 12, 2026",
    featured: true,
    tags: ["React", "TypeScript", "Next.js"],
    about:
      "Northwind builds logistics software trusted by 400+ operators. We are a remote-first team that values calm, focused work.",
    responsibilities: [
      "Build and ship features across our Next.js web app",
      "Collaborate on a shared component library",
      "Write tests and care about accessibility",
    ],
    requirements: [
      "Solid React + TypeScript experience",
      "An eye for detail and performance",
      "Comfortable in an async, remote team",
    ],
    openings: 3,
  },
  {
    id: "content-strategist",
    title: "Content Strategist",
    company: "Paperboat",
    companyLogo: "P",
    logoBg: "#e8a23d",
    location: "Chattogram, BD",
    type: "Full-time",
    level: "Mid · 3+ yrs",
    salary: "৳55k–80k",
    category: "content-writer",
    posted: "1d ago",
    deadline: "Jun 28, 2026",
    tags: ["SEO", "Editorial", "Brand"],
    about:
      "Paperboat helps consumer brands find their voice. We are storytellers, editors and strategists in equal measure.",
    responsibilities: [
      "Own the editorial calendar end to end",
      "Write and edit long-form and brand content",
      "Grow organic traffic through SEO",
    ],
    requirements: [
      "3+ years in content or editorial roles",
      "Excellent writing and editing in English",
      "Working knowledge of SEO tooling",
    ],
    openings: 1,
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    company: "Corewave",
    companyLogo: "C",
    logoBg: "#0f5a43",
    location: "Dhaka, BD",
    type: "Full-time",
    level: "Senior · 5+ yrs",
    salary: "৳110k–150k",
    category: "devops",
    posted: "3d ago",
    deadline: "Jul 5, 2026",
    tags: ["AWS", "Kubernetes", "CI/CD"],
    about:
      "Corewave runs critical infrastructure for banks and telcos. Reliability is our craft.",
    responsibilities: [
      "Own CI/CD pipelines and release tooling",
      "Manage Kubernetes clusters across regions",
      "Champion observability and incident response",
    ],
    requirements: [
      "Deep AWS and Kubernetes experience",
      "Infrastructure-as-code mindset (Terraform)",
      "On-call ownership and calm under pressure",
    ],
    openings: 1,
  },
  {
    id: "growth-marketer",
    title: "Growth Marketing Lead",
    company: "Bloom",
    companyLogo: "B",
    logoBg: "#ff6a3d",
    location: "Remote",
    type: "Contract",
    level: "Lead · 6+ yrs",
    salary: "৳120k–160k",
    category: "marketing",
    posted: "6d ago",
    deadline: "Jul 1, 2026",
    tags: ["Performance", "Lifecycle", "Analytics"],
    about:
      "Bloom is a D2C wellness brand scaling across Asia. We obsess over sustainable, profitable growth.",
    responsibilities: [
      "Own paid + lifecycle growth channels",
      "Build experimentation roadmap",
      "Report on CAC, LTV and payback",
    ],
    requirements: [
      "Proven growth leadership at a D2C brand",
      "Fluent with analytics and attribution",
      "Bias toward action and clean data",
    ],
    openings: 1,
  },
  {
    id: "data-scientist",
    title: "Data Scientist, ML",
    company: "Helix",
    companyLogo: "H",
    logoBg: "#0f5a43",
    location: "Dhaka, BD",
    type: "Full-time",
    level: "Mid · 3–5 yrs",
    salary: "৳95k–140k",
    category: "data",
    posted: "4d ago",
    deadline: "Jul 9, 2026",
    tags: ["Python", "ML", "SQL"],
    about:
      "Helix turns messy data into decisions for healthcare providers across the region.",
    responsibilities: [
      "Build and ship ML models to production",
      "Partner with product on measurable outcomes",
      "Own data quality end to end",
    ],
    requirements: [
      "Strong Python, SQL and ML fundamentals",
      "Experience deploying models, not just notebooks",
      "Clear communicator of technical ideas",
    ],
    openings: 2,
  },
];

export const applications: Application[] = [
  { id: "a1", jobId: "frontend-engineer", status: "Interview", appliedOn: "Jun 18", step: 3 },
  { id: "a2", jobId: "sr-product-designer", status: "Shortlisted", appliedOn: "Jun 16", step: 2 },
  { id: "a3", jobId: "content-strategist", status: "Reviewed", appliedOn: "Jun 14", step: 1 },
  { id: "a4", jobId: "growth-marketer", status: "Applied", appliedOn: "Jun 12", step: 0 },
  { id: "a5", jobId: "devops-engineer", status: "Rejected", appliedOn: "Jun 2", step: 4 },
];

export const notifications: Notification[] = [
  {
    id: "n1",
    kind: "interview",
    title: "Interview scheduled",
    body: "Northwind invited you to a video interview on Jun 24, 11:00 AM.",
    time: "2h ago",
    unread: true,
  },
  {
    id: "n2",
    kind: "status",
    title: "You've been shortlisted",
    body: "Lumen Studio moved your application to the shortlist. Nice work!",
    time: "5h ago",
    unread: true,
  },
  {
    id: "n3",
    kind: "message",
    title: "New message from Paperboat",
    body: "“Hi Biplab, do you have time this week for a quick chat?”",
    time: "1d ago",
    unread: true,
  },
  {
    id: "n4",
    kind: "tip",
    title: "Boost your profile",
    body: "Profiles with a photo get 2.4× more responses. Add yours.",
    time: "2d ago",
    unread: false,
  },
  {
    id: "n5",
    kind: "status",
    title: "Application received",
    body: "Bloom received your application for Growth Marketing Lead.",
    time: "3d ago",
    unread: false,
  },
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    name: "Sara Ahmed",
    role: "Recruiter · Northwind",
    avatarBg: "#0f5a43",
    initials: "SA",
    preview: "Great! Let's lock in Tuesday at 11.",
    time: "09:24",
    unread: 2,
    online: true,
    messages: [
      { me: false, text: "Hi Biplab! Thanks for applying to the Frontend role.", time: "09:02" },
      { me: false, text: "Your portfolio really stood out to the team.", time: "09:02" },
      { me: true, text: "Thank you, Sara — that means a lot!", time: "09:10" },
      { me: false, text: "Are you free for a 30-min call this week?", time: "09:18" },
      { me: true, text: "Tuesday morning works well for me.", time: "09:22" },
      { me: false, text: "Great! Let's lock in Tuesday at 11.", time: "09:24" },
    ],
  },
  {
    id: "c2",
    name: "Imran Hossain",
    role: "Hiring Manager · Lumen",
    avatarBg: "#ff6a3d",
    initials: "IH",
    preview: "Looking forward to seeing your case study.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { me: false, text: "Hi! Loved your design samples.", time: "Mon 14:10" },
      { me: false, text: "Looking forward to seeing your case study.", time: "Mon 14:11" },
    ],
  },
  {
    id: "c3",
    name: "Paperboat HR",
    role: "Talent team",
    avatarBg: "#e8a23d",
    initials: "PB",
    preview: "Do you have time this week for a quick chat?",
    time: "Mon",
    unread: 1,
    online: false,
    messages: [
      { me: false, text: "Hi Biplab, do you have time this week for a quick chat?", time: "Mon 10:00" },
    ],
  },
];

export const user = {
  name: "Biplab Paul",
  firstName: "Biplab",
  title: "Product Designer",
  location: "Dhaka, Bangladesh",
  email: "biplab@example.com",
  phone: "+880 1735 927356",
  avatarBg: "#0f5a43",
  initials: "BP",
  about:
    "Product designer with 5 years crafting calm, useful mobile products. I care about systems, motion and the small details that make software feel human.",
  profileComplete: 82,
  stats: { applied: 12, interviews: 3, saved: 8 },
  skills: ["Product Design", "Figma", "Design Systems", "Prototyping", "User Research", "Webflow"],
  experience: [
    { role: "Product Designer", company: "Finlytics", period: "2022 — Present", current: true },
    { role: "UI Designer", company: "Brightlabs", period: "2020 — 2022", current: false },
    { role: "Design Intern", company: "Studio Kaaj", period: "2019 — 2020", current: false },
  ],
  education: [
    { degree: "B.Sc. in CSE", school: "BRAC University", period: "2015 — 2019" },
  ],
};

export const savedJobIds = ["sr-product-designer", "data-scientist", "devops-engineer"];

/* ---------- helpers ---------- */
export const getJob = (id: string) => jobs.find((j) => j.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const jobsByCategory = (slug: string) => jobs.filter((j) => j.category === slug);
export const featuredJobs = () => jobs.filter((j) => j.featured);
export const getConversation = (id: string) => conversations.find((c) => c.id === id);
export const getNotification = (id: string) => notifications.find((n) => n.id === id);
export const getApplication = (id: string) => applications.find((a) => a.id === id);

export const statusColor: Record<Application["status"], string> = {
  Applied: "bg-paper-2 text-ink-soft",
  Reviewed: "bg-brand-50 text-brand-ink",
  Shortlisted: "bg-accent-50 text-accent-600",
  Interview: "bg-brand text-white",
  Rejected: "bg-paper-2 text-muted",
};

/* ==================================================================
   MODULE B — Companies
================================================================== */
export type Review = { name: string; role: string; rating: number; text: string; time: string };
export type Company = {
  id: string;
  name: string;
  logo: string;
  logoBg: string;
  industry: string;
  location: string;
  size: string;
  founded: string;
  website: string;
  rating: number;
  reviewCount: number;
  about: string;
  benefits: string[];
  culture: string[];
  reviews: Review[];
};

export const companies: Company[] = [
  {
    id: "lumen",
    name: "Lumen Studio",
    logo: "L",
    logoBg: "#0f5a43",
    industry: "Design & Product",
    location: "Dhaka, BD",
    size: "50–120",
    founded: "2017",
    website: "https://lumen.studio",
    rating: 4.8,
    reviewCount: 142,
    about:
      "Lumen Studio is a product design partner for fast-growing fintech and health startups across South Asia. We craft interfaces people genuinely love to use.",
    benefits: ["Remote-friendly", "Health insurance", "Learning budget", "Flexible hours", "4-day sprints"],
    culture: ["Craft-obsessed", "Calm", "Mentorship", "High trust"],
    reviews: [
      { name: "Tania R.", role: "Designer", rating: 5, text: "Best design culture I've worked in. Real mentorship and zero ego.", time: "2 weeks ago" },
      { name: "Imran H.", role: "Engineer", rating: 4, text: "Thoughtful team, calm pace, ships great work.", time: "1 month ago" },
    ],
  },
  {
    id: "northwind",
    name: "Northwind",
    logo: "N",
    logoBg: "#ff6a3d",
    industry: "Logistics SaaS",
    location: "Remote",
    size: "120–300",
    founded: "2015",
    website: "https://northwind.io",
    rating: 4.6,
    reviewCount: 208,
    about:
      "Northwind builds logistics software trusted by 400+ operators. We are a remote-first team that values calm, focused work.",
    benefits: ["Fully remote", "Stock options", "Home-office stipend", "Async culture"],
    culture: ["Remote-first", "Ownership", "Documentation", "Deep work"],
    reviews: [
      { name: "Sara A.", role: "Recruiter", rating: 5, text: "Truly async and respectful of your time.", time: "3 weeks ago" },
    ],
  },
  {
    id: "paperboat",
    name: "Paperboat",
    logo: "P",
    logoBg: "#e8a23d",
    industry: "Media & Brand",
    location: "Chattogram, BD",
    size: "20–50",
    founded: "2019",
    website: "https://paperboat.co",
    rating: 4.4,
    reviewCount: 64,
    about: "Paperboat helps consumer brands find their voice. We are storytellers, editors and strategists in equal measure.",
    benefits: ["Hybrid", "Creative freedom", "Festival bonuses"],
    culture: ["Creative", "Collaborative", "Fast-paced"],
    reviews: [
      { name: "Nabila K.", role: "Writer", rating: 4, text: "Great place to grow as a storyteller.", time: "1 month ago" },
    ],
  },
  {
    id: "corewave",
    name: "Corewave",
    logo: "C",
    logoBg: "#0f5a43",
    industry: "Cloud Infrastructure",
    location: "Dhaka, BD",
    size: "300–600",
    founded: "2012",
    website: "https://corewave.com",
    rating: 4.5,
    reviewCount: 311,
    about: "Corewave runs critical infrastructure for banks and telcos. Reliability is our craft.",
    benefits: ["Health + family cover", "On-call bonus", "Certifications paid", "Gym"],
    culture: ["Reliability", "Calm under pressure", "Engineering-led"],
    reviews: [
      { name: "Rifat M.", role: "SRE", rating: 5, text: "Serious engineering, fair on-call, great pay.", time: "2 months ago" },
    ],
  },
  {
    id: "bloom",
    name: "Bloom",
    logo: "B",
    logoBg: "#ff6a3d",
    industry: "D2C Wellness",
    location: "Remote",
    size: "50–120",
    founded: "2020",
    website: "https://bloom.health",
    rating: 4.3,
    reviewCount: 88,
    about: "Bloom is a D2C wellness brand scaling across Asia. We obsess over sustainable, profitable growth.",
    benefits: ["Remote", "Product discounts", "Wellness days", "Quarterly offsites"],
    culture: ["Growth-minded", "Data-driven", "Bias to action"],
    reviews: [
      { name: "Joya S.", role: "Marketer", rating: 4, text: "Fast, ambitious, learns quickly.", time: "5 weeks ago" },
    ],
  },
  {
    id: "helix",
    name: "Helix",
    logo: "H",
    logoBg: "#0f5a43",
    industry: "Health AI",
    location: "Dhaka, BD",
    size: "50–120",
    founded: "2018",
    website: "https://helix.ai",
    rating: 4.7,
    reviewCount: 96,
    about: "Helix turns messy data into decisions for healthcare providers across the region.",
    benefits: ["Hybrid", "Research time", "Conference budget", "Health cover"],
    culture: ["Curious", "Impact-driven", "Scientific"],
    reviews: [
      { name: "Arif C.", role: "Data Scientist", rating: 5, text: "Real ML in production, smart teammates.", time: "3 weeks ago" },
    ],
  },
];

const companyByName: Record<string, string> = {
  "Lumen Studio": "lumen",
  Northwind: "northwind",
  Paperboat: "paperboat",
  Corewave: "corewave",
  Bloom: "bloom",
  Helix: "helix",
};

export const getCompany = (id: string) => companies.find((c) => c.id === id);
export const jobsByCompany = (companyId: string) =>
  jobs.filter((j) => companyByName[j.company] === companyId);
export const companyOpenings = (companyId: string) => jobsByCompany(companyId).length;

/* ==================================================================
   MODULE A — Employer / Recruiter
================================================================== */
export type PostStatus = "Active" | "Paused" | "Closed";
export type EmployerPost = { jobId: string; status: PostStatus; applicants: number; views: number; new: number };

/** The signed-in employer is Lumen Studio (demo). */
export const employer = { companyId: "lumen", name: "Lumen Studio", initials: "L", logoBg: "#0f5a43" };

export const employerPosts: EmployerPost[] = [
  { jobId: "sr-product-designer", status: "Active", applicants: 48, views: 1240, new: 6 },
  { jobId: "frontend-engineer", status: "Active", applicants: 32, views: 980, new: 3 },
  { jobId: "data-scientist", status: "Paused", applicants: 19, views: 540, new: 0 },
  { jobId: "content-strategist", status: "Closed", applicants: 27, views: 720, new: 0 },
];

export type CandStatus = "New" | "Shortlisted" | "Interview" | "Hired" | "Rejected";
export type Candidate = {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  role: string;
  location: string;
  experience: string;
  match: number;
  status: CandStatus;
  appliedFor: string;
  appliedAgo: string;
  skills: string[];
  about: string;
};

export const candidates: Candidate[] = [
  { id: "cand1", name: "Ayesha Karim", initials: "AK", avatarBg: "#0f5a43", role: "Senior Product Designer", location: "Dhaka, BD", experience: "6 yrs", match: 94, status: "Shortlisted", appliedFor: "sr-product-designer", appliedAgo: "2d ago", skills: ["Figma", "Design Systems", "Prototyping"], about: "Product designer focused on systems and motion. Previously at two fintech startups." },
  { id: "cand2", name: "Rahim Uddin", initials: "RU", avatarBg: "#ff6a3d", role: "Product Designer", location: "Remote", experience: "4 yrs", match: 88, status: "Interview", appliedFor: "sr-product-designer", appliedAgo: "3d ago", skills: ["UI", "Research", "Webflow"], about: "Generalist designer who loves shipping fast and learning from users." },
  { id: "cand3", name: "Mitu Rahman", initials: "MR", avatarBg: "#e8a23d", role: "UX Designer", location: "Dhaka, BD", experience: "5 yrs", match: 82, status: "New", appliedFor: "sr-product-designer", appliedAgo: "5h ago", skills: ["UX", "Figma", "Testing"], about: "UX designer with a research-first approach and a strong portfolio." },
  { id: "cand4", name: "Sabbir Hasan", initials: "SH", avatarBg: "#0f5a43", role: "Frontend Engineer", location: "Remote", experience: "3 yrs", match: 90, status: "New", appliedFor: "frontend-engineer", appliedAgo: "1d ago", skills: ["React", "TypeScript", "Next.js"], about: "Frontend engineer who cares about performance and accessibility." },
  { id: "cand5", name: "Nadia Islam", initials: "NI", avatarBg: "#ff6a3d", role: "React Developer", location: "Dhaka, BD", experience: "2 yrs", match: 76, status: "Rejected", appliedFor: "frontend-engineer", appliedAgo: "4d ago", skills: ["React", "CSS", "Jest"], about: "Early-career developer with strong fundamentals and great energy." },
];

export const candStatusColor: Record<CandStatus, string> = {
  New: "bg-brand-50 text-brand-ink",
  Shortlisted: "bg-accent-50 text-accent-600",
  Interview: "bg-brand text-white",
  Hired: "bg-brand text-white",
  Rejected: "bg-paper-2 text-muted",
};

export const postStatusColor: Record<PostStatus, string> = {
  Active: "bg-brand-50 text-brand-ink",
  Paused: "bg-[#fbf0db] text-gold dark:bg-gold-50",
  Closed: "bg-paper-2 text-muted",
};

export const getCandidate = (id: string) => candidates.find((c) => c.id === id);
export const candidatesForJob = (jobId: string) => candidates.filter((c) => c.appliedFor === jobId);

/* ==================================================================
   MODULE C — Salary insights
================================================================== */
export type SalaryRole = {
  role: string;
  category: string;
  demand: "Low" | "Medium" | "High";
  trend: string;
  // monthly BDT, in thousands
  levels: { label: string; min: number; max: number }[];
  topLocations: { city: string; avg: number }[];
};

export const salaryRoles: SalaryRole[] = [
  {
    role: "Product Designer",
    category: "designer",
    demand: "High",
    trend: "+8%",
    levels: [
      { label: "Junior", min: 35, max: 55 },
      { label: "Mid", min: 60, max: 95 },
      { label: "Senior", min: 100, max: 150 },
      { label: "Lead", min: 150, max: 220 },
    ],
    topLocations: [
      { city: "Dhaka", avg: 98 },
      { city: "Chattogram", avg: 82 },
      { city: "Remote", avg: 110 },
    ],
  },
  {
    role: "Frontend Engineer",
    category: "programmer",
    demand: "High",
    trend: "+12%",
    levels: [
      { label: "Junior", min: 40, max: 60 },
      { label: "Mid", min: 70, max: 110 },
      { label: "Senior", min: 120, max: 170 },
      { label: "Lead", min: 170, max: 240 },
    ],
    topLocations: [
      { city: "Dhaka", avg: 105 },
      { city: "Remote", avg: 130 },
      { city: "Sylhet", avg: 78 },
    ],
  },
  {
    role: "Data Scientist",
    category: "data",
    demand: "High",
    trend: "+15%",
    levels: [
      { label: "Junior", min: 45, max: 70 },
      { label: "Mid", min: 80, max: 120 },
      { label: "Senior", min: 130, max: 185 },
      { label: "Lead", min: 185, max: 260 },
    ],
    topLocations: [
      { city: "Dhaka", avg: 118 },
      { city: "Remote", avg: 140 },
      { city: "Chattogram", avg: 92 },
    ],
  },
  {
    role: "DevOps Engineer",
    category: "devops",
    demand: "Medium",
    trend: "+6%",
    levels: [
      { label: "Junior", min: 45, max: 65 },
      { label: "Mid", min: 75, max: 115 },
      { label: "Senior", min: 120, max: 175 },
      { label: "Lead", min: 175, max: 230 },
    ],
    topLocations: [
      { city: "Dhaka", avg: 112 },
      { city: "Remote", avg: 128 },
      { city: "Chattogram", avg: 88 },
    ],
  },
  {
    role: "Content Strategist",
    category: "content-writer",
    demand: "Medium",
    trend: "+4%",
    levels: [
      { label: "Junior", min: 25, max: 40 },
      { label: "Mid", min: 45, max: 70 },
      { label: "Senior", min: 75, max: 110 },
      { label: "Lead", min: 110, max: 150 },
    ],
    topLocations: [
      { city: "Dhaka", avg: 68 },
      { city: "Chattogram", avg: 55 },
      { city: "Remote", avg: 80 },
    ],
  },
];

export const demandColor: Record<SalaryRole["demand"], string> = {
  High: "bg-brand-50 text-brand-ink",
  Medium: "bg-[#fbf0db] text-gold dark:bg-gold-50",
  Low: "bg-paper-2 text-muted",
};

/* ==================================================================
   MODULE D — Premium / subscription
================================================================== */
export type Plan = {
  id: string;
  name: string;
  price: number; // BDT/mo
  tagline: string;
  highlighted?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tagline: "Everything to start your search",
    features: ["Unlimited job search", "Apply to any role", "Track applications", "Basic profile"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 499,
    tagline: "Stand out and get noticed faster",
    highlighted: true,
    features: [
      "Everything in Free",
      "Featured applicant badge",
      "See who viewed your profile",
      "Salary insights unlocked",
      "Priority support",
      "AI cover-letter assistant",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 1499,
    tagline: "For recruiters & teams hiring at scale",
    features: [
      "Everything in Pro",
      "Post unlimited jobs",
      "Applicant tracking pipeline",
      "Team seats (5)",
      "Branded company page",
      "Advanced analytics",
    ],
  },
];

export const billingHistory = [
  { id: "b1", plan: "Pro — Monthly", date: "Jun 1, 2026", amount: 499, status: "Paid" },
  { id: "b2", plan: "Pro — Monthly", date: "May 1, 2026", amount: 499, status: "Paid" },
  { id: "b3", plan: "Pro — Monthly", date: "Apr 1, 2026", amount: 499, status: "Paid" },
];

export const getPlan = (id: string) => plans.find((p) => p.id === id);
