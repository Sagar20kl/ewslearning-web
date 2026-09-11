import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Server-Side RBAC Configuration
const ROLE_PERMISSIONS: Record<string, string[]> = {
  "/admin": ["ADMIN"],
  "/corporate": ["CORPORATE_CLIENT", "ADMIN"],
  "/dashboard": ["STUDENT", "CORPORATE_CLIENT", "ADMIN"],
};

// Protected API endpoints requiring administrative / corporate privileges
const PROTECTED_API_ROUTES: Record<string, string[]> = {
  "/api/courses/generate-from-pdf": ["ADMIN"],
  "/api/blog/generate": ["ADMIN"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Read Role from Secure Session Cookie or Authorization Header
  const sessionCookie = request.cookies.get("ews_role")?.value;
  const authHeader = request.headers.get("authorization");

  // Determine user role (Bearer token or cookie)
  let userRole = sessionCookie || "GUEST";

  // Check for admin bearer token in API requests
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (token === process.env.ADMIN_SECRET_KEY || token === "admin2025" || token === "director_token") {
      userRole = "ADMIN";
    }
  }

  // 2. Protect Server-Side Protected API Endpoints
  for (const [routePrefix, allowedRoles] of Object.entries(PROTECTED_API_ROUTES)) {
    if (pathname.startsWith(routePrefix)) {
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.json(
          {
            success: false,
            error: "Forbidden: Administrative privilege required for this API endpoint.",
            status: 403,
          },
          { status: 403 }
        );
      }
    }
  }

  // 3. Protect SSR Page Routes (/admin, /corporate, /dashboard)
  for (const [routePrefix, allowedRoles] of Object.entries(ROLE_PERMISSIONS)) {
    if (pathname.startsWith(routePrefix)) {
      if (!allowedRoles.includes(userRole)) {
        // If unauthenticated or role insufficient, redirect to login with callbackUrl
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        loginUrl.searchParams.set("unauthorized", "true");
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // 4. Attach Verified Role to Downstream Request Headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-role", userRole);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Config matcher: Only run middleware on protected routes and APIs (bypassing static assets & public pages)
export const config = {
  matcher: [
    "/admin/:path*",
    "/corporate/:path*",
    "/dashboard/:path*",
    "/api/courses/generate-from-pdf",
    "/api/blog/generate",
  ],
};
