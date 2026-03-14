import { NextResponse, type NextRequest } from "next/server"
import { getSessionId } from "./helpers/session-id"
import { privateRoutes } from "~/routes"

export async function proxy(req: NextRequest) {
  const { nextUrl, headers } = req
  const sessionId = await getSessionId()
  const isLoggedIn = !!sessionId
  const pathname = nextUrl.pathname
  const isPrivateRoute = privateRoutes.includes(pathname)
  const ua = headers.get("user-agent") || ""

  if (ua.includes("bot") || ua.includes("crawler")) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  if (isLoggedIn) return

  if (!isLoggedIn && isPrivateRoute) {
    nextUrl.pathname = "/"
    return NextResponse.redirect(nextUrl)
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
