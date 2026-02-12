import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { createClient } from './utils/supabase/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    // 1. Refresh session
    let response = await updateSession(request)

    // 2. Auth check for /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return response
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
}
