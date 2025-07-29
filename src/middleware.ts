import { loggingMiddleware } from '@lib/logging/logging-middleware';
import { updateSession } from '@lib/supabase/middleware';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // TEMPORARY: Log all middleware executions
  console.log(`Middleware executing for: ${url.pathname}`);

  // Skip middleware for static assets
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/static/') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Log unexpected routes (to make sure we're not missing any routes)
  const expectedPaths = [
    '/api/',
    '/auth/',
    '/daily/',
    '/quiz/',
    '/user/',
    '/profile/',
    '/results',
  ];
  const isExpectedPath = expectedPaths.some((path) =>
    url.pathname.startsWith(path),
  );

  if (!isExpectedPath) {
    console.warn(`Middleware running on unexpected path: ${url.pathname}`);
  }

  return await loggingMiddleware(request, async () => {
    return await updateSession(request);
  });
}

export const config = {
  matcher: [
    // Only include pages that use server-side authentication (getAuthenticatedUser, redirects, etc.)
    // Pages with only client-side auth (UserContext, useAuth) don't need middleware
    '/api/:path*', // Server actions that need user context
    '/auth/:path*', // OAuth callbacks and session management
    '/daily/:path*',
    '/quiz/:path*',
    '/user/:path*',
    '/profile/:path*',
    '/results',
  ],
};
