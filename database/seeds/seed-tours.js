#!/usr/bin/env node
/**
 * Turtle Bus — Tour Seeder
 * 
 * Lee database/seeds/tours-data.json e inserta/actualiza todos los tours,
 * FAQs, testimonios e itinerarios en Supabase.
 * 
 * Uso:
 *   node database/seeds/seed-tours.js            → inserta/actualiza todos
 *   node database/seeds/seed-tours.js --dry-run  → solo valida, no escribe
 *   node database/seeds/seed-tours.js --slug=paragliding-medellin → uno solo
 *   node database/seeds/seed-tours.js --delete   → elimina todos primero (¡cuidado!)
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// ─── Config ─────────────────────────────────────────────────────────────────

const TOURS_FILE = path.join(__dirname, 'tours-data.json')

function loadEnv() {
  const envPath = path.join(__dirname, '../../.env.local')
  const envExamplePath = path.join(__dirname, '../../.env')
  const file = fs.existsSync(envPath) ? envPath : envExamplePath
  if (!fs.existsSync(file)) return
  fs.readFileSync(file, 'utf-8')
    .split('\n')
    .forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/)
      if (match) process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '')
    })
}

loadEnv()

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('\n❌  Variables de entorno faltantes.')
  console.error('    Necesitas en .env.local:')
  console.error('      NEXT_PUBLIC_SUPABASE_URL=...')
  console.error('      SUPABASE_SECRET_KEY=...  (recomendado, bypassa RLS)')
  console.error('      — o —')
  console.error('      NEXT_PUBLIC_SUPABASE_ANON_KEY=...\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ─── CLI Flags ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const DELETE_ALL = args.includes('--delete')
const SLUG_FILTER = (args.find(a => a.startsWith('--slug=')) || '').replace('--slug=', '') || null

// ─── Helpers ─────────────────────────────────────────────────────────────────

const log = (icon, msg) => console.log(`${icon}  ${msg}`)
const ok  = msg => log('✅', msg)
const warn = msg => log('⚠️ ', msg)
const err  = msg => log('❌', msg)
const info = msg => log('ℹ️ ', msg)

async function getLookupMaps() {
  const { data: destinations, error: de } = await supabase
    .from('destinations')
    .select('id, slug')
  if (de) throw new Error(`Error cargando destinos: ${de.message}`)

  const { data: categories, error: ce } = await supabase
    .from('categories')
    .select('id, slug')
  if (ce) throw new Error(`Error cargando categorías: ${ce.message}`)

  return {
    destinations: Object.fromEntries(destinations.map(d => [d.slug, d.id])),
    categories:   Object.fromEntries(categories.map(c => [c.slug, c.id])),
  }
}

function validate(tour, maps, index) {
  const errors = []
  const required = ['slug', 'title', 'price_adult', 'duration', 'destination_slug', 'category_slug']
  required.forEach(f => { if (!tour[f]) errors.push(`campo "${f}" vacío`) })
  if (tour.destination_slug && !maps.destinations[tour.destination_slug])
    errors.push(`destination_slug "${tour.destination_slug}" no existe en la BD`)
  if (tour.category_slug && !maps.categories[tour.category_slug])
    errors.push(`category_slug "${tour.category_slug}" no existe en la BD`)
  if (errors.length) {
    err(`Tour #${index + 1} "${tour.slug || 'sin slug'}" tiene errores:`)
    errors.forEach(e => console.error(`       • ${e}`))
    return false
  }
  return true
}

function buildTourRow(tour, maps) {
  return {
    slug:             tour.slug,
    title:            tour.title,
    description:      tour.description       || null,
    long_description: tour.long_description  || null,
    price_adult:      tour.price_adult,
    price_child:      tour.price_child       || null,
    duration:         tour.duration,
    featured_image:   tour.featured_image    || null,
    video_url:        tour.video_url         || null,
    meeting_point:    tour.meeting_point     || null,
    max_participants: tour.max_participants  || null,
    min_age:          tour.min_age           || null,
    max_age:          tour.max_age           || null,
    requirements:     tour.requirements      || null,
    includes:         tour.includes          ? JSON.stringify(tour.includes)   : null,
    excludes:         tour.excludes          ? JSON.stringify(tour.excludes)   : null,
    itinerary:        tour.itinerary         ? JSON.stringify(tour.itinerary)  : null,
    gallery_images:   tour.gallery_images    ? JSON.stringify(tour.gallery_images) : null,
    destination_id:   maps.destinations[tour.destination_slug],
    category_id:      maps.categories[tour.category_slug],
    meta_title:       tour.meta_title        || tour.title,
    meta_description: tour.meta_description  || tour.description || null,
    is_published:     tour.is_published      ?? false,
    is_featured:      tour.is_featured       ?? false,
    order:            tour.order             ?? 0,
  }
}

async function upsertTour(row) {
  const { data, error } = await supabase
    .from('tours')
    .upsert(row, { onConflict: 'slug' })
    .select('id, slug')
    .single()
  if (error) throw new Error(`upsert tour "${row.slug}": ${error.message}`)
  return data.id
}

async function upsertFaqs(tourId, faqs) {
  if (!faqs || faqs.length === 0) return
  // Elimina FAQs anteriores del tour antes de re-insertar
  await supabase.from('tour_faqs').delete().eq('tour_id', tourId)
  const rows = faqs.map((f, i) => ({
    tour_id:  tourId,
    question: f.question,
    answer:   f.answer,
    order:    f.order ?? i + 1,
  }))
  const { error } = await supabase.from('tour_faqs').insert(rows)
  if (error) throw new Error(`insert faqs para ${tourId}: ${error.message}`)
}

async function upsertTestimonials(tourId, items) {
  if (!items || items.length === 0) return
  // Elimina testimoniales anteriores antes de re-insertar
  await supabase.from('testimonials').delete().eq('tour_id', tourId)
  const rows = items.map(t => ({
    tour_id:      tourId,
    author:       t.author,
    content:      t.content,
    rating:       t.rating  ?? 5,
    featured:     t.featured ?? false,
    is_published: true,
  }))
  const { error } = await supabase.from('testimonials').insert(rows)
  if (error) {
    // testimonials puede no existir en todas las instancias; no es fatal
    warn(`No se pudieron insertar testimoniales (${error.message})`)
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🐢  Turtle Bus — Tour Seeder')
  console.log('─'.repeat(44))
  if (DRY_RUN)  info('Modo DRY RUN — no se escribirá nada en la BD')
  if (SLUG_FILTER) info(`Filtro activo: solo slug="${SLUG_FILTER}"`)

  // 1. Leer JSON
  if (!fs.existsSync(TOURS_FILE)) {
    err(`No se encontró ${TOURS_FILE}`)
    process.exit(1)
  }
  let tours
  try {
    tours = JSON.parse(fs.readFileSync(TOURS_FILE, 'utf-8'))
  } catch (e) {
    err(`Error parseando JSON: ${e.message}`)
    process.exit(1)
  }
  info(`${tours.length} tour(s) encontrados en el JSON`)

  // 2. Filtrar por slug si aplica
  if (SLUG_FILTER) {
    tours = tours.filter(t => t.slug === SLUG_FILTER)
    if (tours.length === 0) { err(`Slug "${SLUG_FILTER}" no encontrado en el JSON`); process.exit(1) }
  }

  // 3. Cargar lookup maps
  info('Cargando destinos y categorías desde Supabase...')
  let maps
  try {
    maps = await getLookupMaps()
  } catch (e) {
    err(e.message)
    process.exit(1)
  }
  info(`  Destinos disponibles:  ${Object.keys(maps.destinations).join(', ')}`)
  info(`  Categorías disponibles: ${Object.keys(maps.categories).join(', ')}`)

  // 4. Validar todos antes de escribir
  console.log('')
  let valid = true
  tours.forEach((t, i) => { if (!validate(t, maps, i)) valid = false })
  if (!valid) { err('Corrige los errores anteriores y vuelve a ejecutar.'); process.exit(1) }
  ok('Validación OK')

  if (DRY_RUN) { info('\nDry run completado. No se escribió nada.'); return }

  // 5. DELETE si se pidió
  if (DELETE_ALL) {
    warn('Eliminando todos los tours existentes...')
    await supabase.from('tour_faqs').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('tours').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    ok('Tours anteriores eliminados')
  }

  // 6. Insertar/actualizar
  console.log('')
  let inserted = 0, failed = 0
  for (const tour of tours) {
    try {
      const row    = buildTourRow(tour, maps)
      const tourId = await upsertTour(row)
      await upsertFaqs(tourId, tour.faqs)
      await upsertTestimonials(tourId, tour.testimonials)
      ok(`"${tour.title}" → ${tourId}`)
      inserted++
    } catch (e) {
      err(`"${tour.slug}": ${e.message}`)
      failed++
    }
  }

  // 7. Resumen
  console.log('\n' + '─'.repeat(44))
  console.log(`🏁  Completado: ${inserted} insertados/actualizados, ${failed} fallidos`)
  if (failed > 0) process.exit(1)
}

main().catch(e => { err(e.message); process.exit(1) })
