import { NextResponse } from 'next/server';

// Rutas protegidas
const protectedPaths = ['/dashboard'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    const authenticated = request.cookies.get('authenticated')?.value;

    if (authenticated !== 'true') {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
