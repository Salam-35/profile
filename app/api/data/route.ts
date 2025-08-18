import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { decrypt } from '@/lib/auth';

const dataDir = path.join(process.cwd(), 'data');

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get('session')?.value;
  if (!cookie) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const session = await decrypt(cookie);
    if (!session) {
      throw new Error('Invalid session');
    }
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const allFiles = await fs.readdir(dataDir);
    const jsonFiles = allFiles.filter(file => file.endsWith('.json'));
    return NextResponse.json({ files: jsonFiles });
  } catch (error) {
    return NextResponse.json({ message: 'Error reading data directory' }, { status: 500 });
  }
}
