'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useToggleBodyOverflow, useBoolean, useOnClickOutside } from '@hooks'
import { Submenu } from '@components/Submenu'
import styles from './NavMenu.module.css'

interface MenuProps {
  className?: string
}

export const NavMenu: React.FC<MenuProps> = ({
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
          isMenuOpen && 'showMenu'
        )}>
          <li>
            <Submenu label='Explorar'>
              {
                [
                  { href: '/', label: 'Popular' },
                  { href: '/', label: 'En cartelera hoy' },
                  { href: '/', label: 'Próximamente' },
                  { href: '/', label: 'Mejor valoradas' },
                ].map(({ href, label }) => {
                  const key = crypto.randomUUID()
                  return (
                    <Link
                      key={key}
                      className={styles.submenuLink}
                      href={href}
                    >
                      {label}
                    </Link>
                  )
                })
              }
            </Submenu>
          </li>
          <li>
            <Submenu label='Géneros'>
              <div className={styles.genresLinks}>
                {
                  [
                    { href: '/', label: 'Acción' },
                    { href: '/', label: 'Western' },
                    { href: '/', label: 'Fantasía' },
                    { href: '/', label: 'Animacíon' },
                    { href: '/', label: 'Historia' },
                    { href: '/', label: 'Aventura' },
                    { href: '/', label: 'Misterio' },
                    { href: '/', label: 'Bélica' },
                    { href: '/', label: 'Música' },
                    { href: '/', label: 'Ciencia ficción' },
                    { href: '/', label: 'Película de TV' },
                    { href: '/', label: 'Comedia' },
                    { href: '/', label: 'Romance' },
                    { href: '/', label: 'Crimen' },
                    { href: '/', label: 'Monster inside' },
                  ].map(({ href, label }) => {
                    const key = crypto.randomUUID()
                    return (
                      <Link
                        key={key}
                        className={styles.submenuLink}
                        href={href}
                      >
                        {label}
                      </Link>
                    )
                  })
                }
              </div>
            </Submenu>
          </li>
        </ul>
      </nav>
    </div >
  )
}
