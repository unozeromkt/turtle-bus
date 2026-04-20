# Turtle Bus - Plataforma Turística Medellín, Guatapé y Antioquia

## Visión General

Plataforma web turística profesional y escalable para comercializar tours y experiencias immersivas en Medellín, Guatapé y la región de Antioquia. Proyecto en **Fase 0 (Planificación y Arquitectura)**.

La plataforma será:
- **Comercial**: Orientada a conversión y ventas
- **Premium pero accesible**: Experiencias de alto valor para viajeros nacionales e internacionales
- **Mobile-first**: Experiencia fluida en dispositivos
- **SEO robusta**: Posicionamiento orgánico para tours y destinos
- **Escalable**: Preparada para crecer en tours, destinos, operadores y funcionalidades
- **Inteligente**: Arquitectura lista para futuras integraciones (pagos, CRM, IA)

---

## Propósito de la Fase 0

Esta fase no es desarrollo de code. Es **construcción de cimientos**:
- ✅ Definir estrategia de producto y UX
- ✅ Mapear arquitectura técnica
- ✅ Especificar base de datos y APIs
- ✅ Documentar panel administrativo
- ✅ Planificar SEO y contenido
- ✅ Preparar roadmap de desarrollo
- ✅ Sentar estándares de calidad y escalabilidad

Al finalizar esta fase, un equipo técnico podrá comenzar desarrollo inmediatamente sin ambigüedades.

---

## Stack Recomendado (No implementado aún)

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| **Frontend** | Next.js 15 + TypeScript + App Router | Performance, SEO nativo, React moderno |
| **UI/Componentes** | Tailwind CSS + shadcn/ui | Velocidad, theming consistente, accessible |
| **Formularios** | React Hook Form + Zod | Validación tipada, UX de formularios |
| **CMS/Admin** | Payload CMS | Flexible, admin poderoso, TypeScript |
| **Base de Datos** | PostgreSQL | Escalable, ACID, jsonb para flexibilidad |
| **ORM** | Prisma | Type-safe, migraciones, query builder |
| **Auth** | NextAuth.js v5 | Estándar, OAuth ready, multi-role |
| **Media Storage** | Cloudinary | CDN global, transformaciones, optimización |
| **Maps** | Google Maps API | Ubicaciones tours, rutas, UX familiar |
| **Analytics** | GA4 + GTM + Meta Pixel | Conversión, comportamiento, CRM future |
| **Email** | Resend | Newsletters, transaccionales preparados |
| **WhatsApp** | Meta WhatsApp API | Consultas, notificaciones, conversión |
| **Cache** | Redis (opcional) | Performance, caché de tours |
| **Search** | Elasticsearch (V2+) | Búsqueda avanzada, filtros complejos |

---

## Estructura del Repositorio

```
turtle-bus/
├── README.md                           # Este archivo
├── LICENSE.md                          # Licencia del proyecto
│
├── docs/                               # Documentación completa
│   ├── 01-product-vision.md           # Visión, objetivos, diferenciadores
│   ├── 02-benchmark-analysis.md       # Análisis guatape.travel y referencias
│   ├── 03-information-architecture.md # Mapa del sitio, navegación
│   ├── 04-page-inventory.md           # Listado de páginas V1
│   ├── 05-seo-strategy.md             # Estrategia SEO técnica y contenidos
│   ├── 06-admin-panel-spec.md         # Especificación del admin del cliente
│   ├── 07-database-schema.md          # Esquema de datos completo
│   ├── 08-api-modules.md              # Endpoints y servicios backend
│   ├── 09-components-blueprint.md     # Inventario de componentes
│   ├── 10-user-flows.md               # Flujos de usuario principales
│   ├── 11-roadmap-v1-v2-v3.md         # Fases de desarrollo
│   ├── 12-content-model.md            # Estructura de contenidos editoriales
│   ├── 13-design-system-foundation.md # Colores, tipografía, reglas UI
│   ├── 14-technical-decisions.md      # ADRs, trade-offs, arquitectura
│   └── 15-backlog.md                  # Backlog de desarrollo priorizado
│
├── frontend/                           # (Vacío - se llenará en Fase 1)
│   ├── /src
│   ├── /public
│   └── ...
│
├── cms/                                # (Vacío - CMS se configurará en Fase 1)
│   ├── /admin
│   └── ...
│
├── backend/                            # (Vacío - se llenará en Fase 1)
│   ├── /services
│   ├── /routes
│   └── ...
│
├── database/                           # Scripts de BD (se llenará en Fase 1)
│   ├── /migrations
│   └── /seeds
│
└── .cursor/                            # Configuración del proyecto
    └── rules.md                        # Reglas de desarrollo (TBD)
```

---

## Cómo Navegar Esta Documentación

