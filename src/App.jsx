import { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";
import SplitText from "./components/SplitText";
import Particles from "./components/Particles";


const EJS_SERVICE_ID  = "service_avnf83h";
const EJS_TEMPLATE_ID = "template_nwi1uoq";
const EJS_PUBLIC_KEY  = "m7NQxsMPjSIHdY1Xf";
emailjs.init({ publicKey: EJS_PUBLIC_KEY });

const PROFILE = {
  name: "Arosh Nimantha Wijesinghe",
  tagline: "Building AI-powered solutions that solve real-world problems",
  university: "University of Moratuwa",
  degree: "BSc (Hons) in Artificial Intelligence",
  year: "Second Year",
  email: "aroshnimantha386@gmail.com",
  phone: "+94 77 873 4776",
  github: "https://github.com/aroshwijesinghe",
  linkedin: "https://www.linkedin.com/in/arosh-wijesinghe-078423341/",
  careerGoal:
    "Becoming a Machine Learning Engineer — building production ML systems, data pipelines, and intelligent applications that make real-world impact.",
  about: `I am an undergraduate student at the University of Moratuwa pursuing a BSc (Hons) in Artificial Intelligence. I am passionate about building AI-powered software solutions that solve real-world problems. My interests include machine learning, deep learning, full-stack development, mobile app development, and startup innovation. I enjoy creating modern, user-friendly applications and continuously learning new technologies. My goal is to become an ML Engineer and entrepreneur who builds impactful digital products.`,
};

const SKILLS = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "python" },
      { name: "Java", icon: "java" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Dart", icon: "dart" },
      { name: "PHP", icon: "php" },
      { name: "C", icon: "c" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "Scikit-learn", icon: "scikitlearn" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Matplotlib", icon: "matplotlib" },
      { name: "Seaborn", icon: "seaborn" },
      { name: "Jupyter", icon: "jupyter" },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Firebase", icon: "firebase" },
      { name: "HTML/CSS", icon: "html" },
      { name: "Node.js", icon: "nodejs" },
    ],
  },
  {
    category: "Mobile Development",
    items: [
      { name: "Flutter", icon: "flutter" },
      { name: "Dart", icon: "dart" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "Supabase", icon: "supabase" },
      { name: "PostgreSQL", icon: "postgresql" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "Figma", icon: "figma" },
    ],
  },
  {
    category: "Currently Exploring",
    items: [
      { name: "LLMs", icon: "llm" },
      { name: "MLOps", icon: "mlops" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Docker", icon: "docker" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Transformers", icon: "transformers" },
      { name: "Deep Learning", icon: "deeplearning" },
    ],
  },
];

const PROJECTS = [
  {
    title: "Smart Asset Management System",
    desc: "AI-based system predicting product/asset maintenance needs with a prediction dashboard, sensor data visualization, maintenance events tracking, KPI metrics, and an integrated chatbot assistant.",
    tech: ["React", "Python", "ML", "Supabase"],
    color: "#00d4ff",
    link: null,
    demoLink: null,
  },
  {
    title: "Tummy Boy — Pushup App",
    desc: "Fitness tracking mobile application featuring workout tracking, rep counting, and detailed progress analytics with visual charts to help users stay consistent.",
    tech: ["Mobile", "Fitness", "Analytics"],
    color: "#a855f7",
    link: "https://github.com/aroshwijesinghe/Tummy_boy",
    demoLink: null,
  },
  {
    title: "Money Balancing App",
    desc: "Finance and productivity mobile application helping users manage budgets, track expenses, balance income, and build better financial habits.",
    tech: ["Mobile", "Finance", "Productivity"],
    color: "#22c55e",
    link: "https://github.com/aroshwijesinghe/money-balancing",
    demoLink: null,
  },
  {
    title: "Portfolio Website",
    desc: "This very website — a modern, responsive portfolio built with React featuring glassmorphism, smooth animations, dark/light mode, and futuristic aesthetics.",
    tech: ["React", "Tailwind", "Framer Motion"],
    color: "#f59e0b",
    link: "https://github.com/aroshwijesinghe/portfoilo",
    demoLink: null,
  },
  {
    title: "Advance Loop Solutions",
    desc: "Co-founded a technology company focused on delivering innovative software solutions and AI-driven products. Leading strategic direction, product development, and building a team to create real-world digital impact.",
    tech: ["Startup", "AI", "Software", "Co-Founder"],
    color: "#6366f1",
    link: null,
    demoLink: "https://www.linkedin.com/company/advance-loop-solution/?viewAsMember=true",
  },
  {
    title: "Smart Chair — Posture Analysis System",
    desc: "Hardware + AI university project (CM-1900 Intelligent Machine) built as an AI student at University of Moratuwa. A smart chair that uses sensors and machine learning to analyse the user's sitting posture in real time and provide actionable feedback.",
    tech: ["Hardware", "AI", "Sensors", "ML", "IoT"],
    color: "#f97316",
    link: null,
    demoLink: "https://www.linkedin.com/feed/update/urn:li:activity:7387849804007206912/",
  },
];

const TIMELINE = [
  {
    year: "2024 – Present",
    title: "BSc (Hons) in Artificial Intelligence",
    place: "University of Moratuwa",
    desc: "Second year undergraduate specializing in AI, machine learning, and software engineering.",
    active: true,
  },
  {
    year: "2023",
    title: "University Entrance",
    place: "University of Moratuwa",
    desc: "Enrolled in the Faculty of Information Technology with a focus on AI.",
    active: false,
  },
  {
    year: "2022",
    title: "GCE Advanced Level",
    place: "Sri Lanka",
    desc: "Completed Advanced Level examinations, qualifying for university admission.",
    active: false,
  },
];

