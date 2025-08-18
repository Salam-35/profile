import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow the login page to be accessed without a session
  if (path === '/salam/login') {
    return NextResponse.next();
  }

  // For any other path under /salam, check for a valid session.
  const cookie = request.cookies.get('session')?.value;
  if (!cookie) {
    return NextResponse.redirect(new URL('/salam/login', request.url));
  }

  try {
    const session = await decrypt(cookie);
    if (!session) {
      throw new Error('Invalid session');
    }
  } catch (err) {
    // If decryption fails or session is invalid, redirect to login
    return NextResponse.redirect(new URL('/salam/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/salam/:path*'],
};
