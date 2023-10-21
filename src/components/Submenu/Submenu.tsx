'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useOnClickOutside } from '@hooks/use-on-click-outside'
import { useBoolean } from '@hooks/use-boolean'
import { ChevronArrow } from '@components/SVG'
import styles from './Submenu.module.css'

interface SubmenuItemProps {
  href: string
  label: string
}

interface SubmenuProps {
  title: string
  items: SubmenuItemProps[]
}

export const Submenu: React.FC<SubmenuProps> = ({
  title,
  items
}) => {
  const {
    value: submenuIsOpen,
    setFalse: closeSubmenu,
    toggle: toggleSubmenuIsOpen
  } = useBoolean(false)
  const submenuRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(submenuRef, closeSubmenu)

  return (
    <div ref={submenuRef}>
      <button
        className={clsx(
          styles.option,
          submenuIsOpen && styles.submenuOpen
        )}
        onClick={toggleSubmenuIsOpen}
      >
        {title} <ChevronArrow className={styles.chevronArrow} />
      </button>
      <ul className={styles.submenu}>
        {
          items.map(({ href, label }) => {
            const key = crypto.randomUUID()
            return (
              <Link
                key={key}
                className={styles.link}
                href={href}
              >
                {label}
              </Link>
            )
          })
        }
      </ul>
    </div>
  )
}
