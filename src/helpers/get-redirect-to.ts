import { SPK_REDIRECT_TO } from "~/constants"

export const getAuthUrl = ({
  pathname,
  searchParams,
}: {
  pathname: string,
  searchParams: string,
}) => {
  const redirectTo = `${pathname}?${searchParams}`
  return `/api/tmdb/auth?${SPK_REDIRECT_TO}=${encodeURIComponent(redirectTo)}`
}
