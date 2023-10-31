'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import { useOnClickOutside, useBoolean } from '@hooks'
import { ChevronArrow } from '@components/SVG'
import styles from './Submenu.module.css'

interface SubmenuProps {
  children: React.ReactNode[]
  label: string
}

export const Submenu: React.FC<SubmenuProps> = ({
  children,
  label,
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
      <label>
        <button
          className={styles.labelBtn}
          onClick={toggleSubmenuIsOpen}
        >
          {label}
          <ChevronArrow
            className={clsx(
              styles.chevronArrow,
              submenuIsOpen && styles.rotateArrow
            )}
          />
        </button>
      </label>
      <ul className={clsx(
        styles.submenu,
        submenuIsOpen && styles.submenuOpen
      )}>
        {
          children.map(option => {
            const key = crypto.randomUUID()
            return (
              <li key={key}>
                {option}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
