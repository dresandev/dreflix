"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { getAuthUrl } from "~/helpers/get-redirect-to"
import { UserIcon } from "~/components/Svg"
import { Button } from "~/components/Ui/Button"
import styles from "./LoginLink.module.css"

export const LoginLink = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams().toString()
  const authUrl = getAuthUrl({ pathname, searchParams })

  return (
    <Button variant="square" size="header" asChild>
      <a className={styles.link} title="Login" href={authUrl}>
        <UserIcon size={32} />
      </a>
    </Button>
  )
}
