import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';

export const runtime = 'edge';

interface CertificatePayload {
  id?: string;
  title: string;
  issuer: string;
  description?: string;
  date: string;
  certificate_id?: string;
  verification_url?: string;
  image_url?: string;
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json() as CertificatePayload;
    const { DB } = getEnv();
    
    await DB.prepare(
      `INSERT INTO certificates (id, title, issuer, description, date, certificate_id, verification_url, image_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      data.id || crypto.randomUUID(), data.title, data.issuer, data.description, data.date, data.certificate_id, data.verification_url, data.image_url
    ).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json() as CertificatePayload & { id: string };
    const { DB } = getEnv();
    
    await DB.prepare(
      `UPDATE certificates SET title = ?, issuer = ?, description = ?, date = ?, certificate_id = ?, verification_url = ?, image_url = ?, updated_at = datetime('now') WHERE id = ?`
    ).bind(
      data.title, data.issuer, data.description, data.date, data.certificate_id, data.verification_url, data.image_url, data.id
    ).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const { DB } = getEnv();
    await DB.prepare(`DELETE FROM certificates WHERE id = ?`).bind(id).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
