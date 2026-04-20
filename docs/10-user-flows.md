# 10. User Flows

## Objetivo

Mapear flujos de usuario principales: cómo los visitantes y admins interactúan con la plataforma para alcanzar objetivos clave.

---

## Flujo 1: Descubrimiento y Conversión (Visitante)

```
START: Usuario en Google
│
├─ Busca: "tours medellín" / "qué hacer en guatapé"
│
├─ CTR en SERP → Llega a:
│  ├─ Homepage
│  ├─ Tours listing
│  ├─ Blog post
│  └─ Destination page
│
├─ Explora:
│  ├─ Vista galerías fotos
│  ├─ Lee descripción
│  ├─ Aplica filtros (destino, precio, duración)
│  └─ Ordena resultados
│
├─ Interés en tour específico → Click TourCard
│
├─ LEE FICHA COMPLETA:
│  ├─ Galería (12+ fotos)
│  ├─ Itinerario
│  ├─ Incluye/Excluye
│  ├─ Mapa + ubicación
│  ├─ FAQs
│  ├─ Reviews (rating 4.8⭐)
│  └─ Información práctica
│
├─ TOMA DECISIÓN: ¿Interesado?
│  │
│  ├─ NO → Vuelve a listado / Explora otro tour
│  │
│  └─ SÍ → Call-to-Action
│     │
│     ├─ Opción 1: [Consultar en WhatsApp]
│     │           → Abre WhatsApp con mensaje pre-filled
│     │           → Usuario escribe pregunta
│     │           → Operador responde
│     │
│     ├─ Opción 2: [Llenar Formulario]
│     │           → Nombre, email, tel
│     │           → Message
│     │           → Submit → Lead creado → Confirmación
│     │
│     └─ Opción 3: [Llamar]  (tel link)
│
├─ CONVERSACIÓN:
│  ├─ WhatsApp o email con operador
│  ├─ Preguntas sobre disponibilidad, precio
│  └─ Reserva o pospone
│
END: Converted ✓ o Lead Captured ✓
```

---

## Flujo 2: Descubrimiento por Redes Sociales

```
START: Usuario en Instagram/TikTok
│
├─ Ve video/foto atractiva de tour
│
├─ Click en link (bio o comment) → Llega a sitio
│
├─ 2 escenarios:
│  ├─ Link a tour específico → FICHA directa
│  └─ Link a homepage → Explora
│
├─ Same as Flujo 1 → Conversión
│
END: Converted ✓
```

---

## Flujo 3: Newsletter / Email Marketing (Future V2)

```
START: Lead anterior recibe email newsletter
│
├─ Email con "Tours destacados esta semana"
├─ 3-4 tours con images y CTAs
│
├─ Click en tour de interés
│
├─ Llega a tour page → FICHA
│
├─ Same as Flujo 1 → Conversión
│
END: Converted ✓
```

---

## Flujo 4: Admin - Crear Tour (Operador)

```
START: Admin en /admin/tours

├─ Click [+ Nuevo Tour]

├─ FORM MULTI-STEP o TABS:
│  ├─ Tab 1: Básico
│  │  ├─ Nombre: "Paragliding Medellín"
│  │  ├─ Slug: (auto-gen) paragliding-medellin
│  │  ├─ Destino: (select) Medellín
│  │  ├─ Categorías: (multi-select) Aventura
│  │  ├─ Precio: $99
│  │  └─ Duración: 3 hours
│  │
│  ├─ Tab 2: Descripción
│  │  ├─ Rich text editor
│  │  └─ Escribe descripción emocional
│  │
│  ├─ Tab 3: Itinerario
│  │  ├─ [+ Add step] → Repite 5-6 pasos
│  │  └─ Time + Title + Description cada uno
│  │
│  ├─ Tab 4: Medios
│  │  ├─ Drag & drop galería (6-12 fotos)
│  │  ├─ Video URL (optional)
│  │  └─ Auto-save cada upload
│  │
│  ├─ Tab 5: Incluye/Excluye
│  │  ├─ [+ Add item] multipl veces
│  │  └─ Lista clara
│  │
│  └─ Tab 6: Info Práctica
│     ├─ Edad min/max
│     ├─ Equipo requerido
│     ├─ Punto encuentro
│     └─ Cancelación política
│
├─ [Guardar como Borrador]  → Draft, vuelve a lista

├─ O [Guardar y Publicar] → Published, visible en web

├─ [Previsualizar] → Modal muestra cómo se vería

END: Tour creado ✓ y visible en /tours
```

---

## Flujo 5: Admin - Gestionar Leads

```
START: Admin notification → Nuevo lead

├─ OPCIÓN A: Push/Email notification
│  └─ "Nuevo lead: Diego para Paragliding"

├─ OPCIÓN B: Va a /admin/leads

├─ VE TABLA:
│  ├─ Columnas: Nombre, Tour, Email, Teléfono, Estado, Fecha
│  ├─ Filtra por estado: "Nuevo"
│  └─ Click en fila → Abre drawer con details

├─ LEAD DETAILS:
│  ├─ Nombre, Email, Teléfono
│  ├─ Tour de interés
│  ├─ Mensaje del usuario
│  ├─ Timestamp
│  ├─ [Copiar WhatsApp link] → Abre WA
│  ├─ [Enviar email template]
│  └─ [Cambiar estado a "Respondido"]

├─ ADMIN RESPONDE:
│  ├─ Vía WhatsApp / Email
│  ├─ Marca lead como "Respondido"
│  └─ Agrega nota interna: "Disponible Apr 20"

├─ Si CONVIERTE:
│  └─ Marca "Convertido"

END: Lead gestionado ✓
```

