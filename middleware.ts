import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function withTrailingSlashRedirect(req: NextRequest): NextResponse | undefined {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return undefined;
  }

  if (pathname !== "/" && !pathname.endsWith("/") && !pathname.includes(".")) {
    const target = new URL(`${pathname}/${req.nextUrl.search}`, req.nextUrl.origin);
    return NextResponse.redirect(target, 308);
  }

  return undefined;
}

export function middleware(req: NextRequest) {
  return withTrailingSlashRedirect(req);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
