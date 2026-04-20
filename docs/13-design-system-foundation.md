# 13. Design System Foundation

## Objetivo

Definir visual language, colores, tipografía, espaciados, componentes UI base, y principios de diseño que garanticen coherencia en toda la plataforma.

---

## Paleta de Colores

### Primary Brand Colors

```
Primary Green:      #5A7332  (Nature, growth, trust)
Gold Accent:        #F2A81D  (Luxury, warmth, highlight)
Orange Accent:      #F2790F  (Energy, adventure, CTA)
```

### Neutral Scale (Grays)

```
Dark Neutral:       #0D0D0D  (Text, strong contrast)
Dark Gray:          #262626  (Headings, secondary text)
Gray:               #666666  (Body text)
Light Gray:         #D9D9D9  (Borders, dividers)
Very Light Gray:    #F2F2F2  (Backgrounds, cards)
Off White:          #FAFAFA  (Page background)
White:              #FFFFFF  (Cards, component BG)
```

### Status Colors

```
Success:            #10B981  (Green)
Error:              #EF4444  (Red)
Warning:            #F59E0B  (Amber)
Info:               #3B82F6  (Blue)
```

### Usage Guidelines

- **Primary Green** (#5A7332): Main CTA buttons, active states, primary UI elements
- **Gold** (#F2A81D): Secondary CTAs, highlights, badges
- **Orange** (#F2790F): "Book Now", urgent CTAs, highlights
- **Dark Neutral**: All body text, headings
- **Light Grays**: Borders, backgrounds, subtle elements
- **Status Colors**: Alerts only, never primary UI

---

## Typography

### Font Stack

```css
/* Headings / Display (Emotional) */
font-family: 'DM Serif Display', Georgia, serif;

/* Body / UI (Readable) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Rationale**:
- Serif display: Premium, tourism-focused, memorable
- Sans-serif body: Modern, accessible, clear

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 48px | 700 | 1.2 | Page titles, hero headlines |
| H2 | 36px | 700 | 1.3 | Section titles |
| H3 | 28px | 600 | 1.4 | Subsections |
| H4 | 20px | 600 | 1.4 | Card titles |
| Body | 16px | 400 | 1.6 | Base text |
| Small | 14px | 400 | 1.5 | Secondary text |
| Tiny | 12px | 500 | 1.4 | Captions, metadata |

### Font Weights

- 400: Regular (body, body text)
- 500: Medium (labels, buttons)
- 600: Semi-bold (h4, emphasis)
- 700: Bold (h1-h3, strong text)

---

## Spacing System (8px Grid)

```
4px   (Half unit - rare)
8px   (1 unit - margins between inline elements)
16px  (2 units - component padding, small gaps)
24px  (3 units - section spacing)
32px  (4 units - component spacing)
48px  (6 units - section padding)
64px  (8 units - large section spacing)
96px  (12 units - hero/full sections)
```

### Application
- **Component padding**: 16px
- **Card gap**: 24px
- **Section padding**: 48px
- **Element gap**: 8-16px

---

## Border Radius

```
sm:  2px  (subtle, inputs)
md:  6px  (buttons, cards)
lg:  12px (modals, large cards)
full: 50% (circular, avatars)
```

---

## Shadow System

```
Elevation 1: 0 1px 2px rgba(0,0,0,0.05)     (subtle buttons, inputs)
Elevation 2: 0 4px 6px rgba(0,0,0,0.1)      (cards, dropdowns)
Elevation 3: 0 10px 15px rgba(0,0,0,0.1)    (modals, toasts)
Elevation 4: 0 20px 25px rgba(0,0,0,0.15)   (sticky footer, max elevation)
```

---

## Button Styles

### Primary Button (Main CTA)
```
Background: #5A7332 (Primary Green)
Text: White
Padding: 12px 24px
Border Radius: 6px
Font Weight: 600
Font Size: 16px
Hover: Darker green #4A5F2A
Active: Even darker
Transition: all 0.2s ease
```

### Secondary Button (Alternative CTA)
```
Background: #F2A81D (Gold)
Text: #0D0D0D (Dark)
Same padding/sizing as Primary
Hover: Darker gold (#E0981A)
```

### Tertiary Button (Low emphasis)
```
Background: #F2F2F2 (Light Gray)
Text: #0D0D0D
Border: 1px solid #D9D9D9
Hover: #E8E8E8
```

### Danger Button (Delete, destructive)
```
Background: #EF4444 (Red)
Text: White
Hover: Darker red
```

### Disabled State (All buttons)
```
Opacity: 0.5
Cursor: not-allowed
No hover effect
```

---

## Form Elements

### Input Fields
```
Border: 1px solid #D9D9D9
Border Radius: 6px
Padding: 10px 12px
Font Size: 16px (important for mobile)
Background: White
Focus: Border color → #5A7332, shadow
Placeholder: #999999
```

### Select / Dropdown
```
Same as Input
Arrow icon: #5A7332
Open state: Border → #5A7332
```

### Checkbox / Radio
```
Size: 18x18px (18x18 minimum for accessibility)
Checked color: #5A7332
Unchecked border: 2px solid #D9D9D9
```

### Label
```
Font Size: 14px
Font Weight: 500
Color: #0D0D0D
Margin Bottom: 6px
Required indicator: * in Gold (#F2A81D)
```

---

## Card Component

```
Background: White
Border: 1px solid #E8E8E8 (optional)
Border Radius: 8px
Padding: 20px
Shadow: Elevation 1-2
Hover: Light shadow increase (optional)
Transition: 0.2s ease
```

Variants:
- **Filled**: Light gray background (#F2F2F2), no border
- **Outlined**: White, 1px border
- **Elevated**: White with shadow

---

## Badge / Tag

```
Background: #5A7332
Text: White
Padding: 4px 8px
Border Radius: 4px
Font Size: 12px
Font Weight: 600

Variants:
├─ Success: #10B981
├─ Warning: #F59E0B
├─ Error: #EF4444
└─ Neutral: #D9D9D9
```

---

## Responsive Design Breakpoints

```
Mobile:     < 640px   (default)
Tablet:     640px - 1024px
Desktop:    1024px - 1920px
Large:      > 1920px
```

### Grid Layout
```
Mobile:   1 column
Tablet:   2 columns
Desktop:  3-4 columns
```

### Navigation
```
Mobile:   Hamburger menu
Tablet:   Horizontal (if space)
Desktop:  Full horizontal nav
```

---

## Accessibility (WCAG AA)

### Color Contrast
- Text on background: ≥ 4.5:1 (normal), ≥ 3:1 (large)
- All combinations tested

### Touch Targets
- Minimum 48px × 48px (buttons, links)
- 8px spacing between targets

### Focus States
```
Visible focus ring: 2-3px outline
Color: #5A7332 or high contrast
Not removed with CSS (important!)
```

### Icons
- Always paired with text label
- Or include aria-label

---

## Motion & Animation

### Transitions
```
Fast:    0.15s cubic-bezier(0.4, 0, 1, 1)
Standard: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
Slow:     0.6s cubic-bezier(0.4, 0, 0.2, 1)
```

### Usage
- Hover states: 0.2s
- Loading: Continuous loop
- Navigation: 0.3s
- Modals: 0.3s ease-out

### Principles
- Keep animations subtle (not distracting)
- Don't animate on loading (prefers-reduced-motion)
- Consistent easing functions

---

## Dark Mode (Optional Future)

If implemented:
- Green: #7A9D4A (lighter)
- Gold: #FFC83D (more vibrant)
- Background: #1A1A1A
- Text: #EFEFEF
- Borders: #333333

Toggle: User preference stored in localStorage

---

## Component Library Structure

Using shadcn/ui + Tailwind:

```
/components
├─ /ui (base)
│  ├─ Button.tsx
│  ├─ Card.tsx
│  ├─ Input.tsx
│  ├─ Badge.tsx
│  └─ [All shadcn/ui base components]
│
├─ /tourism (custom)
│  ├─ TourCard.tsx (uses Button, Card, Badge)
│  ├─ HeroSection.tsx
│  ├─ TestimonialBlock.tsx
│  └─ [Tourism-specific components]
│
└─ /common
   ├─ Loading.tsx
   ├─ EmptyState.tsx
   └─ [Utility components]
```

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #5A7332;
  --color-secondary: #F2A81D;
  --color-accent: #F2790F;
  --color-dark: #0D0D0D;
  --color-light: #F2F2F2;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Typography */
  --font-serif: 'DM Serif Display', Georgia, serif;
  --font-sans: 'Inter', -apple-system, sans-serif;
  --text-lg: 18px;
  --text-base: 16px;
  --text-sm: 14px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);

  /* Radius */
  --radius-sm: 2px;
  --radius-md: 6px;
  --radius-lg: 12px;
}
```

---

## Brand Voice & Tone

- **Emocional**: Inspire, excite, tell stories
- **Clear**: No jargon, explain benefits
- **Authentic**: Real experiences, real guides
- **Premium but accessible**: Luxury, not pretentious
- **Action-oriented**: CTAs strong, frictionless

Examples:
- ✅ "Vuela sobre Medellín desde 2000m"
- ❌ "Descubre nuestros servicios de turismo"

---

## Imagery Guidelines

### Photos
- Real, not stock (whenever possible)
- Cinematic composition
- People in action (not pose)
- Atmospheric, emotional

### Color Treatment
- Keep vibrant, don't desaturate
- Consistency in filter (if any)
- Daylight preferred

### Video
- 16:9 aspect ratio (desktop)
- 9:16 for mobile stories
- 30fps recommended
- Autoplay muted (except CTA)

---

## UI Kit Delivery

- Figma design file with all components
- CSS variables defined
- Component library (Storybook, optional)
- Accessibility checklist

---

## Pattern Library Documentation

Each component has documentation:
- Visual states (default, hover, active, disabled)
- Code examples
- Best practices
- Accessibility notes

---

**Última actualización**: Abril 2026
