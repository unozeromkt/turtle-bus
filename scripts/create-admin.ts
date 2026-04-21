import { supabaseAdmin } from '@/lib/supabase'
import { hashPassword } from '@/lib/auth/password'

async function createDefaultAdmin() {
  try {
    // Verificar si ya existe un admin
    const { data: existingAdmin } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', 'admin@turtle-bus.co')
      .single()

    if (existingAdmin) {
      console.log('✅ Admin user already exists')
      return
    }

    // Crear usuario admin
    const hashedPassword = await hashPassword('admin123')

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        email: 'admin@turtle-bus.co',
        password: hashedPassword,
        first_name: 'Admin',
        last_name: 'Turtle Bus',
        role: 'owner',
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    console.log('✅ Admin user created successfully!')
    console.log(`📧 Email: admin@turtle-bus.co`)
    console.log(`🔐 Password: admin123`)
    console.log('⚠️  CHANGE THIS PASSWORD IMMEDIATELY IN PRODUCTION')
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createDefaultAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
