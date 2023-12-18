import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname === "/") {
    return NextResponse.next();
  }

  const session = await getToken({ req });

  if (session && (pathname === "/iniciar-sesion" || pathname === "/registro")) {
    return NextResponse.redirect(new URL("/app", req.url));
  } else if (!session && /^\/app(?:\/[a-zA-Z0-9-]+)*$/.test(pathname)) {
    return NextResponse.redirect(new URL("/iniciar-sesion", req.url));
  }

  return NextResponse.next();
}
