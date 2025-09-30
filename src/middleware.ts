import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

const PUBLIC = ['/', '/login', '/signup']
const PROTECTED_PREFIXES = ['/dashboard', '/profile', '/settings', '/admin']
const ADMIN_PREFIX = '/admin'
const ADMIN_API_PREFIX = '/api/admin'

export async function middleware(req: NextRequest) {
  if (req.method === 'OPTIONS') return NextResponse.next()

  const url = req.nextUrl
  const path = url.pathname

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  console.log("admin middleware", session);

  const isPublic = PUBLIC.includes(path)
  const isProtected = PROTECTED_PREFIXES.some(p => path.startsWith(p))
  const isAdminPage = path.startsWith(ADMIN_PREFIX) && !path.startsWith('/api/')
  const isAdminApi = path.startsWith(ADMIN_API_PREFIX)
  const isAuthOnlyPage = path === '/login' || path === '/signup'

  if (isProtected && !session) {
    if (path.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('next', path)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthOnlyPage && session) {
    const dashUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(dashUrl)
  }

  if ((isAdminPage || isAdminApi) && session) {
    const role = session.user.user_metadata?.role
    console.log("role", role);
    if (role !== 'admin') {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  if (isPublic) return res
  return res
}

// Ejecutar el middleware SOLO donde hace falta
export const config = {
  matcher: [
    // Páginas protegidas
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/admin/:path*',

    // Páginas públicas con reglas de auth
    '/login',
    '/signup',

    // Endpoints protegidos
    '/api/admin/:path*',
    '/api/invitations/:path*',

    // (opcional) Todo el sitio excepto estáticos:
    // '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}
