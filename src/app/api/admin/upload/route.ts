import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const { MEDIA, R2_PUBLIC_URL } = getEnv();
    const arrayBuffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;

    // Upload to R2
    await MEDIA.put(fileName, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    });

    const publicUrl = `${R2_PUBLIC_URL}/${fileName}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
