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
    role: "Desarrollador de Software Full Stack",
    subtitle: "Fintech · Arquitectura Cloud · IA Aplicada",
    email: "brunoty000@gmail.com",
    phone: "+51 954 153 338",
    linkedin: "https://www.linkedin.com/in/bruno-velasques-software-developer/",
    github: "https://github.com/DazzleEaglePe",
    location: "Ica, Perú",
    summary:
      "Desarrollador de software Full Stack con más de 3 años creando soluciones end-to-end para banca, SaaS y productos digitales. Trabajo desde la arquitectura y el backend hasta la experiencia de usuario, llevando sistemas a producción para más de 10,000 clientes y automatizando operaciones con resultados medibles.",
  },
  en: {
    name: "Bruno Velasques",
    role: "Full Stack Software Developer",
    subtitle: "Fintech · Cloud Architecture · Applied AI",
    email: "brunoty000@gmail.com",
    phone: "+51 954 153 338",
    linkedin: "https://www.linkedin.com/in/bruno-velasques-software-developer/",
    github: "https://github.com/DazzleEaglePe",
    location: "Ica, Peru",
    summary:
      "Full Stack software developer with over 3 years of experience building end-to-end solutions for banking, SaaS, and digital products. I work from architecture and backend through user experience, shipping production systems for more than 10,000 clients and automating operations with measurable results.",
  },
};

