import { getIronSession } from "iron-session/edge";
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  if (userAgent(req).isBot) {
  }

  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: process.env.COOKIE_NAME!,
    password: process.env.IRON_SESSION_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
    },
  });

  if (
    req.nextUrl.pathname.startsWith("/create-account") ||
    req.nextUrl.pathname.startsWith("/log-in")
  ) {
    if (session.user) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (!session.user) {
    if (
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname.startsWith("/write") ||
      req.nextUrl.pathname.startsWith("/tweet") ||
      req.nextUrl.pathname.startsWith("/profile")
    ) {
      return NextResponse.redirect(new URL("/log-in", req.url));
    }
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
