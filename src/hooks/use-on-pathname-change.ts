import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const useOnPathnameChange = (handler: () => void) => {
  const pathname = usePathname()

  useEffect(() => {
    handler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
}
