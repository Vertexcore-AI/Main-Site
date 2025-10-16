# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Project Architecture

This is a Next.js 15 application built with TypeScript, using the App Router architecture. The project is a business profile website for "VertexCore AI" featuring:

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: Custom components built on Radix UI primitives
- **Animations**: Framer Motion for interactions and transitions
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Project Structure
- `app/` - Next.js App Router pages and layouts
  - Multiple route pages: services, projects, consultation, support, portfolio, etc.
  - `layout.tsx` - Root layout with theme and language providers
  - `globals.css` - Global styles and Tailwind imports
- `components/` - Reusable React components
  - `ui/` - shadcn/ui components (generated via components.json config)
  - Custom components for business profile functionality
- `contexts/` - React contexts (language context with multi-language support)
- `lib/` - Utility functions (cn utility for className merging)
- `hooks/` - Custom React hooks
- `styles/` - Additional styling files
- `public/` - Static assets

### Component System
- Uses shadcn/ui component library with custom configuration
- Components are aliased via `@/components` for clean imports
- Theme system supports both light and dark modes via next-themes
- Extensive use of Tailwind utilities with CSS variables for theming

### Internationalization
- Multi-language support via custom LanguageContext
- Supports 6 languages: English, Spanish, French, German, Chinese, Japanese
- Translation keys follow dot notation (e.g., "nav.services", "hero.title")
- Language selection persisted in localStorage

### Styling Conventions
- Uses Tailwind CSS with custom CSS variables for consistent theming
- Color scheme based on neutral colors with primary/accent colors
- Responsive design with mobile-first approach
- Custom animations and transitions using Framer Motion
- Background effects include code rain, spinning earth, and video backgrounds

### Notable Features
- Business profile with animated hero sections
- Service showcase with viewport-based animations
- Multi-language navigation and content
- Dark/light theme support
- Interactive contact forms and consultation booking
- Portfolio and project showcases

When making changes:
- Follow existing component patterns and naming conventions
- Use the established alias structure (`@/components`, `@/lib`, etc.)
- Maintain consistency with the translation system for any user-facing text
- Respect the theme system when adding new styled components
- Use TypeScript throughout with proper type definitions