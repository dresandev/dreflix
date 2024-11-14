import { NextResponse, type NextRequest } from "next/server"
import { getSessionId } from "./helpers/server-session-id"
import { privateRoutes } from "~/routes"

export function middleware(req: NextRequest) {
  const { nextUrl } = req
  const sessionId = getSessionId()
  const isLoggedIn = !!sessionId
  const pathname = nextUrl.pathname
  const isPrivateRoute = privateRoutes.includes(pathname)

  if (isLoggedIn) return

  if (!isLoggedIn && isPrivateRoute) {
    nextUrl.pathname = "/"
    return NextResponse.redirect(nextUrl)
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
