import { NextResponse, NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.SECRET!,
  })

  const pathname = req.nextUrl.pathname
  console.info("Request", req.nextUrl.pathname)

  // No token = always redirect in login page
  if (!token && pathname == "/") {
    return NextResponse.redirect("/login")
  }
  return NextResponse.next()
}
