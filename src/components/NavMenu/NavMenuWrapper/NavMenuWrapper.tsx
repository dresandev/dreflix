"use client"

import clsx from "clsx"
import { useMenu } from "~/hooks/use-menu"
import styles from "./NavMenuWrapper.module.css"

interface Props {
	children?: React.ReactNode[]
}

export const NavMenuWrapper: React.FC<Props> = ({ children }) => {
	const { menuRef, isMenuOpen, toggleMenu } = useMenu()

	return (
		<div ref={menuRef}>
			<button
				aria-label={`${isMenuOpen ? "Open" : "Close"} menu`}
				className={clsx(styles.menuBtn, { [styles.active]: isMenuOpen })}
				onClick={toggleMenu}
			>
				<span className={styles.line}></span>
				<span className={styles.line}></span>
			</button>

			<nav>
				<ul className={clsx(styles.menu, { [styles.menuOpen]: isMenuOpen })}>
					{children?.map((child, index) => <li key={index}>{child}</li>)}
				</ul>
			</nav>
		</div>
	)
}
