'use client'

import clsx from 'clsx'
import { useBoolean, useToggleBodyOverflow } from '@hooks'
import { Submenu } from '@components/Submenu'
import { CloseIcon } from '@components/SVG'
import styles from './FiltersMenu.module.css'

const GENRES = [
  'Acción',
  'Western',
  'Fantasía',
  'Animacíon',
  'Historia',
  'Aventura',
  'Misterio',
  'Bélica',
  'Música',
  'Ciencia ficción',
  'Película de TV',
  'Comedia',
  'Romance',
  'Crimen',
  'Monster inside',
]

export const FiltersMenu = () => {
  const {
    value: isMenuOpen,
    toggle: toggleIsMenuOpen,
    setFalse: closeMenu
  } = useBoolean(false)
  useToggleBodyOverflow(isMenuOpen)

  return (
    <>
      <button
        className={styles.filtersBtn}
        onClick={toggleIsMenuOpen}
      >
        Filtros
      </button>

      <div className={clsx(
        styles.filtersMenu,
        isMenuOpen && styles.showMenu
      )}>
        <div className={styles.header}>
          Filtros
          <button onClick={closeMenu}>
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        <Submenu label='Género'>
          {
            GENRES.map((genre) => {
              const key = crypto.randomUUID()
              return (
                <button
                  key={key}
                  className={styles.genreBtn}
                >
                  {genre}
                </button>
              )
            })
          }
        </Submenu>

        <div className={styles.closeBtnWrapper}>
          <button
            className={styles.closeBtn}
            onClick={closeMenu}
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  )
}
