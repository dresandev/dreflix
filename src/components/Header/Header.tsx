import Link from 'next/link'
import Image from 'next/image'
import { Menu } from '@components/Menu'
import { MenuBtn } from '@components/MenuBtn'
import { DreflixLogo, SearchIcon } from '@components/SVG'
import profileImage from '@assets/images/profile-image.png'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <MenuBtn />
        <Link
          aria-label='Ir al inicio'
          href='/'
        >
          <DreflixLogo />
        </Link>


        <Link
          aria-label='Ir a buscar películas'
          className={styles.searchLink}
          href='/'
        >
          <SearchIcon />
        </Link>

        <Image src={profileImage} alt='Profile image' />
        <Menu />
      </header >
    </div>
  )
}
