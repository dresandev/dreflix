"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

export const AccessDeniedToast = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const denied = searchParams.get("denied")

    if (!denied) return

    toast.info("Access Denied 😞")

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete("denied")
    router.replace(`${window.location.pathname}?${newSearchParams}`)
  }, [router, searchParams])

  return null
}
