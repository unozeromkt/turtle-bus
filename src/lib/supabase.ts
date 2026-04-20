import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

// Support both new and legacy key formats
// New format (2025+): sb_publishable_..., sb_secret_...
// Legacy format: JWT-based anon and service_role keys
const publishableKey = 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const secretKey = 
  process.env.SUPABASE_SECRET_KEY || 
  process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !publishableKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and either:\n' +
    '- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (new format)\n' +
    '- NEXT_PUBLIC_SUPABASE_ANON_KEY (legacy format)'
  )
}

// Cliente público (browser) - usa publishable key
// Esta key tiene permisos limitados según RLS policies
export const supabase = createClient(supabaseUrl, publishableKey)

// Cliente admin (server) - usa secret key
// Esta key bypassa RLS, úsalo solo en backend
export const supabaseAdmin = createClient(
  supabaseUrl,
  secretKey || publishableKey, // Fallback a publishable si no hay secret
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

