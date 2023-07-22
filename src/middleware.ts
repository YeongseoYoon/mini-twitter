import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/create-account") ||
    req.nextUrl.pathname.startsWith("/log-in")
  ) {
    if (req.cookies.has("tweetsession")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (!req.cookies.has("tweetsession")) {
    if (
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname.startsWith("/write") ||
      req.nextUrl.pathname.startsWith("/tweet")
    ) {
      return NextResponse.redirect(new URL("/log-in", req.url));
    }
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
