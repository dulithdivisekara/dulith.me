import { NextRequest } from 'next/server';

export function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.split(' ')[1];
  const adminKey = process.env.ADMIN_KEY;
  
  if (!adminKey) {
    console.error("ADMIN_KEY environment variable is not set.");
    return false;
  }

  return token === adminKey;
}
