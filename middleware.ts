import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith("/") && !req.nextauth.token?.id) {
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
      '/((?!api/auth|_next/static|_next/image|favicon.ico|auth|denied).*)',
    ],
  }


  export function middleware(request: Request) {
  
    // Store current request url in a custom header, which you can read later
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);
  
    return NextResponse.next({
      request: {
        // Apply new request headers
        headers: requestHeaders,
      }
    });
  }