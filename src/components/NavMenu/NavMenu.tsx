'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { movieListPagesInfo } from '@data/movie-list-pages'
import {
  useToggleBodyOverflow,
  useBoolean,
  useOnClickOutside,
  useOnPathnameChange
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
    toggle: toggleMenu,
    setFalse: closeMenu
  } = useBoolean(false)
  useToggleBodyOverflow(isMenuOpen)
  useOnClickOutside(menuRef, closeMenu)

  useOnPathnameChange(() => {
    isMenuOpen && closeMenu()
  })

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
        onClick={toggleMenu}
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
                movieListPagesInfo.map(({ slug, title }) => {
                  const key = crypto.randomUUID()
                  return (
                    <Link
                      key={key}
                      className={styles.dropdownLink}
                      href={`/movie/${slug}`}
                      prefetch={false}
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