---

## Flujo 6: Admin - Crear Blog Post

```
START: /admin/blog

├─ Click [+ Nuevo Artículo]

├─ FORM:
│  ├─ Título: "Paragliding Medellín - Guía para Principiantes"
│  ├─ Slug: (auto-gen)
│  ├─ Featured image: Upload
│  ├─ Excerpt: 150 caracteres
│  ├─ Contenido: Rich text editor (1000+ words)
│  ├─ Categoría: (select)
│  ├─ Tags: (multi-input)
│  ├─ Relacionar tours: (multi-select 2-3 tours)
│  └─ Status: Draft / Publish

├─ [Guardar como borrador]

├─ [Guardar y publicar] → Visible en /blog

├─ Artículo aparece en:
│  ├─ /blog listing
│  ├─ Relacionado en tours matching
│  └─ Google indexado en 24-48h

END: Blog post publicado ✓
```

---

## Flujo 7: Admin - Dashboard / KPIs

```
START: Admin login → /admin/dashboard

├─ VISTA INMEDIATA:
│  ├─ Welcome card: "Bienvenido, Carlos"
│  ├─ KPI cards:
│  │  ├─ "45 Leads este mes"
│  │  ├─ "12 Tours activos"
│  │  ├─ "3 reseñas pendientes"
│  │  └─ "Top tour: Paragliding (34 consultas)"
│  ├─ Recent leads: últimas 5
│  └─ Quick actions: Nuevo tour, Ver leads, etc.

├─ Admin ve insights rápidamente

├─ Puede:
│  ├─ [Ver todos los leads] → /admin/leads
│  ├─ [+ Nuevo tour] → /admin/tours/create
│  ├─ [Configuración] → /admin/settings
│  └─ [Analytics] → /admin/analytics (V2)

END: Admin informa y actúa ✓
```

---

## Flujo 8: Admin - Gestion de Testimonios (Moderation)

```
START: Lead sends review from tour page

├─ Submission:
│  ├─ Nombre, email (validado)
│  ├─ Rating (5 stars)
│  ├─ Texto
│  └─ Foto (optional)

├─ Sistema:
│  ├─ Email confirm a usuario
│  ├─ Testimonial → Status "Pending"
│  └─ Admin notificado

├─ Admin va a /admin/testimonios

├─ VE PENDING:
│  ├─ Lista testimonios por aprobar
│  ├─ Preview del texto
│  └─ [Approve] [Reject] buttons

├─ Si APPROVE:
│  ├─ Status → "Approved"
│  ├─ Visible públicamente
│  ├─ Aparece en tour page
│  └─ Agregado a stats

├─ Si REJECT:
│  └─ Status → "Rejected"

END: Testimonial moderado ✓
```

---

## Flujo 9: Email Auto-Reply (Trigger)

```
START: Usuario submit lead form

├─ Sistema:
│  ├─ Email automático a usuario: "Gracias por tu interés en [Tour]"
│  ├─ WhatsApp (optional): "Hola [Nombre], recibimos tu consulta..."
│  └─ Lead → Status "New"

├─ Admin recibe notificación

├─ Admin responde en 24-48h

├─ Usuario recibe response

END: Conversación iniciada ✓
```

---

## Flujo 10: SEO Traffic → Conversion

```
START: Usuario busca en Google
│       "mejores tours NATURALEZA medellín"

├─ Google shows: Blog post + Tours listing

├─ Usuario CTR en blog post:
│  └─ "/blog/naturaleza-mededellin-top-tours"

├─ Lee artículo (1500 words):
│  ├─ Descripción de naturaleza en Medellín
│  ├─ Tips para viajeros
│  ├─ Recommendation de tours
│  └─ Inline CTA: "Ver tours de naturaleza"

├─ Click en CTA → /tours?category=naturaleza

├─ Filtra + ordena

├─ Click en tour de interés → FICHA

├─ SAME AS FLUJO 1 → Conversión

END: SEO → Lead ✓
```

---

## Entry Points Resumen

| Cana | Landing Page | Flow |
|------|---|---|
| Google Orgánico | / o /tours | Flujo 1 |
| Social (Instagram) | / o tour specific | Flujo 2 |
| Email (V2) | tour specific | Flujo 3 |
| Blog | /blog | Flujo 10 |
| Direct | / | Flujo 1 |
| Paid Ads | Landing page | Flujo 1-3 |

---

## CTA Priority (Visibility)

1. **Sticky WhatsApp Button** (mobile): Permanente
2. **Hero CTA**: "Explorar Tours / Consultar"
3. **Tour Card CTA**: Per card
4. **Tour Ficha CTA**: Arriba + abajo
5. **Formulario**: Inline en ficha
6. **Blog Post**: End of article

---

**Última actualización**: Abril 2026
