# 🔐 Solución: RLS Policies para Storage

## El Problema

```
Error: new row violates row-level security policy
```

Esto significa que las políticas de RLS no permiten el upload.

---

## ✅ Solución Rápida: Deshabilitar RLS en Storage

Si quieres que el upload sea simple y público, **deshabilita RLS en los buckets**:

1. Ve a **Supabase Dashboard → Storage**
2. Click en el bucket `tour-featured`
3. Click en el **engranaje ⚙️** (settings)
4. Busca **"Row Level Security (RLS)"**
5. **Desactívalo** (toggle OFF)
6. Repite para `tour-gallery`

✅ **Listo!** Ya debería funcionar el upload.

---

## 🔒 Solución Completa: Configurar RLS Correctamente

Si prefieres mantener RLS para mayor seguridad, usa estas políticas.

### En Supabase Dashboard → SQL Editor

Copia y ejecuta esto:

```sql
-- ============================================
-- POLÍTICAS RLS PARA STORAGE - tour-featured
-- ============================================

-- 1. Permitir lectura pública
CREATE POLICY "Public Read Featured"
ON storage.objects FOR SELECT
USING (bucket_id = 'tour-featured');

-- 2. Permitir insert para grabar adjuntos (sin restricción)
CREATE POLICY "Allow Upload Featured"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tour-featured');

-- 3. Permitir update (en caso necesario)
CREATE POLICY "Allow Update Featured"
ON storage.objects FOR UPDATE
USING (bucket_id = 'tour-featured')
WITH CHECK (bucket_id = 'tour-featured');

-- 4. Permitir delete para admin
CREATE POLICY "Allow Delete Featured"
ON storage.objects FOR DELETE
USING (bucket_id = 'tour-featured');

-- ============================================
-- POLÍTICAS RLS PARA STORAGE - tour-gallery
-- ============================================

-- 1. Permitir lectura pública
CREATE POLICY "Public Read Gallery"
ON storage.objects FOR SELECT
USING (bucket_id = 'tour-gallery');

-- 2. Permitir insert sin restricción
CREATE POLICY "Allow Upload Gallery"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tour-gallery');

-- 3. Permitir update
CREATE POLICY "Allow Update Gallery"
ON storage.objects FOR UPDATE
USING (bucket_id = 'tour-gallery')
WITH CHECK (bucket_id = 'tour-gallery');

-- 4. Permitir delete
CREATE POLICY "Allow Delete Gallery"
ON storage.objects FOR DELETE
USING (bucket_id = 'tour-gallery');
```

---

## 🛠️ Verificar Políticas Actuales

Run esta query para ver qué políticas existen:

```sql
SELECT
  policyname,
  schemaname,
  tablename,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'storage'
ORDER BY tablename;
```

---

## 📋 Paso a Paso - Setup Completo

### Opción A: Rápida (Recomendado para desarrollo)

1. **Deshabilitar RLS** en ambos buckets (ver arriba)
2. Listo ✅

### Opción B: Segura (Recomendado para producción)

1. Ir a **SQL Editor**
2. Borrar policies antiguas:
   ```sql
   DROP POLICY IF EXISTS "Public Read" ON storage.objects;
   DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
   ```
3. Ejecutar el bloque SQL completo arriba
4. Probar upload

---

## 🧪 Test Rápido

Después de fix:

1. Ve a **Admin Panel** → `/admin/tours/new`
2. Intenta subir una imagen
3. Deberías ver:
   - ✅ Barra de progreso
   - ✅ Preview de imagen
   - ✅ Sin errores

---

## 🐛 Troubleshooting

### "Still getting RLS error"

```sql
-- Verificar RLS está disable
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'objects';

-- Si rowsecurity = true, entonces RLS está ACTIVO
-- Si rowsecurity = false, entonces RLS está DESACTIVO
```

### "Upload rápido pero error al guardar en DB"

Probablemente el Storage funciona pero `createTour()` falla. Revisa consola backend.

### "URL parece correcta pero imagen no carga"

Verifica:
1. Las URLs comienzan con `https://...`
2. El bucket es public desde Storage dashboard
3. El path es accesible en Storage

---

## 🚀 Alternativa: Usar Anon Key

Si prefieres mantener RLS pero queremos uploads de cliente:

En `src/lib/storage.ts`, cambia a usar anon key:

```typescript
// En lugar de supabaseAdmin, usa supabaseClient
const { supabaseClient } = await import('@/lib/supabase')

const { error } = await supabaseClient.storage  // ← anon key
  .from(options.bucket)
  .upload(path, file)
```

Y en políticas:

```sql
CREATE POLICY "Anon Upload Featured"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tour-featured' AND auth.role() = 'anon');
```

---

## ✅ Checklist Final

- [ ] RLS deshabilitado en buckets O políticas correctas
- [ ] Buckets marcados como "public"
- [ ] Storage Upload funciona sin errores
- [ ] Imágenes aparecen en Storage dashboard
- [ ] URLs son públicas
- [ ] TourCard muestra imágenes correctamente
