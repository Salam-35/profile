import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { decrypt } from '@/lib/auth';

const dataDir = path.join(process.cwd(), 'data');

async function verifySession(request: NextRequest) {
  const cookie = request.cookies.get('session')?.value;
  if (!cookie) return null;
  try {
    const session = await decrypt(cookie);
    return session;
  } catch (err) {
    return null;
  }
}

// GET request handler to read a file
export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  const session = await verifySession(request);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { filename } = params;
  if (!filename.endsWith('.json')) {
    return NextResponse.json({ message: 'Invalid file type' }, { status: 400 });
  }

  try {
    const filePath = path.join(dataDir, filename);
    const fileContent = await fs.readFile(filePath, 'utf8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    return NextResponse.json({ message: 'File not found' }, { status: 404 });
  }
}

// POST request handler to write to a file
export async function POST(request: NextRequest, { params }: { params: { filename: string } }) {
  const session = await verifySession(request);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { filename } = params;
  if (!filename.endsWith('.json')) {
    return NextResponse.json({ message: 'Invalid file type' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf8');
    return NextResponse.json({ message: 'File updated successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing to file' }, { status: 500 });
  }
}
