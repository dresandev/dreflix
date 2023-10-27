'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useToggleBodyOverflow } from '@hooks/use-toggle-body-overflow'
import { useBoolean } from '@hooks/use-boolean'
import { useOnClickOutside } from '@hooks/use-on-click-outside'
import { Submenu } from '@components/Submenu'
import styles from './Menu.module.css'

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
        title='Menú'
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
          isMenuOpen && styles.showMenu
        )}>
          <li className={styles.listItem}>
            <Submenu label='Explorar'>
              {
                [
                  { href: '/', label: 'Popular' },
                  { href: '/', label: 'En cartelera hoy' },
                  { href: '/', label: 'Próximamente' },
                  { href: '/', label: 'Mejor valoradas' },
                ].map(({ href, label }, i) => {
                  // TODO: uncomment this
                  // const key = crypto.randomUUID()
                  return (
                    <Link
                      key={i}
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
          <li className={styles.listItem}>
            <Submenu label='Géneros'>
              {
                [
                  { href: '/', label: 'Acción' },
                  { href: '/', label: 'Fantasía' },
                  { href: '/', label: 'Historia' },
                  { href: '/', label: 'Misterio' },
                  { href: '/', label: 'Música' },
                ].map(({ href, label }, i) => {
                  // const key = crypto.randomUUID()
                  return (
                    <Link
                      key={i}
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
        </ul>
      </nav>
    </div>
  )
}
