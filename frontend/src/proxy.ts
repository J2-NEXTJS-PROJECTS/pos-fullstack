import { NextRequest, NextResponse } from 'next/server';

const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/login', '/signup'];
const PROTECTED_ROUTES = ['/checkout'];

export const proxy = (req: NextRequest) => {
  console.log(`entra al middleware-proxy`)
  // obtenemos la ruta
  const { pathname } = req.nextUrl;

  //Se verifica si la cookie existe, la validacion se hace en el backend
  const accessToken = req.cookies.get('access_token');

  const isAuthenticated = Boolean(accessToken);
 console.log({url: req.url})
  // ✅ Redirect authenticated users away from auth pages
  //! si el usuario aterriza en /login o /singnup y esta autenticado se lo redercciona a la raiz
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      //creamos la url https://miweb.com/

      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // ✅ Protect checkout (must be authenticated)
  //! SI el usuario aterriza en checkout y no esta autenticado se lo redirecciona al  login
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      //creamos la url https://miweb.com/login
      const loginUrl = new URL('/login', req.url);
      //agregamos un queryParam: /login?redirect=/checkout
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ✅ Protect admin routes (auth required, role validated server-side later)
  if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  //Se define en que rutas se ejecuta el middleware
  matcher: ['/admin/:path*', '/checkout', '/login', '/signup'],
};
