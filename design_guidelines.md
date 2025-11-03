# Sokón Residence - Luxury Serviced Apartments Design Guidelines

## Design Approach

**Reference-Based Luxury Hospitality Design**
Drawing inspiration from Airbnb's property showcase elegance, Four Seasons' refined digital presence, and Sotheby's luxury real estate aesthetic. The design emphasizes visual storytelling, premium materials, and sophisticated restraint that signals exclusivity without ostentation.

**Core Design Principles**
- Aspirational Elegance: Every element should evoke sophistication and desirability
- Breathing Room: Generous whitespace as a luxury signal
- Visual Hierarchy: Guide users through an immersive journey, not a catalog
- Refined Restraint: Quality over quantity in every interaction

---

## Typography System

**Font Families**
- Primary (Headings): Playfair Display (serif) - for elegant, luxurious headlines
- Secondary (Body): Inter or Outfit (sans-serif) - for clean, modern readability
- Accent (Price/Stats): DM Sans (sans-serif) - for numerical emphasis

**Hierarchy**
- Hero Headlines: 4xl to 6xl (responsive), font-weight 700, letter-spacing tight (-0.02em)
- Section Headings: 3xl to 4xl, font-weight 600, with subtle tracking
- Property Titles: xl to 2xl, font-weight 600
- Body Text: base to lg, font-weight 400, line-height relaxed (1.7)
- Price Tags: lg to xl, font-weight 700, tracking wide (0.05em)
- Captions/Labels: sm, font-weight 500, uppercase with letter-spacing (0.1em)

---

## Layout System

**Spacing Primitives**
Using Tailwind units: 4, 6, 8, 12, 16, 20, 24 for consistent vertical rhythm
- Section Padding: py-20 (desktop), py-12 (mobile)
- Container Max Width: max-w-7xl with px-6 to px-12 horizontal padding
- Card Spacing: p-6 to p-8 internal padding
- Grid Gaps: gap-6 to gap-8

**Container Strategy**
- Full-bleed sections for hero and destination galleries
- Contained sections (max-w-7xl) for content and features
- Narrow containers (max-w-4xl) for forms and focused content
- Reading width (max-w-prose) for about/mission text

---

## Page-Specific Layouts

### Home Page Structure (7 Sections)

**1. Hero Section** (100vh)
- Full-screen immersive hero with high-resolution luxury apartment image
- Centered content overlay with dark gradient (from transparent to black/60% opacity at bottom)
- Hero headline: "Where Lavishness Meets Tranquility" with elegant subtitle below
- Primary CTA button (blurred background): "Explore Destinations" + secondary "View Availability"
- Scroll indicator at bottom

**2. Brand Introduction** (auto height, py-20)
- Two-column layout (lg:grid-cols-2)
- Left: Large "At a Glance" heading with brand story (max-w-prose)
- Right: Curated lifestyle image with subtle border treatment
- Stats bar below: 3-4 columns showing numbers (Founded year, Properties, Happy Residents, Destinations)

**3. Featured Destinations Grid** (auto height, py-24)
- Section heading: "Our Signature Residences"
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-8
- 6-9 property cards, each featuring:
  - Large property image (aspect-ratio-4/3)
  - Location badge overlay (top-left)
  - Property name and type
  - Price grid: Rental/month | Sale price | Size sqm
  - Quick specs row: bedrooms, bathrooms icons with numbers
  - "View Details" link with arrow

**4. Amenities Showcase** (auto height, py-20, alternate background)
- Heading: "Unparalleled Amenities & Services"
- Grid: grid-cols-2 md:grid-cols-4 lg:grid-cols-5, gap-6
- 10 feature cards with icons: Pool, Gym, Parking, Furnished, Beach Access, Heating, Park Views, Security, Concierge, Smart Home
- Each card: icon (64px), label, minimal border

**5. Lifestyle Gallery** (auto height, py-20)
- Masonry grid or 2-column layout showcasing interior/exterior shots
- 4-6 curated images with captions
- Emphasize luxury details: finishes, views, common areas

**6. Testimonials/Trust Section** (auto height, py-24, alternate background)
- Heading: "Trusted by Discerning Residents"
- Grid: grid-cols-1 md:grid-cols-3, gap-8
- 3 testimonial cards with resident photo, quote, name, and location
- 5-star rating display

**7. Contact Preview + Footer** (auto height)
- Split section: 2-column (form teaser left, contact info right)
- Newsletter signup or quick contact prompt
- Comprehensive footer: Navigation columns, social links, address, hours, legal links
- Copyright bar at bottom

