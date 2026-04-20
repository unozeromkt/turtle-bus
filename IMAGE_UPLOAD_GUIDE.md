# 🖼️ Manejo de Imágenes - Guía Completa

## Opciones Disponibles

### 1. Supabase Storage ✅ **RECOMENDADO**
- ✅ Integrado con Supabase
- ✅ RLS policies para seguridad
- ✅ URLs públicas directas
- ✅ Económico ($5/mes primeros 100GB)
- ✅ Fácil de implementar

### 2. Cloudinary
- URLs CDN automáticas
- Transformaciones de imagen
- Caro para volumen alto

### 3. AWS S3
- Poderoso pero complejo
- Requiere configuración extra

---

## 🚀 Implementación: Supabase Storage

### Paso 1: Crear Buckets en Supabase

1. **Dashboard Supabase → Storage**
2. **Crear 2 buckets:**
   - `tour-featured` - Imágenes destacadas (10MB max)
   - `tour-gallery` - Galería de imágenes (50MB max)

3. **Configurar permisos (RLS Policies):**

```sql
-- Para tour-featured bucket
CREATE POLICY "Public Read"
ON storage.objects FOR SELECT
USING (bucket_id = 'tour-featured');

CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tour-featured' AND auth.role() = 'authenticated');

-- Igual para tour-gallery
```

---

### Paso 2: Variable de Entorno

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
SUPABASE_SECRET_KEY="sb_secret_..."

# Bucket URLs
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_URL="${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public"
```

---

## 📁 Archivos a Crear

1. **`src/lib/storage.ts`** - Funciones de Storage
2. **`src/hooks/useFileUpload.ts`** - Hook personalizado
3. **`src/components/admin/ImageUpload.tsx`** - Componente upload
4. **`src/components/admin/GalleryUpload.tsx`** - Componente galería

---

## 💾 Funciones Storage

### Subir archivo
```typescript
export async function uploadFile(
  file: File,
  bucket: string,
  folder: string
): Promise<string> {
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const path = `${folder}/${fileName}`

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file)

  if (error) throw error
  return `${STORAGE_URL}/${bucket}/${path}`
}
```

### Eliminar archivo
```typescript
export async function deleteFile(
  bucket: string,
  path: string
): Promise<void> {
  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .remove([path])

  if (error) throw error
}
```

---

## 🎯 Flujo de Uso en Admin

### Crear/Editar Tour

1. **Usuario sube imagen destacada**
   ```
   ↓
   Upload → Supabase Storage
   ↓
   Obtiene URL pública
   ↓
   Guarda URL en DB (featured_image)
   ```

2. **Usuario sube galería (múltiples)**
   ```
   ↓
   Cada imagen → Upload individual
   ↓
   Obtiene URLs
   ↓
   Guarda array en DB (gallery_images JSON)
   ```

3. **Guardar tour**
   ```
   featured_image: "https://...bucket/featured/123.jpg"
   gallery_images: [
     "https://...bucket/gallery/456.jpg",
     "https://...bucket/gallery/789.jpg"
   ]
   ```

---

## 🔐 Seguridad

✅ Solo usuarios autenticados pueden subir  
✅ Limitado por tamaño de archivo  
✅ Validación de tipo MIME  
✅ URLs públicas para lectura  
✅ Service role para borrar  

---

## 📊 Límites Recomendados

- Imagen destacada: 10MB max, 1200x800px
- Galería: 5MB each, 4 imágenes max
- Formatos: JPG, PNG, WebP

---

## 🎨 Preview

En el formulario mostrar:
- Preview de imagen destacada
- Grid de galería con previews
- Botón para agregar más
- Botón para remover

---

## 📝 Próximas Tareas

1. Crear functions de storage
2. Crear hook useFileUpload
3. Crear componente ImageUpload
4. Actualizar formulario de tours
5. Agregar validación de tamaño
6. Agregar optimización de imágenes

