import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes publiques qui ne nécessitent pas d'authentification
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/verify'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si la route est publique
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  // Récupérer le token depuis les cookies
  const token = request.cookies.get('token')?.value;

  // Si la route n'est PAS publique et qu'il n'y a pas de token -> rediriger vers login
  // Cela protège TOUTES les routes par défaut (y compris /)
  if (!isPublicRoute && !token) {
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
     * - images (public images)
     * - favicon.ico (favicon file)
     * - public static files (.png, .jpg, .jpeg, .svg, .ico)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|webp)).*)',
  ],
};
