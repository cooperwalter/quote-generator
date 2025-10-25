# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using React 19, TypeScript, and Tailwind CSS 4. The project uses the App Router architecture.

## Common Commands

### Development
- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

### Type Checking
- `npx tsc --noEmit` - Run TypeScript type checker without emitting files

## Architecture

### Path Aliases
- `@/*` maps to `./src/*` for imports (configured in tsconfig.json)

### App Structure
- Uses Next.js App Router (not Pages Router)
- All routes are defined in `src/app/` directory
- `src/app/layout.tsx` - Root layout component with Geist fonts
- `src/app/page.tsx` - Home page component
- `src/app/globals.css` - Global styles

### Fonts
- Uses Geist Sans and Geist Mono fonts via `next/font/google`
- Font variables: `--font-geist-sans` and `--font-geist-mono`

### TypeScript Configuration
- Strict mode enabled
- Target: ES2017
- JSX runtime: `react-jsx` (modern transform, no React import needed)
