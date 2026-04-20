# 14. Technical Decisions (ADRs - Architecture Decision Records)

## Objetivo

Documentar decisiones técnicas clave con justificación, alternativas consideradas, y trade-offs. Sirve como referencia para futuro.

---

## ADR-001: Framework Frontend

### Decision
**Next.js 15 + TypeScript + App Router**

### Alternatives Considered
1. Remix - Excelente SSR/streaming, pero más complejo
2. Astro - Perfecto para static, pero necesitamos dinámico
3. SvelteKit - Gran UX dev, pero menor ecosistema

### Justification
- ✅ **SEO**: Server-side rendering nativo, metadata API, sitemap helpers
- ✅ **Performance**: Image optimization, code splitting automático
- ✅ **Full-stack**: API routes en mismo proyecto
- ✅ **Ecosystem**: shadcn/ui, Tailwind, React Hook Form integrados
- ✅ **Deployment**: Vercel, Netlify, self-hosted via Node
- ✅ **TypeScript**: Type-safety end-to-end

### Trade-offs
- ❌ Steeper learning curve vs Create React App
- ❌ Node.js server requirement
- ✅ Worth it para production turístico

### Migration Path
Si en futuro necesitamos cambiar: API y CMS son agnósticos, frontend es replaceable

---

## ADR-002: Database Technology

### Decision
**PostgreSQL + Prisma ORM**

### Alternatives Considered
1. MongoDB - Flexible pero nolucene full-text search
2. Supabase (managed Postgres) - Excelente pero vendor lock-in
3. MySQL - Funciona pero Postgres > PostgreSQL para JSON/features

### Justification
- ✅ **ACID compliance**: Consistency crítica para tours, leads, payments
- ✅ **JSON support**: jsonB para campos flexible
- ✅ **Full-text search**: Native FTS índices
- ✅ **Relationships**: Foreign keys, constraints
- ✅ **Scalability**: Partitioning, replication, columnar (future)
- ✅ **Prisma**: Type-safe migrations, autocomplete en queries

### Trade-offs
- ❌ SQL vs NoSQL: Schema más restrictivo
- ✅ Para negocio (finanzas reales después), **ACID is mandatory**

### Self-Hosted vs Managed
- **Option A**: Self-hosted (DigitalOcean app, AWS RDS)
  - Pros: Control total, cheaper at scale
  - Cons: Mantenimiento
  - **Recommendation**: V1 managed (AWS RDS), V3+ self-hosted si scale demands

---

## ADR-003: CMS & Admin Solution

### Decision
**Payload CMS (Self-hosted via Next.js)**

### Alternatives Considered
1. Strapi - Popular, pero sin relación automática con frontend code
2. Contentful - Headless, pero caro
3. Custom admin (React + Tailwind) - Control total, 2x development
4. Dato CMS - Excelente pero caro

### Justification for Payload CMS
- ✅ **Same codebase**: Admin y frontend en mismo repo
- ✅ **TypeScript Models**: Define schemas en code, auto-generate DB + API + UI
- ✅ **Flexible**: No locked into opinionated structure
- ✅ **Self-hosted**: No SaaS costs, data stays in-house
- ✅ **Open source**: Community, no vendor risk
- ✅ **Admin UI**: Beautiful built-in, no custom Figma → code needed

### Trade-offs
- ❌ Menos polished que Strapi/Contentful
- ❌ Comunidad más pequeña
- ✅ Worth it para control & cost

### Alternative: Custom Admin (React)
Si Payload agrega friction:
- Build admin con Next.js API routes + React tablas
- Total ~2-3 weeks additional
- Plan B si Payload no es suficiente

---

## ADR-004: Styling Approach

### Decision
**Tailwind CSS + shadcn/ui**

### Alternatives Considered
1. styled-components - CSS-in-JS, pero overhead
2. CSS Modules - Funciona, más verbose
3. BEM + vanilla CSS - Too manual
4. Material-UI - Beautiful pero heavy

### Justification
- ✅ **Utility-first**: Rápido de construir, cambios sin nuevo CSS
- ✅ **Component library**: shadcn/ui componentes quality, copiables (no node_modules)
- ✅ **Tree-shaking**: Solo CSS usado
- ✅ **Responsive**: Tailwind responsive built-in
- ✅ **Dark mode**: Support nativo (future)

### Trade-offs
- ❌ HTML "noisy" with classes
- ✅ Desarrollo ultra-rápido en realidad

---

## ADR-005: Form State Management

### Decision
**React Hook Form + Zod para validación**

### Alternatives Considered
1. Formik - Más pesado, overhead
2. Final Form - Ligero pero menos popular
3. VeeValidate - Vue, not React
4. Tanstack Form - Newer, but RHF más establecido

