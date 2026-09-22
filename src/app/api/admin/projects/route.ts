import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';

export const runtime = 'edge';

interface ProjectPayload {
  id?: string;
  title: string;
  description: string;
  icon: string;
  tags?: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json() as ProjectPayload;
    const { DB } = getEnv();
    
    await DB.prepare(
      `INSERT INTO projects (id, title, description, icon, tags, github_url, live_url, image_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      data.id || crypto.randomUUID(), data.title, data.description, data.icon, 
      JSON.stringify(data.tags || []), data.github_url, data.live_url, data.image_url
    ).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json() as ProjectPayload & { id: string };
    const { DB } = getEnv();
    
    await DB.prepare(
      `UPDATE projects SET title = ?, description = ?, icon = ?, tags = ?, github_url = ?, live_url = ?, image_url = ?, updated_at = datetime('now') WHERE id = ?`
    ).bind(
      data.title, data.description, data.icon, JSON.stringify(data.tags || []), data.github_url, data.live_url, data.image_url, data.id
    ).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const { DB } = getEnv();
    await DB.prepare(`DELETE FROM projects WHERE id = ?`).bind(id).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
