# Turtle Bus - Setup Local Development

## Prerequisitos

- Node.js 18+
- npm o yarn
- PostgreSQL 14+ instalado localmente

## Instalación

### 1. Clonar el repositorio
```bash
git clone <repo-url>
cd turtle-bus
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/turtle_bus_dev"
NEXTAUTH_SECRET="tu-secret-seguro"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Crear base de datos PostgreSQL
```bash
# En PostgreSQL
CREATE DATABASE turtle_bus_dev;
```

### 5. Ejecutar migraciones de Prisma
```bash
npm run prisma:migrate
```

Esto creará todas las tablas en la base de datos.

### 6. Iniciar servidor de desarrollo
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Rutas principales

- **Home**: `http://localhost:3000`
- **Tours**: `http://localhost:3000/tours`
- **Tours Detalle**: `http://localhost:3000/tours/paragliding-medellin`
- **Destinos**: `http://localhost:3000/destinos`
- **Contacto**: `http://localhost:3000/contacto`
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Admin Tours**: `http://localhost:3000/admin/tours`

## Scripts disponibles

```bash
npm run dev          # Iniciar servidor desarrollo
npm run build        # Build para production
npm run start        # Iniciar server production
npm run lint         # Ejecutar linter
npm run prisma:generate  # Generar Prisma client
npm run prisma:migrate   # Ejecutar migraciones
npm run prisma:studio    # Abrir Prisma Studio (UI de BD)
```

## Estructura de carpetas

```
src/
├── app/                    # Rutas y páginas Next.js
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home
│   ├── tours/             # Tour pages
│   ├── destinos/          # Destination pages
│   ├── admin/             # Admin panel
│   └── contacto/          # Contact page
├── components/            # Componentes reutilizables
│   ├── layout/
│   ├── hero/
│   ├── tours/
│   ├── forms/
│   └── admin/
├── lib/                   # Utilidades
├── styles/                # CSS global
└── types/                 # TypeScript types

prisma/
└── schema.prisma         # DB schema

docs/
└── [15 documentos]       # Documentación del proyecto
```

## Solución de problemas

### Error: "DATABASE_URL not set"
- Verifica que `.env.local` existe y tiene la variable correcta

### Error: "Cannot find module '@prisma/client'"
```bash
npm run prisma:generate
```

### Error de conexión a PostgreSQL
- Verifica que PostgreSQL está corriendo
- Verifica la URL de conexión en `.env.local`
- Crea la BD: `CREATE DATABASE turtle_bus_dev;`

### Puerto 3000 ya está en uso
```bash
npm run dev -- -p 3001
```

## Próximos pasos

1. **Conectar a base de datos real** con seed data
2. **Crear admin auth** con NextAuth.js
3. **Integrar Payload CMS** para admin panel profesional
4. **Agregar API routes** para leads y contact
5. **Optimizar imágenes** con Cloudinary

## Documentación adicional

Ver `/docs` para documentación completa del proyecto:
- `01-product-vision.md` - Visión y objetivos
- `07-database-schema.md` - Esquema de BD
- `08-api-modules.md` - Endpoints esperados
- `09-components-blueprint.md` - Componentes
- `14-technical-decisions.md` - Decisiones técnicas

---

¿Problemas? Contacta al equipo o abre un issue en GitHub.
