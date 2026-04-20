# 09. Components Blueprint

## Objetivo

Inventario de componentes reutilizables y bloques UI que se necesitarán construir. No son componentes funcionales todavía - es especificación.

**Stack**: Next.js 15, React, Tailwind CSS, shadcn/ui

---

## Componentes Base (shadcn/ui + Tailwind)

Estos vienen con shadcn/ui, se personalizarán:
- Button (variants: primary, secondary, outline)
- Input, Textarea, Select, Checkbox, Radio
- Card
- Badge
- Dropdown Menu
- Dialog / Modal
- Tabs
- Accordion
- Skeleton (loading)
- Toast / Alert
- Pagination

---

## Componentes Turísticos (Custom)

### Marketing / Hero Layer

1. **HeroSection**
   - Full-width image + overlay
   - Headline + subheadline
   - CTA button (primary + secondary)
   - Responsive video background (optional)

2. **CtaBanner**
   - Sticky bottom (mobile) / inline (desktop)
   - "Consultar en WhatsApp" + optional form
   - Close button

3. **CategoryCard**
   - Icon
   - Title
   - Tours count
   - Link / Button

4. **TestimonialBlock**
   - Photo
   - Name
   - Star rating
   - Quote
   - Tour name

5. **ValueProp**
   - Icon
   - Title
   - Description
   - 3-4 per row

6. **NewsletterSignup**
   - Email input
   - Submit button
   - Success/error states

### Catálogo / Products

7. **TourCard** (Grid/List view)
   - Image (lazy-loaded)
   - Name
   - Star rating
   - "From $X" price
   - Duration badge
   - Category badge
   - CTA button
   - Hover effects

8. **TourCardMini** (Sidebar/Related)
   - Smaller version of TourCard
   - Name + price only

9. **FilterPanel** (Sidebar or Bottom Sheet mobile)
   - Destination checkboxes
   - Category checkboxes
   - Price range slider
   - Duration select
   - Difficulty buttons
   - [Clear] button

10. **SortDropdown**
    - Relevance, Price (asc/desc), Popular, Newest
    - Trigger: dropdown button

11. **TourGrid**
    - Container for tour cards
    - Responsive: 3 col / 2 col / 1 col
    - Pagination controls

12. **DestinationCard**
    - Image
    - Name
    - Tours count
    - CTA

### Tour Detail Page

13. **TourGallery** (Carousel)
    - Main image display
    - Thumbnail strip
    - Lightbox viewer
    - Next/prev buttons
    - Video embed support

14. **TourHeader** (Sticky section)
    - Name
    - Star rating + count
    - Price range
    - Duration
    - Difficulty
    - Location
    - CTA buttons

15. **ItineraryBlock**
    - Accordion or timeline
    - Time + title + description
    - Collapsible

16. **InclusionsList** & **ExclusionsList**
    - Icon prefix (✓, ✗)
    - Item text
    - Grid or list

17. **PracticalInfo**
    - Structured data display
    - Icon + label + value
    - Responsive layout

18. **MapBlock**
    - Embedded Google Map
    - Marker at location
    - Optional route

19. **FAQAccordion** (Tour-specific + Global)
    - Question as trigger
    - Answer as content
    - Multiple FAQs grouped

20. **ReviewsList** (Testimonials on tour page)
    - Grid of review cards
    - Empty state if none

21. **RelatedTours**
    - 3-4 related tour cards
    - Section title
    - "See all" link

22. **TourInquiryForm**
    - Name, email, phone, message fields
    - WhatsApp checkbox
    - Submit button
    - Validation feedback
    - Success message

### Navigation

23. **Header / Navigation**
    - Logo
    - Nav items (desktop horizontal)
    - Search icon
    - Mobile hamburger menu
    - Sticky on scroll (optional)

24. **MobileMenu** (Hamburger expanded)
    - Nav items
    - Newsletter signup
    - Social links
    - Close button

25. **Breadcrumb**
    - Home > Category > Item
    - Clickable links
    - Optional with schema

26. **Footer**
    - 4-5 columns
    - Branded section
    - Links columns
    - Social
    - Copyright

27. **FloatingWhatsApp** (Sticky CTA)
    - WhatsApp icon button
    - Tooltip/label
    - Bottom-right position (mobile)
    - Dismiss option

### Admin

28. **AdminHeader**
    - Logo/brand
    - Breadcrumb
    - User profile dropdown
    - Logout

29. **AdminSidebar**
    - Navigation menu
    - Collapse/expand
    - Active state indicators

30. **DataTable** (Tours, Leads, Blog)
    - Sortable columns
    - Filterable
    - Selectable rows (checkboxes)
    - Bulk actions dropdown
    - Pagination

31. **FormField** (Wrapper)
    - Label
    - Input/Textarea/Select
    - Validation error message
    - Required indicator

32. **RichTextEditor**
    - Toolbar: bold, italic, link, lists, etc.
    - Preview mode
    - Character count

