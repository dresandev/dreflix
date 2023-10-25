'use client'

import clsx from 'clsx'
import { useBoolean } from '@hooks/use-boolean'
import { Submenu } from '@components/Submenu'
import { CloseIcon } from '@components/SVG'
import styles from './FiltersMenu.module.css'

export const FiltersMenu = () => {
  const {
    value: isMenuOpen,
    toggle: toggleIsMenuOpen,
    setFalse: closeMenu
  } = useBoolean(false)

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
          <button className={styles.genreBtn}>
            Acción
          </button>
          <button className={styles.genreBtn}>
            Western
          </button>
          <button className={styles.genreBtn}>
            Fantasía
          </button>
          <button className={styles.genreBtn}>
            Animacíon
          </button>
          <button className={styles.genreBtn}>
            Historia
          </button>
          <button className={styles.genreBtn}>
            Aventura
          </button>
          <button className={styles.genreBtn}>
            Misterio
          </button>
          <button className={styles.genreBtn}>
            Bélica
          </button>
          <button className={styles.genreBtn}>
            Música
          </button>
          <button className={styles.genreBtn}>
            Ciencia ficción
          </button>
          <button className={styles.genreBtn}>
            Película de TV
          </button>
          <button className={styles.genreBtn}>
            Comedia
          </button>
          <button className={styles.genreBtn}>
            Romance
          </button>
          <button className={styles.genreBtn}>
            Crimen
          </button>
          <button className={styles.genreBtn}>
            Monster inside
          </button>
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
