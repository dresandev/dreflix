import { SPK_REDIRECT_TO } from "~/constants"

interface Props {
  pathname: string,
  searchParams: string,
}

export const getAuthUrl = ({ pathname, searchParams, }: Props) => {
  const redirectTo = encodeURIComponent(`${pathname}?${searchParams}`)
  return `/api/tmdb/auth?${SPK_REDIRECT_TO}=${redirectTo}`
}
