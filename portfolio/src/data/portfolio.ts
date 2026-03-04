// ─── Types ───────────────────────────────────────────────────────────
type Locale = "es" | "en";

interface PersonalInfo {
  name: string;
  role: string;
  subtitle: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  summary: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  color: string;
  type: "employment" | "freelance";
  industry: string;
  stack: string[];
  icon: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  color: string;
}

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

interface Certification {
  year: string;
  institution: string;
  program: string;
}

// ─── Personal Data ───────────────────────────────────────────────────
const personalDataI18n: Record<Locale, PersonalInfo> = {
  es: {
    name: "Bruno Velasques",
    role: "Software Developer",
    subtitle: "UI/UX Designer",
    email: "brunoty000@gmail.com",
    phone: "+51 954 153 338",
    linkedin: "https://www.linkedin.com/in/bruno-velasques-software-developer/",
    github: "https://github.com/DazzleEaglePe",
    location: "Ica, Perú",
    summary:
      "Profesional desarrollador de software con más de 2 años de experiencia en el diseño y construcción de soluciones digitales orientadas al core del negocio, con énfasis en arquitecturas basadas en microservicios y desarrollo de aplicaciones web y móviles. Sólida experiencia en entornos Fintech y financieros, participando en la modernización de canales digitales y productos financieros.",
  },
  en: {
    name: "Bruno Velasques",
    role: "Software Developer",
    subtitle: "UI/UX Designer",
    email: "brunoty000@gmail.com",
    phone: "+51 954 153 338",
    linkedin: "https://www.linkedin.com/in/bruno-velasques-software-developer/",
    github: "https://github.com/DazzleEaglePe",
    location: "Ica, Peru",
    summary:
      "Professional software developer with over 2 years of experience designing and building business-core digital solutions, with emphasis on microservice-based architectures and web/mobile application development. Solid experience in Fintech and financial environments, contributing to the modernization of digital channels and financial products.",
  },
};

