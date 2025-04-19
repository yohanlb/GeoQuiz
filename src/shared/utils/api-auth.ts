import { NextResponse } from 'next/server';

export function verifyAdminApiKey(request: Request): { isValid: boolean; errorResponse?: NextResponse } {
  const authHeader = request.headers.get('authorization');
  const expectedKey = process.env.API_KEY_ADMIN;

  if (!expectedKey) {
    return {
      isValid: false,
      errorResponse: NextResponse.json(
        { error: 'API_KEY_ADMIN environment variable is not set' },
        { status: 500 }
      ),
    };
  }

  if (!authHeader?.startsWith('Bearer ') || authHeader.split('Bearer ')[1] !== expectedKey) {
    return {
      isValid: false,
      errorResponse: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { isValid: true };
} 