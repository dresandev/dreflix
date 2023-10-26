import Link from 'next/link'
import Image from 'next/image'
import { Menu } from '@components/Menu'
import { SearchMenu } from '@components/SearchMenu'
import { DreflixLogo } from '@components/SVG'
import profileImage from '@assets/images/profile-image.png'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Menu className={styles.menu} />
        <Link
          className={styles.goHomeBtn}
          aria-label='Ir al inicio'
          href='/'
        >
          <DreflixLogo />
        </Link>

        <SearchMenu className={styles.searchMovies} />
        <button>
          <Image src={profileImage} alt='Profile image' />
        </button>
      </header >
    </div>
  )
}
