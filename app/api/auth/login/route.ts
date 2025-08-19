import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { encrypt } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  console.warn('--- WARNING: Logging sensitive information. Remove before deploying to production. ---');

  // --- Start Debugging Logs ---
  console.log('--- Login Attempt ---');
  console.log('Received username:', username);
  console.log('Received password:', password);
  console.log('Expected username (from .env.local):', process.env.ADMIN_USERNAME);
  console.log('Expected password (from .env.local):', process.env.ADMIN_PASSWORD);
  // --- End Debugging Logs ---

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    console.log('Credentials match!');

    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const session = await encrypt({ username, expires });

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set({
      name: 'session',
      value: session,
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return response;
  } else {
    console.log('Credentials do NOT match.');
    const passwordMatch = password === process.env.ADMIN_PASSWORD;
    return NextResponse.json({
           message: 'Invalid credentials',
           debug: {
               receivedUsername: username,
               expectedUsername: process.env.ADMIN_USERNAME,
               receivedPassword: password,
               expectedPassword: process.env.ADMIN_PASSWORD
          }
     }, { status: 401 });  }
}
