'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { ensureArray } from '~/utils'
import { movieListPagesInfo } from '~/data/movie-list-pages-info'
import { useMenu } from '~/hooks'
import { Dropdown } from '~/components/Dropdown'
import styles from './NavMenu.module.css'

interface MenuProps {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

export const NavMenu: React.FC<MenuProps> = ({
  children,
  className
}) => {
  const { menuRef, isMenuOpen, toggleMenu } = useMenu()

  const childrenArray = ensureArray(children)

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
