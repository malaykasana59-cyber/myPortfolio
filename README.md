# My Developer Portfolio

A modern, responsive developer portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide React**.

---

## ✨ Features

- ⚡ **Next.js 16 App Router & Turbopack**: Fast server-side rendering with minimal client-side JavaScript
- 🎨 **Tailwind CSS v4 with Dark Mode**: Seamless dark/light theme switching
- 🪄 **Smooth Animations**: Scroll-triggered reveals and interactive elements powered by Framer Motion
- ⌨️ **Dynamic Hero Section**: Animated typewriter effect showcasing skills and availability
- 🧰 **Tech Stack Display**: Organized grid showing technologies and proficiency levels
- 🚀 **Projects Showcase**: Interactive project cards with filtering and live demo links
- ⏳ **Timeline**: Experience and education history with achievements
- 📬 **Contact Form**: Integrated contact form with validation and notifications
- 🔍 **SEO Optimized**: Dynamic sitemap, robots.txt, and meta tags for better visibility

---

## 🛠️ Project Structure

```
myPortfolio/
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts      # Contact form endpoint
│   │   ├── globals.css               # Global styles and theme variables
│   │   ├── layout.tsx                # Root layout with navigation and footer
│   │   ├── page.tsx                  # Main portfolio page
│   │   ├── robots.ts                 # SEO robots.txt
│   │   └── sitemap.ts                # Dynamic XML sitemap
│   ├── components/
│   │   ├── layout/                   # Navigation and footer components
│   │   ├── sections/                 # Major page sections
│   │   └── ui/                       # Reusable UI components
│   ├── data/                         # Content files (profile, skills, projects, experience)
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utility functions and validations
│   └── types/                        # TypeScript type definitions
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

Add your configuration if needed (e.g., Web3Forms API key):
```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

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

All content is organized in `src/data/` files for easy customization:

- **Personal Information**: [`src/data/profile.ts`](src/data/profile.ts)
- **Skills & Technologies**: [`src/data/skills.ts`](src/data/skills.ts)
- **Projects**: [`src/data/projects.ts`](src/data/projects.ts)
- **Experience & Education**: [`src/data/experience.ts`](src/data/experience.ts)

Simply edit these files to update your portfolio without modifying any React components.

---

## 📦 Dependencies

- **Next.js 16** - React framework with App Router
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **next-themes** - Dark mode support
- **Zod** - Schema validation
- **Sonner** - Toast notifications

---

## 📄 License

Feel free to use this portfolio template as your own. Customize it with your projects, skills, and experience.

---

**Happy coding! 🚀**