// ─── Experiences ─────────────────────────────────────────────────────
const experiencesI18n: Record<Locale, Experience[]> = {
  es: [
    {
      company: "Caja Ica",
      role: "Software Developer",
      period: "Mayo 2025 – Actualidad",
      description:
        "Institución microfinanciera líder en el sur del Perú con más de 35 años de trayectoria, enfocada en la inclusión financiera y modernización tecnológica.",
      achievements: [
        "Diseñé e implementé el primer módulo de seguros digitales integrando La Positiva en el Homebanking → +10K clientes",
        "Lideré la migración e integración del producto Plazo Fijo a App Android, iOS y Homebanking → +50 afiliaciones en el primer mes",
      ],
      color: "accent",
      type: "employment",
      industry: "Fintech · Microfinanzas",
      stack: ["Java", "Spring Boot", "Angular", "React", "TypeScript", "SQL Server", "Microservicios"],
      icon: "🏦",
    },
    {
      company: "ECA - Estudio Contable Alvarez",
      role: "Desarrollador Full Stack · Consultor IT",
      period: "Junio 2025 – Actualidad",
      description:
        "Estudio contable con más de 1,000 comercios atendidos, especializado en soluciones contables, financieras y tributarias.",
      achievements: [
        "Desarrollé un sistema de atención automatizada con chatbot IA → automatización del 90%",
        "Centralicé el sistema contable CONCAR para 15 usuarios simultáneos → reducción del 40-50% en costos operativos",
      ],
      color: "accent-indigo",
      type: "freelance",
      industry: "Contabilidad · Finanzas",
      stack: ["Node.js", "n8n", "WhatsApp API", "Meta API", "SQL Server"],
      icon: "📊",
    },
    {
      company: "Tecsam Consulting",
      role: "Community Manager · UX/UI · Web Dev",
      period: "Enero 2025 – Abril 2025",
      description:
        "Consultora especializada en Seguridad y Salud en el Trabajo (SST), Salud Ocupacional y Medio Ambiente.",
      achievements: [
        "Rediseñé y optimicé el sitio web corporativo → +45% tiempo de permanencia",
        "Gestioné redes sociales corporativas → +60% en engagement en 3 meses",
        "Desarrollé contenido audiovisual (reels) → +10K visualizaciones orgánicas",
      ],
      color: "accent-emerald",
      type: "freelance",
      industry: "Seguridad y Salud en el Trabajo",
      stack: ["Angular", "Tailwind CSS", "Figma", "Google Ads", "Meta Ads"],
      icon: "🏢",
    },
    {
      company: "ETP - Escuelas Técnicas del Perú",
      role: "Frontend Developer",
      period: "Enero 2024 – Agosto 2024",
      description: "Institución educativa técnica con programas presenciales y virtuales.",
      achievements: [
        "Rediseñé la Home Page y lideré la creación del aula virtual completa (cursos, cronogramas, calificaciones, certificados)",
      ],
      color: "accent-rose",
      type: "freelance",
      industry: "Educación Técnica",
      stack: ["Angular", "Tailwind CSS", "Figma", "JavaScript"],
      icon: "🎓",
    },
    {
      company: "DecData",
      role: "Frontend Developer",
      period: "2025",
      description:
        "Empresa de soluciones tecnológicas corporativas enfocada en la venta de hardware y software.",
      achievements: [
        "Desarrollé la plataforma E-Commerce B2B con arquitectura de 'Islas Interactivas' para SEO extremo y tiempos de carga instantáneos",
        "Implementé carrito de compras persistente, buscador dinámico en tiempo real y UI/UX atómico",
      ],
      color: "accent-indigo",
      type: "freelance",
      industry: "E-Commerce · Tecnología",
      stack: ["Astro", "React", "Tailwind CSS", "TypeScript", "Nanostores"],
      icon: "🛒",
    },
    {
      company: "Onco Oral",
      role: "Frontend Developer · SEO",
      period: "2025",
      description:
        "Clínica especializada en oncología oral y maxilofacial.",
      achievements: [
        "Desarrollé la landing page con Performance 98/100 en PageSpeed, imágenes AVIF/WebP y preloads dinámicos",
        "Optimización SEO completa con posicionamiento orgánico en buscadores",
      ],
      color: "accent-rose",
      type: "freelance",
      industry: "Salud · Oncología",
      stack: ["Astro", "Tailwind CSS", "Netlify", "SEO"],
      icon: "🏥",
    },
  ],
  en: [
    {
      company: "Caja Ica",
      role: "Software Developer",
      period: "May 2025 – Present",
      description:
        "Leading microfinance institution in southern Peru with over 35 years of trajectory, focused on financial inclusion and technological modernization.",
      achievements: [
        "Designed and implemented the first digital insurance module integrating La Positiva into Homebanking → +10K clients",
        "Led the migration and integration of Fixed-Term Deposits to Android, iOS, and Homebanking → +50 sign-ups in the first month",
      ],
      color: "accent",
      type: "employment",
      industry: "Fintech · Microfinance",
      stack: ["Java", "Spring Boot", "Angular", "React", "TypeScript", "SQL Server", "Microservices"],
      icon: "🏦",
    },
    {
      company: "ECA - Alvarez Accounting Firm",
      role: "Full Stack Developer · IT Consultant",
      period: "June 2025 – Present",
      description:
        "Accounting firm serving over 1,000 businesses, specialized in accounting, financial, and tax solutions.",
      achievements: [
        "Developed an automated customer service system using AI chatbot → 90% automation",
        "Centralized the CONCAR accounting system for 15 concurrent users → 40-50% reduction in operational costs",
      ],
      color: "accent-indigo",
      type: "freelance",
      industry: "Accounting · Finance",
      stack: ["Node.js", "n8n", "WhatsApp API", "Meta API", "SQL Server"],
      icon: "📊",
    },
    {
      company: "Tecsam Consulting",
      role: "Community Manager · UX/UI · Web Dev",
      period: "January 2025 – April 2025",
      description:
        "Consulting firm specialized in Occupational Health & Safety (OHS) and Environmental Management.",
      achievements: [
        "Redesigned and optimized corporate website → +45% session duration",
        "Managed corporate social media → +60% engagement in 3 months",
        "Developed audiovisual content (reels) → +10K organic views",
      ],
      color: "accent-emerald",
      type: "freelance",
      industry: "Occupational Health & Safety",
      stack: ["Angular", "Tailwind CSS", "Figma", "Google Ads", "Meta Ads"],
      icon: "🏢",
    },
    {
      company: "ETP - Technical Schools of Peru",
      role: "Frontend Developer",
      period: "January 2024 – August 2024",
      description: "Technical education institution with in-person and online programs.",
      achievements: [
        "Redesigned the Home Page and led the complete creation of the virtual classroom (courses, schedules, grades, certificates)",
      ],
      color: "accent-rose",
      type: "freelance",
      industry: "Technical Education",
      stack: ["Angular", "Tailwind CSS", "Figma", "JavaScript"],
      icon: "🎓",
    },
    {
      company: "DecData",
      role: "Frontend Developer",
      period: "2025",
      description:
        "Corporate technology solutions company focused on hardware and software sales.",
      achievements: [
        "Developed the B2B E-Commerce platform with 'Interactive Islands' architecture for extreme SEO and instant load times",
        "Implemented persistent shopping cart, real-time dynamic search, and atomic UI/UX",
      ],
      color: "accent-indigo",
      type: "freelance",
      industry: "E-Commerce · Technology",
      stack: ["Astro", "React", "Tailwind CSS", "TypeScript", "Nanostores"],
      icon: "🛒",
    },
    {
      company: "Onco Oral",
      role: "Frontend Developer · SEO",
      period: "2025",
      description:
        "Clinic specialized in oral and maxillofacial oncology.",
      achievements: [
        "Developed the landing page with PageSpeed Performance 98/100, AVIF/WebP images, and dynamic preloads",
        "Complete SEO optimization with organic search engine positioning",
      ],
      color: "accent-rose",
      type: "freelance",
      industry: "Healthcare · Oncology",
      stack: ["Astro", "Tailwind CSS", "Netlify", "SEO"],
      icon: "🏥",
    },
  ],
};

