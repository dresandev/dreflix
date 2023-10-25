'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { toggleBodyOverflow } from '@utils/toggle-body-overflow'
import { useBoolean } from '@hooks/use-boolean'
import { useOnClickOutside } from '@hooks/use-on-click-outside'
import { Submenu } from '@components/Submenu'
import styles from './Menu.module.css'

export const Menu = () => {
  const {
    value: isMenuOpen,
    toggle: toggleIsMenuOpen,
    setFalse: closeMenu
  } = useBoolean(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = () => {
    toggleBodyOverflow(false)
    closeMenu()
  }

  useOnClickOutside(menuRef, handleClickOutside)

  const handleMenuBtnClick = () => {
    toggleBodyOverflow(!isMenuOpen)
    toggleIsMenuOpen()
  }

  return (
    <div ref={menuRef}>
      <button
        aria-label='Abir menú'
        title='Menú'
        className={clsx(
          styles.menuBtn,
          isMenuOpen && styles.activeMenuBtn
        )}
        onClick={handleMenuBtnClick}
      >
        <span className={styles.menuBtnLine}></span>
        <span className={styles.menuBtnLine}></span>
      </button>

      <nav className={clsx(
        'menu',
        styles.menu,
        isMenuOpen && 'showMenu'
      )}>
        <ul>
          <li>
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
                      className={styles.link}
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
                      className={styles.link}
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
