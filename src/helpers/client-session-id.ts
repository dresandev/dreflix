import { CK_SESSION_ID } from "~/constants"
import { getClientSideCookie } from "~/utils/get-client-side-cookie"

export const getClientSessionId = () => {
  return getClientSideCookie(CK_SESSION_ID)
}
