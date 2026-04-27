import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const globalForSupabase = globalThis as typeof globalThis & {
  __supabaseBrowserClient?: ReturnType<typeof createClient>
}

// Cliente público (browser) - singleton para evitar múltiples GoTrueClient en HMR.
export const supabase = globalForSupabase.__supabaseBrowserClient ?? createClient(supabaseUrl, supabaseAnonKey)

if (typeof window !== 'undefined') {
  globalForSupabase.__supabaseBrowserClient = supabase
}


