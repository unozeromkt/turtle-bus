# 🔑 Nuevas API Keys de Supabase (2025+)

## 📌 Resumen de Cambios

### Junio 2025: Supabase lanzó nuevas API keys más seguras

| Aspecto | Legacy (JWT) | Nuevo | Beneficio |
|---------|------------|-------|-----------|
| **Publishable** | `anon` (JWT largo) | `sb_publishable_...` | Rotación independiente, mejor seguridad |
| **Secret** | `service_role` (JWT largo) | `sb_secret_...` | Rotación sin downtime, revocación instantánea |
| **Expiración** | 10 años | - | Keys sin expiración (control manual) |
| **Tamaño** | ~400 caracteres | ~50 caracteres | Más eficiente, logs legibles |

---

## 🚀 Cómo Obtener las Nuevas Keys

### Opción A: Proyecto Nuevo
✅ Las nuevas keys se generan automáticamente

### Opción B: Proyecto Existente

1. **Ve a Supabase Dashboard**
   - Settings → API Keys

2. **Busca la sección "Project API keys"**
   - Deberías ver opciones para "New API Keys"

3. **Genera nuevas keys:**
   - Publishable key (`sb_publishable_...`)
   - Secret key (`sb_secret_...`)

4. **Guarda en `.env.local`:**
   ```bash
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
   SUPABASE_SECRET_KEY="sb_secret_..."
   ```

---

## 📋 Tipos de Keys

### 1️⃣ **Publishable Key** (`sb_publishable_...`)

```typescript
// ✅ SEGURO - Puede estar en código público

// Frontend
const { data } = await supabase
  .from('tours')
  .select('*')

// GitHub, CLIs, etc.
// Está en NEXT_PUBLIC_* variables
```

**Permisos:**
- Read pública de tours (con RLS)
- Create inquiries (leads)
- Poca información sensible

---

### 2️⃣ **Secret Key** (`sb_secret_...`)

```typescript
// ⚠️ PRIVADO - Solo en backend

// Server Actions (Next.js)
'use server'
import { supabaseAdmin } from '@/lib/supabase'

const { data } = await supabaseAdmin
  .from('tours')
  .insert([newTour])

// Edge Functions
const SECRET = Deno.env.get('SUPABASE_SECRET_KEY')

// APIs privadas
await fetch('/api/admin/tours', {
  headers: { 'Authorization': `Bearer ${secretKey}` }
})
```

**Permisos:**
- Acceso completo (bypassa RLS)
- CRUD total en todas las tablas
- Admin operations

---

## 🔄 Migración de Legacy Keys

### Si aún usas las antiguas keys (antes de Junio 2025):

```env
# ANTES (Legacy - hasta Nov 2025)
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# DESPUÉS (Nuevo - desde Junio 2025)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
SUPABASE_SECRET_KEY="sb_secret_..."
```

**Nuestra app tiene compatibilidad hacia atrás:**
- Si detecta publishable key → la usa
- Si solo encuentra anon key → la usa (compatible)
- Si detecta secret key → la usa
- Si solo encuentra service_role → la usa (compatible)

---

## 🛡️ Reglas de Seguridad

### ✅ HACER:

1. **Publishable key en frontend:**
   ```env
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
   ```

2. **Secret key en `.env.local` y `.env.production.local`:**
   ```env
   SUPABASE_SECRET_KEY="sb_secret_..."
   SUPABASE_SECRET_KEY="[diferente en prod]"
   ```

3. **RLS policies para controlar acceso:**
   ```sql
   CREATE POLICY "Tours públicos" ON tours
     FOR SELECT
     USING (is_published = true);
   ```

### ❌ NUNCA HACER:

1. ❌ Publishable key en `.env` de producción
2. ❌ Secret key en código frontend
3. ❌ Secret key en GitHub (usar secrets de Actions)
4. ❌ Loguear secret keys
5. ❌ Compartir keys entre proyectos

---

## 🔐 Configuración en Producción

### Vercel / Netlify / Render

```bash
# En el panel add environment variables:

# PÚBLICO (visible en el navegador)
NEXT_PUBLIC_SUPABASE_URL = https://...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = sb_publishable_...

# PRIVADO (solo server)
SUPABASE_SECRET_KEY = sb_secret_...
```

### Con GitHub Actions

```yaml
# .github/workflows/deploy.yml
env:
  NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.SUPABASE_PUBLISHABLE_KEY }}
  SUPABASE_SECRET_KEY: ${{ secrets.SUPABASE_SECRET_KEY }}
```

---

## 📊 Limitaciones & Cambios

### Realtime
- Conexiones duran **24 horas** si no hay usuario autenticado
- Con usuario logueado = duración indefinida
- Secret key: 24 horas siempre

### Edge Functions
```typescript
// ANTES - Funcionaba con qualquier key
const client = createClient(url, secretKey)

// AHORA - Secret key NO es JWT
// Necesitas pasar en Authorization header
fetch(funcURL, {
  headers: {
    'Authorization': `Bearer ${plainSecretKey}`
  }
})
```

### Rotación de Keys
- **Con nuevas keys:** Crea una segunda key, prueba, elimina la primera
- **Sin downtime:** Las dos keys funcionan en paralelo
- **Legacy:** Fuerza rotación = downtime potencial

---

## 🔄 Rotación de Keys

### Paso 1: Crear nueva key
```bash
# Supabase Dashboard → Settings → API Keys
# Click "Generate New Key"
```

### Paso 2: Actualizar en los ambientes
```bash
# Desarrollo
.env.local → SUPABASE_SECRET_KEY="sb_secret_NEW"

# Producción
Dashboard → Environment Variables
```

### Paso 3: Esperar & validar
```bash
# Monitorear que todo funcione
# Check logs por errores de auth
# Validar en staging primero
```

### Paso 4: Eliminar key anterior
```bash
# Una vez validado en prod
# Supabase Dashboard → Settings → API Keys
# Delete old key
```

---

## 📌 Resumen Rápido

```env
# ✅ ACTUALIZAR .env.local a esto:

NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_ACJ..."
SUPABASE_SECRET_KEY="sb_secret_N7U..."

# ℹ️ El código ya tiene compatibilidad hacia atrás
# Si sigues usando ANON_KEY / SERVICE_ROLE_KEY, funcionará
```

---

## 🎯 Próximas Fechas Importantes

- ✅ **Junio 2025** - Nuevas keys disponibles (ya activas)
- 📅 **Nov 2025** - Recordatorios para migrar
- 🚨 **Late 2026** - Legacy keys se eliminarán

---

## 🔗 Referencias

- [GitHub Discussion](https://github.com/orgs/supabase/discussions/29260)
- [Supabase Docs - API Keys](https://supabase.com/docs/guides/api/api-keys)
- [Why the change?](https://github.com/orgs/supabase/discussions/29260#why-are-we-doing-this)

---

## ✨ Ventajas de las Nuevas Keys

1. ✅ **Mejor seguridad** - Keys cortas, fáciles de auditar
2. ✅ **Rotación sin downtime** - Crea, prueba, elimina
3. ✅ **Revocación instantánea** - No esperar a expiración
4. ✅ **Multiple secret keys** - Diferentes roles/permisos
5. ✅ **Audit completo** - Todas las operaciones registradas

