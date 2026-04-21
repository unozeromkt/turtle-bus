import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Si no hay sesión y está intentando acceder al admin (excepto el login), redirigir
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  if (!session && !isLoginPage) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Si ya tiene sesión y va al login, redirigir al dashboard
  if (session && isLoginPage) {
    const dashboardUrl = new URL('/admin/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
