"use server"

import { revalidateTag } from "next/cache"
import type { UserDetailsResponse } from "~/interfaces/UserDetailsResponse"
import { api } from "~/api/api-methods"
import { deleteSessionId } from "~/helpers/server-session-id"

export const getUserDetails = async (sessionId: string) => {
  const searchParams = new URLSearchParams({
    session_id: sessionId
  })

  const data = await api.get<UserDetailsResponse>(
    `/account/null?${searchParams.toString()}`
  )
  return data
}

export const deleteUserSession = async (sessionId: string) => {
  const response = await api.delete<{ session_id: string }, { success: string }>(
    "/authentication/session", { session_id: sessionId }
  )

  if (!response.success) {
    return { error: "An error occurred while destroying the session ID" }
  }

  deleteSessionId()
}

export const setFavoriteMovie = async ({
  sessionId,
  movieId,
  favorite = true,
}: {
  sessionId: string,
  favorite?: boolean,
  movieId: number
}) => {
  if (!sessionId) {
    return {
      error: { message: "Unauthorized to add to favorites" },
      data: undefined,
    }
  }

  const searchParams = new URLSearchParams({
    session_id: sessionId
  })

  const response = await api.post<{
    media_type: string,
    media_id: number,
    favorite: boolean
  }, {
    success: boolean
    status_code: number
    status_message: string
  }>(`/account/null/favorite?${searchParams}`, {
    media_type: "movie",
    media_id: movieId,
    favorite,
  })

  if (!response.success) {
    return {
      error: { message: "An error occurred while setting favorite" },
      data: undefined,
    }
  }

  revalidateTag("favorite-movies")

  return {
    error: undefined,
    data: response,
  }
}
