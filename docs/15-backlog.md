# 15. Backlog - V1 Priorizado

## Objetivo

Backlog detallado y priorizado para V1. Organizadoenmarcospor épicas, historias de usuario, y tareas técnicas.

---

## Épicas V1

```
ÉPICA 1: Platform Foundation (Tech setup)
├─ Setup proyecto Next.js + tooling
├─ Database schema + Prisma
├─ Auth admin (NextAuth)
└─ Deployment pipeline

ÉPICA 2: Core Product (Frontend)
├─ Home page
├─ Tours: listado + filtros
├─ Tour: ficha individual
├─ Destinos: listado + páginas
└─ Nav, footer, mobile responsiveness

ÉPICA 3: Admin Operacional
├─ Dashboard
├─ Tours CRUD management
├─ Leads management
├─ Settings
└─ Users management

ÉPICA 4: Content & SEO
├─ Meta tags + schema
├─ Sitemap + robots.txt
├─ Blog setup (opcional)
├─ initial content (tours, destinos)
└─ Analytics setup

ÉPICA 5: Conversión & CRM
├─ Lead form submission
├─ Email auto-reply
├─ WhatsApp CTA buttons
└─ Lead tracking

ÉPICA 6: QA & Launch
├─ Testing (unit + E2E)
├─ Security audit
├─ Performance optimization
├─ Launch checklist
└─ Monitoring setup
```

---

## Sprint Breakdown (Weekly Sprints)

### Sprint 1: Foundation (Week 1)
**Goal**: Project setup, database, auth

| Story | Size | Priority | Details |
|-------|------|----------|---------|
| Setup Next.js 15 project | 2d | P0 | Init, env, Docker, CI/CD |
| Configure Tailwind + shadcn/ui | 1d | P0 | Design tokens, custom theme |
| Database schema design | 2d | P0 | Create all tables, indexes, migrations |
| Setup Prisma + seed data | 1d | P0 | Migrations, seed scripts |
| Admin auth (NextAuth.js) | 2d | P0 | Login, roles, session management |
| Deploy setup (Vercel, RDS) | 1d | P0 | Infrastructure, env vars |

**Deliverable**: Project buildable, database live, admin login works

---

### Sprint 2: Home + Tours Listing (Week 2)
**Goal**: Homepage y tours listing funcionales

| Story | Size | Priority | Details |
|-------|------|----------|---------|
| Home page design + build | 3d | P0 | Hero, categories, featured tours, CTA |
| Tours listing page | 3d | P0 | Grid, basic filters (dest, cat, price) |
| Tour card component | 1d | P0 | Reusable card para listado |
| Filter functionality | 2d | P0 | Client-side + server-filtered queries |
| Pagination | 1d | P0 | Next/prev, page numbers |
| Navigation + header | 1d | P0 | Logo, menu, search |
| Footer | 1d | P0 | Links, socials, legales |

**Deliverable**: Home + Tours listing live, filters work, mobile responsive

---

### Sprint 3: Tour Ficha + Admin (Week 3)
**Goal**: Tour detail page + admin tour CRUD

| Story | Size | Priority | Details |
|-------|------|----------|---------|
| Tour detail page layout | 2d | P0 | Gallery, itinerary, incluye/excluye |
| Tour gallery component | 2d | P0 | Carousel, thumbnails, lightbox |
| Tour detail data queries | 1d | P0 | Fetch tour + related data |
| Admin tours list page | 2d | P0 | Table, filters, bulk actions |
| Admin tour create form | 2d | P0 | Multi-tab form,media upload |
| Admin tour edit | 1d | P0 | Edit + validation |
| Admin tour delete | 1d | P0 | Soft delete, confirm dialog |

**Deliverable**: Tour ficha + admin tour management MVP

---

### Sprint 4: Destinos + Leads (Week 4)
**Goal**: Destinations pages + leads capture

| Story | Size | Priority | Details |
|-------|------|----------|---------|
| Destinations listado | 1d | P0 | Cards, grid, mobile |
| Destination hub page | 2d | P0 | Description, tours, map |
| Leads form integration | 2d | P0 | Form + API endpoint + DB save |
| Admin leads table | 2d | P0 | List, filter, bulk mark responded |
| Lead detail drawer | 1d | P0 | View full info, notas, actions |
| Email auto-reply service | 2d | P0 | Resend integration, templates |
| WhatsApp CTA button | 1d | P0 | Sticky + inline, prefilled message |

**Deliverable**: Lead capture flow end-to-end, admin can see leads

---

### Sprint 5: SEO + Blog (Week 5)
**Goal**: SEO foundation + initial blog content

| Story | Size | Priority | Details |
|-------|------|----------|---------|
| Meta tags per page | 1d | P0 | Title, description, OG tags |
| XML sitemap generation | 1d | P0 | Dynamic, includes tours/destinos |
| Schema markup (JSON-LD) | 2d | P0 | Tour, Destination, FAQPage |
| robots.txt + canonical | 1d | P0 | Setup crawlable structure |
| Google Analytics 4 setup | 1d | P0 | GTM container, events |
| Blog listing page | 2d | P1 | Cards, pagination |
| Blog post template | 1d | P1 | Rich text rendering, formatting |
| Write 5 pillar blog posts | 5d | P1 | SEO-optimized, 3000 words each |

**Deliverable**: SEO foundation, 5 blog articles published

---

### Sprint 6: Admin Dashboard + Content (Week 6)
**Goal**: Admin dashboard + content management

