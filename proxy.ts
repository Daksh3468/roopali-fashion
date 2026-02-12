import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const authCookie = request.cookies.get('admin_auth');

    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!authCookie || authCookie.value !== 'true') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // If authenticated, allow the request but add security headers to prevent caching
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
}

export const config = {
    matcher: ['/admin/:path*'],
};