1. **Si eres Product/UX**: Lee `01-product-vision.md` y `02-benchmark-analysis.md`
2. **Si eres Frontend Developer**: Lee `03-information-architecture.md`, `04-page-inventory.md`, `09-components-blueprint.md`, `13-design-system-foundation.md`
3. **Si eres Backend Developer**: Lee `07-database-schema.md`, `08-api-modules.md`, `14-technical-decisions.md`
4. **Si eres SEO Specialist**: Lee `05-seo-strategy.md` y `12-content-model.md`
5. **Si eres Admin de Negocios**: Lee `06-admin-panel-spec.md` y `11-roadmap-v1-v2-v3.md`
6. **Si eres Arquitecto/Tech Lead**: Lee todo, especialmente `14-technical-decisions.md` y `15-backlog.md`

---

## Estado Actual

🟡 **Fase 0: Planificación y Arquitectura**
- [x] Definición de producto
- [x] Benchmarking y análisis competitivo
- [x] Arquitectura técnica
- [x] Esquema de datos
- [x] Especificación admin panel
- [x] Estrategia SEO
- [x] Documentación completa
- [ ] **Siguiente**: Fase 1 - Setup técnico y primeros componentes

---

## Principios Fundacionales

Este proyecto sigue estos principios NO negociables:

### 1. **Conversión Primero**
- Toda decisión de UX debe maximizar la probabilidad de reserva o consulta vía WhatsApp
- CTA visible permanentemente
- Urgencia y social proof integrados

### 2. **SEO Integrado desde Cero**
- Estructura de URLs semántica
- Schema markup para tours y destinos
- Estrategia de contenido pensada para posicionamiento
- Clusters editoriales de contenido

### 3. **Admin Potente para Cliente**
- Panel intuitivo para gestionar tours, destinos, contenido
- Reports y analytics básicos
- Exportación de leads
- Integración con WhatsApp

### 4. **Escalabilidad Técnica**
- Arquitectura lista para múltiples destinos, tours, operadores
- Base de datos normalizada pero flexible
- APIs robustas y versionadas
- Preparada para microservicios futuro

### 5. **Mobile-First Obligatorio**
- Diseño siempre desde mobile
- Performance optimizada
- Gestos intuitivos
- CTA y navegación en mobile perfectionados

### 6. **Confianza Visual**
- Paleta coherente: verdes naturales + acentos dorados/naranjas
- Tipografía expresiva pero legible
- Imágenes cinéticas, no estáticas
- Toda información clara y accesible

---

## Propuesta de Valor de la Plataforma

Vs. competencia genérica:

| Aspecto | Nuestro Diferenciador |
|--------|----------------------|
| **Diseño** | Emocional, turístico, cinemático - NO SaaS genérico |
| **Conversión** | CTA multicanal (reserva, WhatsApp, email) + urgencia |
| **SEO** | Estructura escalable para tours y destinos + blog estratégico |
| **Admin** | Pensado para operador turístico real, no tech-first |
| **UX Mobile** | Pensada específicamente para exploración de viajes en mobile |
| **Escalabilidad** | Preparada para crecer 10x sin rehacer arquitectura |
| **IA-Ready** | Arquitectura pensada para agente de IA futuro (recomendaciones, chatbot) |

---

## Próximos Pasos

### Ahora (Fase 0 - EN PROGRESO)
- [ ] Revisar y validar documentación con stakeholders
- [ ] Confirmar stack técnico propuesto
- [ ] Identificar gaps o cambios requeridos
- [ ] Preparar briefing para inicio de desarrollo

### Fase 1 (Próxima - Setup + Core)
1. Setup inicial: Next.js, Payload CMS, PostgreSQL, Prisma
2. Schema de base de datos
3. Componentes base (Hero, Cards, Filters, Forms)
4. Home comercial
5. Listado de tours básico
6. Ficha de tour
7. Admin panel básico
8. SEO setup (sitemap, robots, schema)

### Fase 2 (Después)
1. Destinos + páginas de destino
2. Blog + contenido editorial
3. Testimonios y social proof
4. Integración de pagos (si aplica)
5. Analytics y reportes avanzados
6. Integración Web WhatsApp

### Fase 3+ (Futuro)
1. Booking real + calendar + disponibilidad
2. CRM integrado
3. Email marketing automation
4. IA: recomendaciones personalizadas
5. Agente de IA conversacional

---

## Equipo de Desarrollo Esperado

- **Tech Lead / Arquitecto**: 1 (lidera decisiones, soluciona bloques, review de código)
- **Frontend Lead**: 1 (componentes, UX, performance, móvil)
- **Backend Lead**: 1 (APIs, base de datos, integraciones)
- **Diseñador / UX**: 1 (flujos, comps, design system)
- **SEO Specialist**: 0.5 (estrategia SEO, contenido, schema)
- **Admin/DevOps**: 0.5 (deployment, CI/CD, infraestructura)

---

## Contacto y Referencias

- **Referencia funcional**: https://guatape.travel/ (análisis en `02-benchmark-analysis.md`)
- **Skill de UX**: `frontend-design-tourism-medellin` (guía estratégica para toda decisión de interfaz)
- **Ubicación de código**: Este repositorio

---

## Licencia

[Definir licencia - TBD]

---

**Última actualización**: Abril 2026 | **Estado**: Fase 0 - Planificación
