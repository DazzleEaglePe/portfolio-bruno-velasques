"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Locale = "es" | "en";

const translations = {
    es: {
        // Navbar
        "nav.about": "Sobre mí",
        "nav.experience": "Experiencia",
        "nav.stack": "Stack",
        "nav.projects": "Proyectos",
        "nav.contact": "Contacto",
        // Hero
        "hero.greeting": "Hola, soy",
        "hero.subtitle": "transformando ideas en productos digitales que escalan.",
        "hero.cta1": "Ver Proyectos",
        // About
        "about.title": "Sobre Mí",
        "about.location": "📍 Ica, Perú",
        "about.exp": "+2 años exp.",
        "about.focus": "Fintech",
        "about.scrum": "Scrum",
        // LinkedIn card
        "linkedin.cta": "Conectemos",
        // Experience
        "exp.title": "Experiencia",
        "exp.employment": "Experiencia Profesional",
        "exp.freelance": "Proyectos Freelance",
        "exp.showMore": "Ver más proyectos",
        "exp.showLess": "Ver menos",
        // Education
        "edu.title": "Formación",
        "cert.title": "Certificaciones",
        // Stack / Skills
        "stack.title": "Stack Tecnológico",
        "skills.heading": "Mis Habilidades y Desarrollo",
        "skills.backend.title": "Backend & APIs",
        "skills.backend.desc": "Desarrollo de microservicios robustos y arquitecturas escalables enfocadas en el sector Fintech.",
        "skills.cloud.title": "Cloud & Arquitectura",
        "skills.cloud.desc": "Despliegue y gestión de infraestructura en la nube garantizando alta disponibilidad.",
        "skills.db.title": "Bases de Datos",
        "skills.db.desc": "Modelado y optimización en motores relacionales y NoSQL para entornos de alta transaccionalidad.",
        "skills.frontend.title": "Frontend & UI",
        "skills.frontend.desc": "Creación de interfaces y SPA interactivas apoyadas en librerías modernas para brindar la mejor UX.",
        "skills.automation.title": "Automatización & IA",
        "skills.automation.desc": "Diseño de flujos inteligentes y bots conversacionales que automatizan procesos de negocio y atención al cliente.",
        // Projects
        "projects.title": "Proyectos",
        "projects.visitSite": "Visitar sitio →",
        "projects.viewGithub": "Ver en GitHub →",
        "projects.private": "Código privado",
        // Testimonial
        "testimonial.heading": "Proyectos\nDesplegados",
        "testimonial.count": "15+",
        "testimonial.1.quote": "La implementación del módulo de seguros digitales y la modernización de nuestra App móvil superó todas las expectativas. Gran capacidad técnica para integrar servicios complejos en el entorno Fintech.",
        "testimonial.1.reviewer": "Gerencia de Canales Digitales, Caja Ica",
        "testimonial.2.quote": "El chatbot con IA que desarrolló automatizó el 90% de nuestras consultas, y la centralización de nuestro sistema redujo los costos operativos a la mitad. Un trabajo excepcional.",
        "testimonial.2.reviewer": "Dirección, Estudio Contable Alvarez",
        "testimonial.3.quote": "La creación de nuestra nueva aula virtual transformó por completo la experiencia de enseñanza. Nos entregó una plataforma rápida, intuitiva y altamente escalable para nuestros estudiantes.",
        "testimonial.3.reviewer": "Coordinación Académica, Escuelas Técnicas del Perú",
        // Lottery Ticket
        "lottery.badge": "1 Cupo Disponible",
        "lottery.title": "Sorteo Oficial:\nPágina web Profesional",
        "lottery.subtitle": "Nosotros seleccionarémos 1 negocio para desarrollar su presencia digital.",
        "lottery.cta": "Postular mi Negocio",
        // Contact
        "contact.heading": "¿Trabajamos juntos?",
        "contact.subtitle": "Estoy abierto a nuevas oportunidades, colaboraciones y proyectos interesantes.",
        "contact.email": "Enviar Email",
        // Giveaway Card
        "giveaway.badge": "Sorteo_Oficial",
        "giveaway.badgeSub": "Página web profesional",
        "giveaway.headline1": "Página web",
        "giveaway.hashtag": "#profesional",
        "giveaway.headline2": "para tu negocio",
        "giveaway.subtitle": "Nosotros seleccionarémos 1 negocio para desarrollar su presencia digital",
        "giveaway.cta": "Postular Ahora",
        "giveaway.label": "Exclusivo Web",
        "giveaway.tagline1": "Con",
        "giveaway.taglineName": "Nosotros",
        "giveaway.tagline2": "llegaras",
        "giveaway.tagline3": "más lejos!",
        // Giveaway Modal
        "giveaway.modal.title": "Postula tu Negocio",
        "giveaway.modal.desc": "Regístrate para participar en el sorteo mensual de transformación digital.",
        "giveaway.modal.google": "Continuar con Google",
        "giveaway.modal.divider": "o regístrate con email",
        "giveaway.modal.name": "Nombre completo",
        "giveaway.modal.email": "Correo electrónico",
        "giveaway.modal.business": "Nombre de tu negocio",
        "giveaway.modal.password": "Contraseña",
        "giveaway.modal.phone": "Teléfono de contacto",
        "giveaway.modal.ruc": "RUC de la empresa",
        "giveaway.modal.address": "Dirección",
        "giveaway.modal.businessType": "Rubro de la empresa",
        "giveaway.modal.submit": "Postular mi Negocio",
        "giveaway.modal.success": "¡Postulación enviada! Te contactaremos pronto.",
        "giveaway.modal.error": "Ocurrió un error. Inténtalo de nuevo.",
        // Login mode
        "giveaway.modal.loginTitle": "Ingresar a mi cuenta",
        "giveaway.modal.loginDesc": "Accede a tu cuenta para ver el estado de tu postulación.",
        "giveaway.modal.loginSubmit": "Ingresar",
        "giveaway.modal.loginDivider": "o ingresa con email",
        "giveaway.modal.switchToLogin": "¿Ya tienes cuenta? Ingresar",
        "giveaway.modal.switchToRegister": "¿No tienes cuenta? Regístrate",
        // Complete Profile
        "giveaway.modal.completeTitle": "Completa tu postulación",
        "giveaway.modal.completeDesc": "Faltan un par de datos sobre tu negocio para entrar al sorteo.",
        "giveaway.modal.completeSubmit": "Completar Postulación",
        // Forgot Password
        "giveaway.modal.forgotPassword": "¿Olvidaste tu contraseña?",
        "giveaway.modal.forgotTitle": "Recuperar contraseña",
        "giveaway.modal.forgotDesc": "Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.",
        "giveaway.modal.forgotSubmit": "Enviar enlace",
        "giveaway.modal.forgotSuccess": "Te hemos enviado un enlace de recuperación a tu correo.",
        "giveaway.modal.forgotBack": "Volver al inicio de sesión",
        // OTP Verification
        "giveaway.modal.otpTitle": "Verifica tu correo",
        "giveaway.modal.otpDesc": "Ingresa el código de 8 dígitos que enviamos a tu correo electrónico.",
        "giveaway.modal.otpSubmit": "Verificar",
        "giveaway.modal.otpResend": "¿No recibiste el código? Reenviar",
        "giveaway.modal.otpPlaceholder": "00000000",
        // Confetti Success
        "giveaway.modal.confettiTitle": "🎉 ¡Felicidades!",
        "giveaway.modal.confettiDesc": "Tu postulación ha sido registrada exitosamente. ¡Mucha suerte en el sorteo!",
        "giveaway.modal.otpExpired": "El código ha expirado o es inválido. Solicita uno nuevo.",
        "giveaway.modal.otpResent": "Te hemos enviado un nuevo código al correo.",
        "giveaway.modal.next": "Siguiente",
        "giveaway.modal.confirmPassword": "Confirmar Contraseña",
        "giveaway.modal.fillAllFields": "Por favor, completa todos los campos para continuar.",
        "giveaway.modal.passwordMismatch": "Las contraseñas no coinciden.",
        "giveaway.modal.rateLimit": "Demasiados intentos. Por favor, espera unos minutos y vuelve a intentarlo.",
        "giveaway.modal.passwordWeakError": "La contraseña debe cumplir con los requisitos.",
        "giveaway.modal.passwordWeak": "Débil",
        "giveaway.modal.passwordMedium": "Media",
        "giveaway.modal.passwordStrong": "Fuerte",
        "giveaway.modal.passwordMinLength": "Mínimo 8 caracteres",
        "giveaway.modal.passwordUppercase": "Letra mayúscula",
        "giveaway.modal.passwordNumber": "Un número",
        "giveaway.modal.passwordSpecial": "Carácter especial (!@#$)",
        // Giveaway Section
        "giveaway.section.title": "Sorteo Oficial",
        "giveaway.section.prize": "Página Web Profesional & Transformación Digital",
        "giveaway.section.countdown": "Próximo sorteo en",
        "giveaway.section.days": "días",
        "giveaway.section.hours": "hrs",
        "giveaway.section.mins": "min",
        "giveaway.section.secs": "seg",
        "giveaway.section.participants": "postulantes activos",
        "giveaway.section.registered": "Tu postulación está activa",
        "giveaway.section.position": "Eres el participante",
        "giveaway.section.of": "de",
        "giveaway.section.signout": "Cerrar sesión",
        "giveaway.section.waiting": "Esperando el sorteo...",
        // Giveaway Page
        "giveaway.page.badge": "SORTEO ACTIVO",
        "giveaway.page.title": "Sorteo Oficial",
        "giveaway.page.desc": "Postula tu negocio y gana una página web profesional & transformación digital completamente gratis.",
        "giveaway.page.back": "Volver al portafolio",
        // Navbar Auth
        "nav.myEntry": "Mi Postulación",
        "nav.signout": "Cerrar sesión",
        // Footer
        "footer.credit": "Diseñado & Desarrollado por Nosotros",
        // Theme
        "theme.light": "Claro",
        "theme.dark": "Oscuro",
        "theme.system": "Sistema",
    },
    en: {
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.stack": "Stack",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "hero.greeting": "Hi, I'm",
        "hero.subtitle": "turning ideas into digital products that scale.",
        "hero.cta1": "View Projects",
        "about.title": "About Me",
        "about.location": "📍 Ica, Peru",
        "about.exp": "+2 years exp.",
        "about.focus": "Fintech",
        "about.scrum": "Scrum",
        "linkedin.cta": "Let's connect",
        "exp.title": "Experience",
        "exp.employment": "Professional Experience",
        "exp.freelance": "Freelance Projects",
        "exp.showMore": "Show more projects",
        "exp.showLess": "Show less",
        "edu.title": "Education",
        "cert.title": "Certifications",
        "stack.title": "Tech Stack",
        "skills.heading": "My Skills & Development",
        "skills.backend.title": "Backend & APIs",
        "skills.backend.desc": "Building robust microservices and scalable architectures focused on the Fintech sector.",
        "skills.cloud.title": "Cloud & Architecture",
        "skills.cloud.desc": "Deploying and managing cloud infrastructure ensuring high availability.",
        "skills.db.title": "Databases",
        "skills.db.desc": "Modeling and optimization with relational and NoSQL engines for high-transaction environments.",
        "skills.frontend.title": "Frontend & UI",
        "skills.frontend.desc": "Creating interactive interfaces and SPAs using modern libraries for the best UX.",
        "skills.automation.title": "Automation & AI",
        "skills.automation.desc": "Designing smart workflows and conversational bots that automate business processes and customer support.",
        "projects.title": "Projects",
        "projects.visitSite": "Visit site →",
        "projects.viewGithub": "View on GitHub →",
        "projects.private": "Private code",
        // Testimonial
        "testimonial.heading": "Deployed\nProjects",
        "testimonial.count": "15+",
        "testimonial.1.quote": "The implementation of the digital insurance module and the modernization of our mobile App exceeded all expectations. Great technical ability to integrate complex services in the Fintech environment.",
        "testimonial.1.reviewer": "Digital Channels Management, Caja Ica",
        "testimonial.2.quote": "The AI chatbot he developed automated 90% of our inquiries, and the centralization of our system cut operational costs in half. Exceptional work and vision.",
        "testimonial.2.reviewer": "Board of Directors, Alvarez Accounting Firm",
        "testimonial.3.quote": "The creation of our new virtual classroom completely transformed the teaching experience. He delivered a fast, intuitive, and highly scalable platform for our students.",
        "testimonial.3.reviewer": "Academic Coordination, Technical Schools of Peru",
        // Lottery Ticket
        "lottery.badge": "1 Slot Available",
        "lottery.title": "Official Giveaway:\nProfessional\nWeb Page",
        "lottery.subtitle": "We will select 1 business to develop its digital presence.",
        "lottery.cta": "Apply My Business",
        "contact.heading": "Let's work together?",
        "contact.subtitle": "I'm open to new opportunities, collaborations, and interesting projects.",
        "contact.email": "Send Email",
        // Giveaway Card
        "giveaway.badge": "Official_Giveaway",
        "giveaway.badgeSub": "Professional Web Page",
        "giveaway.headline1": "Professional",
        "giveaway.hashtag": "#Web",
        "giveaway.headline2": "for your business",
        "giveaway.subtitle": "We will select 1 business to develop its digital presence",
        "giveaway.cta": "Apply Now",
        "giveaway.label": "Web Exclusive",
        "giveaway.tagline1": "With",
        "giveaway.taglineName": "Us",
        "giveaway.tagline2": "you will reach",
        "giveaway.tagline3": "further!",
        // Giveaway Modal
        "giveaway.modal.title": "Apply Your Business",
        "giveaway.modal.desc": "Sign up to enter the monthly digital transformation giveaway.",
        "giveaway.modal.google": "Continue with Google",
        "giveaway.modal.divider": "or sign up with email",
        "giveaway.modal.name": "Full name",
        "giveaway.modal.email": "Email address",
        "giveaway.modal.business": "Business name",
        "giveaway.modal.password": "Password",
        "giveaway.modal.phone": "Contact phone",
        "giveaway.modal.ruc": "Company RUC / Tax ID",
        "giveaway.modal.address": "Address",
        "giveaway.modal.businessType": "Industry / Business type",
        "giveaway.modal.submit": "Apply My Business",
        "giveaway.modal.success": "Application sent! We'll contact you soon.",
        "giveaway.modal.error": "Something went wrong. Please try again.",
        "giveaway.modal.next": "Next",
        "giveaway.modal.confirmPassword": "Confirm Password",
        "giveaway.modal.fillAllFields": "Please fill in all fields to continue.",
        "giveaway.modal.passwordMismatch": "Passwords do not match.",
        "giveaway.modal.rateLimit": "Too many attempts. Please wait a few minutes and try again.",
        "giveaway.modal.passwordWeakError": "Password must meet the requirements.",
        "giveaway.modal.passwordWeak": "Weak",
        "giveaway.modal.passwordMedium": "Medium",
        "giveaway.modal.passwordStrong": "Strong",
        "giveaway.modal.passwordMinLength": "Minimum 8 characters",
        "giveaway.modal.passwordUppercase": "Uppercase letter",
        "giveaway.modal.passwordNumber": "A number",
        "giveaway.modal.passwordSpecial": "Special character (!@#$)",
        // Login mode
        "giveaway.modal.loginTitle": "Sign in to your account",
        "giveaway.modal.loginDesc": "Access your account to check your application status.",
        "giveaway.modal.loginSubmit": "Sign in",
        "giveaway.modal.loginDivider": "or sign in with email",
        "giveaway.modal.switchToLogin": "Already have an account? Sign in",
        "giveaway.modal.switchToRegister": "Don't have an account? Sign up",
        // Complete Profile
        "giveaway.modal.completeTitle": "Complete your application",
        "giveaway.modal.completeDesc": "Just a few more details about your business to enter the giveaway.",
        "giveaway.modal.completeSubmit": "Submit Application",
        // Forgot Password
        "giveaway.modal.forgotPassword": "Forgot your password?",
        "giveaway.modal.forgotTitle": "Reset password",
        "giveaway.modal.forgotDesc": "Enter your email and we'll send you a link to reset your password.",
        "giveaway.modal.forgotSubmit": "Send link",
        "giveaway.modal.forgotSuccess": "We've sent a recovery link to your email.",
        "giveaway.modal.forgotBack": "Back to sign in",
        // OTP Verification
        "giveaway.modal.otpTitle": "Verify your email",
        "giveaway.modal.otpDesc": "Enter the 8-digit code we sent to your email address.",
        "giveaway.modal.otpSubmit": "Verify",
        "giveaway.modal.otpResend": "Didn't receive the code? Resend",
        "giveaway.modal.otpPlaceholder": "00000000",
        // Confetti Success
        "giveaway.modal.confettiTitle": "🎉 Congratulations!",
        "giveaway.modal.confettiDesc": "Your application has been registered successfully. Good luck in the giveaway!",
        "giveaway.modal.otpExpired": "The code has expired or is invalid. Please request a new one.",
        "giveaway.modal.otpResent": "We have sent a new code to your email.",

        // Giveaway Section
        "giveaway.section.title": "Official Giveaway",
        "giveaway.section.prize": "Professional Web Page & Digital Transformation",
        "giveaway.section.countdown": "Next draw in",
        "giveaway.section.days": "days",
        "giveaway.section.hours": "hrs",
        "giveaway.section.mins": "min",
        "giveaway.section.secs": "sec",
        "giveaway.section.participants": "active applicants",
        "giveaway.section.registered": "Your application is active",
        "giveaway.section.position": "You are participant",
        "giveaway.section.of": "of",
        "giveaway.section.signout": "Sign out",
        "giveaway.section.waiting": "Waiting for the draw...",
        // Giveaway Page
        "giveaway.page.badge": "LIVE GIVEAWAY",
        "giveaway.page.title": "Official Giveaway",
        "giveaway.page.desc": "Apply your business and win a professional web page & digital transformation completely free.",
        "giveaway.page.back": "Back to portfolio",
        // Navbar Auth
        "nav.myEntry": "My Application",
        "nav.signout": "Sign out",
        "footer.credit": "Designed & Developed by Us",
        "theme.light": "Light",
        "theme.dark": "Dark",
        "theme.system": "System",
    },
} as const;

type TranslationKey = keyof typeof translations.es;

interface I18nContextType {
    locale: Locale;
    t: (key: TranslationKey) => string;
    setLocale: (locale: Locale) => void;
    toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("es");

    const t = useCallback(
        (key: TranslationKey) => translations[locale][key] || key,
        [locale]
    );

    const toggleLocale = useCallback(
        () => setLocale((prev) => (prev === "es" ? "en" : "es")),
        []
    );

    return (
        <I18nContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
    return ctx;
}
