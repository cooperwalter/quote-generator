# Quote Generator - Technical Design Document

**Project Name:** Quote Generator MVP  
**Version:** 1.0.0  
**Date:** October 25, 2025  
**Status:** Draft  

---

## Document Overview

This technical design document provides detailed implementation specifications for the Quote Generator MVP. It translates requirements from `REQUIREMENTS.md` into concrete technical decisions and implementation patterns.

**Related Documents:**
- Requirements Document: `REQUIREMENTS.md`
- Project Roadmap: `ROADMAP.md`

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Component Design](#component-design)
5. [Data Flow](#data-flow)
6. [API Integration](#api-integration)
7. [Styling Architecture](#styling-architecture)
8. [Animation Implementation](#animation-implementation)
9. [Performance Optimization](#performance-optimization)
10. [Accessibility Implementation](#accessibility-implementation)
11. [Deployment Configuration](#deployment-configuration)
12. [Testing Strategy](#testing-strategy)

---

## System Architecture

### Architecture Pattern
**Type:** Client-Side Single Page Application (SPA) with Server-Side Rendering (SSR)

**Architecture Diagram:**
```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├─────────────────────┐
       │                     │
┌──────▼─────────┐    ┌─────▼──────┐
│   Next.js App  │    │  Vercel    │
│   (React 19)   │    │   Edge     │
└──────┬─────────┘    └────────────┘
       │
       │ HTTPS GET
       │
┌──────▼─────────┐
│  Quotable API  │
│ (External)     │
└────────────────┘
```

**Data Flow:**
1. User visits site → Vercel Edge serves SSR'd initial HTML
2. React hydrates → Interactive application ready
3. On mount → Fetch quote from Quotable API
4. Display quote → Smooth animation renders
5. User clicks button → New API request → Animate transition

**Key Architecture Decisions:**

| Decision | Rationale | Reference |
|----------|-----------|-----------|
| Next.js App Router | Modern React patterns, built-in optimization | NFR-1 Performance |
| Client-side API calls | Simple MVP, no backend needed | Constraints (REQUIREMENTS.md) |
| Serverless deployment | Zero ops, scales automatically | DEP-1 |
| No state management library | Simple state, React hooks sufficient | FR-2 |
| Static fallback quotes | Reliability when API fails | API-1 Error Handling |

---

## Technology Stack

### Core Framework
```json
{
  "framework": "Next.js 15",
  "react": "React 19",
  "language": "TypeScript 5.3+",
  "runtime": "Node.js 20+"
}
```

**Rationale:** 
- Next.js 15 provides optimal Vercel deployment (Reference: DEP-1)
- React 19 offers latest features and performance improvements
- TypeScript ensures type safety and better DX

---

### UI & Styling
```json
{
  "styling": "Tailwind CSS 3.4+",
  "components": "shadcn/ui",
  "icons": "lucide-react",
  "fonts": "Geist (Vercel)"
}
```

**Component Library Rationale:**
- **shadcn/ui:** Customizable, accessible, no runtime overhead (Reference: NFR-4)
- **Tailwind CSS:** Utility-first, optimized bundle size (Reference: NFR-1)
- **Lucide React:** Tree-shakeable icons, consistent design

---

### Animation Libraries
```json
{
  "animations": "Framer Motion 11+",
  "fallback": "Tailwind CSS animate utilities"
}
```

**Animation Stack Rationale:**
- **Framer Motion:** Declarative animations, respects reduced-motion (Reference: NFR-3)
- GPU-accelerated by default (Reference: NFR-3 Animation Requirements)
- Easy orchestration for staggered animations

---

### API & Data Fetching
```json
{
  "fetching": "Native Fetch API",
  "validation": "Zod (optional)"
}
```

**Why Native Fetch:**
- Built-in to modern browsers and Node.js
- No additional dependencies
- Sufficient for simple API calls (Reference: API-1)

---

### Development Tools
```json
{
  "package_manager": "npm",
  "linting": "ESLint 8+",
  "formatting": "Prettier",
  "git_hooks": "husky + lint-staged (optional)"
}
```

---

### Deployment & Hosting
```json
{
  "platform": "Vercel",
  "cdn": "Vercel Edge Network",
  "ssl": "Automatic HTTPS"
}
```

**Reference:** DEP-1, DEP-2 (REQUIREMENTS.md)

---

## Project Structure

```
quote-generator/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page (main quote display)
│   ├── globals.css             # Global styles + Tailwind imports
│   └── favicon.ico             # Favicon
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── QuoteCard.tsx           # Main quote display component
│   ├── QuoteButton.tsx         # New quote button
│   └── BackgroundEffect.tsx    # Animated background
├── lib/
│   ├── api/
│   │   └── quotes.ts           # API integration logic
│   ├── constants/
│   │   └── fallback-quotes.ts  # Local quote cache
│   └── utils.ts                # Utility functions
├── types/
│   └── quote.ts                # TypeScript interfaces
├── public/
│   └── (static assets)
├── tailwind.config.ts          # Tailwind configuration
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json
└── README.md
```

**Directory Responsibilities:**

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `app/` | Next.js App Router pages | `page.tsx`, `layout.tsx` |
| `components/` | React components | `QuoteCard.tsx`, `QuoteButton.tsx` |
| `lib/` | Business logic, utilities | `api/quotes.ts`, `fallback-quotes.ts` |
| `types/` | TypeScript type definitions | `quote.ts` |

---

## Component Design

### Component Hierarchy
```
App (page.tsx)
├── QuoteCard
│   ├── Quote Text
│   └── Author
├── QuoteButton
└── BackgroundEffect
```

---

### 1. QuoteCard Component

**Reference:** FR-1 Quote Display (REQUIREMENTS.md)

**Responsibility:** Display quote content with animation

**Props:**
```typescript
interface QuoteCardProps {
  quote: string;
  author: string;
  isLoading?: boolean;
}
```

**Features:**
- Animated entrance (fade + scale)
- Responsive typography scaling
- Glassmorphism card design
- Loading skeleton state

**Implementation Pattern:**
```tsx
// QuoteCard.tsx
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export function QuoteCard({ quote, author, isLoading }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className="backdrop-blur-lg bg-white/10 p-8">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-3xl font-light leading-relaxed"
            >
              "{quote}"
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-6 text-lg italic text-right"
            >
              — {author}
            </motion.p>
          </>
        )}
      </Card>
    </motion.div>
  );
}
```

**Styling Requirements:**
- Background: `backdrop-blur-lg` with semi-transparent white
- Padding: Generous (8 spacing units)
- Border radius: Large (rounded-2xl)
- Shadow: Soft, elevated

---

### 2. QuoteButton Component

**Reference:** FR-2 New Quote Generation (REQUIREMENTS.md)

**Responsibility:** Trigger new quote fetch with visual feedback

**Props:**
```typescript
interface QuoteButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}
```

**Features:**
- Hover animation (scale + color)
- Loading state with spinner
- Disabled state
- Keyboard accessible

**Implementation Pattern:**
```tsx
// QuoteButton.tsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function QuoteButton({ onClick, isLoading, disabled }: QuoteButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={onClick}
        disabled={isLoading || disabled}
        className="px-8 py-6 text-lg"
        aria-label="Get new quote"
      >
        <RefreshCw 
          className={`mr-2 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} 
        />
        {isLoading ? 'Loading...' : 'New Quote'}
      </Button>
    </motion.div>
  );
}
```

**Accessibility:**
- Proper `aria-label` (Reference: NFR-4)
- Disabled state prevents interaction during loading
- Visible focus indicator (Tailwind default)

---

### 3. BackgroundEffect Component

**Reference:** NFR-2 Visual Design (REQUIREMENTS.md)

**Responsibility:** Animated gradient or particle background

**Implementation Options:**

**Option A: Animated Gradient**
```tsx
// BackgroundEffect.tsx
export function BackgroundEffect() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 animate-gradient" />
    </div>
  );
}
```

**Option B: Subtle Particles (tsparticles-slim)**
```tsx
import Particles from "react-particles";

export function BackgroundEffect() {
  return (
    <Particles
      className="fixed inset-0 -z-10"
      options={{
        particles: {
          number: { value: 50 },
          size: { value: 3 },
          move: { speed: 1 },
          opacity: { value: 0.3 }
        }
      }}
    />
  );
}
```

**Recommendation:** Start with Option A (gradient) for simplicity, add particles post-MVP if desired.

---

### 4. Main Page Component

**Reference:** FR-1, FR-2 (REQUIREMENTS.md)

**File:** `app/page.tsx`

**Responsibility:** Orchestrate components, manage state, handle API calls

**State Management:**
```typescript
const [quote, setQuote] = useState<Quote | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**Implementation Pattern:**
```tsx
// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { QuoteCard } from '@/components/QuoteCard';
import { QuoteButton } from '@/components/QuoteButton';
import { BackgroundEffect } from '@/components/BackgroundEffect';
import { fetchRandomQuote } from '@/lib/api/quotes';
import type { Quote } from '@/types/quote';

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadQuote = async () => {
    setIsLoading(true);
    try {
      const newQuote = await fetchRandomQuote();
      setQuote(newQuote);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      // Fallback to local quote
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <BackgroundEffect />
      <div className="max-w-3xl w-full space-y-8">
        {quote && (
          <QuoteCard
            quote={quote.content}
            author={quote.author}
            isLoading={isLoading}
          />
        )}
        <div className="flex justify-center">
          <QuoteButton onClick={loadQuote} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
```

---

## Data Flow

### Quote Fetching Flow

```
┌──────────────┐
│  Component   │
│   Mount      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  useEffect   │
│    Hook      │
└──────┬───────┘
       │
       ▼
┌──────────────┐     Success    ┌──────────────┐
│ fetchRandom  │────────────────►│  setQuote()  │
│   Quote()    │                 └──────────────┘
└──────┬───────┘
       │
       │ Failure
       ▼
┌──────────────┐
│  Fallback    │
│   Quote      │
└──────────────┘
```

### State Update Flow

```
User clicks button
       ↓
setIsLoading(true)
       ↓
API Request
       ↓
Response received
       ↓
setQuote(newQuote)
       ↓
setIsLoading(false)
       ↓
Animate transition
```

---

## API Integration

### Quote API Service

**Reference:** API-1 Quotable API Integration (REQUIREMENTS.md)

**File:** `lib/api/quotes.ts`

**Implementation:**
```typescript
// lib/api/quotes.ts
import type { Quote } from '@/types/quote';
import { FALLBACK_QUOTES } from '@/lib/constants/fallback-quotes';

const API_BASE_URL = 'https://api.quotable.io';
const TIMEOUT_MS = 5000;

interface QuotableResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

/**
 * Fetch a random quote from Quotable API with timeout and retry
 * Falls back to local quotes on failure
 */
export async function fetchRandomQuote(): Promise<Quote> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(`${API_BASE_URL}/random`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: QuotableResponse = await response.json();

    return {
      content: data.content,
      author: data.author,
    };
  } catch (error) {
    console.error('Failed to fetch quote from API:', error);
    
    // Retry once
    try {
      const retryResponse = await fetch(`${API_BASE_URL}/random`);
      if (retryResponse.ok) {
        const data: QuotableResponse = await retryResponse.json();
        return {
          content: data.content,
          author: data.author,
        };
      }
    } catch (retryError) {
      console.error('Retry failed:', retryError);
    }

    // Return random fallback quote
    return getRandomFallbackQuote();
  }
}

/**
 * Get a random quote from local fallback array
 */
function getRandomFallbackQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length);
  return FALLBACK_QUOTES[randomIndex];
}
```

**Error Handling Strategy:**
1. First attempt with 5-second timeout
2. Single retry on failure
3. Fallback to local quotes if both fail
4. Log errors but don't expose to user (graceful degradation)

**Reference:** API-1 Error Handling (REQUIREMENTS.md)

---

### Fallback Quotes

**File:** `lib/constants/fallback-quotes.ts`

```typescript
// lib/constants/fallback-quotes.ts
import type { Quote } from '@/types/quote';

export const FALLBACK_QUOTES: Quote[] = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    content: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    content: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    content: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  }
];
```

**Reference:** Data Requirements - Local Quote Cache (REQUIREMENTS.md)

---

### TypeScript Types

**File:** `types/quote.ts`

```typescript
// types/quote.ts

/**
 * Core quote interface used throughout the application
 */
export interface Quote {
  content: string;
  author: string;
}

/**
 * API response type for Quotable API
 * Used internally in API service
 */
export interface QuotableAPIResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}
```

---

## Styling Architecture

### Tailwind Configuration

**File:** `tailwind.config.ts`

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // Add more custom colors as needed
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

**Reference:** NFR-2 Visual Design (REQUIREMENTS.md)

---

### Global Styles

**File:** `app/globals.css`

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 262 83% 58%;
    --primary-foreground: 210 40% 98%;
    /* Add more CSS variables */
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Custom gradient animation */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}
```

**Accessibility:** Respects `prefers-reduced-motion` (Reference: NFR-3)

---

### Responsive Design Breakpoints

**Reference:** FR-3 Responsive Design (REQUIREMENTS.md)

```typescript
// Tailwind default breakpoints (used throughout)
{
  'sm': '640px',   // Tablet
  'md': '768px',   // Tablet landscape
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large desktop
}
```

**Typography Scaling:**
```css
/* Mobile (default) */
.quote-text { @apply text-2xl; }
.author-text { @apply text-base; }

/* Tablet */
@screen sm {
  .quote-text { @apply text-3xl; }
  .author-text { @apply text-lg; }
}

/* Desktop */
@screen lg {
  .quote-text { @apply text-4xl; }
  .author-text { @apply text-xl; }
}
```

---

## Animation Implementation

### Framer Motion Variants

**Reference:** NFR-3 Animation & Transitions (REQUIREMENTS.md)

**Quote Card Animations:**
```typescript
// Animation variants for QuoteCard
export const cardVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const authorVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 0.7,
    transition: {
      delay: 0.2,
      duration: 0.4,
    },
  },
};
```

**Stagger Children Animation:**
```tsx
<motion.div
  variants={containerVariants}
  initial="initial"
  animate="animate"
>
  <motion.p variants={textVariants}>Quote</motion.p>
  <motion.p variants={authorVariants}>Author</motion.p>
</motion.div>
```

---

### Animation Performance Optimization

**GPU Acceleration:**
- Only animate `transform` and `opacity` properties
- Avoid animating `width`, `height`, `margin`, `padding`

**Will-Change Property:**
```css
.quote-card {
  will-change: transform, opacity;
}
```

**Reduced Motion:**
```tsx
// Automatically handled by Framer Motion
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();
```

**Reference:** NFR-3 Animation Requirements (REQUIREMENTS.md)

---

## Performance Optimization

### Bundle Size Optimization

**Reference:** NFR-1 Performance (REQUIREMENTS.md)

**Strategies:**
1. **Tree Shaking:** Import only needed components
   ```tsx
   // Good
   import { Button } from '@/components/ui/button';
   
   // Avoid
   import * as UI from '@/components/ui';
   ```

2. **Dynamic Imports:** Lazy load heavy components
   ```tsx
   const BackgroundEffect = dynamic(() => import('@/components/BackgroundEffect'), {
     ssr: false,
   });
   ```

3. **Image Optimization:** Use Next.js Image component
   ```tsx
   import Image from 'next/image';
   ```

4. **Font Optimization:** Automatic with Next.js font loader
   ```tsx
   import { GeistSans } from 'geist/font/sans';
   ```

---

### Code Splitting

**Automatic:** Next.js handles route-based code splitting

**Manual:** Use dynamic imports for optional features
```tsx
// Only load particles on desktop
const Particles = dynamic(() => import('react-particles'), {
  ssr: false,
  loading: () => null,
});
```

---

### Caching Strategy

**API Responses:**
```typescript
// Cache API responses for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
let cachedQuotes: Quote[] = [];
let lastFetchTime = 0;
```

**Browser Caching:**
- Static assets: 1 year cache (immutable)
- API routes: No cache (always fresh)

---

### Performance Metrics

**Target Lighthouse Scores:**
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 90+

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Reference:** NFR-1 Performance Requirements (REQUIREMENTS.md)

---

## Accessibility Implementation

### WCAG 2.1 AA Compliance

**Reference:** NFR-4 Accessibility (REQUIREMENTS.md)

**Color Contrast:**
```typescript
// Minimum contrast ratios
{
  'normal-text': 4.5,      // 16px and below
  'large-text': 3.0,       // 18px+ or 14px+ bold
  'ui-components': 3.0,    // Buttons, inputs
}
```

**Testing Tool:** Use Lighthouse accessibility audit

---

### Keyboard Navigation

**Implementation:**
```tsx
<Button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  tabIndex={0}
  aria-label="Get new inspirational quote"
>
  New Quote
</Button>
```

**Focus Management:**
- Visible focus rings on all interactive elements
- Skip to content link (if adding navigation)
- Trap focus in modals (future feature)

---

### Screen Reader Support

**ARIA Attributes:**
```tsx
<div
  role="article"
  aria-live="polite"
  aria-atomic="true"
>
  <blockquote cite={quoteSource}>
    {quote}
  </blockquote>
  <cite>{author}</cite>
</div>
```

**Live Regions:**
```tsx
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading ? 'Loading new quote' : quote}
</div>
```

---

### Semantic HTML

**Proper Element Usage:**
```tsx
<main>
  <section aria-labelledby="quote-heading">
    <h1 id="quote-heading" className="sr-only">
      Inspirational Quotes
    </h1>
    <article>
      <blockquote>{quote}</blockquote>
      <footer>
        <cite>{author}</cite>
      </footer>
    </article>
  </section>
  <aside>
    <button>New Quote</button>
  </aside>
