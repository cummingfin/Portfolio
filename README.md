# Fin's Portfolio Site

A minimal, warm portfolio site for product designer Fin, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Interactive Landing**: Dark overlay with lightbulb pull interaction that reveals the main content
- **Project Showcase**: Grid of 6 projects with responsive layout (1 col mobile, 2 col tablet, 3 col desktop)
- **Tea Spill Interaction**: Playful "spill the tea" About section with animated mug states
- **Project Pages**: Dynamic project detail pages with problem/solution sections
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion animations throughout

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Fonts (Bricolage Grotesque, Manrope)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Nav
│   ├── page.tsx            # Homepage
│   ├── work/[slug]/        # Dynamic project pages
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   └── Nav.tsx         # Navigation component
│   ├── home/
│   │   ├── HeroOverlay.tsx # Landing overlay with lightbulb
│   │   ├── Hero.tsx        # Hero section
│   │   ├── ProjectGrid.tsx # Project grid container
│   │   ├── ProjectCard.tsx # Individual project card
│   │   ├── AboutSection.tsx # Tea spill interaction
│   │   └── ContactSection.tsx # Contact footer
│   └── project/
│       ├── ProjectHero.tsx # Project hero card
│       ├── ProblemSection.tsx # Problem section
│       ├── ProjectDetails.tsx # Project details
│       └── BackHomeButton.tsx # Back button
├── lib/
│   └── projects.ts         # Projects data
├── types/
│   └── project.ts          # TypeScript types
└── public/
    └── svgs/               # SVG assets
```

## Customization

### Adding Projects

Edit `lib/projects.ts` to add or modify projects. Each project needs:
- `slug`: URL-friendly identifier
- `title`: Project title
- `subtitle`: Short description
- `problem`: Problem statement text
- `gallery`: Array of image paths

### Colors

Colors are defined in `tailwind.config.ts`:
- Background: `#EEE8DE`
- Text: `#2B2B2B`
- Section Background: `#F6F2ED`
- Contact Background: `#C6A177`

### Typography

Fonts are imported in `app/globals.css`:
- H1: Bricolage Grotesque, 64pt, Bold
- H2: Bricolage Grotesque, 40pt, Medium
- H3: Manrope, 28pt, Regular
- H4: Manrope, 18pt, Regular

## Build

```bash
npm run build
```

## Deploy

The site can be deployed to Vercel, Netlify, or any platform that supports Next.js.


