"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { getAuthUrl } from "~/helpers/get-redirect-to"
import { UserIcon } from "~/components/Svg"
import { Button } from "~/components/Ui/Button"
import styles from "./AuthLink.module.css"

export const AuthLink = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const authUrl = getAuthUrl({ pathname, searchParams: searchParams.toString() })

  return (
    <Button variant="square" size="header" asChild>
      <a className={styles.link} title="Login" href={authUrl}>
        <UserIcon size={32} />
      </a>
    </Button>
  )
}
