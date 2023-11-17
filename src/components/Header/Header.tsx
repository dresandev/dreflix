import Link from 'next/link'
import { NavMenu } from '@components/NavMenu'
import { SearchMenu } from '@components/SearchMenu'
import { DreflixLogo } from '@components/SVG'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link
          className={styles.goHomeBtn}
          aria-label='Ir al inicio'
          href='/'
        >
          <DreflixLogo />
        </Link>
        <NavMenu className={styles.navMenu} />

        <div className={styles.spacer}></div>

        <SearchMenu className={styles.searchMenu} />
        <button
          type='button'
          aria-label='Abrir menú de cuenta de usuario'
        >
          <img
            src='images/profile-image.png'
            alt=""
            width={32}
          />
        </button>
      </header >
    </div>
  )
}
