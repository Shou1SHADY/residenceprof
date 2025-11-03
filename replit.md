# Sokón Residence - Luxury Serviced Apartments

## Overview

Sokón Residence is a luxury serviced apartments web application designed to showcase premium properties in Cairo's most prestigious locations. The platform enables potential residents to browse available apartments, view detailed property information, submit contact inquiries, and explore partnership opportunities. Built with a focus on aspirational elegance and refined design, the application delivers an immersive digital experience that mirrors the sophistication of the physical properties.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React with TypeScript as the core framework
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture with distinct pages: Home, About, Destinations, Partner, and Contact

**UI Component System**
- Shadcn UI component library (New York style) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Framer Motion for animations and transitions
- Component aliases configured for clean imports (@/components, @/lib, @/hooks)

**Design System**
- Typography: Playfair Display (serif) for headings, Inter/Outfit (sans-serif) for body text
- Color system: HSL-based custom properties with support for light/dark modes
- Spacing: Consistent Tailwind spacing primitives (4, 6, 8, 12, 16, 20, 24)
- Layout containers: Full-bleed sections, max-w-7xl contained sections, responsive padding

**State Management**
- TanStack Query (React Query) for server state management
- React Hook Form with Zod validation for form handling
- Custom hooks for mobile detection and toast notifications

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- ESM (ES Modules) throughout the codebase
- Development: tsx for TypeScript execution
- Production: esbuild for bundling

**API Design**
- RESTful endpoints under `/api` prefix
- JSON request/response format
- Endpoints:
  - GET `/api/properties` - Fetch all properties
  - GET `/api/properties/featured` - Fetch featured properties only
  - GET `/api/properties/:id` - Fetch single property
  - POST `/api/contacts` - Submit contact form
  - POST `/api/partnerships` - Submit partnership application

**Request Validation**
- Zod schemas for runtime type validation
- Schema definitions in shared directory for type safety across client/server
- Validation errors returned with human-readable messages using zod-validation-error

**Development Environment**
- Vite for development server with HMR (Hot Module Replacement)
- Custom middleware for request logging
- Replit-specific plugins for error overlays and development banners

### Data Storage

**Current Implementation: In-Memory Storage**
- MemStorage class implementing IStorage interface
- Map-based storage for properties, contacts, and partnerships
- UUID generation for entity IDs
- Seeded sample data for demonstration

**Database Schema (Drizzle ORM)**
- Configured for PostgreSQL with Drizzle Kit
- Schema definitions:
  - `properties`: name, location, description, prices (rental/sale), size, bedrooms, bathrooms, image, featured flag
  - `contacts`: name, email, phone, message, property interest, timestamp
  - `partnerships`: company name, contact name, email, phone, message, timestamp
- Migrations directory: `./migrations`
- Schema location: `./shared/schema.ts`

**Data Model Design Decisions**
- Decimal types for pricing to maintain precision
- Text-based boolean for 'featured' flag (PostgreSQL compatibility)
- Timestamp defaults using SQL CURRENT_TIMESTAMP
- Shared schema between client and server ensures type safety

### External Dependencies

**UI Component Libraries**
- @radix-ui/* - Accessible component primitives (accordion, dialog, dropdown, navigation, etc.)
- embla-carousel-react - Touch-friendly carousel component
- framer-motion - Animation library for smooth transitions
- lucide-react - Icon library

**Forms & Validation**
- react-hook-form - Form state management
- @hookform/resolvers - Zod resolver integration
- zod - Schema validation
- drizzle-zod - Drizzle to Zod schema conversion

**Data Fetching**
- @tanstack/react-query - Server state management with caching

**Database**
- @neondatabase/serverless - Neon serverless PostgreSQL driver
- drizzle-orm - TypeScript ORM
- drizzle-kit - Migration toolkit
- connect-pg-simple - PostgreSQL session store (configured but not actively used)

**Styling**
- tailwindcss - Utility-first CSS framework
- class-variance-authority - Type-safe variant system
- clsx & tailwind-merge - Conditional class utilities

**Build Tools**
- vite - Frontend build tool and dev server
- esbuild - Fast JavaScript bundler for production backend
- tsx - TypeScript execution for development
- @vitejs/plugin-react - React support for Vite

**Utilities**
- date-fns - Date manipulation
- nanoid - Unique ID generation
- wouter - Lightweight routing library

**Font Loading**
- Google Fonts: Playfair Display, Inter, DM Sans (loaded via CDN in index.html)