/* SVG ICONS */
const LangIcons = {
  python: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <linearGradient id="pyA" x1="70.3" x2="170.7" y1="1237.4" y2="1151.1" gradientTransform="matrix(.563 0 0 -.568 -29.2 707.8)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5A9FD4"/><stop offset="1" stopColor="#306998"/></linearGradient>
      <linearGradient id="pyB" x1="209.5" x2="173.2" y1="1098" y2="1060.1" gradientTransform="matrix(.563 0 0 -.568 -29.2 707.8)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFD43B"/><stop offset="1" stopColor="#FFE873"/></linearGradient>
      <path fill="url(#pyA)" d="M63.4 11c-7 0-13.7.6-19.3 1.8-16.5 3.5-19.5 10.7-19.5 24.1v17.6h39v5.9H24.9C14.4 60.4 5.3 66.3 2.4 78.4c-3.3 13.8-3.5 22.5 0 37 2.6 10.7 8.7 18.2 19.1 18.2h12.3V116c0-12.2 10.6-23 22-23h38.8c10 0 18-8.2 18-18.2V37c0-9.7-8.2-17-18-18.8C88.2 12 75.7 11 63.4 11zm-21.6 14c3.7 0 6.7 3.1 6.7 6.9 0 3.8-3 6.8-6.7 6.8-3.8 0-6.8-3-6.8-6.8 0-3.8 3-6.9 6.8-6.9z"/>
      <path fill="url(#pyB)" d="M91.7 60.4V78c0 12.7-10.8 23.5-22 23.5H30.9c-9.8 0-18 8.5-18 18.3v34.3c0 9.7 8.5 15.4 18 18.2 11.4 3.3 22.4 3.9 36.1 0 9.1-2.6 18-7.7 18-18.2V116H46.1v-5.9H103c10.5 0 14.4-7.3 18-18.2 3.7-11.2 3.5-22 0-37-2.5-10.7-7.3-18.2-18-18.2H91.7zM72 107.1c3.8 0 6.8 3.1 6.8 6.9 0 3.8-3 6.8-6.8 6.8-3.7 0-6.7-3-6.7-6.8 0-3.8 3-6.9 6.7-6.9z"/>
    </svg>
  ),
  java: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#0074BD" d="M47.6 98s-4.5 2.6 3.2 3.5c9.3 1 14.1.8 24.4-.9 0 0 2.7 1.7 6.5 3.2-23.1 9.9-52.3-.6-34.1-5.8zm-2.8-13.3s-5 3.7 2.7 4.5c9.9 1 17.8 1.1 31.4-1.5 0 0 1.9 1.9 4.9 3-27.9 8.2-59-.6-39-6z"/>
      <path fill="#EA2D2E" d="M69.1 61.8c5.7 6.6-1.5 12.5-1.5 12.5s14.5-7.5 7.8-16.9c-6.2-8.8-11-13.2 14.8-28.3 0 0-40.5 10.1-21.1 32.7z"/>
      <path fill="#0074BD" d="M102.4 108.5s3.3 2.7-3.6 4.9c-13.2 4-55 5.2-66.6.2-4.2-1.8 3.6-4.3 6.1-4.8 2.5-.6 4-.5 4-.5-4.5-3.2-29.4 6.3-12.6 9 45.7 7.4 83.3-3.3 72.7-8.8zM49.4 70s-20.8 4.9-7.4 6.7c5.7.8 17 .6 27.5-.3 8.6-.7 17.2-2.3 17.2-2.3s-3 1.3-5.2 2.8c-21.1 5.5-61.8 2.9-50.1-2.7 9.9-4.7 18-4.2 18-4.2zm37.3 20.8c21.4-11.1 11.5-21.8 4.6-20.4-1.7.4-2.4.7-2.4.7s.6-1 1.8-1.4c13.4-4.7 23.7 13.9-4.4 21.3 0 0 .3-.3.4-.2z"/>
      <path fill="#EA2D2E" d="M76.6 1s11.8 11.8-11.2 30c-18.5 14.6-4.2 22.9 0 32.4-10.8-9.8-18.8-18.4-13.4-26.4C59.8 25.3 81.2 19.4 76.6 1z"/>
      <path fill="#0074BD" d="M51.3 117.4c20.6 1.3 52.2-.7 53-10.5 0 0-1.4 3.7-17 6.6-17.6 3.3-39.2 2.9-52.1.8 0 0 2.6 2.2 16.1 3.1z"/>
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#F0DB4F" d="M2 2h124v124H2z"/>
      <path fill="#323330" d="M116.5 96c-1.8-11.6-8.8-21.4-29.8-30.5-7.3-3.5-15.4-6-17.8-11.6-.9-3.3-1-5.2-.4-7.2 1.8-6.4 10.5-8.3 17.4-6.5 4.5 1.2 8.6 3.9 11.2 8.5 11.9-7.7 11.9-7.7 20.2-12.8-3.1-4.8-4.7-7-6.7-8.9-7.4-8.2-17.3-12.4-33.4-12-5.3.4-10.6 1.5-15.5 3.4-14.4 5.9-21.1 17.8-20.4 31.6.5 8.3 3 15.1 8.6 20.6 8.5 8.5 23.5 13 40 11 5.3-1 8.3 1.2 11.2 4.8 4.3 5.8 3 14.2-3.2 19-6 4.6-13 5.9-20.2 4.4-8.3-2.2-12.9-7.7-16-14.3l-21.8 12.6c2.5 5.6 5.5 10.2 10 14 18.9 16 58.5 15.2 65.9-14.7 2.6-9.8 1.2-20.2-6.4-27.2zM33.3 58c-.6-23.2 18-24.6 22-24.6l.7.7v44c-11 .4-22.2-4-22.7-20z"/>
    </svg>
  ),
  php: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#6181B6" d="M0 64c0 18.6 28.7 33.7 64 33.7s64-15.1 64-33.7S99.3 30.3 64 30.3 0 45.4 0 64z"/>
      <path fill="#fff" d="M23.6 70.6l3.6-18.3h6.9c3.4 0 5.7.5 6.9 1.6 1.2 1.1 1.5 2.8 1 5.2-.5 2.6-1.6 4.5-3.2 5.7-1.6 1.2-3.8 1.8-6.6 1.8h-3.1l-1.2 4zm5.4-8.3l1.2-5.9h2.5c1.5 0 2.5.3 3 .9.5.6.6 1.6.3 3s-.8 2.4-1.6 3c-.8.6-2 .9-3.6.9l-1.8.1zm15.6 8.3L48.2 52h4.3l-.6 3.3c1.1-1.3 2.1-2.2 3.1-2.7 1-.5 2-.8 3.1-.8 1.6 0 2.7.5 3.3 1.4.6.9.6 2.3.1 4.1l-2.2 11.3h-4.3l2-10.3c.3-1.3.2-2.2-.1-2.7-.4-.5-1-.8-1.9-.8-.9 0-1.7.3-2.4.9-.7.6-1.2 1.6-1.5 2.9l-1.8 9h-4.3zm22.7 0l3.6-18.3h6.9c3.4 0 5.7.5 6.9 1.6 1.2 1.1 1.5 2.8 1 5.2-.5 2.6-1.6 4.5-3.2 5.7-1.6 1.2-3.8 1.8-6.6 1.8h-3.1l-1.2 4zm5.4-8.3l1.2-5.9h2.5c1.5 0 2.5.3 3 .9.5.6.6 1.6.3 3s-.8 2.4-1.6 3c-.8.6-2 .9-3.6.9l-1.8.1z"/>
    </svg>
  ),
  c: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#659AD2" d="M115.4 30.7L67.1 2.9c-1.7-1-4.5-1-6.2 0L12.6 30.7c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.9 1.2 4.4 2.9 5.4l48.2 27.9c.9.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48.3-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-2-1.1-4.4-2.8-5.4z"/>
      <path fill="#fff" d="M64 88.5c17.4 0 28.8-12.9 32.3-22.2L80.6 57c-2.6 7.1-8.3 14.8-16.6 14.8-12.1 0-18.2-10.4-18.2-19.4 0-12.4 7.6-19.5 18.2-19.5 7.4 0 13.6 6.4 16.2 13.7l16.1-9C92.8 27.9 81.1 17.3 64 17.3 40.4 17.3 24 36 24 62.6c0 24.5 16.3 25.9 40 25.9z"/>
    </svg>
  ),
  sql: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#00758F" d="M64 8C37.5 8 16 18.6 16 32v64c0 13.4 21.5 24 48 24s48-10.6 48-24V32C112 18.6 90.5 8 64 8z"/>
      <ellipse cx="64" cy="32" fill="#F29111" rx="38" ry="14"/>
      <path fill="#F29111" d="M102 54c0 6.4-15.9 14-38 14S26 60.4 26 54M102 76c0 6.4-15.9 14-38 14S26 82.4 26 76"/>
    </svg>
  ),
  tensorflow: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#FF6F00" d="M64 4.7L12 34.1v59.7L64 123.3l52-29.5V34.1z"/>
      <path fill="#fff" d="M39.1 67.8V47.5L64 33.1l24.9 14.4v12.4l-16-9.3V88l-8.9 5.2V55.7l-16 9.3v2.8z"/>
      <path fill="#fff" opacity=".6" d="M72.9 50.6v37.5L64 93.2l-8.9-5.2V50.6l8.9-5.2z"/>
    </svg>
  ),
  scikitlearn: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <circle cx="64" cy="64" r="56" fill="#F89939"/>
      <circle cx="42" cy="50" r="14" fill="#3499CD"/><circle cx="86" cy="50" r="14" fill="#3499CD"/><circle cx="64" cy="86" r="14" fill="#3499CD"/>
      <circle cx="42" cy="50" r="7" fill="#fff"/><circle cx="86" cy="50" r="7" fill="#fff"/><circle cx="64" cy="86" r="7" fill="#fff"/>
    </svg>
  ),
  pandas: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <g fill="#130754">
        <rect x="33" y="12" width="12" height="28" rx="2"/><rect x="33" y="48" width="12" height="32" rx="2"/><rect x="33" y="88" width="12" height="28" rx="2"/>
        <rect x="83" y="12" width="12" height="28" rx="2"/><rect x="83" y="48" width="12" height="32" rx="2"/><rect x="83" y="88" width="12" height="28" rx="2"/>
      </g>
      <rect x="57" y="36" width="12" height="18" rx="2" fill="#E70488"/>
    </svg>
  ),
  numpy: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#4DABCF" d="M64 8L8 40v48l56 32 56-32V40z"/>
      <path fill="#013243" d="M64 8L8 40l56 32 56-32z" opacity=".3"/>
      <path fill="#fff" d="M48 52h10v24H48zm22 0h10v24H70zm-11 8l11-8v24l-11 8z" opacity=".9"/>
    </svg>
  ),
  opencv: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <circle cx="64" cy="30" r="22" fill="#5C3EE8"/>
      <circle cx="30" cy="88" r="22" fill="#E44D26"/>
      <circle cx="98" cy="88" r="22" fill="#00A6E4"/>
      <circle cx="64" cy="30" r="10" fill="#fff"/>
      <circle cx="30" cy="88" r="10" fill="#fff"/>
      <circle cx="98" cy="88" r="10" fill="#fff"/>
    </svg>
  ),
  matplotlib: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <rect width="128" height="128" rx="8" fill="#11557C"/>
      <path fill="#fff" d="M16 100 L40 55 L64 70 L88 35 L112 60" stroke="#fff" strokeWidth="4" fill="none"/>
      <circle cx="40" cy="55" r="4" fill="#E24A33"/>
      <circle cx="64" cy="70" r="4" fill="#E24A33"/>
      <circle cx="88" cy="35" r="4" fill="#E24A33"/>
      <line x1="16" y1="100" x2="112" y2="100" stroke="#fff" strokeWidth="2"/>
      <line x1="16" y1="20" x2="16" y2="100" stroke="#fff" strokeWidth="2"/>
    </svg>
  ),
  seaborn: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <rect width="128" height="128" rx="8" fill="#4C72B0"/>
      <ellipse cx="64" cy="64" rx="40" ry="25" fill="none" stroke="#fff" strokeWidth="3"/>
      <ellipse cx="64" cy="64" rx="25" ry="15" fill="none" stroke="#64B5F6" strokeWidth="2"/>
      <circle cx="64" cy="64" r="6" fill="#fff"/>
      <path fill="none" stroke="#90CAF9" strokeWidth="1.5" d="M24 64 Q40 30 64 40 Q88 50 104 64"/>
    </svg>
  ),
  jupyter: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <circle cx="64" cy="64" r="56" fill="#F37626"/>
      <circle cx="64" cy="30" r="10" fill="#fff"/>
      <circle cx="37" cy="85" r="10" fill="#fff"/>
      <circle cx="91" cy="85" r="10" fill="#fff"/>
      <path fill="none" stroke="#fff" strokeWidth="3" d="M64 40 L91 75 M64 40 L37 75 M37 75 L91 75"/>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <g fill="#61DAFB">
        <circle cx="64" cy="64" r="11.4"/>
        <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6C19.3 13.4 17 22.7 19.1 35.9c.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C1.4 50 1.4 56.6 1.4 64s5.5 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4s-7.6-.1-11.2-.4c-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4s7.6.1 11.2.4c2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.7-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2 2.3-4.1 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2s4.6-.1 6.9-.2c-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.1 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2-2.3 4.1-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2s-4.6.1-6.9.2c2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zm60.8 8c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9.9-28.8c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5C113.8 52.4 121 58.4 121 64c0 4.7-5.8 9.7-15.7 13.5z"/>
      </g>
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <circle cx="64" cy="64" r="60" fill="currentColor"/>
      <path d="M88 83.7V44.2h-4.3v32.3L51.1 33.6A60 60 0 0 0 6.2 52.4 60 60 0 0 0 53.8 121l34.2-47V83.7z" style={{fill: 'var(--icon-nextjs-inner, #000)'}}/>
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#38BDF8" d="M64 16c-21.3 0-34.7 10.7-40 32 8-10.7 17.3-14.7 28-12 6.1 1.5 10.4 5.9 15.2 10.8C74.9 55.1 83 64 104 64c21.3 0 34.7-10.7 40-32-8 10.7-17.3 14.7-28 12-6.1-1.5-10.4-5.9-15.2-10.8C93.1 24.9 85 16 64 16zM24 64C2.7 64-10.7 74.7-16 96c8-10.7 17.3-14.7 28-12 6.1 1.5 10.4 5.9 15.2 10.8C34.9 103.1 43 112 64 112c21.3 0 34.7-10.7 40-32-8 10.7-17.3 14.7-28 12-6.1-1.5-10.4-5.9-15.2-10.8C53.1 72.9 45 64 24 64z"/>
    </svg>
  ),
  html: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#E44D26" d="M19.4 116L8 2h112l-11.4 114L64 127z"/>
      <path fill="#F16529" d="M64 119l36.6-10.1 9.8-110H64z"/>
      <path fill="#EBEBEB" d="M64 52H45.3l-1.3-14H64V24H28.6l3.4 38H64zm0 34l-.1.1-17-4.6-1.1-12.2H31.6l2.1 23.7L63.9 101V86z"/>
      <path fill="#fff" d="M63.9 52v14h17.4l-1.6 18-15.8 4.3v14.4l28.3-7.9 2.1-23.4H64V52h35.4l.3-4-1-10H63.9z"/>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#83CD29" d="M112.8 30.3L68.8 4.8c-3-1.7-6.6-1.7-9.6 0l-44 25.5c-3 1.7-4.8 4.9-4.8 8.3v51c0 3.4 1.8 6.6 4.8 8.3l44 25.5c1.5.9 3.2 1.3 4.8 1.3s3.3-.4 4.8-1.3l44-25.5c3-1.7 4.8-4.9 4.8-8.3v-51c0-3.4-1.8-6.6-4.8-8.3z"/>
      <path fill="#fff" d="M67.2 81.7c-1.3.6-2.7 1-4.1 1-2.6 0-5.1-1-7.1-3L43.1 67l-4.5 2.6v7.8c0 2.1-1.1 4-3 5l-5.2 3c-1 .5-2 .8-3 .8s-2.1-.3-3-.8l-5.2-3c-1.9-1.1-3-2.9-3-5V38.1c0-2.1 1.1-4 3-5l5.2-3c1.9-1.1 4.1-1.1 6 0l5.2 3c1.9 1.1 3 2.9 3 5v24.5l12.3-7.2c1.9-1.1 4.1-1.1 6 0l5.2 3c1.9 1.1 3 2.9 3 5V77c0 2-1.1 3.8-3 4.8z"/>
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#00758F" d="M2 31.1c0 1.1.5 1.7 1.5 2.3l22 13c.6.4 1.2.5 1.8.5.7 0 1.3-.2 1.8-.5l22-13c1-.6 1.5-1.2 1.5-2.3V5.3C52.6 4.2 52.1 3.6 51 3l-22-13c-1.1-.6-2.5-.6-3.6 0L3.5 3C2.5 3.6 2 4.2 2 5.3v25.8z" transform="translate(37 51) scale(1.05)"/>
      <path fill="#F29111" d="M64 30c-17.7 0-32 6-32 13.5S46.3 57 64 57s32-6 32-13.5S81.7 30 64 30z"/>
      <path fill="#fff" d="M48 66h6v20h-6zm12-8h6v28h-6zm12 4h6v24h-6zm12-6h6v30h-6z"/>
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 109 113" width="20" height="20">
      <path fill="#3ECF8E" d="M63.7 110.3c-2.6 3.3-8 1.6-8.1-2.5l-1.4-55.7h40.6c7.3 0 11.3 8.4 6.5 13.8z"/>
      <path fill="#3ECF8E" opacity=".4" d="M63.7 110.3c-2.6 3.3-8 1.6-8.1-2.5l-1.4-55.7h40.6c7.3 0 11.3 8.4 6.5 13.8z"/>
      <path fill="#3ECF8E" d="M45.3 2.7c2.6-3.3 8-1.6 8.1 2.5l.7 55.7H14.6c-7.3 0-11.3-8.4-6.5-13.8z"/>
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#336791" d="M93.8 24.6c-2.4-1.2-5-2-7.7-2.4-1.5-.2-3-.3-4.5-.2-3.4.1-6.6 1-9.5 2.6-2.1 1.2-4 2.7-5.6 4.5-1.6-1.8-3.5-3.3-5.6-4.5-2.9-1.6-6.1-2.5-9.5-2.6-1.5-.1-3 0-4.5.2-2.7.4-5.3 1.2-7.7 2.4C22.5 29.7 16 39.6 16 51c0 8.1 3.1 15.8 8.5 21.7l.1.1c5.1 5.5 12.1 9 19.6 9.6 1.2.1 2.4.2 3.6.2h.5c.9 0 1.8-.1 2.7-.2 1.5 3.2 3.7 6 6.5 8.2 2.8 2.1 6.1 3.5 9.5 3.9.7.1 1.5.1 2.2.1s1.5 0 2.2-.1c3.4-.4 6.7-1.8 9.5-3.9 2.8-2.2 5-5 6.5-8.2.9.1 1.8.2 2.7.2h.5c1.2 0 2.4-.1 3.6-.2 7.5-.6 14.5-4.1 19.6-9.6l.1-.1C108.9 66.8 112 59.1 112 51c0-11.4-6.5-21.3-18.2-26.4z"/>
      <path fill="#fff" d="M64 36c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15z"/>
      <circle cx="59" cy="47" r="3" fill="#336791"/>
      <circle cx="69" cy="47" r="3" fill="#336791"/>
    </svg>
  ),
  firebase: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#FFA000" d="M23.3 93.4L41 6.9c.3-1.4 2.2-1.7 2.9-.4l19 35.5z"/>
      <path fill="#F57C00" d="M82.2 55.1L67.8 39.8 41 93.4z"/>
      <path fill="#FFCA28" d="M104.7 99.8l-7.4-46c-.3-1.6-2.3-2.2-3.3-.9L23.3 93.4l36.6 21.5c2.4 1.4 5.4 1.4 7.8 0z"/>
    </svg>
  ),
  git: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#F34F29" d="M124.7 58.4L69.6 3.3c-3.1-3.1-8.2-3.1-11.3 0L46.9 14.7l14.3 14.3c1.5-.5 3.2-.2 4.4 1s1.5 3 .9 4.5l13.8 13.8c1.5-.6 3.3-.3 4.5.9 1.7 1.7 1.7 4.5 0 6.2s-4.5 1.7-6.2 0c-1.3-1.3-1.6-3.2-.8-4.8L64.7 37.5v35.9c.4.2.8.5 1.1.8 1.7 1.7 1.7 4.5 0 6.2s-4.5 1.7-6.2 0-1.7-4.5 0-6.2c.4-.4.9-.7 1.4-.9V37c-.5-.2-1-.5-1.4-.9-1.3-1.3-1.6-3.3-.8-4.9L44.8 17.3 3.3 58.7c-3.1 3.1-3.1 8.2 0 11.3l55.1 55.1c3.1 3.1 8.2 3.1 11.3 0l55-55.1c3.1-3.2 3.1-8.3 0-11.3z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M64 5.1C30.5 5.1 3.4 32.2 3.4 65.7c0 26.8 17.4 49.5 41.5 57.5 3 .6 4.1-1.3 4.1-2.9 0-1.4-.1-6.2-.1-11.2-15.2 2.8-19.2-3.7-20.4-7.1-2-5.2-6.8-8.7-11.5-10.7-3.9-2.1.3-2.1.3-2.1 6.4.5 9.8 6.6 9.8 6.6 6.4 10.9 16.7 7.8 20.8 5.9.6-4.6 2.5-7.8 4.5-9.6-15.8-1.8-32.4-7.9-32.4-35.1 0-7.8 2.8-14.1 7.3-19.1-.7-1.8-3.2-9 .7-18.8 0 0 5.9-1.9 19.5 7.3 5.7-1.6 11.7-2.4 17.8-2.4 6 0 12.1.8 17.8 2.4 13.5-9.2 19.5-7.3 19.5-7.3 3.9 9.8 1.4 17 .7 18.8 4.5 5 7.3 11.3 7.3 19.1 0 27.3-16.6 33.3-32.5 35.1 2.6 2.2 4.8 6.5 4.8 13.1 0 9.5-.1 17.1-.1 19.5 0 1.6 1.1 3.5 4.1 2.9 24.1-8 41.5-30.7 41.5-57.5C124.6 32.2 97.5 5.1 64 5.1z"/>
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#019BC6" d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.3-3.5 8.7-3.1 12.9.3 3.1 1.2 6.4 3 9-2.6 1.6-6 2.3-8.3 2.7-4 .8-8.2 1.2-12.2 1.2H.5l-.3 1.5c-.8 8.3.6 16.7 4.2 24.2l1.6 3c6.3 10 16.4 14.7 27.8 14.7 23.1 0 42-10.7 50.8-33.5 5.5.3 11.2-1.3 14.2-6.5l.7-1.3z"/>
      <path fill="#019BC6" d="M21 57H8.4v12.6H21zm15.7 0H24.1v12.6h12.6zm15.7 0H39.8v12.6h12.6zm15.7 0H55.5v12.6h12.6zM36.7 42.3H24.1v12.6h12.6zm15.7 0H39.8v12.6h12.6zm15.7 0H55.5v12.6h12.6zm15.7 0H71.2v12.6h12.6zM52.4 27.7H39.8v12.6h12.6z"/>
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <path fill="#0ACF83" d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129z"/>
      <path fill="#A259FF" d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5z"/>
      <path fill="#F24E1E" d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5z"/>
      <path fill="#FF7262" d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67z"/>
      <path fill="#1ABCFE" d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5 76.6 43 88.5 43 110 52.6 110 64.5z"/>
    </svg>
  ),
  flutter: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <defs>
        <linearGradient id="flutterGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#54C5F8"/>
          <stop offset="100%" stopColor="#01579B"/>
        </linearGradient>
        <linearGradient id="flutterGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#29B6F6"/>
          <stop offset="100%" stopColor="#0288D1"/>
        </linearGradient>
      </defs>
      <polygon fill="url(#flutterGrad1)" points="14,64 48,28 116,28 82,64"/>
      <polygon fill="#01579B" points="48,100 65,83 82,100 65,117"/>
      <polygon fill="url(#flutterGrad2)" points="14,64 48,100 82,64 48,28"/>
      <polygon fill="#29B6F6" points="82,64 116,28 116,100 82,100 65,83 82,64"/>
    </svg>
  ),
  dart: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <defs>
        <linearGradient id="dartGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#40C4FF"/>
          <stop offset="100%" stopColor="#0175C2"/>
        </linearGradient>
        <linearGradient id="dartGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00B4AB"/>
          <stop offset="100%" stopColor="#40C4FF"/>
        </linearGradient>
      </defs>
      <path fill="url(#dartGrad1)" d="M34 7l-7 7v40l57 57 40-7 7-40L74 7z"/>
      <path fill="url(#dartGrad2)" d="M27 54L7 74l7 40 20-20z"/>
      <path fill="#00B4AB" d="M27 54l20 20-20 20-20-20z"/>
      <circle fill="#fff" cx="75" cy="53" r="10"/>
    </svg>
  ),
  llm: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <rect width="128" height="128" rx="12" fill="#7C3AED"/>
      <path fill="#fff" d="M24 40h80v8H24zm0 20h80v8H24zm0 20h50v8H24z"/>
      <circle cx="100" cy="88" r="12" fill="#C4B5FD"/>
      <path fill="#fff" d="M96 85l8 3-8 3v-6z"/>
    </svg>
  ),
  mlops: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <circle cx="64" cy="64" r="54" fill="none" stroke="#F59E0B" strokeWidth="8"/>
      <path fill="#F59E0B" d="M64 20 A44 44 0 0 1 108 64" stroke="none"/>
      <circle cx="64" cy="64" r="12" fill="#F59E0B"/>
      <path fill="#fff" d="M58 60h12v8H58z"/>
    </svg>
  ),
  fastapi: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <circle cx="64" cy="64" r="56" fill="#009688"/>
      <path fill="#fff" d="M68 24l-28 52h28l-4 28 28-52H64l4-28z"/>
    </svg>
  ),
  transformers: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <rect width="128" height="128" rx="12" fill="#FF6B35"/>
      <circle cx="32" cy="64" r="14" fill="#fff" opacity=".9"/>
      <circle cx="64" cy="64" r="14" fill="#fff" opacity=".9"/>
      <circle cx="96" cy="64" r="14" fill="#fff" opacity=".9"/>
      <path stroke="#fff" strokeWidth="3" fill="none" d="M46 64 L50 64 M78 64 L82 64"/>
    </svg>
  ),
  deeplearning: (
    <svg viewBox="0 0 128 128" width="20" height="20">
      <rect width="128" height="128" rx="12" fill="#1E293B"/>
      <circle cx="24" cy="64" r="8" fill="#60A5FA"/>
      <circle cx="52" cy="40" r="8" fill="#60A5FA"/>
      <circle cx="52" cy="88" r="8" fill="#60A5FA"/>
      <circle cx="80" cy="40" r="8" fill="#818CF8"/>
      <circle cx="80" cy="64" r="8" fill="#818CF8"/>
      <circle cx="80" cy="88" r="8" fill="#818CF8"/>
      <circle cx="108" cy="64" r="8" fill="#A78BFA"/>
      <path stroke="#60A5FA" strokeWidth="1.5" fill="none" d="M32 64 L44 40 M32 64 L44 88 M60 40 L72 40 M60 40 L72 64 M60 40 L72 88 M60 88 L72 40 M60 88 L72 64 M60 88 L72 88 M88 40 L100 64 M88 64 L100 64 M88 88 L100 64"/>
    </svg>
  ),
};

