import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import getOrCreateDB from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storage.collection'

export async function middleware(request: NextRequest) {
    console.log("Middleware running for path:", request.nextUrl.pathname);

    // Check if the current path is login or register
    const isAuthRoute = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register';

    // Only run DB and storage setup for non-auth routes
    if (!isAuthRoute) {
        await Promise.all([
            getOrCreateDB(),
            getOrCreateStorage()
        ])
    }

    // You can add more logic here if needed
    // For example, checking if the user is authenticated for certain routes

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/',
        '/login',
        '/register'
    ],
}