# 11. Roadmap: V1, V2, V3

## Objetivo

Definir fases de desarrollo y qué funcionalidades entran en cada versión.

---

## V1: MVP Comercial (4-6 semanas)

**Objetivo**: Lanzar plataforma turística funcional, SEO-ready, generadora de leads

### Core Features
- ✅ Home comercial + Hero
- ✅ Tours: Listado + Filtros + Ficha detallada
- ✅ Destinos: Hub page (Medellín, Guatapé, etc.)
- ✅ Blog: Artículos estratégicos (5-10)
- ✅ Contacto: Formulario + WhatsApp CTA
- ✅ Admin: Dashboard + Tours CRUD + Leads management
- ✅ SEO: Meta tags, sitemap, schema markup, robots.txt
- ✅ Performance: LCP <2.5s, CLS <0.1
- ✅ Mobile: Fully responsive
- ✅ Auth: Login admin (NextAuth)

### Technical Stack
- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL
- Cloudinary media
- Google Analytics 4
- Meta Pixel
- Resend (email)

### Launch Content
- 30-50 tours publicados (de 2-3 operadores)
- 5 destinos principales
- 10 blog posts pillar
- 50+ testimonials

### Metrics Target
- 1000+ organic sessions/month (end of month 1)
- >15% conversion to leads
- >1 second LCP mobile
- 100+ leads in first month

### Out of Scope (V1)
- ❌ Booking real (calendar, payment)
- ❌ Newsletter campaign système
- ❌ Marketplace (multi-operator UI)
- ❌ AI/Chatbot
- ❌ Advanced analytics reporting
- ❌ WhatsApp API integration (manual links only)

---

## V2: Growth & Engagement (Weeks 7-16 After V1)

**Objetivo**: Scalabilidad, personalización, monetización prep

### Features
- ✅ Destinos: Páginas completas (tourism hubs)
- ✅ Categorías: `/actividades/[type]` con tours filtrados
- ✅ Blog: Estrategia de 50+ artículos, SEO clustering
- ✅ Testimoniales: Wall completo + easy submission
- ✅ Newsletter: signup + automation (Resend/Brevo)
- ✅ User Accounts: Saved tours, history, preferences
- ✅ Marketplace UI: Multi-operator profiles (basic)
- ✅ Analytics: Reports dashboard (leads by source, tour performance)
- ✅ Advanced filtering: Nivel físico, audiencia, equipo
- ✅ Personalization: "Recomendado para ti" (basic ML)
- ✅ SMS/Push: Notifications (optional partner)
- ✅ Admin: Testimonial moderation, blog categories, bulk ops

### Content Growth
- 150+ tours (5-10 operadores)
- 20+ destinos
- 50+ blog articles
- Featured partners section

### Metrics Target
- 5000+ organic sessions/month
- $XX revenue (si booking o ads)
- 40%+ retention rate
- +20% conversion from newsletter

---

## V3: Agentización y Booking Real (Month 5+)

**Objetivo**: IA, transacciones, marketplace completo

### Features
- ✅ Booking System: Calendar, real-time availability, payment (Stripe/PayPal)
- ✅ AI Chatbot: Recomendaciones inteligentes, FAQ automation
- ✅ CRM: Lead scoring, pipeline, email automation
- ✅ Marketplace: Full multi-operador, ratings, revenue share
- ✅ Mobile App: iOS/Android native (React Native)
- ✅ WhatsApp Business API: Official integration, templates
- ✅ Email Marketing: Segmentation, A/B testing, automation
- ✅ User Workflows: Booking confirmation, reminders, reviews
- ✅ Advanced Analytics: Cohort analysis, LTV, CAC
- ✅ Affiliates: Commission system
- ✅ Loyalty: Points/rewards (optional)

### Operational
- 500+ tours
- 50+ operadores
- 1000+ monthly bookings potential
- Professional support team

### Tech Expansion
- Microservices (optional)
- Elasticsearch: Advanced search
- Redis: Caching, real-time
- Stripe: Payments
- Twilio/Meta API: SMS/WhatsApp
- Custom ML: Personalization engine
- Mobile apps: React Native

### Revenue Streams
- Commission per booking (15-20%)
- Operator subscription (featured placement)
- Sponsored tours/destinations
- Affiliate partnerships
- Ad space

---

## V4+: Platform Ecosystem (Year 2+)

**Vision**: Regional tourism super-app

### Possibilities
- Hotel/accommodation integration
- Flight bookings
- Travel insurance
- Guides marketplace
- Reviews/ratings platform like TripAdvisor
- Offline communities
- AR experiences (location-based)
- Video streaming (behind paywall)

---

## Development Timeline (Approximate)

```
Month 1-2      Month 3-4      Month 5-6      Month 7+
V1 Build       V1 Launch      V2 Build       V1 Maintain
               ↓              ↓              + V2 Features
               Launch         Launch         + V3 Features
               (Live)         (Features)
```

---

## Release Cadence

After V1 launch:
- **Every 2 weeks**: Bug fixes + small improvements
- **Monthly**: New features + content updates
- **Quarterly**: Major feature releases (V2, V3, etc.)

---

## Feature Priority Matrix

### Must Have (V1)
- Home, Tours, Ficha, Admin, Leads, SEO

### Should Have (V1)
- Blog, Destinos, Contact, Mobile optimization

### Nice to Have (V2)
- Saved tours, Categories, Newsletter, Advanced filtering

### Future (V3+)
- Booking, AI, Marketplace, Payments

---

## Measurement of Success per Version

### V1 Success Criteria
- [ ] 0 critical bugs in first 2 weeks
- [ ] >50 tours published
- [ ] >100 leads captured
- [ ] >1000 organic sessions/month
- [ ] 4.5+ avg page speed score
- [ ] 99.9% uptime

### V2 Success Criteria
- [ ] 150+ tours
- [ ] 5000+ organic sessions/month
- [ ] 500+ active leads in pipeline
- [ ] 3x improvement in newsletter ROI vs V1
- [ ] 40%+ of users return (intent-driven features work)

### V3 Success Criteria
- [ ] First 100 real bookings
- [ ] AI chatbot resolves 30% of inquiries
- [ ] 10+ operadores activos
- [ ] $XX revenue/month
- [ ] NPS score >40

---

## Dependencies & Blockers

### V1
- ✅ No externos, todo in-house

### V2
- Affiliates/partners para newsletter
- User behavior data (GA4 setup)

### V3
- Payment processor integration (Stripe)
- AI service (custom or OpenAI/Anthropic API)
- WhatsApp Business approval
- Mobile app infrastructure

---

## Flexibility & Pivots

Este roadmap es indicativo. Puede cambiar based on:
- Market feedback
- Operator demands
- Competitive moves
- Team capacity

Monthly review + adjustment.

---

**Última actualización**: Abril 2026
