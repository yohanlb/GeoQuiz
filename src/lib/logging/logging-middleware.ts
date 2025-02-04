import { Logger } from '@logtail/next';
import { NextRequest, NextResponse } from 'next/server';

const log = new Logger();

const shouldLogRequest = (pathname: string): boolean => {
  // Log API routes, auth endpoints, and OAuth callbacks
  const pathsToLog = ['/api/', '/auth/', '/login', '/callback'];

  const pathsToIgnore = ['/_next/', '/favicon.ico', '/static/', '/images/'];

  return (
    pathsToLog.some((path) => pathname.includes(path)) &&
    !pathsToIgnore.some((path) => pathname.startsWith(path))
  );
};

export async function loggingMiddleware(
  request: NextRequest,
  next: (request: NextRequest) => Promise<NextResponse>,
) {
  const requestId = crypto.randomUUID();
  const startTime = performance.now();
  const url = new URL(request.url);

  if (!shouldLogRequest(url.pathname)) {
    return next(request);
  }

  try {
    log.info(`${request.method} ${url.pathname} - Started`, {
      requestId,
      method: request.method,
      path: url.pathname,
      searchParams: Object.fromEntries(url.searchParams),
      userAgent: request.headers.get('user-agent'),
    });

    // Add request ID to headers for tracking
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-request-id', requestId);

    // Create new request with updated headers
    const requestWithId = new NextRequest(request.url, {
      headers: requestHeaders,
      method: request.method,
      body: request.body,
    });

    // Process the request through the next middleware or route handler
    const response = await next(requestWithId);

    const duration = Math.round((performance.now() - startTime) * 100) / 100;

    log.info(`${request.method} ${url.pathname} - Completed`, {
      requestId,
      method: request.method,
      path: url.pathname,
      duration,
      status: response.status,
    });

    return response;
  } catch (error) {
    const duration = Math.round((performance.now() - startTime) * 100) / 100;

    log.error(`${request.method} ${url.pathname} - Failed`, {
      requestId,
      method: request.method,
      path: url.pathname,
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    throw error;
  }
}