| Story | Size | Priority | Details |
|-------|------|----------|---------|
| Admin dashboard | 2d | P0 | KPI cards, recent leads, quick actions |
| Admin destinations CRUD | 2d | P1 | Manage destinations |
| Admin categories management | 1d | P1 | Manage activity types |
| Admin settings page | 1d | P0 | Brand, contact, SEO config |
| Admin users management | 1d | P1 | Invite, permissions |
| Upload 30-50 tours | 3d | P0 | Into CMS, publish |
| Create 4-5 destinations | 2d | P0 | Media + content |
| Testimonials management | 1d | P1 | List, approve, featured |

**Deliverable**: Admin fully functional for tour operators, content loaded

---

### Sprint 7: Polish + QA (Week 7)
**Goal**: Testing, bugs, performance optimization

| Story | Size | Priority | Details |
|-------|------|----------|---------|
| Unit tests (components) | 3d | P1 | Vitest coverage on critical paths |
| E2E tests (user flows) | 2d | P0 | Playwright: signup, tour explore, lead |
| Performance optimization | 2d | P0 | Images, code-split, LCP <2.5s |
| Mobile testing | 2d | P0 | Devices, gestures, forms |
| Security audit | 1d | P1 | OWASP top 10 review |
| Bug fixes | 3d | P0 | QA feedback |
| Monitoring setup (Sentry) | 1d | P0 | Error tracking, alerting |

**Deliverable**: All tests green, Core Web Vitals > 50, zero critical bugs

---

### Sprint 8: Launch Preparation (Week 8)
**Goal**: Final checks and launch

| Story | Size | Priority | Details |
|-------|------|----------|---------|
| Launch checklist review | 1d | P0 | Docs, terms, privacy |
| DNS + SSL certificates | 1d | P0 | Domain setup |
| Backups + disaster recovery | 1d | P0 | Test restoration |
| Setup monitoring alerts | 1d | P0 | Sentry, errors, uptime |
| Documentation | 2d | P1 | Admin guide, developer onboarding |
| Training session (operator) | 1d | P0 | How to use CMS |
| Launch day: Monitor | 2d | P0 | Watch for issues |

**Deliverable**: Production deployment, all systems up, team trained

---

## Story Template

### Example: "Tours Listing Page"

```
Title: Tours Listing with Filters

Description:
As a user,
I want to see all available tours
And filter by destination, category, price, duration
So that I can find tours matching my preferences

Acceptance Criteria:
[ ] Table/grid displays 20 tours per page
[ ] Filter panel shows:
    - Destination (checkboxes)
    - Category (checkboxes)
    - Price range (slider)
    - Duration (select)
[ ] Results update on filter change
[ ] Sorted by "Relevance" default
[ ] Mobile: filters in bottom sheet
[ ] No results state: friendly message
[ ] Pagination works (next/prev/numbers)
[ ] URL params reflect filters (?dest=guatape)

Technical Notes:
- Use TanStack Query for data fetching (optional)
- Filters stored in URL params (shareable)
- Server-side filtering for performance
- Client-side pagination OK for MVP

Testing:
- Unit: Filter logic
- E2E: User applies filters, sees results
- Mobile: Gestual swipe filters

Estimate: 3 days
```

---

## Technical Debt / Known Issues

### V1 Known Limitations
- [ ] Blog articles manually written (no AI generation)
- [ ] Leads export to CSV only (no CRM sync yet)
- [ ] No newsletter automation (manual lists)
- [ ] Search is basic PostgreSQL FTS (no Elasticsearch)
- [ ] Mobile app: Not yet (web-only)
- [ ] Payment: Not implemented
- [ ] Real booking calendar: Not implemented

### Documented for V2+
All above ready as issues/features for future sprint

---

## Definition of Done (DoD)

Cada story requires:
- [ ] Code review + approval
- [ ] Unit tests (>80% coverage)
- [ ] E2E tests para user-facing features
- [ ] No console errors/warnings
- [ ] Mobile responsive (tested on device)
- [ ] Accessibility: WCAG AA passed (Axe, manual)
- [ ] Performance: LCP <2.5s
- [ ] Documentation updated
- [ ] Merged to main branch

---

## Risk Backlog

Contingency stories if blockers:
- "Custom admin if Payload CMS insufficient" (2 weeks)
- "Alternative payment if Stripe integration fails"
- "Manual email if Resend down" (fallback to SMTP)

---

## Dependencies

### External
- Cloudinary account setup, API key
- Google Maps API key
- GA4 property creation
- Resend API key
- Vercel project + RDS provisioned

### Internal
- Content team: 30-50 tours content writing
- Design: Final approval on component library
- Product: Stakeholder sign-on on MVP scope

---

## Metrics Success V1 Launch

- [ ] 0 critical bugs Week 1 post-launch
- [ ] 99.9% uptime
- [ ] >50 tours published
- [ ] >100 leads captured in first month
- [ ] >1000 organic sessions
- [ ] Core Web Vitals: Green (>50 score)
- [ ] NPS: >20 (from operator feedback)

---

## Team Allocation (Suggested)

```
Tech Lead (1): Planning, architecture review, blockers
Frontend Dev (1): Components, pages, UX
Backend Dev (1): API, database, services
Designer/UX (0.5): Design, testing, accessibility
QA (0.5): Testing, bug reporting
Content (1): Tours, destinations writing
DevOps (0.5): Deployment, monitoring
```

---

## Communication Plan

- **Daily**: 30min standup (blockers, progress)
- **Weekly**: Sprint review (demo to stakeholders)
- **Weekly**: Sprint retro (improve process)
- **Ad-hoc**: Async updates in Slack #dev channel

---

**Última actualización**: Abril 2026