# 🔐 Admin Login Setup Guide

## Descripción General

Se ha implementado un sistema de autenticación admin usando NextAuth.js con Supabase como base de datos. El login es seguro y requiere credenciales válidas.

## 📋 Pasos de Setup

### 1. Crear la tabla `users` en Supabase

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto `turtle-bus`
3. Ve a **SQL Editor**
4. Haz click en **+ New Query**
5. Copia el contenido de `database/migrations/001_create_users_table.sql`
6. Ejecuta la query
7. Verifica que la tabla se creó en el tab **Table Editor** > `users`

### 2. Crear usuario admin

Ejecuta en tu terminal:

```bash
npm run create:admin
```

**Output esperado:**
```
✅ Admin user created successfully!
📧 Email: admin@turtle-bus.co
🔐 Password: admin123
⚠️  CHANGE THIS PASSWORD IMMEDIATELY IN PRODUCTION
```

### 3. Iniciar el servidor

```bash
npm run dev
```

### 4. Acceder al admin

1. Ve a `http://localhost:3000/admin/login`
2. Usa las credenciales:
   - **Email:** `admin@turtle-bus.co`
   - **Password:** `admin123`
3. Haz click en "Iniciar Sesión"

## ✅ Características Implementadas

- ✅ Página de login (`/admin/login`)
- ✅ Protección de rutas admin (redirecciona al login si no estás autenticado)
- ✅ Sesión persistente (cookies seguras)
- ✅ Botón de logout en el header del admin
- ✅ Display del nombre del usuario
- ✅ Hash seguro de contraseña con bcryptjs
- ✅ Almacenamiento en Supabase

## 🔑 Variables de Entorno

El archivo `.env.local` ya tiene configurado:

```env
NEXTAUTH_SECRET="your-secret-key-change-in-prod"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="..."
SUPABASE_SECRET_KEY="..."
```

**En producción, asegúrate de:**
- Cambiar `NEXTAUTH_SECRET` a un valor aleatorio fuerte
- Cambiar el password admin del usuario
- Usar `NEXTAUTH_URL` con tu dominio productivo

## 🛠 Comandos Útiles

```bash
# Crear usuario admin (si no existe)
npm run create:admin

# Ver todos los usuarios (en Supabase SQL Editor)
SELECT * FROM users;

# Actualizar contraseña de un usuario (desde SQL)
-- Primero genera el hash con: bcryptjs
-- Luego ejecuta: UPDATE users SET password = '[hash]' WHERE email = 'admin@turtle-bus.co';
```

## 🔐 Seguridad

- Las contraseñas se hashean con bcryptjs (10 rounds)
- Las sesiones se almacenan en cookies seguras/httpOnly
- El middleware protege automáticamente las rutas `/admin/*`
- El token JWT expira después de 30 días (configurable)

## 🚀 Próximos Pasos

1. **Cambiar la contraseña admin:**
   - Después de loguear, ir a `/admin/settings` (todavía no implementado)
   - O, actualizar manualmente en Supabase

2. **Agregar más usuarios:**
   - Implementar panel de usuarios en `/admin/settings`
   - Crear formulario para invitar nuevos admins

3. **2FA (Autenticación de Dos Factores):**
   - Agregar verificación por email/SMS
   - Usar Google Authenticator

4. **Roles y Permisos:**
   - Ya está la estructura (owner, admin, editor, support)
   - Implementar en los componentes admin

## 📝 Archivos Creados

- ✅ `src/auth.ts` - Configuración principal de NextAuth
- ✅ `src/lib/auth/config.ts` - Estrategia de autenticación
- ✅ `src/lib/auth/password.ts` - Utilidades de hash de contraseña
- ✅ `src/app/api/auth/[...nextauth]/route.ts` - API routes
- ✅ `src/app/admin/login/page.tsx` - Página de login
- ✅ `src/components/admin/LogoutButton.tsx` - Botón de logout
- ✅ `src/types/next-auth.d.ts` - Tipos TypeScript
- ✅ `src/middleware.ts` - Middleware de protección
- ✅ `scripts/create-admin.ts` - Script para crear admin
- ✅ `database/migrations/001_create_users_table.sql` - SQL migration

## ❓ Troubleshooting

### "Can't reach database server"
- Verifica que Supabase está corriendo
- Revisa que las claves en `.env.local` son correctas

### "User not found" al loguear
- Ejecuta `npm run create:admin` para crear el usuario
- Verifica que la tabla `users` existe en Supabase

### "Invalid credentials"
- Verifica que escribiste el email y contraseña correctamente
- Por defecto es: `admin@turtle-bus.co` / `admin123`

### Sesión se cierra rápidamente
- Verifica que `NEXTAUTH_SECRET` está configurado
- Revisa que `NEXTAUTH_URL` es correcto

## 📞 Soporte

Para más detalles sobre NextAuth.js, ver:
- [NextAuth.js Docs](https://next-auth.js.org)
- [NextAuth Credentials Provider](https://next-auth.js.org/providers/credentials)
