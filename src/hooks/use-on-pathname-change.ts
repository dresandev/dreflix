import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const useOnPathnameChange = (handler: () => void) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    handler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])
}