### Justification
- ✅ **Lightweight**: ~8kb minified
- ✅ **Performance**: No re-render whole form on input
- ✅ **Validation**: Zod runtime validation + schema inheritance
- ✅ **Integration**: Works con cualquier input (custom, shadcn)
- ✅ **TypeScript**: Type-safe form data

### Server Validation (Backend)
- Same Zod schema en backend (share TS types)
- Nunca confiar en client-side ✓

---

## ADR-006: Authentication

### Decision
**NextAuth.js v5 para admin**

### Alternatives Considered
1. Auth0 - SaaS, $$
2. Firebase Auth - Vendor lock-in
3. Custom JWT - Trabajo, pero inseguro si mal hecho
4. Supabase Auth - Managed, pero tied to Supabase

### Justification
- ✅ **Self-hosted**: Sessions stays in-house
- ✅ **Open source**: Community, no vendor risk
- ✅ **Flexible**: Soporta OAuth, credentials, custom providers
- ✅ **Security**: Best practices built-in (CSRF, secrets)
- ✅ **Rate limiting**: Protección contra brute force

### Why NOT OAuth for Tier-1?
- ✅ OAuth agregará complejidad
- Future: Agregar "Login with Google" en V2
- V1: Simple email + password suficiente

---

## ADR-007: Media Storage

### Decision
**Cloudinary (SaaS CDN)**

### Alternatives Considered
1. AWS S3 - Full control pero engineering overhead
2. Bunny CDN - Barato pero menos features
3. Local storage - NON-STARTER (unreliable)
4. Imgix - Sofisticado pero overhead

### Justification
- ✅ **CDN global**: Entrega rápida worldwide
- ✅ **Transformations**: Resize, crop, quality, formato (WebP)
- ✅ **Optimizations**: AVIF, responsive images auto
- ✅ **Analytics**: Delivery metrics, usage
- ✅ **Easy integration**: Upload API, URL-based transformation

### Scaling
- V1-V2: Cloudinary es perfecto
- V3+: Si volumen muy alto, evaluar S3 + CloudFront

---

## ADR-008: Maps Integration

### Decision
**Google Maps API**

### Alternatives Considered
1. Mapbox - Excelente, pero$$
2. OpenStreetMap (Leaflet) - Libre, pero UX not as polished
3. Apple Maps - Limited (no web)

### Justification
- ✅ **Familiar**: Usuarios conocen Google Maps
- ✅ **Features**: Lugares, rutas, direcciones, streetview
- ✅ **Pricing**: Generous free tier
- ✅ **Accuracy**: Best en Colombia

### Cost Management
- Free tier: 1000 loads/day
- V1: Suficiente
- V2+: Si excede, Quota alerting + Mapbox fallback

---

## ADR-009: Analytics

### Decision
**GA4 (Google Analytics 4) + Meta Pixel + GTM**

### Alternatives Considered
1. Plausible - Privacy-first pero limited
2. Mixpanel - Event tracking premium
3. Amplitude - Modern analytics pero$$
4. Self-hosted: Posthog - Control, pero overhead

### Justification
- ✅ **GA4**: Industria estándar, free, conversions + behavior
- ✅ **Meta Pixel**: Prerequisite para ads Facebook/Instagram
- ✅ **GTM**: Tag manager, flexible para futuro integrations
- ✅ **Data**: Google Search Console integration nativa

### Privacy
- ✓ GDPR-ready: User consent before tracking (cookie banner V2)
- ✓ No PII en analytics
- ✓ Anonimización en GA4

---

## ADR-010: Error Handling & Monitoring

### Decision
**Sentry (optional) + Custom logging to DB**

### Alternatives Considered
1. Datadog - $$, overkill for V1
2. New Relic - Similar
3. Custom: Cloud logging via Winston → CloudWatch

### Justification for Sentry
- ✅ **Error tracking**: Automatic source maps, grouping
- ✅ **Performance monitoring**: Metrics, traces
- ✅ **Pricing**: Generous free tier
- ✅ **Async logs**: No blocks request

### V1 Approach
- Sentry: JavaScript errors (frontend)
- DB logging: API errors, business events
- Simple: Bueno para V1
- V3+: Si scale demands, agregar full distributed tracing

---

## ADR-011: Deployment & Hosting

### Decision
**Vercel (Next.js) + AWS RDS (Database) + Cloudinary (Media)**

### Alternatives Considered
1. Fly.io - Great pero menor integración Next.js
2. Render - Full-stack, pero Vercel > para Next
3. Self-hosted (DO App Platform) - Control, ops overhead
4. AWS EC2 - Control total, pero más setup

