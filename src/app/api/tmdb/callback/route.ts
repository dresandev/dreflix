import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import type { SessionIdResponse } from "~/interfaces/SessionIdResponse"
import { CK_SESSION_ID, SPK_REDIRECT_TO } from "~/constants"
import { asyncWrapper } from "~/utils/async-wrapper"
import { api } from "~/api/api-methods"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const requestToken = searchParams.get("request_token")
  const denied = searchParams.get("denied")
  const redirectTo = searchParams.get(SPK_REDIRECT_TO) || "/"
  const redirectUri = new URL(decodeURIComponent(redirectTo), req.url)

  if (!requestToken) {
    return NextResponse.json({ error: "No request token found" })
  }

  const { data, status } = await asyncWrapper(
    api.post<{ request_token: string }, SessionIdResponse>(
      "/authentication/session/new",
      { request_token: requestToken }
    )
  )

  if (denied) {
    redirectUri.searchParams.set("denied", "true")
    return NextResponse.redirect(redirectUri)
  }

  if (status === "error") {
    return NextResponse.json({ error: "Error creating session" })
  }

  if (!data.success) {
    return NextResponse.json({ error: "Could not create session" })
  }

  const cookieStore = await cookies()
  cookieStore.set(CK_SESSION_ID, data.session_id, { secure: true })

  return NextResponse.redirect(redirectUri)
}
