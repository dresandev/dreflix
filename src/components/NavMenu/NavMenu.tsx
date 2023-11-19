'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { movieListPages } from '@constants'
import {
  useToggleBodyOverflow,
  useBoolean,
  useOnClickOutside
} from '@hooks'
import { Dropdown } from '@components/Dropdown'
import styles from './NavMenu.module.css'

interface MenuProps {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

export const NavMenu: React.FC<MenuProps> = ({
  children,
  className
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const {
    value: isMenuOpen,
    toggle: toggleIsMenuOpen,
    setFalse: closeMenu
  } = useBoolean(false)
  useToggleBodyOverflow(isMenuOpen)
  useOnClickOutside(menuRef, closeMenu)

  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div
      className={clsx(className)}
      ref={menuRef}
    >
      <button
        aria-label='Abir menú'
        className={clsx(
          styles.menuBtn,
          isMenuOpen && styles.activeMenuBtn
        )}
        onClick={toggleIsMenuOpen}
      >
        <span className={styles.menuBtnLine}></span>
        <span className={styles.menuBtnLine}></span>
      </button>

      <nav>
        <ul className={clsx(
          styles.menu,
          isMenuOpen && styles.menuOpen
        )}>
          <li>
            <Dropdown label='Explorar'>
              {
                movieListPages.map(({ slug, title }) => {
                  const key = crypto.randomUUID()
                  return (
                    <Link
                      key={key}
                      className={styles.dropdownLink}
                      href={`movie/${slug}`}
                    >
                      {title}
                    </Link>
                  )
                })
              }
            </Dropdown>
          </li>
          {
            childrenArray.map(child => {
              const key = crypto.randomUUID()
              return (
                <li key={key}>
                  {child}
                </li>
              )
            })
          }
        </ul>
      </nav>
    </div >
  )
}
