import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";

// Map user roles to their respective dashboards
const ROLE_DASHBOARDS = {
  ADMIN: "/admin/dashboard",
  DOCTOR: "/doctor/dashboard",
  PATIENT: "/dashboard",
} as const;

type UserRole = keyof typeof ROLE_DASHBOARDS;

// Authentication routes (public routes for unauthenticated users only)
const authRoutes = ["/login", "/register"];

/**
 * Next.js 16 Proxy (formerly middleware)
 * Serves as the routing gatekeeper to protect pages based on authentication state and user roles.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve the accessToken cookie
  const accessToken = request.cookies.get("accessToken")?.value;

  // Determine the route type based on path prefix
  const isAdminRoute = pathname.startsWith("/admin");
  const isDoctorRoute = pathname.startsWith("/doctor");
  const isPatientRoute = pathname.startsWith("/dashboard");
  const isProtectedRoute = isAdminRoute || isDoctorRoute || isPatientRoute;
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If the user has a token, verify and decode it
  let userPayload = null;
  if (accessToken) {
    userPayload = await verifyJwt(accessToken, process.env.JWT_SECRET || "");
  }

  // 1. Unauthenticated users trying to access protected routes
  if (isProtectedRoute && !userPayload) {
    const loginUrl = new URL("/login", request.url);
    // Add redirect parameter to return to original page after login
    loginUrl.searchParams.set("redirect", pathname);
    
    const response = NextResponse.redirect(loginUrl);
    // Clear invalid/expired cookies if they exist
    if (accessToken) {
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
    }
    return response;
  }

  // 2. Authenticated users trying to access login/register pages
  if (isAuthRoute && userPayload) {
    const role = (userPayload.role || "PATIENT") as UserRole;
    const targetDashboard = ROLE_DASHBOARDS[role] || ROLE_DASHBOARDS.PATIENT;
    return NextResponse.redirect(new URL(targetDashboard, request.url));
  }

  // 3. Authenticated users accessing role-specific routes
  if (isProtectedRoute && userPayload) {
    const role = (userPayload.role || "PATIENT") as UserRole;

    // Check if the user is authorized to access the current role section
    if (isAdminRoute && role !== "ADMIN") {
      const correctDashboard = ROLE_DASHBOARDS[role] || ROLE_DASHBOARDS.PATIENT;
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }

    if (isDoctorRoute && role !== "DOCTOR") {
      const correctDashboard = ROLE_DASHBOARDS[role] || ROLE_DASHBOARDS.PATIENT;
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }

    if (isPatientRoute && role !== "PATIENT") {
      const correctDashboard = ROLE_DASHBOARDS[role] || ROLE_DASHBOARDS.PATIENT;
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }
  }

  // Continue to the requested page (e.g. common public routes)
  return NextResponse.next();
}

// Configure the paths where the proxy should execute
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - All public assets like .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
