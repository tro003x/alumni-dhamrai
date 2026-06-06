import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/dashboard", "/account", "/members", "/apply", "/admin"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("firebase-token")?.value;
  const isProtected = PROTECTED.some((p) =>
    req.nextUrl.pathname.startsWith(p)
  );
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/members/:path*",
    "/admin/:path*",
    "/apply/:path*",
  ],
};