import { NextResponse } from 'next/server';
import { getEnv } from '@/lib/db';

export const runtime = 'edge';

export async function GET() {
  try {
    const { DB } = getEnv();
    const { results } = await DB.prepare('SELECT * FROM certificates ORDER BY created_at DESC').all();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}
