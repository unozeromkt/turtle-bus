/**
 * Script para crear usuario admin usando Supabase Auth
 * Uso: npx tsx scripts/create-admin-simple.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Variables de Supabase no configuradas')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  try {
    console.log('🔧 Creando usuario admin con Supabase Auth...')

    // Crear usuario en Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@turtle-bus.co',
      password: 'admin123',
      user_metadata: {
        role: 'owner',
        first_name: 'Admin',
        last_name: 'Turtle Bus',
      },
    })

    if (error) {
      console.error('❌ Error:', error)
      process.exit(1)
    }

    console.log('✅ Usuario admin creado exitosamente!')
    console.log('📧 Email: admin@turtle-bus.co')
    console.log('🔐 Password: admin123')
    console.log('🆔 User ID:', data.user.id)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
