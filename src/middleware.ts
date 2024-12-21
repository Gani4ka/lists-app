import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('auth-user')?.value;

  if (!currentUser && request.nextUrl.pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/auth', request.nextUrl.origin));
  }
}
export const config = {
  matcher: [
    '/categories',
    '/category',
    '/category/:slug*',
    '/subcategory',
    '/subcategory/:slug*',
    '/',
  ],
};
