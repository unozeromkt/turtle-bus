# 🖼️ Diagnóstico: Imágenes No Cargan

## 🔍 Paso 1: Verificar URLs en la BD

Ve a: **`http://localhost:3000/test/image-urls`**

Esto te mostrará:
- ✅ Si las URLs están guardadas en la BD
- ✅ Si puedes abrir la URL en navegador
- ❌ Por qué no está cargando

---

## 📋 Checklist de Diagnóstico

### ¿La URL está vacía? ❌
**Causa**: La URL de la imagen no se está guardando en `featured_image`

**Solución**:
1. Abre DevTools (F12)
2. Ve a `/admin/tours/new`
3. Sube una imagen
4. Mira en la consola si ves:
   - `📸 Iniciando upload...`
   - `✅ Imagen subida exitosamente: https://...`
5. Si ves la URL, verifica que se está pasando al form

### ¿La URL está bien pero imagen no carga? ❌

Intenta esto:
1. Copia la URL del test
2. Abre en navegador (botón "Abrir en nueva pestaña")
3. Si se abre, el problema es en cómo la estamos mostrando
4. Si NO se abre, el problema es de permisos en Supabase

### ¿El URL abre bien pero no aparece en el sitio?

**Posibles causas**:
- TourCard está recibiendo URL vacía
- Valores de `destination` o `slug` tienen problemas
- Cache del navegador

**Solución**:
- Limpia cache: Ctrl+Shift+Delete
- Hard refresh: Ctrl+F5
- Abre consola (F12) y busca errores

---

## 🚀 Cambios ya Hechos

✅ Cambié `Image` de Next.js a `<img>` con fallback
✅ Agregué mejor logging
✅ Agregué manejo de errores con imagen placeholder

---

## 🧪 Siguiente Paso

1. Ve a `/test/image-urls`
2. Busca un tour con imagen
3. Cuéntame:
   - ¿Ves la URL?
   - ¿Puedes abrir en nueva pestaña?
   - ¿Qué error ves en el navegador?

---

## 🐛 Debug Rápido en Consola

```javascript
// Si necesitas revisar URLs directamente:
const { supabase } = await import('/src/lib/supabase.js')
const { data } = await supabase.from('tours').select('featured_image').limit(1)
console.log(data[0].featured_image)
```