</main>
```

---

## Deployment Configuration

### Vercel Configuration

**Reference:** DEP-1 Vercel Deployment (REQUIREMENTS.md)

**File:** `vercel.json` (optional, defaults are good)
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

### Environment Variables

**None required for MVP** (API is public)

**Future considerations:**
```env
# .env.local (for future features)
NEXT_PUBLIC_API_URL=https://api.quotable.io
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

### Build Configuration

**File:** `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Optimize bundle
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

module.exports = nextConfig;
```

---

### Git Configuration

**File:** `.gitignore`
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Production
build/
.next/
out/

# Environment
.env
.env.local
.env.production.local

# Vercel
.vercel

# OS
.DS_Store
```

---

## Testing Strategy

### Manual Testing Checklist

**Functional Testing:**
- [ ] Initial quote loads on page load
- [ ] "New Quote" button fetches new quote
- [ ] Animations play smoothly at 60fps
- [ ] API failure shows fallback quote
- [ ] Button disabled during loading
- [ ] Responsive on mobile, tablet, desktop

**Performance Testing:**
- [ ] Lighthouse score 90+ in all categories
- [ ] Page loads in under 2 seconds
- [ ] No console errors or warnings

**Accessibility Testing:**
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Screen reader announces content
- [ ] Focus indicators visible
- [ ] Color contrast passes WCAG AA

**Browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Reference:** Acceptance Criteria Summary (REQUIREMENTS.md)

---

### Automated Testing (Post-MVP)

**Future implementation:**
```bash
# Unit tests
npm run test