// ─── Education ───────────────────────────────────────────────────────
const educationI18n: Record<Locale, EducationItem[]> = {
  es: [
    { degree: "Ing. de Sistemas", institution: "USJB", period: "2021 — 2025" },
    { degree: "Java 17 Backend", institution: "CIBERTEC", period: "2025" },
  ],
  en: [
    { degree: "Systems Engineering", institution: "USJB", period: "2021 — 2025" },
    { degree: "Java 17 Backend", institution: "CIBERTEC", period: "2025" },
  ],
};

// ─── Projects ────────────────────────────────────────────────────────
const projectsI18n: Record<Locale, Project[]> = {
  es: [
    {
      title: "Plataforma E-Commerce B2B – Decdata",
      description:
        "E-Commerce corporativo y catálogo de ventas tecnológicas de alto rendimiento. Construido con arquitectura de 'Islas Interactivas' para SEO extremo y tiempos de carga instantáneos. Incluye carrito de compras persistente, buscador dinámico en tiempo real y UI/UX atómico.",
      tags: ["Astro", "React", "Tailwind CSS", "TypeScript", "Nanostores"],
      link: "https://decdata.com.pe/",
      color: "accent-indigo",
    },
    {
      title: "Sistema POS – Gestión de Ventas",
      description:
        "Plataforma SaaS Multi-tenant para gestión integral de negocios retail: ventas en tiempo real, control de inventario multi-almacén, dashboards con KPIs.",
      tags: ["React 18", "Vite", "Supabase", "Zustand", "Ant Design"],
      color: "accent",
    },
    {
      title: "Onco Oral — Landing Médica",
      description:
        "Landing page optimizada para clínica de oncología oral. Performance 98/100 en PageSpeed, imágenes AVIF/WebP, preloads dinámicos.",
      tags: ["Astro", "Tailwind CSS", "Netlify", "SEO"],
      link: "https://oncooral.com/",
      color: "accent-indigo",
    },
    {
      title: "Chatbot IA — Atención Automatizada",
      description:
        "Sistema de atención al cliente mediante chatbot con IA. Automatización del 90% de consultas, derivación inteligente de leads.",
      tags: ["n8n", "WhatsApp API", "Chatwoot", "AI"],
      link: "https://crm.ecabot.site/app/login",
      color: "accent-emerald",
    },
    {
      title: "Facturación Electrónica SUNAT",
      description:
        "Sistema modular de facturación electrónica en PHP y MySQL, compatible con los estándares de SUNAT. Firma XML, PDFs con código QR.",
      tags: ["PHP", "MySQL", "JavaScript", "XML"],
      link: "https://github.com/DazzleEaglePe/sistema-facturacion-sunat-php",
      color: "accent-rose",
    },
  ],
  en: [
    {
      title: "B2B E-Commerce Platform – Decdata",
      description:
        "Corporate e-commerce and high-performance technology sales catalog. Built with 'Interactive Islands' architecture for extreme SEO and instant load times. Includes persistent shopping cart, real-time dynamic search, and atomic UI/UX.",
      tags: ["Astro", "React", "Tailwind CSS", "TypeScript", "Nanostores"],
      link: "https://decdata.com.pe/",
      color: "accent-indigo",
    },
    {
      title: "POS System – Sales Management",
      description:
        "Multi-tenant SaaS platform for comprehensive retail business management: real-time sales, multi-warehouse inventory control, KPI dashboards.",
      tags: ["React 18", "Vite", "Supabase", "Zustand", "Ant Design"],
      color: "accent",
    },
    {
      title: "Onco Oral — Medical Landing Page",
      description:
        "Optimized landing page for an oral oncology clinic. PageSpeed score 98/100, AVIF/WebP images, dynamic preloads.",
      tags: ["Astro", "Tailwind CSS", "Netlify", "SEO"],
      link: "https://oncooral.com/",
      color: "accent-indigo",
    },
    {
      title: "AI Chatbot — Automated Support",
      description:
        "AI-powered customer support chatbot system. 90% of inquiries automated, intelligent lead routing.",
      tags: ["n8n", "WhatsApp API", "Chatwoot", "AI"],
      color: "accent-emerald",
    },
    {
      title: "E-Invoicing System (SUNAT)",
      description:
        "Modular electronic invoicing system built with PHP & MySQL, compliant with SUNAT standards. XML signing, QR-coded PDFs.",
      tags: ["PHP", "MySQL", "JavaScript", "XML"],
      link: "https://github.com/DazzleEaglePe/sistema-facturacion-sunat-php",
      color: "accent-rose",
    },
  ],
};

