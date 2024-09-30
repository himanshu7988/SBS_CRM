import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Redirect from '/' to '/dashboard'
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Continue to the requested page if not '/'
  return NextResponse.next();
}