# E2E tests with Playwright
npm run test:e2e

# Visual regression tests
npm run test:visual
```

---

## Error Handling

### Error States

**API Failure:**
```tsx
if (error) {
  return (
    <div role="alert" className="text-red-500">
      <p>Unable to load quote. Showing offline content.</p>
    </div>
  );
}
```

**Network Timeout:**
```typescript
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
```

**Graceful Degradation:**
- Always show content (fallback quotes)
- Never show empty state
- Log errors to console for debugging

**Reference:** API-1 Error Handling (REQUIREMENTS.md)

---

## Security Considerations

### Content Security Policy

**Reference:** SEC-2 Content Security Policy (REQUIREMENTS.md)

**HTTP Headers:**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.quotable.io;
```

**Implementation:** Configure in Vercel dashboard or `vercel.json`

---

### HTTPS Enforcement

- Automatic with Vercel (Reference: DEP-2)
- All API calls use HTTPS
- No mixed content warnings

---

## Browser Support Matrix

**Reference:** NFR-5 Browser Compatibility (REQUIREMENTS.md)

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 120+ | ✅ Full support |
| Firefox | 120+ | ✅ Full support |
| Safari | 17+ | ✅ Full support |
| Edge | 120+ | ✅ Full support |
| Mobile Safari | iOS 16+ | ✅ Full support |
| Chrome Mobile | Android 12+ | ✅ Full support |

