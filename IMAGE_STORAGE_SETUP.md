# 🖼️ Configurar Upload de Imágenes - Guía de Setup

## ✅ Paso 1: Crear Storage Buckets en Supabase

En tu **Dashboard de Supabase**:

1. Ve a **Storage** (lado izquierdo)
2. Click en **"Create a new bucket"** (botón azul)

### Bucket 1: tour-featured

```
Name: tour-featured
Public bucket: ✅ SÍ (para URLs públicas)
File size limit: 10 MB
```

### Bucket 2: tour-gallery

```
Name: tour-gallery
Public bucket: ✅ SÍ (para URLs públicas)
File size limit: 5 MB
```

---

## ✅ Paso 2: Configurar RLS Policies (Seguridad)

En **Supabase → Storage**, click en la rueda de engranaje ⚙️ de cada bucket:

### Para tour-featured:

```sql
-- Política: Lectura pública
CREATE POLICY "Public Read"
ON storage.objects FOR SELECT
USING (bucket_id = 'tour-featured');

-- Política: Upload autenticado
CREATE POLICY "Authenticated Upload"  
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tour-featured' AND auth.role() = 'authenticated');
```

### Para tour-gallery:

```sql
-- Mismas políticas que arriba
CREATE POLICY "Public Read"
ON storage.objects FOR SELECT
USING (bucket_id = 'tour-gallery');

CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tour-gallery' AND auth.role() = 'authenticated');
```

---

## ✅ Paso 3: Ejecutar Migración de Base de Datos

En **Supabase Dashboard → SQL Editor**:

1. Click en **"New query"**
2. Copia todo el contenido de: `database/MIGRATION_IMAGE_STORAGE.sql`
3. Click **"Run"** (esquina superior derecha)

**Resultado esperado:**
```
✅ Queries executed successfully
```

---

## ✅ Paso 4: Variables de Entorno

Tu `.env.local` ya tiene todo configurado:

```env
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
SUPABASE_SECRET_KEY="sb_secret_..."
```

✅ No necesitas agregar nada más (el Storage URL se genera automático)

---

## 🧪 Paso 5: Probar el Sistema

### En tu aplicación:

1. Ve a **Crear Tour** (`/admin/tours/new`)
2. En el formulario verás 2 nuevas secciones:
   - **Imagen Destacada** - upload y preview
   - **Galería de Imágenes** - múltiples imágenes

3. **Para la imagen destacada:**
   - Haz clic o arrastra una imagen JPG/PNG/WebP
   - Máximo 10MB
   - Verás barra de progreso
   - Se guarda automáticamente en el tour

4. **Para la galería:**
   - Puedes subir hasta 10 imágenes
   - Máximo 5MB cada una
   - Botón "+" para agregar más
   - Botón "❌" en cada imagen para remover
   - Se guardan todas al crear el tour

### Verificación en Supabase:

Ve a **Storage** en Supabase Dashboard:
- `tour-featured/featured-images/` - verás archivos aquí
- `tour-gallery/gallery-images/` - verás archivos aquí

---

## 📝 Flujo Técnico Completo

### Subir Imagen

```
Usuario clic/arrastra
       ↓
ImageUpload.tsx valida tipo + tamaño
       ↓
uploadFile() → Supabase Storage
       ↓
Retorna URL pública
       ↓
setFeaturedImage(url)
       ↓
[Estado actualizado en UI]
```

### Guardar Tour

```
Usuario click "Crear Tour"
       ↓
handleSubmit() recolecta FormData
       ↓
Agrega featured_image y gallery_images
       ↓
createTourAction() → Server Action
       ↓
Guarda en BD (tours table)
       ↓
revalidatePath() limpia cache
       ↓
Redirige a /admin/tours
```

### Mostrar Imagen

```
tour.featured_image = "https://...tour-featured/featured-images/123.jpg"
       ↓
<img src={tour.featured_image} />
       ↓
Se muestra imagen desde CDN Supabase
```

---

## 🔧 Cambios de Código Implementados

### Archivos Nuevos:

```
src/lib/storage.ts                    → Funciones Storage
src/hooks/useFileUpload.ts            → Hook reutilizable
src/components/admin/ImageUpload.tsx  → Componente destacada
src/components/admin/GalleryUpload.tsx → Componente galería
database/MIGRATION_IMAGE_STORAGE.sql  → Migración BD
```

### Archivos Actualizados:

```
src/app/admin/tours/form.tsx          → Integra ImageUpload + GalleryUpload
src/app/actions/tours.ts              → Maneja gallery_images en JSON
prisma/schema.prisma                  → Ya tiene featured_image + gallery_images
```

---

## 🎨 Características del UI

### ImageUpload (Imagen Destacada)

✅ Drag & drop
✅ Barra de progreso en tiempo real  
✅ Preview de imagen
✅ Botón para remover
✅ Validación de tipo y tamaño
✅ Mensajes de error claros

### GalleryUpload (Galería)

✅ Grid de previews (responsive)
✅ Drag & drop
✅ Botón "+" para agregar
✅ Remover individual con "❌"
✅ Contador de imágenes (2/10)
✅ Progreso simultáneo
✅ Validación de máximo 10 imágenes

---

## 📊 Límites y Validaciones

### Imagen Destacada

- **Tamaño máximo**: 10 MB
- **Formatos**: JPG, PNG, WebP
- **Recomendado**: 1200x800px (16:9)
- **Uso**: Se muestra en listados y portada del tour

### Galería

- **Cantidad máxima**: 10 imágenes
- **Tamaño máximo**: 5 MB cada una
- **Formatos**: JPG, PNG, WebP
- **Uso**: Se muestran en detalle del tour

---

## 🚀 Próximos Pasos

1. ✅ Configurar buckets Storage
2. ✅ Ejecutar migración BD  
3. ✅ Probar crear tour con imágenes
4. 🔄 Conectar galería en página pública de tour detail
5. 🔄 Agregar optimización de imágenes (next-image)

---

## 🆘 Troubleshooting

### "Error: Storage bucket not found"
→ Verifica que los buckets estén creados en Supabase Storage

### "Archivo muy grande"
→ Imagen destacada máx 10MB, galería máx 5MB cada una

### "Formato no permitido"
→ Solo JPG, PNG y WebP están permitidos

### "Imagen no aparece en BD"
→ Verifica que la migración SQL fue ejecutada

---

## 📞 Soporte

Si tienes dudas:
- Revisa los logs de navegador (F12)
- Verifica Supabase Storage tiene archivos subidos
- Confirma que RLS policies están activas
