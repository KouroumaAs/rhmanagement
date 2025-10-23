import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes publiques qui ne nécessitent pas d'authentification
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/verify'];

// Routes qui nécessitent une authentification
const PROTECTED_ROUTES = ['/dashboard', '/change-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si la route est protégée
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  // Récupérer le token depuis les cookies (si vous utilisez des cookies)
  // Ou vérifier via une autre méthode
  const token = request.cookies.get('token')?.value;

  // Si la route est protégée et qu'il n'y a pas de token
  if (isProtectedRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur est authentifié et essaie d'accéder à une page publique
  if (token && isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard/rh';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configurer les chemins pour lesquels le middleware doit s'exécuter
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
