'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { useUIStore } from '@store/use-ui-store'
import { ChevronArrow } from '@components/SVG'
import styles from './Menu.module.css'

export const Menu = () => {
  const { isMenuOpen } = useUIStore()

  return (
    <nav className={clsx(
      styles.menu,
      isMenuOpen && styles.showMenu
    )}>
      <ul>
        <li>
          <button className={styles.option}>
            Explorar <ChevronArrow />
          </button>
          <ul className={styles.subMenu}>
            <li>
              <Link className={styles.link} href='/'>Popular</Link>
            </li>
            <li>
              <Link className={styles.link} href='/'>En cartelera hoy</Link>
            </li>
            <li>
              <Link className={styles.link} href='/'>Próximamente</Link>
            </li>
            <li>
              <Link className={styles.link} href='/'>Mejor valoradas</Link>
            </li>
          </ul>
        </li>
        <li>
          <button className={styles.option}>
            Géneros <ChevronArrow />
          </button>
          <ul className={styles.subMenu}>
            <li>
              <Link className={styles.link} href='/'>Acción</Link>
            </li>
            <li>
              <Link className={styles.link} href='/'>Fantasía</Link>
            </li>
            <li>
              <Link className={styles.link} href='/'>Historia</Link>
            </li>
            <li>
              <Link className={styles.link} href='/'>Misterio</Link>
            </li>
            <li>
              <Link className={styles.link} href='/'>Música</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
