# Portfolio Interactivo & Terminal 404 🚀

> Un portafolio personal interactivo construido con **Next.js 16**, arquitectura **Atomic Design**, y animaciones inmersivas usando **Framer Motion**.

![Portfolio Header](https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:38bdf8&height=220&section=header&text=brunovelasques.dev&fontSize=48&fontAlignY=35&animation=fadeIn&fontColor=e2e8f0&desc=Portfolio%20Source%20Code&descSize=18&descAlignY=55&descAlign=50)

## 🌐 Visita en Vivo
🔗 **[brunovelasques.dev](https://brunovelasques.dev)**

## 🛠 Stack Tecnológico

![Next JS](https://img.shields.io/badge/Next-white?style=for-the-badge&logo=next.js&logoColor=black)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-white?style=for-the-badge&logo=framer&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%230074c1.svg?style=for-the-badge&logo=typescript&logoColor=white)

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + Shadcn UI
- **Animaciones:** Framer Motion
- **Lenguaje:** TypeScript estricto
- **Arquitectura:** Patrón Atomic Design (Custom Hooks para lógica de estado pesado, y UI limpia)
- **Deployment:** Vercel / Netlify

---

## ✨ Funcionalidades Destacadas

### 1. Terminal 404 Interactiva Estilo macOS (`/not-found.tsx`)
Hemos transformado la clásica y aburrida página de Error 404 en una **Terminal interactiva** construida bajo una fuerte arquitectura Atómica:
- **`useTerminal.ts` (Lógica pesada):** Un custom hook que procesa comandos linux simulados (`cd <sección>`, `ls`, `whoami`, `cat readme.md`, `help`, `clear`) y enruta a las páginas de la web dinámicamente.
- **`TerminalWindow.tsx` (UI atómica):** Ventana renderizada con Framer Motion. ¡Es arrastrable (Drag & Drop) y redimensionable usando un custom handler en la esquina! Cuenta con controles clásicos (Cerrar 🔴, Minimizar 🟡, Maximizar 🟢).
- **`TerminalDock.tsx` (UI atómica):** Un *Floating Dock* persistente tipo macOS en la parte inferior para saltar a secciones importantes (Inicio, Github, Proyectos, Minimizar/Restaurar la consola). 
- Tiene memoria local (`useRef`) para no repetir la animación de rooteo si la terminal ha sido restaurada.

### 2. Animaciones UI e Idiomas (i18n)
- Desplazamiento dinámico (Smooth scroll y Anchor links compensados mediante `scroll-m-[pixels]`).
- Traducciones globales en tiempo real entre Inglés y Español manejadas contextualmente (`useI18n`).
- Sliders automáticos infinitos de tecnologías que se pausan al hacer `:hover`.
- Cursor dinámico adaptativo.

---

## 💻 Desarrollo Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DazzleEaglePe/portfolio-bruno-velasques.git
   ```

2. Ingresa al directorio:
   ```bash
   cd portfolio-bruno-velasques/portfolio
   ```

3. Instala las dependencias:
   ```bash
   npm install
   # o yarn, pnpm, bun
   ```

4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

---

## 🎨 Arquitectura Atomic Design

Nuestros componentes UI están diseñados en piezas sueltas y altamente reutilizables. Por experiencia en el escalado de repositorios Next.js:

```
src/
├── app/                  # App Router: Layouts, Pages, Modals
├── components/
│   ├── terminal/         # Atomic UI - Terminal Dock, Header, Types
│   ├── sections/         # Secciones Gigantes (Hero, Experience, Projects)
│   ├── ui/               # Componentes Micro base (Shadcn, Botsones)
├── hooks/                # Custom React Hooks (useTerminal, useI18n)
├── data/                 # Data simulada para portfolios / DB
├── lib/                  # Utilidades globales y configs
└── types/                # Types/Interfaces globales de TypeScript
```

> **Autor:** Bruno Velasques - [@velasques_bruno](https://github.com/DazzleEaglePe)
