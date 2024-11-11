// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   const path = request.nextUrl.pathname;
//   const session = request.cookies.get("session");
//   if (session && path === "/admin/login") {
//     return NextResponse.redirect(new URL("/admin", request.url));
//   }

//   if (path !== "/admin/login" && !session) {
//     return NextResponse.redirect(new URL("/admin/login", request.url));
//   }
// }

export { default } from "next-auth/middleware";
// See "Matching Paths" below to learn more
export const config = { matcher: ["/admin", "/admin/:path*"] };
