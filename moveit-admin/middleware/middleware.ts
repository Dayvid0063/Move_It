import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request.cookies, "cookies");

  const token = request.cookies.get("token");

  console.log("Token:", token);

  // Redirect to login if accessing protected routes without authentication
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
