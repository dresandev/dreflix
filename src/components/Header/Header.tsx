import Link from 'next/link'
import Image from 'next/image'
import { NavMenu } from '@components/NavMenu'
import { SearchMenu } from '@components/SearchMenu'
import { DreflixLogo } from '@components/SVG'
import profileImage from '@assets/images/profile-image.png'
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
        <button>
          <Image
            src={profileImage}
            alt='Imagen de perfil'
          />
        </button>
      </header >
    </div>
  )
}
