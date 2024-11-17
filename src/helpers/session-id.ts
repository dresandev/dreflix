import { cookies } from "next/headers"
import { CK_SESSION_ID } from "~/constants"

export const getSessionId = async () => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(CK_SESSION_ID)
  return sessionId?.value
}

export const deleteSessionId = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(CK_SESSION_ID)
}