### About Us Page (4 Sections)

**1. Hero Banner** (60vh)
- Elegant image of property or team
- Centered headline: "Redefining Luxury Living Since [Year]"

**2. Mission & Story** (auto height, py-24)
- Single column centered narrative (max-w-4xl)
- Timeline visual showing key milestones
- Founder's message or brand philosophy

**3. Values Grid** (auto height, py-20)
- Grid: grid-cols-1 md:grid-cols-3
- 3 core values with icons, headings, descriptions

**4. Team Section** (auto height, py-24)
- Grid: grid-cols-2 md:grid-cols-4
- Team member cards with photos, names, titles

### Our Destinations Page

**1. Hero Section** (50vh)
- Destination map background or grid collage
- Search/filter bar overlay (location, price range, size)

**2. Destinations Grid** (auto height, py-16)
- Grid: grid-cols-1 lg:grid-cols-2, gap-10
- 8-12 destination cards (larger than home grid)
- Advanced filters sidebar (desktop) or top filters (mobile)

### Be Our Partner Page (3 Sections)

**1. Hero** (60vh)
- Professional handshake or property investment imagery
- "Partner with Excellence" headline

**2. Benefits Grid** (auto height, py-24)
- Grid: grid-cols-1 md:grid-cols-2, gap-12
- 4-6 partnership benefits with icons

**3. Application Form** (auto height, py-20)
- Two-column layout: form (left, 60%), info/support (right, 40%)

### Contact Page (2 Sections)

**1. Contact Form Section** (auto height, py-20)
- Two-column: Form (left, 55%), Map + Info (right, 45%)
- Form fields: Name, Email, Phone, Property Interest dropdown, Message
- Contact cards below: Address, Phone, Email, Hours

**2. Additional Locations** (if applicable, auto height, py-16)
- Grid of office locations

---

## Component Library

### Navigation
- Sticky header with smooth scroll transition
- Transparent initially, solid with subtle shadow on scroll
- Logo left, navigation center/right, CTA button right
- Mobile: Hamburger menu with full-screen overlay

### Property Cards
- Hover: Subtle scale (scale-105) and shadow elevation
- Image with overlay gradient for text
- Price/spec badge design with borders or subtle backgrounds
- "View Details" link with arrow animation

### Buttons
- Primary: Solid with hover opacity (0.9) and subtle scale
- Secondary: Outline with hover fill
- For buttons on images: backdrop-blur-md with semi-transparent background
- Consistent padding: px-8 py-3 for primary, rounded-full or rounded-lg

### Form Inputs
- Consistent height (h-12 to h-14)
- Border-2 with focus ring
- Floating labels or placeholder labels
- Validation states with subtle color indicators

### Icons
- Use Heroicons (outline for general, solid for emphasis)
- Consistent sizing: 24px standard, 32px for features, 64px for amenity cards

---

## Images Strategy

**Hero Images Required**
- Home page hero: Luxurious apartment interior/exterior with stunning view (1920x1080 minimum)
- About page hero: Brand/property establishing shot
- Destinations page hero: Map or destination collage
- Partner page hero: Professional/aspirational partnership imagery

**Gallery & Property Images**
- High-resolution property photography (professional, well-lit)
- Lifestyle imagery showing amenities in use
- Architectural details and design elements
- Minimum 1200px width for featured images

**Image Treatment**
- Subtle overlay gradients on hero images (black/40-60% opacity)
- Aspect ratios: 16:9 for heroes, 4:3 for property cards, 1:1 for team
- Lazy loading for performance

---

## Interaction & Animation

**Animations** (Subtle, High-End)
- Scroll-triggered fade-ins for sections (opacity and slight translateY)
- Hero parallax effect (very subtle, 0.5 speed)
- Card hover states: scale and shadow elevation
- Navigation scroll transition (transparency to solid)
- Image zoom on hover for property cards (scale-110 on parent)

**No Distracting Animations**
- Avoid excessive motion
- Respect prefers-reduced-motion
- Focus on smooth, sophisticated transitions

---

## Responsive Behavior

**Breakpoints**
- Mobile: base (< 768px) - single column, stacked layouts
- Tablet: md (768px+) - 2-column grids
- Desktop: lg (1024px+) - 3-4 column grids, full layouts
- XL: xl (1280px+) - maximum widths engaged

**Mobile Specific**
- Hero heights reduced (70vh to 80vh)
- Hamburger navigation with smooth slide-in menu
- Touch-friendly tap targets (min 44px)
- Reduced section padding (py-12 instead of py-20)
- Single column forms and grids