// ─── Certifications ──────────────────────────────────────────────────
export const certifications: Certification[] = [
  { year: "2025", institution: "CIBERTEC", program: "Java 17 Back-End Developer" },
  { year: "2025", institution: "CertiProf", program: "Scrum Foundation Professional (SFPC)" },
  { year: "2025", institution: "CETI", program: "Facturación Electrónica" },
  { year: "2024", institution: "Netzun", program: "Photoshop Avanzado · Diseño UX" },
  { year: "2021", institution: "Cisco", program: "IT Essentials: PC Hardware & Software" },
];

// ─── Tech Stack (language-neutral) ───────────────────────────────────
export const techStack = {
  Lenguajes: [
    { name: "Java", color: "#f87171" },
    { name: "JavaScript", color: "#fbbf24" },
    { name: "TypeScript", color: "#38bdf8" },
    { name: "Python", color: "#34d399" },
    { name: "PHP", color: "#818cf8" },
    { name: "C#", color: "#34d399" },
  ],
  Frontend: [
    { name: "React", color: "#38bdf8" },
    { name: "Angular", color: "#f87171" },
    { name: "Next.js", color: "#e2e8f0" },
    { name: "Astro", color: "#818cf8" },
    { name: "Tailwind CSS", color: "#38bdf8" },
  ],
  Backend: [
    { name: "Spring Boot", color: "#34d399" },
    { name: "Node.js", color: "#34d399" },
  ],
  "Bases de Datos": [
    { name: "PostgreSQL", color: "#818cf8" },
    { name: "SQL Server", color: "#f87171" },
    { name: "MySQL", color: "#38bdf8" },
    { name: "MongoDB", color: "#34d399" },
    { name: "Redis", color: "#f87171" },
  ],
  "Cloud & DevOps": [
    { name: "AWS", color: "#fbbf24" },
    { name: "Docker", color: "#38bdf8" },
    { name: "Jenkins", color: "#e2e8f0" },
    { name: "Git", color: "#f87171" },
  ],
  "UX/UI & Diseño": [
    { name: "Figma", color: "#f87171" },
    { name: "Webflow", color: "#38bdf8" },
    { name: "Framer", color: "#818cf8" },
    { name: "Photoshop", color: "#38bdf8" },
    { name: "Illustrator", color: "#fbbf24" },
    { name: "Premiere", color: "#818cf8" },
  ],
  "Automatización & IA": [
    { name: "n8n", color: "#ea4b71" },
    { name: "Chatwoot", color: "#1f93ff" },
    { name: "WhatsApp API", color: "#25d366" },
    { name: "OpenAI", color: "#10a37f" },
    { name: "Twilio", color: "#f22f46" },
    { name: "Make", color: "#6d00cc" },
  ],
};

// ─── Nav Links (now unused by Navbar, kept for reference) ────────────
export const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Experiencia", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

// ─── Public Getters (locale-aware) ───────────────────────────────────
export function getPersonalData(locale: Locale): PersonalInfo {
  return personalDataI18n[locale];
}

export function getExperiences(locale: Locale): Experience[] {
  return experiencesI18n[locale];
}

export function getProjects(locale: Locale): Project[] {
  return projectsI18n[locale];
}

export function getEducation(locale: Locale): EducationItem[] {
  return educationI18n[locale];
}

// Legacy default export for backwards compat (Spanish)
export const personalData = personalDataI18n.es;
export const experiences = experiencesI18n.es;
export const projects = projectsI18n.es;
export const education = educationI18n.es;
