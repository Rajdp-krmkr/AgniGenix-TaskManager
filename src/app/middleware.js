import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Example: Protect a route like /dashboard
  if (pathname.startsWith("/Dashboard")) {
    const token = req.cookies.get("auth-token");
    if (!token) {
      // If no token is present, redirect to the login page
      console.log("redirecting from middleware");
      return NextResponse.redirect(new URL("/log-in", req.url));
    }
  }

  // Continue with the request
  console.log("continuing request (from middleware)");

  return NextResponse.next();
}

// export const config = {
//   matcher: "/Dashboard/:path*",
// };
