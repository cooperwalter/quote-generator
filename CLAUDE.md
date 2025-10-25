# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A beautiful, animated quote generator MVP built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The application displays random inspirational quotes with stunning glassmorphism design, smooth animations, and exceptional user experience.

**Key Technologies:**
- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- shadcn/ui components
- Framer Motion (planned for animations)
- Quotable API integration

## Common Commands

### Development
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Type Checking
- `npx tsc --noEmit` - Run TypeScript type checker

### shadcn/ui Components
- `npx shadcn@latest add <component>` - Add shadcn/ui components
- Configuration stored in `components.json`

## Architecture

### Project Structure

```
quote-generator/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Main quote display page
│   └── globals.css             # Global styles + Art Deco theme
├── components/                 # React components
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── api/                    # API integration (Quotable API)
│   ├── constants/              # Fallback quotes and constants
│   └── utils.ts                # shadcn utilities
├── types/                      # TypeScript type definitions
├── docs/                       # Project documentation
│   ├── REQUIREMENTS.md         # Detailed requirements
│   ├── ROADMAP.md              # Development roadmap
│   └── TECHNICAL.md            # Technical specifications
└── public/                     # Static assets
```

### Path Aliases
- `@/*` maps to `./src/*` for imports (configured in tsconfig.json)

### Design System

**Theme:** Art Deco with glassmorphism effects
- Uses oklch color space for modern color definitions
- Custom CSS variables in `globals.css`
- Font: Delius Swash Caps for all typography
- Border radius: 0.625rem (10px)
- Shadows: Custom oklch-based shadows for light/dark modes

**Key Design Elements:**
- Glassmorphism cards with backdrop blur
- Animated gradient backgrounds
- Smooth transitions and micro-interactions
- Responsive typography scaling
- WCAG 2.1 AA accessibility compliance

### API Integration

**Quotable API:**
- Endpoint: `https://api.quotable.io/random`
- Public API, no authentication required
- Fallback system with local quotes (minimum 10)
- Error handling with retry logic and 5-second timeout

**Implementation Pattern:**
```typescript
// lib/api/quotes.ts
export async function fetchRandomQuote(): Promise<Quote>
```

### TypeScript Configuration
- Strict mode enabled
- Target: ES2017
- JSX runtime: `react-jsx` (modern transform, no React import needed)
- Avoid `any` - use proper types or `unknown`

### Styling Architecture

**Tailwind CSS 4:**
- Uses `@theme inline` directive for CSS variables
- Custom variant: `@custom-variant dark (&:is(.dark *))`
- Imports: `@import "tailwindcss"` and `@import "tw-animate-css"`

**shadcn/ui:**
- Style: "new-york"
- CSS variables mode enabled
- Components in `@/components/ui`
- Utils in `@/lib/utils`

## Development Guidelines

### Animation Strategy (Planned)
Per REQUIREMENTS.md and TECHNICAL.md:
- Use Framer Motion for all animations
- GPU-accelerated properties only (transform, opacity)
- Smooth easing curves (ease-out for entrances)
- Respect `prefers-reduced-motion` settings
- Target 60fps for all animations

**Planned Animations:**
1. Initial page load: Fade + scale (600-800ms)
2. Quote transition: Fade out → fade in (600-800ms total)
3. Button interactions: Hover scale (1.05x), click scale (0.98x)
4. Background: Subtle gradient shift or particle movement

### Component Design Patterns

**QuoteCard Component:**
- Display quote content with author attribution
- Loading skeleton state
- Animated entrance/exit
- Responsive typography (mobile → desktop scaling)
- Semantic HTML (blockquote, cite elements)

**QuoteButton Component:**
- Trigger new quote fetch
- Visual feedback (hover, loading states)
- Disabled during API calls
- Keyboard accessible (Tab, Enter/Space)
- Loading spinner animation

**BackgroundEffect Component:**
- Animated gradient or particles
- Fixed positioning with negative z-index
- Performance optimized

### State Management
Simple React state with hooks (no external library needed):
```typescript
const [quote, setQuote] = useState<Quote | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Error Handling
- API failures fall back to local quotes
- Graceful degradation (never show empty state)
- User-friendly error messages
- Console logging for debugging

## Performance Requirements

Per REQUIREMENTS.md:
- Initial page load: < 2 seconds
- Time to Interactive (TTI): < 3 seconds
- First Contentful Paint (FCP): < 1.5 seconds
- JavaScript bundle: < 200KB gzipped
- Lighthouse Performance score: 90+
- All animations: 60fps

**Optimization Strategies:**
- Tree shaking (import specific components)
- Dynamic imports for heavy components
- Next.js automatic font optimization
- Image optimization with Next.js Image component

## Accessibility Requirements

WCAG 2.1 AA Compliance:
- Color contrast: 4.5:1 minimum (normal text), 3:1 (large text)
- Keyboard navigation: Tab, Enter, Space
- Focus indicators on all interactive elements
- ARIA labels and live regions
- Semantic HTML structure
- Screen reader support

**Testing:**
- Run Lighthouse accessibility audit (target: 100)
- Manual keyboard navigation testing
- Screen reader testing (if available)

## Responsive Design

Breakpoints (from REQUIREMENTS.md):
- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px - 1919px
- Large Desktop: 1920px+

**Design Considerations:**
- Touch targets minimum 44x44px on mobile
- No horizontal scrolling at any breakpoint
- Font sizes scale with viewport
- Generous whitespace and padding

## Deployment

**Platform:** Vercel
- Automated deployment via Git integration
- Production branch: `main`
- Preview deployments for pull requests
- No environment variables needed for MVP

**Build Process:**
1. `npm run build` - Creates production build
2. Verify no TypeScript errors
3. Check bundle size and performance
4. Deploy to Vercel

## Testing Strategy

Per ROADMAP.md Phase 5:

**Functional Testing:**
- Initial quote loads on page load
- "New Quote" button fetches new quote
- Animations play smoothly (60fps)
- API failure shows fallback quote
- Loading states work correctly

**Performance Testing:**
- Lighthouse audit (90+ all categories)
- Core Web Vitals monitoring
- Bundle size analysis

**Browser Testing:**
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile Safari (iOS 15+)
- Chrome Mobile (Android 10+)

## Known Constraints

From REQUIREMENTS.md:
- Timeline: MVP completed in one day (8 hours)
- Budget: Zero external costs
- Solo developer
- No backend (serverless, API-only)
- Out of scope for MVP: user accounts, social sharing, dark mode toggle, quote history

## Future Enhancements

Phase 2 features (reference REQUIREMENTS.md):
- Share to social media
- Copy quote to clipboard
- Favorite quotes (localStorage)
- Dark mode toggle
- Quote categories/tags filter

## Documentation

Comprehensive documentation in `docs/` folder:
- `REQUIREMENTS.md` - Detailed functional and non-functional requirements
- `ROADMAP.md` - Step-by-step development guide (8-hour plan)
- `TECHNICAL.md` - Technical specifications and implementation details

**Always reference these documents** when implementing features to ensure alignment with project goals.
