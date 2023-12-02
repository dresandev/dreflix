import clsx from 'clsx'
import styles from './BurgerBtn.module.css'

interface BurgerBtnProps {
  isMenuOpen: boolean
  toggleMenu: () => void
}

export const BurgerBtn: React.FC<BurgerBtnProps> = ({
  isMenuOpen,
  toggleMenu
}) => {
  return (
    <button
      aria-label='Open menu'
      className={clsx(
        styles.menuBtn,
        isMenuOpen && styles.activeMenuBtn
      )}
      onClick={toggleMenu}
    >
      <span className={styles.menuBtnLine}></span>
      <span className={styles.menuBtnLine}></span>
    </button>
  )
}
