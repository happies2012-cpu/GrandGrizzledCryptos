# AI App Builder — Neural Prompt Framework

## Overview
A production-ready React 18 + TypeScript + Vite web application that functions as an industry-specific AI prompt sandbox. Users select an industry, configure a design theme and page scope, then generate a complete production-ready application specification in one click.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite 5
- **Styling**: Tailwind CSS v3 + custom CSS variables (glassmorphism, dark/light mode)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Server**: Vite dev server (port 5000), launched via `python app.py` → `node vite`

## Features
- 8 industry sectors (Healthcare, E-Commerce, Fintech, EdTech, SaaS, Real Estate, Social, Logistics)
- 5 design themes per industry
- 20 page modules per industry (selectable)
- Full-spectrum prompt generator: tech stack, auth, DB schema, design system, security, production requirements
- Template library (8 categories, copy-ready)
- Dark/light theme toggle (persisted in localStorage)
- Scroll progress bar, animated page transitions, glassmorphism cards

## Project Structure
```
/
├── app.py                  # Python launcher → runs Vite dev server
├── index.html              # Vite HTML entry
├── vite.config.ts          # Vite config (port 5000, @/ alias)
├── tailwind.config.ts      # Tailwind + dark mode config
├── src/
│   ├── main.tsx            # React entry
│   ├── App.tsx             # Root app, page routing, ThemeProvider
│   ├── index.css           # CSS variables, glass utilities, base styles
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── AnimatedBackground.tsx
│   │       ├── GlassCard.tsx
│   │       ├── GlassButton.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── Badge.tsx
│   │       └── SectionTag.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Sandbox.tsx
│   │   └── Templates.tsx
│   │   └── Docs.tsx
│   └── data/
│       ├── industries.ts   # 8 industries × 5 themes × 20 pages
│       └── templates.ts    # 8 template categories
└── public/
    └── favicon.svg
```

## Running the App
The workflow runs `python app.py` which:
1. Prepends `/tmp/libstdc_compat` (symlink to Ubuntu system libstdc++.so.6) to LD_LIBRARY_PATH
2. Calls `node node_modules/.bin/vite --port 5000 --host 0.0.0.0` directly

This workaround is required because the Nix cpplibs libstdc++ is missing CXXABI_1.3.15 needed by icu4c-76, but the Ubuntu system libstdc++ at `/usr/lib/x86_64-linux-gnu/libstdc++.so.6` has it.

## User Preferences
- None recorded yet
