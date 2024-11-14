import { cookies } from "next/headers"
import { CK_SESSION_ID } from "~/constants"

export const getSessionId = () => {
  const cookieStore = cookies()
  return cookieStore.get(CK_SESSION_ID)?.value
}

export const deleteSessionId = () => {
  const cookieStore = cookies()
  cookieStore.delete(CK_SESSION_ID)
}
