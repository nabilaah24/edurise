import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const now = Math.floor(Date.now() / 1000);
  const pathname = request.nextUrl.pathname;
  const isLoginRoute = pathname.startsWith("/login");
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isExpired = !token?.expiresAt || now > token.expiresAt;

  if ((!token || isExpired) && !isLoginRoute) {
    const response = NextResponse.redirect(new URL("/login", request.url));

    if (isExpired) {
      response.cookies.delete("next-auth.session-token");
      response.cookies.delete("__Secure-next-auth.session-token");
    }

    return response;
  }

  if (token && !isExpired && isLoginRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
