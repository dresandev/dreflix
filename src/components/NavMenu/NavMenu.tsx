'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { ensureArray, getRandomKey } from '~/utils'
import { movieListPagesInfo } from '~/data/movie-list-pages-info'
import { useMenu } from '~/hooks'
import { BurgerBtn } from './BurgerBtn'
import { Dropdown } from '~/components/Dropdown'
import commonStyles from './common.module.css'
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
      <BurgerBtn
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      <nav>
        <ul className={clsx(
          styles.menu,
          isMenuOpen && styles.menuOpen
        )}>
          <li>
            <Dropdown label='Explore'>
              {
                movieListPagesInfo.map(({ slug, title }) => (
                  <Link
                    key={getRandomKey()}
                    className={clsx(
                      commonStyles.dropdownLink,
                      commonStyles.dropdownLinkMinInlineSize
                    )}
                    href={`/movie/${slug}`}
                    prefetch={false}
                  >
                    {title}
                  </Link>
                ))
              }
            </Dropdown>
          </li>
          {
            childrenArray.map(child => (
              <li key={getRandomKey()}>
                {child}
              </li>
            ))
          }
        </ul>
      </nav>
    </div >
  )
}