**Polyfills:** None required (modern browsers only)

---

## Monitoring & Analytics

### MVP Monitoring

**Manual monitoring:**
- Vercel Analytics (built-in)
- Browser DevTools performance profiling
- Manual error checking in production

**Post-MVP:**
- Google Analytics 4
- Sentry for error tracking
- Web Vitals monitoring

---

## Known Limitations

1. **No offline support:** Requires internet for API calls
2. **Single API source:** No fallback API if Quotable is down
3. **No quote history:** Cannot view previously seen quotes
4. **Limited customization:** Fixed theme, no dark mode
5. **No localization:** English only

**Reference:** Out of Scope (REQUIREMENTS.md)

---

## Technical Debt & Future Improvements

**Identified technical debt:**
1. No unit tests (add in Phase 2)
2. No E2E tests (add in Phase 2)
3. No error tracking service (add Sentry in Phase 2)
4. Hardcoded color palette (extract to theme system)
5. No API caching layer (add if API rate limits become issue)

**Refactoring opportunities:**
1. Extract animation variants to separate file
2. Create custom hooks for quote fetching
3. Implement proper error boundary component
4. Add Storybook for component documentation

---

## Appendix

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Deployment
vercel                   # Deploy to Vercel
vercel --prod            # Deploy to production
```

---

### Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Quotable API Docs](https://github.com/lukePeavey/quotable)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | Oct 25, 2025 | Dev Team | Initial technical document |

---

## Document Approval

**Technical Lead:** [Approved]  
**Date:** October 25, 2025  
**Status:** Ready for Implementation