### Justification for Vercel
- ✅ **Next.js native**: Auto-scaling, edge, image optimization
- ✅ **Edge functions**: Future: geolocation, redirects, A/B testing
- ✅ **Analytics**: Web Core Vitals built-in
- ✅ **Environment**: Staging, preview deploys fácil
- ✅ **Pricing**: Generous free tier for startups

### Database: AWS RDS
- ✅ **Managed**: Automático backups, patches
- ✅ **Ha**: Multi-AZ para reliability
- ✅ **Integration**: VPC security, IAM
- ✅ **Monitoring**: CloudWatch metrics

### All-in-One Alternative
- Render.com: Hosting + DB, 1 vendor, simpler
- Consideration si Vercel + AWS complexity issue early

---

## ADR-012: Email Service

### Decision
**Resend (SMTP) para transaccionales**

### Alternatives Considered
1. SendGrid - Confiable, pero caro
2. AWS SES - Barato, pero setup DKIM
3. Brevo (Sendinblue) - Good, pero Resend más moderno
4. Custom: Nodemailer + SMTP propio

### Justification
- ✅ **Modern SDK**: Type-safe, React emails (future)
- ✅ **Pricing**: Affordable, pay-per-send
- ✅ **Deliverability**: High deliverability rate
- ✅ **Analytics**: Open/click tracking
- ✅ **Simplicity**: Setup in 5 min

### Newsletter (Future)
- Resend para transaccionales
- Brevo o Mailchimp para bulk newsletters (V2)

---

## ADR-013: Search Implementation

### Decision
**Database FULL-TEXT SEARCH (V1) → Elasticsearch (V3)**

### Rationale
- V1: Simple text search en PostgreSQL FTS
- V2: Aggregate search, filters mejores
- V3: Si volumen excede, Elasticsearch para advanced

### Why Not Algolia now?
- Algolia es $$
- PostgreSQL FTS funciona para V1
- Algolia es plan B si performance issue

---

## ADR-014: Testing Strategy

### Decision
**Vitest (unit) + Playwright (E2E)**

### Alternatives Considered
1. Jest - Pero Vitest más rápido
2. Cypress - Pero Playwright > para modern web
3. No testing - Risk

### Justification
- ✅ **Vitest**: ESM native, Vite integration, rápido
- ✅ **Playwright**: Cross-browser, reliable, Microsoft-backed
- ✅ **Coverage**: Unit + E2E, no need for Integration layer

### Testing Pyramid
```
E2E (10% de tests): User workflows critcales
Unit (70%): Logic components, services
Integration (20%): API responses
```

---

## ADR-015: Environment Management

### Decision
**.env.local (secrets) + .env shared (non-secrets)**

### Secrets Management
- Vercel: Secrets via UI dashboard (never git)
- Local: .env.local in .gitignore
- Production: Environment variables via platform

---

## Security Decisions

### HTTPS
- ✓ Always (no HTTP)
- ✓ HSTS headers

### CORS
- ✓ Allow frontend origin only
- ✓ Credentials mode for API

### SQL Injection
- ✓ Prisma parameterized queries (never raw SQL)

### XSS
- ✓ React auto-escaping
- ✓ Content-Security-Policy headers

### CSRF
- ✓ NextAuth CSRF tokens
- ✓ SameSite cookies

### Rate Limiting
- ✓ API endpoints: 100 req/hour public, 1000 authenticated
- ✓ Form submissions: Captcha si needed

---

## Performance Targets

- **LCP**: < 2.5s (Largest Contentful Paint)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **FID**: < 100ms (First Input Delay)
- **TTL**: < 3s (Time to Load)
- **Images**: Next-gen formats, lazy-loaded
- **Code**: Code-split per route

---

## Versioning Strategy

### Semantic Versioning
```
MAJOR.MINOR.PATCH
1.0.0 = V1 launch
1.1.0 = New features (V1.1 / V2-ish)
1.0.1 = Bug fix
```

### API Versioning
```
/api/v1/tours (current)
/api/v2/tours (future if schema breaking change)
```

---

## Risk Mitigation

### Tech Risk: Payload CMS not sufficient
- **Mitigation**: Build custom admin as backup (2-3 weeks)
- **Decision point**: Week 2 of dev, test Payload thoroughly

### Performance Risk: Slow at scale
- **Mitigation**: Load testing early, caching layer ready
- **Decision point**: If LCP > 3s on staging, optimize immediately

### Data Risk: Database failure
- **Mitigation**: AWS RDS multi-AZ, automated backups, restoration plan
- **Testing**: Quarterly backup restoration drill

---

**Última actualización**: Abril 2026