// ─── Experiences ─────────────────────────────────────────────────────
const experiencesI18n: Record<Locale, Experience[]> = {
  es: [
    {
      company: "Caja Ica",
      role: "Desarrollador de Software Full Stack",
      period: "Mayo 2025 – Actualidad",
      description:
        "Desarrollo de productos financieros end-to-end sobre arquitectura de microservicios para una institución microfinanciera con más de 10,000 clientes.",
      achievements: [
        "Diseñé e implementé el módulo SOAT para Homebanking, integrando más de 10 endpoints REST con JWT, cifrado RSA, validación OTP y Spring Security.",
        "Desarrollé los productos Plazo Fijo y apertura digital de Cuenta Flexitotal, reduciendo en 30% las visitas presenciales a ventanilla.",
        "Integré pruebas con JUnit, Mockito, Jasmine y Karma al flujo de desarrollo y participé activamente en code reviews.",
        "Trabajé con Docker, OpenShift y pipelines de integración continua en Jenkins bajo metodología Scrum.",
      ],
      color: "accent",
      type: "employment",
      industry: "Fintech · Microfinanzas",
      stack: ["Java 17", "Spring Boot", "Angular", "TypeScript", "SQL Server", "Microservicios", "JUnit", "Docker", "OpenShift", "Jenkins"],
      icon: "🏦",
    },
    {
      company: "EDU-US · EDU-MENTOR",
      role: "Tech Lead Voluntario",
      period: "Enero 2026 – Actualidad",
      description:
        "Liderazgo técnico de una plataforma de empleabilidad juvenil desarrollada en paralelo con un equipo voluntario.",
      achievements: [
        "Diseñé la arquitectura como monolito modular en NestJS, el modelo de datos con Prisma sobre PostgreSQL y la API REST.",
        "Definí una hoja de ruta de 14 hitos y la estrategia de despliegue e infraestructura con Docker, Nginx y VPS.",
      ],
      color: "accent-emerald",
      type: "employment",
      industry: "Educación · Empleabilidad",
      stack: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Clean Architecture", "Docker", "Nginx"],
      icon: "🧭",
    },
    {
      company: "ECA Soluciones Empresariales",
      role: "Consultor IT · Desarrollo Full Stack e Infraestructura Cloud",
      period: "Enero 2025 – Actualidad",
      description:
        "Consultoría de software, arquitectura SaaS e infraestructura cloud para operaciones contables y empresariales.",
      achievements: [
        "Diseñé una plataforma SaaS multi-tenant con NestJS, PostgreSQL, Redis y BullMQ, documentada en 12 documentos técnicos.",
        "Implementé un servicio que procesa cerca de 100 solicitudes semanales y resuelve el 90% de forma autónoma.",
        "Centralicé el sistema contable en 3 servidores para 13 usuarios simultáneos, reduciendo entre 40% y 50% los costos operativos.",
        "Gestioné despliegues cloud, Docker, Nginx, VPN Tailscale y monitoreo de disponibilidad de servicios.",
      ],
      color: "accent-indigo",
      type: "freelance",
      industry: "SaaS · Cloud · Consultoría",
      stack: ["NestJS", "Node.js", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "Docker", "Nginx", "SQL Server 2022", "Vercel"],
      icon: "📊",
    },
    {
      company: "Tecsam Consulting",
      role: "Web Developer · UX/UI Designer",
      period: "Enero 2023 – Abril 2024",
      description:
        "Consultora especializada en Seguridad y Salud en el Trabajo (SST), Salud Ocupacional y Medio Ambiente.",
      achievements: [
        "Rediseñé el sitio web corporativo, logrando un aumento del 45% en permanencia del usuario.",
        "Gestioné canales digitales con un incremento del 60% en engagement durante 3 meses.",
      ],
      color: "accent-emerald",
      type: "freelance",
      industry: "Seguridad y Salud en el Trabajo",
      stack: ["HTML5", "CSS3", "JavaScript", "Figma", "Diseño UX/UI"],
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
      period: "2025 – 2026",
      description:
        "Clínica especializada en oncología oral y maxilofacial.",
      achievements: [
        "Desarrollé una landing page con Astro y Tailwind CSS: 98/100 en PageSpeed y carga menor a 1 segundo.",
        "Logré posicionamiento orgánico desde la primera semana mediante optimización SEO técnica.",
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
      role: "Full Stack Software Developer",
      period: "May 2025 – Present",
      description:
        "End-to-end financial product development on a microservices architecture for a microfinance institution serving more than 10,000 clients.",
      achievements: [
        "Designed and implemented the Homebanking SOAT module, integrating more than 10 REST endpoints with JWT, RSA encryption, OTP validation, and Spring Security.",
        "Built Fixed-Term Deposit and digital Flexitotal Account products, reducing in-branch visits by 30%.",
        "Integrated JUnit, Mockito, Jasmine, and Karma testing into the development flow and actively participated in code reviews.",
        "Worked with Docker, OpenShift, and Jenkins continuous integration pipelines under Scrum.",
      ],
      color: "accent",
      type: "employment",
      industry: "Fintech · Microfinance",
      stack: ["Java 17", "Spring Boot", "Angular", "TypeScript", "SQL Server", "Microservices", "JUnit", "Docker", "OpenShift", "Jenkins"],
      icon: "🏦",
    },
    {
      company: "EDU-US · EDU-MENTOR",
      role: "Volunteer Tech Lead",
      period: "January 2026 – Present",
      description:
        "Technical leadership for a youth employability platform built in parallel with a volunteer team.",
      achievements: [
        "Designed a modular monolith architecture in NestJS, the Prisma data model on PostgreSQL, and the complete REST API.",
        "Defined a 14-milestone technical roadmap and the deployment strategy with Docker, Nginx, and VPS infrastructure.",
      ],
      color: "accent-emerald",
      type: "employment",
      industry: "Education · Employability",
      stack: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Clean Architecture", "Docker", "Nginx"],
      icon: "🧭",
    },
    {
      company: "ECA Business Solutions",
      role: "IT Consultant · Full Stack Development & Cloud Infrastructure",
      period: "January 2025 – Present",
      description:
        "Software consulting, SaaS architecture, and cloud infrastructure for accounting and business operations.",
      achievements: [
        "Designed a multi-tenant SaaS platform with NestJS, PostgreSQL, Redis, and BullMQ, documented across 12 technical documents.",
        "Implemented a service processing around 100 weekly requests and resolving 90% autonomously.",
        "Centralized the accounting system across 3 servers for 13 concurrent users, reducing operating costs by 40-50%.",
        "Managed cloud deployments, Docker, Nginx, Tailscale VPN, and service availability monitoring.",
      ],
      color: "accent-indigo",
      type: "freelance",
      industry: "SaaS · Cloud · Consulting",
      stack: ["NestJS", "Node.js", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "Docker", "Nginx", "SQL Server 2022", "Vercel"],
      icon: "📊",
    },
    {
      company: "Tecsam Consulting",
      role: "Web Developer · UX/UI Designer",
      period: "January 2023 – April 2024",
      description:
        "Consulting firm specialized in Occupational Health & Safety (OHS) and Environmental Management.",
      achievements: [
        "Redesigned the corporate website, increasing user session duration by 45%.",
        "Managed digital channels and increased engagement by 60% over 3 months.",
      ],
      color: "accent-emerald",
      type: "freelance",
      industry: "Occupational Health & Safety",
      stack: ["HTML5", "CSS3", "JavaScript", "Figma", "UX/UI Design"],
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
      period: "2025 – 2026",
      description:
        "Clinic specialized in oral and maxillofacial oncology.",
      achievements: [
        "Built an Astro and Tailwind CSS landing page scoring 98/100 on PageSpeed with sub-second load times.",
        "Achieved organic search positioning from the first week through technical SEO optimization.",
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
    { degree: "Ingeniería de Sistemas · Egresado", institution: "USJB · Bachiller en trámite", period: "2021 — 2025" },
    { degree: "Java 17 Backend", institution: "CIBERTEC", period: "2025" },
  ],
  en: [
    { degree: "Systems Engineering · Graduate", institution: "USJB · Bachelor's degree in progress", period: "2021 — 2025" },
    { degree: "Java 17 Backend", institution: "CIBERTEC", period: "2025" },
  ],
};

// ─── Projects ────────────────────────────────────────────────────────
const projectsI18n: Record<Locale, Project[]> = {
  es: [
    {
      title: "Agente Financiero Multi-Agente (LangGraph)",
      description:
        "Orquestador conversacional inteligente para simulación de créditos y admisión automatizada de clientes de Caja Ica. Desarrollado con LangGraph, FastAPI, Docker y telemetría en LangSmith, incorporando un Compliance Officer (LLM-as-a-Judge) para mitigar la fuga de datos sensibles.",
      tags: ["LangGraph", "FastAPI", "Docker", "LangSmith", "Python"],
      link: "https://github.com/DazzleEaglePe/agente-financiero-langgraph",
      color: "accent",
    },
    {
      title: "RAG Corporativo y Reranking en Azure",
      description:
        "Pipeline RAG empresarial alineado a los estándares de la certificación AI-103. Implementa búsquedas híbridas (BM25 + vectores) y reordenamiento semántico avanzado (Semantic Reranker) utilizando Azure AI Search y Azure OpenAI para consultar normativas de la SBS y SUNAT.",
      tags: ["Azure AI Search", "Azure OpenAI", "Python", "RAG"],
      link: "https://github.com/DazzleEaglePe/azure-search-openai-rag",
      color: "accent-indigo",
    },
    {
      title: "Conector para Microsoft Copilot Studio",
      description:
        "Microservicio REST API diseñado en FastAPI que expone los motores de cálculo financiero de Caja Ica. Estructurado bajo especificaciones OpenAPI para su integración directa y sin código (Low-Code) en Copilot Studio y Power Platform.",
      tags: ["FastAPI", "OpenAPI", "Copilot Studio", "Power Platform"],
      link: "https://github.com/DazzleEaglePe/copilot-custom-connector",
      color: "accent-emerald",
    },
    {
      title: "Asistente RAG con LlamaIndex + ChromaDB",
      description:
        "Sistema de Retrieval-Augmented Generation en Python para indexar documentos con embeddings y responder consultas en lenguaje natural mediante una base vectorial y APIs de modelos de lenguaje.",
      tags: ["Python", "LlamaIndex", "ChromaDB", "OpenAI API"],
      link: "https://github.com/DazzleEaglePe/advanced-rag-orchestrator",
      color: "accent-rose",
    },
    {
      title: "ECA Monitor – Auditoría RDP",
      description:
        "Sistema avanzado de auditoría remota. Despliega agentes ultraligeros en servidores Windows para transmitir pantallas en vivo, métricas de hardware y logs de sesiones directo a un dashboard web usando WebSockets de latencia cero.",
      tags: ["Next.js", "Express", "Socket.io", "C#"],
      image: "/images/eca-monitor-dashboard.png",
      color: "accent-emerald",
    },
    {
      title: "Plataforma E-Commerce B2B – Decdata",
      description:
        "E-Commerce corporativo y catálogo de ventas tecnológicas de alto rendimiento. Construido con arquitectura de 'Islas Interactivas' para SEO extremo y tiempos de carga instantáneos. Incluye carrito de compras persistente, buscador dinámico en tiempo real y UI/UX atómico.",
      tags: ["Astro", "React", "Tailwind CSS", "TypeScript", "Nanostores"],
      link: "https://decdata.com.pe/",
      image: "/images/decdata-ecommerce-b2b.png",
      color: "accent-indigo",
    },
    {
      title: "Sistema POS – Gestión de Ventas",
      description:
        "SaaS multi-tenant con más de 100 componentes y 20 tablas PostgreSQL. Incluye Row Level Security, roles y permisos granulares, estado con TanStack Query y dashboards de KPIs.",
      tags: ["React 18", "TypeScript", "PostgreSQL", "Supabase", "TanStack Query"],
      color: "accent",
    },
    {
      title: "ProofPath — ETH Lima 2026",
      description:
        "Plataforma de credenciales verificables construida en un equipo de 4 personas para el track Arbitrum: backend en NestJS, contratos Solidity verificados con árboles de Merkle y aplicación móvil en SwiftUI.",
      tags: ["NestJS", "TypeScript", "Solidity", "Arbitrum", "SwiftUI"],
      color: "accent-indigo",
    },
    {
      title: "Onco Oral — Landing Médica",
      description:
        "Landing page optimizada para clínica de oncología oral. Performance 98/100 en PageSpeed, imágenes AVIF/WebP, preloads dinámicos.",
      tags: ["Astro", "Tailwind CSS", "Netlify", "SEO"],
      link: "https://oncooral.com/",
      image: "/images/landing-oncooral.png",
      color: "accent-indigo",
    },
    {
      title: "Chatbot IA — Atención Automatizada",
      description:
        "Sistema de atención al cliente mediante chatbot con IA. Automatización del 90% de consultas, derivación inteligente de leads.",
      tags: ["n8n", "WhatsApp API", "Chatwoot", "AI"],
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
      title: "Multi-Agent Financial Advisor (LangGraph)",
      description:
        "Intelligent conversational orchestrator for credit simulation and automated customer admission at Caja Ica. Developed using LangGraph, FastAPI, Docker, and LangSmith tracing, featuring a built-in Compliance Officer (LLM-as-a-Judge) for sensitive data masking.",
      tags: ["LangGraph", "FastAPI", "Docker", "LangSmith", "Python"],
      link: "https://github.com/DazzleEaglePe/agente-financiero-langgraph",
      color: "accent",
    },
    {
      title: "Corporate RAG and Reranking on Azure",
      description:
        "Enterprise RAG pipeline aligned with Microsoft AI-103 certification standards. Implements hybrid search (BM25 + vectors) and semantic reranking using Azure AI Search and Azure OpenAI to query SBS/SUNAT regulations.",
      tags: ["Azure AI Search", "Azure OpenAI", "Python", "RAG"],
      link: "https://github.com/DazzleEaglePe/azure-search-openai-rag",
      color: "accent-indigo",
    },
    {
      title: "Microsoft Copilot Studio Custom Connector",
      description:
        "FastAPI-based REST API microservice exposing Caja Ica's financial calculation engines. Structured under OpenAPI specifications for direct, no-code integration into Microsoft Copilot Studio and Power Platform.",
      tags: ["FastAPI", "OpenAPI", "Copilot Studio", "Power Platform"],
      link: "https://github.com/DazzleEaglePe/copilot-custom-connector",
      color: "accent-emerald",
    },
    {
      title: "RAG Assistant with LlamaIndex + ChromaDB",
      description:
        "Retrieval-Augmented Generation system built in Python to index documents with embeddings and answer natural-language queries using a vector database and language model APIs.",
      tags: ["Python", "LlamaIndex", "ChromaDB", "OpenAI API"],
      link: "https://github.com/DazzleEaglePe/advanced-rag-orchestrator",
      color: "accent-rose",
    },
    {
      title: "ECA Monitor – RDP Audit",
      description:
        "Advanced remote auditing system. Deploys ultra-lightweight agents on Windows servers to stream live screens, hardware metrics, and session logs directly to a web dashboard using zero-latency WebSockets.",
      tags: ["Next.js", "Express", "Socket.io", "C#"],
      image: "/images/eca-monitor-dashboard.png",
      color: "accent-emerald",
    },
    {
      title: "B2B E-Commerce Platform – Decdata",
      description:
        "Corporate e-commerce and high-performance technology sales catalog. Built with 'Interactive Islands' architecture for extreme SEO and instant load times. Includes persistent shopping cart, real-time dynamic search, and atomic UI/UX.",
      tags: ["Astro", "React", "Tailwind CSS", "TypeScript", "Nanostores"],
      link: "https://decdata.com.pe/",
      image: "/images/decdata-ecommerce-b2b.png",
      color: "accent-indigo",
    },
    {
      title: "POS System – Sales Management",
      description:
        "Multi-tenant SaaS with more than 100 components and 20 PostgreSQL tables. Includes Row Level Security, granular roles and permissions, TanStack Query state, and KPI dashboards.",
      tags: ["React 18", "TypeScript", "PostgreSQL", "Supabase", "TanStack Query"],
      color: "accent",
    },
    {
      title: "ProofPath — ETH Lima 2026",
      description:
        "Verifiable credentials platform built by a 4-person team for the Arbitrum track: NestJS backend, Solidity contracts verified with Merkle trees, and a SwiftUI mobile app.",
      tags: ["NestJS", "TypeScript", "Solidity", "Arbitrum", "SwiftUI"],
      color: "accent-indigo",
    },
    {
      title: "Onco Oral — Medical Landing Page",
      description:
        "Optimized landing page for an oral oncology clinic. PageSpeed score 98/100, AVIF/WebP images, dynamic preloads.",
      tags: ["Astro", "Tailwind CSS", "Netlify", "SEO"],
      link: "https://oncooral.com/",
      image: "/images/landing-oncooral.png",
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
  { year: "2024", institution: "Netzun", program: "Diseño UX · Especialización" },
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
    { name: "TanStack Query", color: "#f87171" },
  ],
  Backend: [
    { name: "Spring Boot", color: "#34d399" },
    { name: "Node.js", color: "#34d399" },
    { name: "NestJS", color: "#f87171" },
    { name: "Express", color: "#e2e8f0" },
    { name: "Prisma", color: "#818cf8" },
  ],
  "Bases de Datos": [
    { name: "PostgreSQL", color: "#818cf8" },
    { name: "SQL Server", color: "#f87171" },
    { name: "MySQL", color: "#38bdf8" },
    { name: "MongoDB", color: "#34d399" },
    { name: "Redis", color: "#f87171" },
    { name: "Supabase", color: "#34d399" },
  ],
  "Cloud & DevOps": [
    { name: "AWS", color: "#fbbf24" },
    { name: "Docker", color: "#38bdf8" },
    { name: "Jenkins", color: "#e2e8f0" },
    { name: "OpenShift", color: "#f87171" },
    { name: "GitHub Actions", color: "#e2e8f0" },
    { name: "Nginx", color: "#34d399" },
    { name: "Vercel", color: "#e2e8f0" },
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
    { name: "LangGraph", color: "#fbbf24" },
    { name: "LlamaIndex", color: "#ea4b71" },
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
