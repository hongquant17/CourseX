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