33. **ImageUploader**
    - Drag & drop
    - File picker
    - Preview
    - Progress indicator
    - Error handling

34. **GalleryUploader**
    - Multiple image upload
    - Reorderable (drag-drop)
    - Thumbnail preview
    - Delete button per image

35. **StatusBadge**
    - Published / Draft / Archivado
    - Colored indicators
    - Small size

36. **KPICard** (Dashboard)
    - Number (large)
    - Label
    - Trend indicator (↑/↓)
    - Small chart (optional)

37. **ActionButtons**
    - Edit, Preview, Delete per row
    - Icon-only buttons
    - Confirm dialogs on delete

### Blog / Editorial

38. **BlogPostList**
    - Grid of blog cards
    - Featured image
    - Title, excerpt
    - Author, date
    - Category

39. **BlogPostCard**
    - Image
    - Title
    - Excerpt
    - Author + Date
    - Read more link

40. **BlogPostContent**
    - Rendered rich text
    - Image galleries
    - Embedded videos
    - Styling for headings, quotes, lists

41. **RelatedPosts** (Blog sidebar)
    - 3 related blog cards
    - Section title

42. **AuthorBio** (Blog post footer)
    - Author photo
    - Name
    - Bio
    - Social links

### Modals / Overlays

43. **ConfirmDialog**
    - Title, message
    - [Cancel] [Confirm] buttons
    - Warning icon (if critical)

44. **TourPreviewModal**
    - Shows tour as it appears on public site
    - Closable
    - Responsive

45. **LeadDetailDrawer** (Admin)
    - Slide-in from right (desktop) or bottom (mobile)
    - Full lead info
    - Notes, status, actions

### Forms / Inputs (Advanced)

46. **PriceRangeSlider**
    - Dual handles
    - Min/max display
    - Formatted currency

47. **DatePicker** (for future booking calendar)
    - Calendar widget
    - Range selection (start/end)
    - Disabled dates

48. **TimePicker**
    - Hour + minute selectors
    - 12h/24h toggle

49. **RepeaterField** (Admin)
    - Add field button
    - Remove per item
    - Reorder (drag-drop)
    - Used for: Itinerary, Inclusions, FAQs, etc.

50. **TagsInput**
    - Comma-separated or individual add
    - Remove tags
    - Autocomplete (optional)

### Status / Feedback

51. **LoadingSpinner**
    - Animated
    - Optional message
    - Full page vs inline

52. **EmptyState**
    - Icon
    - Message
    - CTA (if applicable)
    - Used for: No tours found, no reviews, etc.

53. **ErrorBoundary** (React error boundary)
    - Catches crashes
    - User-friendly error message
    - Retry button

54. **Toast / Notification**
    - Success, warning, error, info
    - Auto-dismiss (5sec)
    - Close button

---

## Component Organization

```
/components
├─ /ui                (shadcn/ui base)
│  ├─ Button.tsx
│  ├─ Card.tsx
│  └─ ...
│
├─ /marketing         (marketing/hero)
│  ├─ HeroSection.tsx
│  ├─ CtaBanner.tsx
│  ├─ TestimonialBlock.tsx
│  └─ ...
│
├─ /catalog           (product listing)
│  ├─ TourCard.tsx
│  ├─ FilterPanel.tsx
│  ├─ TourGrid.tsx
│  └─ ...
│
├─ /tour              (tour detail)
│  ├─ TourGallery.tsx
│  ├─ ItineraryBlock.tsx
│  ├─ TourInquiryForm.tsx
│  └─ ...
│
├─ /navigation        (nav, menu, footer)
│  ├─ Header.tsx
│  ├─ Footer.tsx
│  ├─ Breadcrumb.tsx
│  └─ ...
│
├─ /admin             (admin specific)
│  ├─ DataTable.tsx
│  ├─ FormField.tsx
│  ├─ ImageUploader.tsx
│  └─ ...
│
├─ /blog              (blog specific)
│  ├─ BlogPostCard.tsx
│  ├─ BlogPostContent.tsx
│  └─ ...
│
└─ /common            (generic/utility)
   ├─ LoadingSpinner.tsx
   ├─ EmptyState.tsx
   └─ ...
```

---

## Component Props Pattern (TypeScript)

```typescript
// Example pattern
interface TourCardProps {
  tour: Tour;
  variant?: 'grid' | 'mini';
  onClick?: () => void;
  className?: string;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  variant = 'grid',
  onClick,
  className,
}) => {
  // Implementation
};
```

---

## State Management for Components

- **Local state**: React useState (component-level)
- **Form state**: React Hook Form
- **Global state** (future): TBD (Context, Zustand, Jotai)
- **Server state**: TanStack Query (optional) or Next.js built-in

---

## Accessibility Requirements (WCAG AA)

All components must have:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Color contrast > 4.5:1 for text

---

**Última actualización**: Abril 2026
