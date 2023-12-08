import Link from 'next/link'
import { NavMenu } from '~/components/NavMenu'
import { SearchMenu } from '~/components/SearchMenu'
import { DreflixLogo } from '~/components/SVG'
import { GenresDropdown } from '~/components/NavMenu/GenresDropdown'
import styles from './Header.module.css'

export const Header = () => (
  <div className={styles.wrapper}>
    <header className={styles.header}>
      <Link
        className={styles.goHomeBtn}
        aria-label='Go home'
        href='/'
        prefetch={false}
      >
        <DreflixLogo />
      </Link>
      <NavMenu className={styles.navMenu}>
        <GenresDropdown />
      </NavMenu>

      <div className={styles.spacer}></div>

      <SearchMenu className={styles.searchMenu} />
      <button
        type='button'
        aria-label='Open user account menu'
      >
        <img
          src='/images/profile-image.png'
          alt=''
          width={32}
          height={32} />
      </button>
    </header>
  </div>
)
