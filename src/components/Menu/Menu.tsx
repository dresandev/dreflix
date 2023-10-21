'use client'

import clsx from 'clsx'
import { useUIStore } from '@store/use-ui-store'
import { Submenu } from '@components/Submenu'
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
          <Submenu
            title='Explorar'
            items={[
              { href: '/', label: 'Popular' },
              { href: '/', label: 'En cartelera hoy' },
              { href: '/', label: 'Próximamente' },
              { href: '/', label: 'Mejor valoradas' },
            ]}
          />
        </li>
        <li>
          <Submenu
            title='Géneros'
            items={[
              { href: '/', label: 'Acción' },
              { href: '/', label: 'Fantasía' },
              { href: '/', label: 'Historia' },
              { href: '/', label: 'Misterio' },
              { href: '/', label: 'Música' },
            ]}
          />
        </li>
      </ul>
    </nav>
  )
}
