import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
    function middleware(req) {
        console.log(req.nextUrl.pathname);
        console.log(req.nextauth.token?.role);

        if (req.nextUrl.pathname.startsWith("/") && req.nextauth.token?.role != "admin") {
            return NextResponse.rewrite(new URL("/denied", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({token}) => !!token,
        },
    }
)
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|auth|denied).*)',
    ],
  }
