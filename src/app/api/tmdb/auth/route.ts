import { NextRequest, NextResponse } from "next/server"
import type { TokenResponse } from "~/interfaces/TokenResponse"
import { SPK_REDIRECT_TO } from "~/constants"
import { asyncWrapper } from "~/utils/async-wrapper"
import { api } from "~/api/api-methods"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const redirectTo = searchParams.get(SPK_REDIRECT_TO) || "/"

  const { data, status } = await asyncWrapper(
    api.get<TokenResponse>(
      "/authentication/token/new",
      { cache: "no-store" }
    ))

  if (status === "error") {
    return NextResponse.json({ error: "Error getting token" })
  }

  if (!data.success) {
    return NextResponse.json({ error: "Token could not be generated" })
  }

  const redirectUri = new URL("/api/tmdb/callback", req.url)

  redirectUri.searchParams.set(
    SPK_REDIRECT_TO,
    encodeURIComponent(redirectTo)
  )

  const authUrl = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${redirectUri}`

  return NextResponse.redirect(authUrl)
}
