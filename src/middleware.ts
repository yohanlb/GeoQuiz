import { loggingMiddleware } from '@lib/logging/logging-middleware';
import { updateSession } from '@lib/supabase/middleware';
import { type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // TEMPORARY: Log all middleware executions
  console.log(`Middleware executing for: ${url.pathname}`);

  // Log unexpected routes (to make sure we're not missing any routes)
  const expectedPaths = [
    '/api/',
    '/auth/',
    '/daily/',
    '/quiz/',
    '/user/',
    '/profile/',
    '/home',
    '/',
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
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
