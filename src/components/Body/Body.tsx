'use client'

import { Fira_Sans } from 'next/font/google'
import clsx from 'clsx'
import { useUIStore } from '@store/use-ui-store'
import styles from './Body.module.css'

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: [
    '400',
    '500',
    '700',
  ]
})

interface BodyProps {
  children: React.ReactNode
}

export const Body: React.FC<BodyProps> = ({
  children
}) => {
  const { isMenuOpen } = useUIStore()

  return (
    <body className={clsx(
      firaSans.className,
      isMenuOpen && styles.hideOverflow
    )}>
      {children}
    </body>
  )
}
