'use client'

import clsx from 'clsx'
import { useBoolean, useToggleBodyOverflow } from '@hooks'
import { Dropdown } from '@components/Dropdown'
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

        <Dropdown
          label='Género'
          optionsInGrid
        >
          {
            GENRES.map(genre => {
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
        </Dropdown>

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
