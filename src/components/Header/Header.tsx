import Link from 'next/link'
import { MenuBtn } from '@components/MenuBtn'
import { DreflixLogo } from '@components/SVG'
import { SearchBar } from '@components/SearchBar'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <DreflixLogo />
      </Link>

      <div className={styles.menuWrapper}>
        <div className={styles.profileImage}></div>
        <MenuBtn />
      </div>

      <SearchBar />
    </header >
  )
}