const I = {
  gh:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  li:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  mail:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  phone:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  dl:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  arr:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
  menu:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  send:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  sun:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  moon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  target:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  ext:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
};

/* HOOKS */
function useTypingAnimation(words, speed = 100, pause = 2000) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[wi];
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.substring(0, text.length + 1));
        if (text.length + 1 === cur.length) setTimeout(() => setDel(true), pause);
      } else {
        setText(cur.substring(0, text.length - 1));
        if (text.length === 0) { setDel(false); setWi((p) => (p + 1) % words.length); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, wi, words, speed, pause]);
  return text;
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* MOUSE GLOW EFFECT */
function MouseGlow({ accent, dark }) {
  const canvasRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const frameRef = useRef(null);
  const nodesRef = useRef([]);
  const timeRef = useRef(0);
  const pulseRef = useRef(0);

  const colors = dark ? [
    "#00d4ff", "#a855f7", "#ff00ff", "#00ff88", "#ff6b6b",
    "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7", "#fd79a8"
  ] : [
    "#004d99", "#5a2d82", "#8b0000", "#004d00", "#cc5500",
    "#0d6b6b", "#003d99", "#994d00", "#4a235a", "#993366"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const cols = 20, rows = 11;
    const nodes = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = (x / (cols - 1)) * canvas.width;
        const py = (y / (rows - 1)) * canvas.height;
        nodes.push({
          x: px, y: py,
          ox: px, oy: py,
          pulse: Math.random() * Math.PI * 2,
          wobble: Math.random() * 0.5 + 0.5,
          colorIndex: Math.floor(Math.random() * colors.length),
        });
      }
    }
    nodesRef.current = nodes;

    const onMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const getDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const getOpacityNearContent = (y) => {
      const headerY = 200;
      const contentAreaThreshold = 150;
      if (y < headerY + contentAreaThreshold) return 0.08;
      if (y > canvas.height - contentAreaThreshold) return 0.1;
      return 0.15;
    };

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [255, 255, 255];
    };

    const animate = () => {
      timeRef.current += 0.016;
      pulseRef.current += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pos.current.x += (targetPos.current.x - pos.current.x) * 0.08;
      pos.current.y += (targetPos.current.y - pos.current.y) * 0.08;

      nodes.forEach((node) => {
        const dx = pos.current.x - node.ox;
        const dy = pos.current.y - node.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 500) ** 2;

        const wobbleX = Math.sin(timeRef.current * 0.3 + node.pulse) * node.wobble * 8;
        const wobbleY = Math.cos(timeRef.current * 0.25 + node.pulse) * node.wobble * 8;

        node.x = node.ox + dx * influence * 0.6 + wobbleX;
        node.y = node.oy + dy * influence * 0.6 + wobbleY;
      });

      const pulseIntensity = 0.5 + Math.sin(pulseRef.current) * 0.3;

      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const i = y * cols + x;
          const n1 = nodes[i];
          const n2 = nodes[i + 1];
          const n3 = nodes[i + cols];
          const n4 = nodes[i + cols + 1];

          const centerY = (n1.y + n2.y + n3.y + n4.y) / 4;
          const distToMouse = getDistance(pos.current.x, pos.current.y, (n1.x + n2.x + n3.x + n4.x) / 4, centerY);
          const glow = Math.max(0, 1 - distToMouse / 500) * 0.3;

          const baseOpacity = getOpacityNearContent(centerY);
          const finalOpacity = Math.max(0.02, baseOpacity * (0.6 + glow + pulseIntensity * 0.2));

          ctx.lineWidth = 0.8;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          const drawTriangle = (a, b, c, colorIdx) => {
            const rgb = hexToRgb(colors[colorIdx]);
            ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${finalOpacity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(c.x, c.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(c.x, c.y);
            ctx.lineTo(a.x, a.y);
            ctx.stroke();
          };

          drawTriangle(n1, n2, n4, n1.colorIndex);
          drawTriangle(n1, n4, n3, n3.colorIndex);
        }
      }

      for (let i = 0; i < nodes.length; i += Math.max(1, Math.floor(nodes.length / 800))) {
        const node = nodes[i];
        const distToMouse = getDistance(pos.current.x, pos.current.y, node.x, node.y);
        const nodeGlow = Math.max(0, 1 - distToMouse / 400) * 0.6;
        const nodeOpacity = Math.min(0.6, (0.25 + nodeGlow) * pulseIntensity);

        const rgb = hexToRgb(colors[node.colorIndex]);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${nodeOpacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1 + nodeGlow * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

/* LOADING */
function LoadingScreen({ accent, accent2 }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#0a0a0f",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 16,
    }}>
      <div style={{
        fontSize: "4rem", fontWeight: 800,
        fontFamily: "'Fira Code', monospace",
        background: `linear-gradient(135deg, ${accent}, ${accent2})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "awPulse 0.6s ease-in-out infinite alternate",
      }}>AW</div>
      <style>{`@keyframes awPulse{from{opacity:.7;transform:scale(.95)}to{opacity:1;transform:scale(1.05)}}`}</style>
    </div>
  );
}

/* INTERACTIVE BACKGROUND */
function InteractiveBg({ dark }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let id, t = 0;

    // smoothed mouse position (lerped) + raw for velocity
    const mouse  = { x: window.innerWidth / 2,  y: window.innerHeight / 2 };
    const smooth = { x: window.innerWidth / 2,  y: window.innerHeight / 2 };
    const vel    = { x: 0, y: 0 };
    let   speed  = 0;
    let   lastRipple = 0;

    const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e) => {
      vel.x = e.clientX - mouse.x;
      vel.y = e.clientY - mouse.y;
      speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // palette helpers — hue shifts across screen width
    const hue = (base, shift = 0) => `hsl(${base + shift},100%,${dark ? 60 : 45}%)`;
    const getHueBase = () => (mouse.x / (cv.width || 1)) * 120; // 0=cyan, 60=green, 120=blue

    // ── PARTICLES ──────────────────────────────────────────────────────
    // scale down on weak devices
    const cores = navigator.hardwareConcurrency || 4;
    const isLowEnd = cores <= 4;
    const N = isLowEnd ? 70 : cores <= 8 ? 110 : 140;
    const pts = Array.from({ length: N }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      ox: 0, oy: 0,        // offset from rest position for oscillation
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      baseR: Math.random() * 1.8 + .6,
      hOffset: Math.random() * 60 - 30,   // per-particle hue variation
      phase: Math.random() * Math.PI * 2, // breathing phase
      brightness: Math.random() * .4 + .25,
    }));

    // ── ORBS — large slowly drifting glowing blobs ──────────────────────
    const ORBS = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      r: 180 + Math.random() * 120,
      hOffset: i * 55,   // spread hue
      alpha: dark ? .045 : .035,
      phase: Math.random() * Math.PI * 2,
    }));

    // ── RIPPLES ──────────────────────────────────────────────────────────
    const ripples = [];
    const addRipple = (x, y, big = false) => {
      const rings = big ? 3 : 2;
      for (let k = 0; k < rings; k++) {
        ripples.push({
          x, y,
          r: k * 18,
          maxR: (big ? 260 : 160) + Math.random() * 60,
          alpha: big ? .4 : .28,
          speed: 2.8 + Math.random() * 1.6 - k * .3,
          hOffset: getHueBase(),
        });
      }
    };

    // ── COMET TRAIL ──────────────────────────────────────────────────────
    const trail = [];
    const MAX_TRAIL = 42;

    const loop = (now) => {
      t += 0.012;
      const W = cv.width, H = cv.height;

      // lerp smooth mouse
      smooth.x += (mouse.x - smooth.x) * .07;
      smooth.y += (mouse.y - smooth.y) * .07;

      ctx.clearRect(0, 0, W, H);

      const hb = getHueBase();

      // ── 1. LARGE CURSOR BLOOM ─────────────────────────────────────────
      if (mouse.x > 0) {
        const bloom = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 340);
        bloom.addColorStop(0,   `hsla(${hb},100%,70%,${dark ? .12 : .08})`);
        bloom.addColorStop(0.4, `hsla(${hb+40},100%,60%,${dark ? .05 : .03})`);
        bloom.addColorStop(1,   `hsla(${hb+80},100%,50%,0)`);
        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, 340, 0, Math.PI * 2);
        ctx.fillStyle = bloom;
        ctx.fill();

        // tight inner core dot
        const core = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 22);
        core.addColorStop(0, `hsla(${hb},100%,90%,${dark ? .55 : .4})`);
        core.addColorStop(1, `hsla(${hb},100%,70%,0)`);
        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      }

      // ── 2. RIPPLES ────────────────────────────────────────────────────
      if (speed > 10 && now - lastRipple > 90) {
        addRipple(mouse.x, mouse.y, speed > 22);
        lastRipple = now;
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r     += rp.speed;
        rp.alpha -= 0.007;
        if (rp.alpha <= 0 || rp.r > rp.maxR) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${rp.hOffset},100%,70%,${rp.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // ── 3. COMET TRAIL ────────────────────────────────────────────────
      trail.push({ x: mouse.x, y: mouse.y, t: now, h: hb });
      if (trail.length > MAX_TRAIL) trail.shift();

      if (trail.length > 3) {
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < trail.length; i++) {
          const p = trail[i - 1], q = trail[i];
          const frac = i / trail.length;
          const age  = Math.max(0, 1 - (now - q.t) / 500);
          const a    = age * frac * (dark ? .6 : .45);
          if (a < .005) continue;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `hsla(${q.h + frac * 40},100%,72%,${a})`;
          ctx.lineWidth   = frac * 3.5 + .3;
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── 4. DRIFTING GLOWING ORBS ──────────────────────────────────────
      ORBS.forEach(orb => {
        orb.x += orb.vx; orb.y += orb.vy;
        if (orb.x < -orb.r)    orb.x = W + orb.r;
        if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r)    orb.y = H + orb.r;
        if (orb.y > H + orb.r) orb.y = -orb.r;

        // mouse pulls orbs gently
        const dx = smooth.x - orb.x, dy = smooth.y - orb.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 500 && d > 0) {
          orb.vx += (dx / d) * .0008;
          orb.vy += (dy / d) * .0008;
        }
        orb.vx *= .999; orb.vy *= .999;

        const breath = Math.sin(t * .6 + orb.phase) * .2 + 1;
        const oh = (hb + orb.hOffset) % 360;
        const g  = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r * breath);
        g.addColorStop(0, `hsla(${oh},100%,65%,${orb.alpha * 1.8})`);
        g.addColorStop(.5,`hsla(${oh + 20},100%,55%,${orb.alpha})`);
        g.addColorStop(1, `hsla(${oh + 40},100%,45%,0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r * breath, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // ── 5. PARTICLES ──────────────────────────────────────────────────
      const REPEL = 110, ATTRACT = 220;
      pts.forEach(p => {
        const dx   = smooth.x - p.x, dy = smooth.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL && dist > 0) {
          const f = (1 - dist / REPEL) * .055;
          p.vx -= (dx / dist) * f;
          p.vy -= (dy / dist) * f;
        } else if (dist < ATTRACT && dist > 0) {
          const f = (1 - dist / ATTRACT) * .007;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }
        // velocity sweep
        if (dist < ATTRACT) {
          const sw = (1 - dist / ATTRACT) * .014;
          p.vx += vel.x * sw;
          p.vy += vel.y * sw;
        }

        p.vx *= .975; p.vy *= .975;
        const spd = Math.sqrt(p.vx ** 2 + p.vy ** 2);
        if (spd > 4) { p.vx = (p.vx / spd) * 4; p.vy = (p.vy / spd) * 4; }

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -.9; }
        if (p.x > W) { p.x = W; p.vx *= -.9; }
        if (p.y < 0) { p.y = 0; p.vy *= -.9; }
        if (p.y > H) { p.y = H; p.vy *= -.9; }

        const prox   = Math.max(0, 1 - dist / ATTRACT);
        const breath = Math.sin(t * 1.2 + p.phase) * .3 + 1;
        const r      = (p.baseR + prox * 3) * breath;
        const alpha  = (dark ? 1 : .7) * (p.brightness + prox * .45);
        const ph     = (hb + p.hOffset) % 360;

        // glowing halo when near cursor
        if (prox > .15) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${ph},100%,65%,${prox * .12})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${ph},100%,72%,${Math.min(alpha, .95)})`;
        ctx.fill();
      });

      // ── 6. CONNECTION WEB (skipped on low-end devices) ────────────────
      if (!isLowEnd) {
        const LINK = 140;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d > LINK) continue;

            const mx = (pts[i].x + pts[j].x) * .5;
            const my = (pts[i].y + pts[j].y) * .5;
            const md = Math.sqrt((smooth.x - mx) ** 2 + (smooth.y - my) ** 2);
            const boost  = Math.max(0, 1 - md / 320) * .35;
            const base   = (1 - d / LINK) * (dark ? .07 : .04);
            const lh     = (hb + (pts[i].hOffset + pts[j].hOffset) / 2) % 360;

            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `hsla(${lh},100%,70%,${base + boost})`;
            ctx.lineWidth   = .55 + boost * 1.2;
            ctx.stroke();
          }
        }
      }

      vel.x *= .8; vel.y *= .8;
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(id);
    };
  }, [dark]);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", willChange: "transform" }} />;
}

function Sec({ id, children, className }) {
  const [ref, vis] = useInView(.08);
  return (
    <section id={id} ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1)" }}>
      {children}
    </section>
  );
}

const CONTACT_EMAIL = "aroshnimantha386@gmail.com";

export default function Portfolio() {
  const [menuOpen, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const navRef = useRef(null);
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(true);

  /* contact modal state */
  const [contactModal, setContactModal] = useState(null); // "email" | "phone" | null
  const [copied, setCopied] = useState(false);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  /* contact form state */
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const typed = useTypingAnimation(["ML Engineer", "AI Enthusiast", "Full-Stack Developer", "Mobile App Builder", "Problem Solver"]);

  /* hide loading screen quickly (< 1s) */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const t = isDark ? {
    bg: "#0a0a0f", bgAlt: "#12121a", text: "#e0e0e8", muted: "rgba(255,255,255,.55)",
    faint: "rgba(255,255,255,.35)", accent: "#00d4ff", accent2: "#a855f7",
    glass: "rgba(255,255,255,.23)", gBorder: "rgba(255,255,255,.26)",
    glassS: "rgba(255,255,255,.25)", gBorderS: "rgba(255,255,255,.28)",
    inputBg: "rgba(255,255,255,.24)", inputB: "rgba(255,255,255,.28)",
    shadow: "rgba(0,0,0,.4)", orbOp: .15, navBg: "rgba(10,10,15,.88)",
    nextInner: "#0a0a0f",
  } : {
    bg: "#f8f9fc", bgAlt: "#ffffff", text: "#1a1a2e", muted: "rgba(0,0,0,.6)",
    faint: "rgba(0,0,0,.35)", accent: "#0078c8", accent2: "#7c3aed",
    glass: "rgba(255,255,255,.90)", gBorder: "rgba(0,0,0,.28)",
    glassS: "rgba(255,255,255,.95)", gBorderS: "rgba(0,0,0,.30)",
    inputBg: "rgba(0,0,0,.23)", inputB: "rgba(0,0,0,.28)",
    shadow: "rgba(0,0,0,.1)", orbOp: .08, navBg: "rgba(248,249,252,.88)",
    nextInner: "#f8f9fc",
  };

  const { navBg, gBorder } = t;

  useEffect(() => {
    let rafId = null;
    const h = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrolled = window.scrollY > 50;
        if (navRef.current) {
          navRef.current.style.background = scrolled ? navBg : "transparent";
          navRef.current.style.backdropFilter = scrolled ? "blur(20px)" : "none";
          navRef.current.style.borderBottom = scrolled ? `1px solid ${gBorder}` : "1px solid transparent";
        }
        const ss = ["home", "about", "skills", "projects", "contact"];
        for (let i = ss.length - 1; i >= 0; i--) { const el = document.getElementById(ss[i]); if (el && el.getBoundingClientRect().top <= 200) { setActive(ss[i]); break; } }
      });
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => { window.removeEventListener("scroll", h); if (rafId) cancelAnimationFrame(rafId); };
  }, [navBg, gBorder]);

  const goTo = useCallback((id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false); }, []);

  const navs = [{ id: "home", l: "Home" }, { id: "about", l: "About" }, { id: "skills", l: "Skills" }, { id: "projects", l: "Projects" }, { id: "contact", l: "Contact" }];

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in your name, email, and message.");
      return;
    }
    setSending(true);
    emailjs.send(
      EJS_SERVICE_ID,
      EJS_TEMPLATE_ID,
      {
        name:    form.name,
        email:   form.email,
        title:   form.subject || `Portfolio Contact from ${form.name}`,
        message: form.message,
      }
    ).then(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }).catch((err) => {
      setSending(false);
      console.error("EmailJS error:", err);
      alert("Failed to send. Error: " + (err?.text || err?.message || JSON.stringify(err)));
    });
  };

  if (loading) {
    return <LoadingScreen accent={t.accent} accent2={t.accent2} />;
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:${t.bg};color:${t.text};font-family:'DM Sans','Plus Jakarta Sans',sans-serif;overflow-x:hidden;transition:background .5s,color .5s}
        ::selection{background:${isDark?"rgba(0,212,255,.3)":"rgba(0,120,200,.2)"};color:${isDark?"#fff":"#000"}}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${t.bg}}::-webkit-scrollbar-thumb{background:${t.accent}50;border-radius:3px}
        .gradient-text{background:linear-gradient(135deg,${t.accent} 0%,${t.accent2} 50%,${t.accent} 100%);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s ease infinite}
        @keyframes shimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(28px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .cursor-blink::after{content:'|';animation:blink 1s step-end infinite;color:${t.accent};font-weight:300}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .glow-border{position:relative}.glow-border::before{content:'';position:absolute;inset:-1px;border-radius:inherit;padding:1px;background:linear-gradient(135deg,${t.accent}50,${t.accent2}50,${t.accent}20);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .4s;pointer-events:none}.glow-border:hover::before{opacity:1}
        .btn-p{background:linear-gradient(135deg,${t.accent},${isDark?"#0099cc":"#005fa3"});color:${isDark?"#000":"#fff"};font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;padding:12px 28px;border:none;border-radius:50px;cursor:pointer;font-size:.95rem;transition:all .3s;display:inline-flex;align-items:center;gap:8px;text-decoration:none}.btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 30px ${t.accent}40}
        .btn-o{background:transparent;color:${t.accent};font-family:'Plus Jakarta Sans',sans-serif;font-weight:500;padding:12px 28px;border:1px solid ${t.accent}66;border-radius:50px;cursor:pointer;font-size:.95rem;transition:all .3s;display:inline-flex;align-items:center;gap:8px;text-decoration:none}.btn-o:hover{background:${t.accent}18;border-color:${t.accent};transform:translateY(-2px)}
        .pcard{transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s}.pcard:hover{transform:translateY(-8px);box-shadow:0 20px 60px ${t.shadow}}
        .stag{transition:all .3s}.stag:hover{background:${t.accent}18 !important;border-color:${t.accent}55 !important;transform:translateY(-2px)}
        .nl{position:relative;color:${t.muted};text-decoration:none;font-size:.9rem;font-weight:400;letter-spacing:.02em;transition:color .3s;cursor:pointer;background:none;border:none;font-family:'Plus Jakarta Sans',sans-serif;padding:4px 0}.nl:hover,.nl.on{color:${t.text}}.nl.on::after{content:'';position:absolute;bottom:-2px;left:0;width:100%;height:2px;background:${t.accent};border-radius:1px}
        input,textarea{width:100%;background:${t.inputBg};border:1px solid ${t.inputB};border-radius:12px;padding:14px 18px;color:${t.text};font-family:'Plus Jakarta Sans',sans-serif;font-size:.95rem;transition:border-color .3s,box-shadow .3s;outline:none}input:focus,textarea:focus{border-color:${t.accent}80;box-shadow:0 0 20px ${t.accent}15}input::placeholder,textarea::placeholder{color:${t.faint}}textarea{resize:vertical;min-height:120px}
        .float-a{animation:float 6s ease-in-out infinite}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.s1{animation:fadeInUp .8s .1s both}.s2{animation:fadeInUp .8s .2s both}.s3{animation:fadeInUp .8s .3s both}.s4{animation:fadeInUp .8s .4s both}.s5{animation:fadeInUp .8s .5s both}
        .orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
        .thm{width:44px;height:44px;border-radius:50%;border:1px solid ${t.gBorderS};background:${t.glass};cursor:pointer;display:flex;align-items:center;justify-content:center;color:${t.text};transition:all .3s;backdrop-filter:blur(10px)}.thm:hover{background:${t.accent}18;border-color:${t.accent}55;transform:scale(1.1)}
        .proj-link{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:50px;font-size:.82rem;font-weight:500;font-family:'Fira Code',monospace;text-decoration:none;transition:all .3s;border:1px solid;cursor:pointer}
        @media(max-width:768px){.hero-grid{flex-direction:column-reverse !important;text-align:center}.hero-btns{justify-content:center !important}.pgrid{grid-template-columns:1fr !important}.sgrid{grid-template-columns:1fr !important}.agrid{grid-template-columns:1fr !important}.cgrid{grid-template-columns:1fr !important}.nav-d{display:none !important}.mob-btn{display:flex !important}.htitle{font-size:2.2rem !important}.stitle{font-size:2rem !important}.hero-img{width:220px !important;height:220px !important}.srow{justify-content:center !important}}
        @media(min-width:769px){.mob-btn{display:none !important}.mob-menu{display:none !important}}
      `}</style>
      <style>{`:root{--icon-nextjs-inner:${t.nextInner}}`}</style>

      <MouseGlow accent={t.accent} dark={isDark} />

      {/* ── CONTACT MODAL ── */}
      {contactModal && (() => {
        const isEmail = contactModal === "email";
        const value   = isEmail ? PROFILE.email : PROFILE.phone;
        const label   = isEmail ? "Email Address" : "Phone Number";
        const icon    = isEmail ? I.mail : I.phone;
        return (
          <div onClick={() => { setContactModal(null); setCopied(false); }}
            style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(0,0,0,.72)", animation: "fadeIn .2s ease" }}>
            <div onClick={e => e.stopPropagation()}
              style={{ background: t.bgAlt, border: `1.5px solid ${t.accent}55`, borderRadius: 24, padding: "40px 36px",
                boxShadow: `0 0 60px ${t.accent}30, 0 24px 64px rgba(0,0,0,.7)`,
                minWidth: 340, maxWidth: 420, width: "90vw", textAlign: "center", position: "relative",
                animation: "slideUp .25s cubic-bezier(.16,1,.3,1)" }}>
              {/* close */}
              <button onClick={() => { setContactModal(null); setCopied(false); }}
                style={{ position: "absolute", top: 16, right: 16, background: t.glass, border: `1px solid ${t.gBorder}`,
                  borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: t.muted,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", lineHeight: 1 }}>×</button>
              {/* icon badge */}
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${t.accent}30,${t.accent2}30)`,
                border: `1.5px solid ${t.accent}55`, display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px", color: t.accent, fontSize: "1.5rem" }}>{icon}</div>
              <p style={{ fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                color: t.faint, marginBottom: 10, fontFamily: "'Fira Code',monospace" }}>{label}</p>
              {/* value box */}
              <div style={{ background: t.glass, border: `1px solid ${t.gBorder}`, borderRadius: 14,
                padding: "14px 20px", fontSize: "1.05rem", fontWeight: 600, color: t.text,
                letterSpacing: ".02em", marginBottom: 24, wordBreak: "break-all" }}>{value}</div>
              {/* buttons */}
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn-p" onClick={() => copyToClipboard(value)}
                  style={{ minWidth: 130, justifyContent: "center" }}>
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
                {isEmail && (
                  <button className="btn-o"
                    style={{ minWidth: 130, justifyContent: "center", display: "inline-flex", alignItems: "center", gap: 6 }}
                    onClick={e => { e.stopPropagation(); window.location.href = `mailto:${value}`; }}>
                    {I.mail} Open in Mail
                  </button>
                )}
                {!isEmail && (
                  <button className="btn-o"
                    style={{ minWidth: 130, justifyContent: "center", display: "inline-flex", alignItems: "center", gap: 6 }}
                    onClick={e => { e.stopPropagation(); window.location.href = `tel:${value.replace(/\s/g, "")}`; }}>
                    {I.phone} Call Now
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      <div style={{ position: "relative", minHeight: "100vh" }}>
        <InteractiveBg dark={isDark} />
        <div className="orb" style={{ width: 500, height: 500, background: t.accent, top: "10%", left: "-10%", opacity: t.orbOp, animation: "float 8s ease-in-out infinite" }} />
        <div className="orb" style={{ width: 400, height: 400, background: t.accent2, top: "60%", right: "-5%", opacity: t.orbOp, animation: "float 10s ease-in-out infinite 2s" }} />

        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "14px 0", transition: "all .3s", background: scrollY > 50 ? t.navBg : "transparent", backdropFilter: scrollY > 50 ? "blur(20px)" : "none", borderBottom: scrollY > 50 ? `1px solid ${t.gBorder}` : "1px solid transparent" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => goTo("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${t.accent},${t.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".85rem", fontWeight: 700, color: "#fff", fontFamily: "'Fira Code',monospace" }}>A</div>
              <span style={{ color: t.text, fontWeight: 600, fontSize: "1.05rem" }}>Arosh</span>
            </button>
            <div className="nav-d" style={{ display: "flex", gap: 32, alignItems: "center" }}>
              {navs.map(n => <button key={n.id} className={`nl ${active === n.id ? "on" : ""}`} onClick={() => goTo(n.id)}>{n.l}</button>)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="mob-btn" onClick={() => setMenu(!menuOpen)} style={{ background: "none", border: "none", color: t.text, cursor: "pointer", display: "none", alignItems: "center" }}>{menuOpen ? I.close : I.menu}</button>
            </div>
          </div>
          {menuOpen && <div className="mob-menu" style={{ position: "absolute", top: "100%", left: 0, right: 0, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16, background: t.navBg, backdropFilter: "blur(30px)", borderBottom: `1px solid ${t.gBorder}` }}>
            {navs.map(n => <button key={n.id} className="nl" onClick={() => goTo(n.id)} style={{ textAlign: "left", fontSize: "1.1rem" }}>{n.l}</button>)}
          </div>}
        </nav>

        <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1, padding: "120px 24px 80px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 60 }}>
              <div style={{ flex: 1 }}>
                <div className="s1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${t.accent}12`, border: `1px solid ${t.accent}33`, borderRadius: 50, padding: "6px 16px", marginBottom: 24, fontSize: ".85rem", color: t.accent, fontFamily: "'Fira Code',monospace" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent, animation: "blink 2s infinite" }} /> Available for opportunities
                </div>
                <h1 className="htitle s2" style={{ fontSize: "3.2rem", fontWeight: 800, lineHeight: 1.1, marginBottom: 8, letterSpacing: "-.02em", display: "flex", alignItems: "baseline", gap: "0.35ch", flexWrap: "wrap" }}>
                  <SplitText text="Hi, I'm" tag="span" splitType="chars" delay={55} duration={0.65} ease="power3.out" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0} rootMargin="0px" textAlign="left" />
                  <SplitText text="Arosh" tag="span" splitType="chars" delay={55} duration={0.65} ease="power3.out" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0} rootMargin="0px" textAlign="left" />
                </h1>
                <div className="s3 cursor-blink" style={{ fontSize: "1.5rem", fontWeight: 300, color: t.muted, marginBottom: 24, fontFamily: "'Fira Code',monospace", minHeight: "2.2rem" }}>{typed}</div>
                <p className="s4" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: t.faint, marginBottom: 32, maxWidth: 520 }}>{PROFILE.tagline}. Currently pursuing {PROFILE.degree} at {PROFILE.university}.</p>
                <div className="hero-btns s5" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <button className="btn-p" onClick={() => goTo("projects")}>View Projects {I.arr}</button>
                  <button className="btn-o" onClick={() => goTo("contact")}>Contact Me</button>
                </div>
                <div className="srow s5" style={{ display: "flex", gap: 16, marginTop: 40 }}>
                  {[{ icon: I.gh, href: PROFILE.github, l: "GitHub" }, { icon: I.li, href: PROFILE.linkedin, l: "LinkedIn" }].map(s => (
                    <a key={s.l} href={s.href} target="_blank" rel="noopener noreferrer" title={s.l}
                      style={{ width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: t.glass, border: `1px solid ${t.gBorderS}`, color: t.muted, transition: "all .3s", textDecoration: "none" }}
                      onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = `${t.accent}66`; e.currentTarget.style.background = `${t.accent}15`; }}
                      onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.gBorderS; e.currentTarget.style.background = t.glass; }}
                    >{s.icon}</a>
                  ))}
                  {[{ icon: I.mail, l: "Email", modal: "email" }, { icon: I.phone, l: "Phone", modal: "phone" }].map(s => (
                    <button key={s.l} title={s.l} onClick={() => { setCopied(false); setContactModal(s.modal); }}
                      style={{ width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: t.glass, border: `1px solid ${t.gBorderS}`, color: t.muted, transition: "all .3s", cursor: "pointer" }}
                      onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = `${t.accent}66`; e.currentTarget.style.background = `${t.accent}15`; }}
                      onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.gBorderS; e.currentTarget.style.background = t.glass; }}
                    >{s.icon}</button>
                  ))}
                </div>
              </div>
              <div style={{ flex: "0 0 auto" }}>
                <div className="float-a" style={{ position: "relative" }}>
                  <div className="hero-img" style={{ width: 300, height: 300, borderRadius: "50%", background: `linear-gradient(135deg,${t.accent}40,${t.accent2}40)`, padding: 3 }}>
                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: t.bgAlt, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src="./profile.jpeg" alt={PROFILE.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                        onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div style="font-size:72px;font-weight:800;font-family:'Plus Jakarta Sans';color:${t.accent}">AW</div>`; }} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", inset: -15, borderRadius: "50%", border: `1px solid ${t.accent}25`, animation: "float 4s ease-in-out infinite reverse" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Sec id="about">
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
            <h2 className="stitle" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "baseline", gap: "0.4ch", flexWrap: "wrap" }}>
              <SplitText text="About" tag="span" splitType="chars" delay={60} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} threshold={0.2} rootMargin="-80px" textAlign="left" />
              <SplitText text="Me" tag="span" splitType="chars" delay={60} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} threshold={0.2} rootMargin="-80px" textAlign="left" />
            </h2>
            <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${t.accent},transparent)`, borderRadius: 2, marginBottom: 48 }} />
            <div className="agrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
              <div>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: t.muted, marginBottom: 28 }}>{PROFILE.about}</p>
                <div style={{ background: `linear-gradient(135deg,${t.accent}08,${t.accent2}08)`, border: `1px solid ${t.accent}25`, borderRadius: 16, padding: 24, marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: t.accent }}>{I.target}</span>
                    <span style={{ fontSize: ".82rem", fontWeight: 600, color: t.accent, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'Fira Code',monospace" }}>Career Goal</span>
                  </div>
                  <p style={{ fontSize: ".98rem", lineHeight: 1.7, color: t.muted }}>{PROFILE.careerGoal}</p>
                </div>
                <a href="/cv.pdf" download="Arosh_Wijesinghe_CV.pdf" className="btn-p">{I.dl} Download CV</a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[{ l: "University", v: "UoM", e: "🎓", c: "#10b981" }, { l: "Year", v: "2nd Year", e: "📅", c: "#8b5cf6" }, { l: "Focus", v: "ML / AI", e: "🤖", c: "#f97316" }, { l: "Projects", v: `${PROJECTS.length}+`, e: "🚀", c: "#06b6d4" }].map(s => (
                  <div key={s.l} style={{ background: t.bgAlt, border: `2px solid ${t.gBorder}`, borderTop: `3px solid ${s.c}`, backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, textAlign: "center", transition: "all .3s", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = s.c; e.currentTarget.style.boxShadow = `0 0 25px ${s.c}40, inset 0 0 15px ${s.c}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = t.gBorder; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ fontSize: "1.4rem", marginBottom: 4 }}>{s.e}</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 700, color: t.accent, fontFamily: "'Fira Code',monospace" }}>{s.v}</div>
                    <div style={{ fontSize: ".85rem", color: t.faint, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Sec>

        <Sec id="skills">
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
            <h2 className="stitle" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "baseline", gap: "0.4ch", flexWrap: "wrap" }}>
              <SplitText text="Tech" tag="span" splitType="chars" delay={60} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} threshold={0.2} rootMargin="-80px" textAlign="left" />
              <SplitText text="Stack" tag="span" splitType="chars" delay={60} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} threshold={0.2} rootMargin="-80px" textAlign="left" />
            </h2>
            <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${t.accent},transparent)`, borderRadius: 2, marginBottom: 48 }} />
            <div className="sgrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
              {SKILLS.map((g, i) => {
                const categoryColors = ["#10b981", "#8b5cf6", "#f97316", "#06b6d4", "#ec4039", "#06b6d4"];
                const categoryBorderColors = ["#059669", "#7c3aed", "#dc2626", "#0891b2", "#b91c1c", "#0891b2"];
                const color = categoryColors[i % categoryColors.length];
                const darkBg = color + "25";
                const hoverBorder = color + "99";
                return (
                <div key={g.category} className="glow-border" style={{ background: darkBg, border: `1px solid ${t.gBorder}`, backdropFilter: "blur(20px)", borderRadius: 20, padding: 28, position: "relative", transition: "all .3s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = hoverBorder; e.currentTarget.style.boxShadow = `0 0 20px ${color}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.gBorder; e.currentTarget.style.boxShadow = "none"; }}>
                  <h3 style={{ fontSize: ".8rem", fontWeight: 500, color: t.accent, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Fira Code',monospace" }}>{g.category}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {g.items.map(sk => (
                      <span key={sk.name} className="stag" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 50, fontSize: ".88rem", background: t.inputBg, border: `1px solid ${t.inputB}`, color: t.muted, cursor: "default" }}>
                        {LangIcons[sk.icon] || <span style={{ width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>●</span>} {sk.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </Sec>

        <Sec id="projects">
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
            <h2 className="stitle" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "baseline", gap: "0.4ch", flexWrap: "wrap" }}>
              <SplitText text="Featured" tag="span" splitType="chars" delay={60} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} threshold={0.2} rootMargin="-80px" textAlign="left" />
              <SplitText text="Projects" tag="span" splitType="chars" delay={60} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} threshold={0.2} rootMargin="-80px" textAlign="left" />
            </h2>
            <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${t.accent},transparent)`, borderRadius: 2, marginBottom: 48 }} />
            <div className="pgrid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
              {PROJECTS.map((p, i) => (
                <div key={i} className="pcard glow-border" style={{ background: t.bgAlt, border: `2px solid ${t.gBorder}`, borderTop: `3px solid ${p.color}`, backdropFilter: "blur(20px)", borderRadius: 20, overflow: "hidden", position: "relative", transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.boxShadow = `0 0 30px ${p.color}40, inset 0 0 20px ${p.color}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.gBorder; e.currentTarget.style.boxShadow = "none"; }}>

                  <div style={{ padding: 32 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color, fontSize: ".85rem", fontWeight: 600, fontFamily: "'Fira Code',monospace" }}>0{i + 1}</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="proj-link"
                            style={{ color: p.color, borderColor: `${p.color}44`, background: `${p.color}10` }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${p.color}25`; e.currentTarget.style.borderColor = `${p.color}88`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = `${p.color}10`; e.currentTarget.style.borderColor = `${p.color}44`; e.currentTarget.style.transform = ""; }}
                          >
                            {I.gh} GitHub
                          </a>
                        )}
                        {p.demoLink && (
                          <a
                            href={p.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="proj-link"
                            style={{ color: t.accent, borderColor: `${t.accent}44`, background: `${t.accent}10` }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${t.accent}25`; e.currentTarget.style.borderColor = `${t.accent}88`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = `${t.accent}10`; e.currentTarget.style.borderColor = `${t.accent}44`; e.currentTarget.style.transform = ""; }}
                          >
                            {I.ext} {p.demoLink.includes("linkedin.com") ? "LinkedIn" : "Live Demo"}
                          </a>
                        )}
                        {!p.link && !p.demoLink && (
                          <span style={{ fontSize: ".78rem", color: t.faint, fontFamily: "'Fira Code',monospace", padding: "8px 0" }}>Private</span>
                        )}
                      </div>
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>{p.title}</h3>
                    <p style={{ fontSize: ".92rem", lineHeight: 1.7, color: t.faint, marginBottom: 20 }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.tech.map(tc => <span key={tc} style={{ padding: "4px 12px", borderRadius: 50, fontSize: ".78rem", background: `${p.color}10`, border: `1px solid ${p.color}25`, color: p.color, fontFamily: "'Fira Code',monospace" }}>{tc}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Sec>

        {false && <Sec id="timeline">
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
            <h2 className="stitle" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "baseline", gap: "0.4ch", flexWrap: "wrap" }}>
              <SplitText text="My" tag="span" splitType="chars" delay={60} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} threshold={0.2} rootMargin="-80px" textAlign="left" />
              <SplitText text="Journey" tag="span" splitType="chars" delay={60} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} threshold={0.2} rootMargin="-80px" textAlign="left" />
            </h2>
            <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${t.accent},transparent)`, borderRadius: 2, marginBottom: 48 }} />
            <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
              <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg,${t.accent},${t.accent}20)` }} />
              {TIMELINE.map((item, i) => {
                const timelineColors = ["#06b6d4", "#8b5cf6", "#f97316"];
                const color = timelineColors[i % timelineColors.length];
                return (
                <div key={i} style={{ display: "flex", gap: 32, marginBottom: 40, position: "relative" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, background: item.active ? `linear-gradient(135deg,${t.accent},${t.accent2})` : t.glass, border: item.active ? "none" : `2px solid ${t.gBorderS}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 600, color: item.active ? "#fff" : t.faint, fontFamily: "'Fira Code',monospace", zIndex: 1 }}>
                    {item.active ? "NOW" : `'${item.year.slice(-2)}`}
                  </div>
                  <div style={{ background: t.bgAlt, border: `2px solid ${t.gBorder}`, borderLeft: `4px solid ${color}`, backdropFilter: "blur(20px)", borderRadius: 16, padding: 24, flex: 1, transition: "all .3s", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.borderLeftColor = color; e.currentTarget.style.boxShadow = `0 0 25px ${color}40, inset 0 0 15px ${color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = t.gBorder; e.currentTarget.style.borderLeftColor = color; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ fontSize: ".78rem", color: t.accent, marginBottom: 6, fontFamily: "'Fira Code',monospace" }}>{item.year}</div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 4 }}>{item.title}</h3>
                    <div style={{ fontSize: ".88rem", color: t.faint, marginBottom: 8 }}>{item.place}</div>
                    <p style={{ fontSize: ".9rem", lineHeight: 1.65, color: t.muted }}>{item.desc}</p>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </Sec>}

        <Sec id="contact">
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px" }}>
            <h2 className="stitle" style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "baseline", gap: "0.4ch", flexWrap: "wrap" }}>
              <SplitText text="Get In" tag="span" splitType="chars" delay={60} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} threshold={0.2} rootMargin="-80px" textAlign="left" />
              <SplitText text="Touch" tag="span" splitType="chars" delay={60} duration={0.7} ease="power3.out" from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }} threshold={0.2} rootMargin="-80px" textAlign="left" />
            </h2>
            <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${t.accent},transparent)`, borderRadius: 2, marginBottom: 48 }} />
            <div className="cgrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <div>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: t.muted, marginBottom: 32 }}>I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing. Feel free to reach out!</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[{ icon: I.mail, l: "Email", v: PROFILE.email, modal: "email" }, { icon: I.phone, l: "Phone", v: PROFILE.phone, modal: "phone" }].map(c => (
                    <button key={c.l} onClick={() => { setCopied(false); setContactModal(c.modal); }}
                      style={{ display: "flex", alignItems: "center", gap: 16, background: "none", border: "none", cursor: "pointer", color: t.muted, transition: "color .3s", textAlign: "left", padding: 0, width: "100%" }}
                      onMouseEnter={e => e.currentTarget.style.color = t.accent} onMouseLeave={e => e.currentTarget.style.color = t.muted}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: t.inputBg, border: `1px solid ${t.inputB}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.icon}</div>
                      <div><div style={{ fontSize: ".78rem", color: t.faint, marginBottom: 2 }}>{c.l}</div><div style={{ fontSize: ".95rem" }}>{c.v}</div></div>
                    </button>
                  ))}
                  {[{ icon: I.gh, l: "GitHub", v: "aroshwijesinghe", h: PROFILE.github }, { icon: I.li, l: "LinkedIn", v: "Arosh Wijesinghe", h: PROFILE.linkedin }].map(c => (
                    <a key={c.l} href={c.h} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none", color: t.muted, transition: "color .3s" }}
                      onMouseEnter={e => e.currentTarget.style.color = t.accent} onMouseLeave={e => e.currentTarget.style.color = t.muted}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: t.inputBg, border: `1px solid ${t.inputB}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.icon}</div>
                      <div><div style={{ fontSize: ".78rem", color: t.faint, marginBottom: 2 }}>{c.l}</div><div style={{ fontSize: ".95rem" }}>{c.v}</div></div>
                    </a>
                  ))}
                </div>
              </div>
              <div style={{ background: `linear-gradient(135deg,${t.accent}08,${t.accent2}08)`, border: `2px solid ${t.accent}30`, borderTop: `3px solid ${t.accent}`, backdropFilter: "blur(24px)", borderRadius: 20, padding: 32, transition: "all .3s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.boxShadow = `0 0 25px ${t.accent}40, inset 0 0 15px ${t.accent}10`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${t.accent}30`; e.currentTarget.style.boxShadow = "none"; }}>
                {sent ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, textAlign: "center" }}>
                    <div style={{ fontSize: "3rem" }}>✅</div>
                    <p style={{ color: t.accent, fontWeight: 600, fontSize: "1.1rem" }}>Message sent!</p>
                    <p style={{ color: t.muted, fontSize: ".9rem" }}>Your email client opened. I'll get back to you soon.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        style={{ background: "rgba(0,0,0,.35)", border: `1px solid ${t.accent}30`, color: t.text }}
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        style={{ background: "rgba(0,0,0,.35)", border: `1px solid ${t.accent}30`, color: t.text }}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      style={{ background: "rgba(0,0,0,.35)", border: `1px solid ${t.accent}30`, color: t.text }}
                    />
                    <textarea
                      placeholder="Your Message..."
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ background: "rgba(0,0,0,.35)", border: `1px solid ${t.accent}30`, color: t.text }}
                    />
                    <button
                      className="btn-p"
                      style={{ alignSelf: "flex-start", opacity: sending ? .7 : 1 }}
                      onClick={handleSend}
                      disabled={sending}
                    >
                      {I.send} {sending ? "Opening..." : "Send Message"}
                    </button>
                    <p style={{ fontSize: ".75rem", color: t.faint, marginTop: -4 }}>
                      Sends to {CONTACT_EMAIL}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Sec>

        <footer style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${t.gBorder}`, padding: "32px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ fontSize: ".85rem", color: t.faint }}>© 2026 Arosh Nimantha Wijesinghe. Built with passion & AI.</div>
            <div style={{ display: "flex", gap: 20 }}>
              {[{ i: I.gh, h: PROFILE.github }, { i: I.li, h: PROFILE.linkedin }, { i: I.mail, h: `mailto:${PROFILE.email}` }].map((s, j) => (
                <a key={j} href={s.h} target="_blank" rel="noopener noreferrer" style={{ color: t.faint, transition: "color .3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = t.accent} onMouseLeave={e => e.currentTarget.style.color = t.faint}>{s.i}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
