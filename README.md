# Modern Developer Portfolio Website

A high-performance, responsive developer portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide React**.

---

## ✨ Features

- ⚡ **Next.js 16 App Router & Turbopack**: Server components for static pre-rendering, minimal client JS footprint, sub-second build times.
- 🎨 **Tailwind CSS v4 & Theme Switcher**: Fluid dark/light theme switching powered by `next-themes` with zero hydration flash.
- 🪄 **Framer Motion Animations**: Smooth scroll-triggered section reveals, active navigation pill indicator, and interactive project cards.
- ⌨️ **Dynamic Typewriter Hero**: Animated cycling headline showcasing developer specializations and availability beacon.
- 🧰 **Categorized Tech Stack Matrix**: Filterable grid displaying technologies, proficiency levels, and custom icons.
- 🚀 **Interactive Projects Showcase**: Categorized filter chips with animated layout transitions, live demo buttons, metrics pills, and source code links.
- ⏳ **Experience & Education Timeline**: Dual-track chronological timeline featuring achievements, tech badges, and certifications.
- 📬 **Spam-Resistant Contact Form**: Integrated with Web3Forms & Next.js Route Handler, client/server Zod validation, honeypot spam guard, toast notifications (`sonner`), and celebration confetti (`canvas-confetti`).
- 🔍 **Production SEO & A11y**: Dynamic `sitemap.ts`, `robots.ts`, OpenGraph / Twitter tags, and WCAG 2.2 AA accessibility contrast.

---

## 🛠️ Project Structure

```
myPortfolio/
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts  # Web3Forms API proxy with Zod validation
│   │   ├── globals.css           # Tailwind v4 theme variables and glow effects
│   │   ├── layout.tsx            # Root layout with ThemeProvider, Navbar, and Footer
│   │   ├── page.tsx              # Assembled single-page experience
│   │   ├── robots.ts             # Dynamic robots.txt
│   │   └── sitemap.ts            # Dynamic sitemap.xml
│   ├── components/
│   │   ├── layout/               # Navbar, MobileNav, Footer, ThemeToggle
│   │   ├── sections/             # Hero, TechStack, Projects, Timeline, Contact
│   │   └── ui/                   # Badge, SectionHeading, TypewriterText, ProjectCard, etc.
│   ├── data/                     # Decoupled content data files (profile, skills, projects, experience)
│   ├── hooks/                    # useActiveSection scroll spy
│   ├── lib/                      # cn helper and Zod validations
│   └── types/                    # Core TypeScript models
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
Add your [Web3Forms](https://web3forms.com) access key:
```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```
*(Note: In local development, if no key is supplied, submissions are gracefully mocked so you can test form flows without an API key).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📝 Customizing Your Content

All data is decoupled into `src/data/` for easy customization without touching JSX:

- **Personal Info & Bio**: [`src/data/profile.ts`](src/data/profile.ts)
- **Skills & Competencies**: [`src/data/skills.ts`](src/data/skills.ts)
- **Showcase Projects**: [`src/data/projects.ts`](src/data/projects.ts)
- **Career & Academic Milestones**: [`src/data/experience.ts`](src/data/experience.ts)
