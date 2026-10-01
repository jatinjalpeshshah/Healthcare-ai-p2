import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Routes that require authentication
const PROTECTED_PREFIXES = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Refresh session and retrieve authenticated user
  const { supabaseResponse, user } = await updateSession(request);

  // Protected route check
  if (PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (!user) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|images|icons|illustrations|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
