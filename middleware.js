import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;

    if (!token) return;

    const url = req.nextUrl.pathname;

    const adminOnlyPaths = [
      '/dashboard/configuracion',
      '/dashboard/facturacion',
      '/dashboard/proveedores',
      '/dashboard/inventario',
      '/dashboard/reportes',
    ];

    if (token.rol === 'usuario' && adminOnlyPaths.some((path) => url.startsWith(path))) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*'],
};
