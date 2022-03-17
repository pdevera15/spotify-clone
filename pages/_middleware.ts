import { getToken } from "next-auth/jwt"
import type { NextApiRequest } from "next"
import { NextResponse } from "next/server"

const handler = async (req: NextApiRequest) => {
  // Get Token
  const token = await getToken({
    req,
    secret: process.env.SECRET!,
  })

  // Fetch pathname
  const url: URL = new URL(req.url!, `http://${req.headers.host}`)
  const pathname = url.pathname

  // No token = always redirect in login page
  if (!token && pathname == "/") {
    console.log("TEST")
    return NextResponse.redirect("/login")
  }
  return NextResponse.next()
}

export default handler
