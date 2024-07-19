"use client"

import Link from "next/link"
import clsx from "clsx"
import { movieListPagesInfo } from "~/data/movie-list-pages-info"
import { useMenu } from "~/hooks/use-menu"
import { Dropdown } from "~/components/Dropdown"
import { BurgerBtn } from "../BurgerBtn"
import sharedStyles from "../shared.module.css"
import styles from "./CCNavMenu.module.css"

interface CCNavMenuProps {
	children?: React.ReactNode
	className?: string
}

export const CCNavMenu: React.FC<CCNavMenuProps> = ({ children, className }) => {
	const { menuRef, isMenuOpen, toggleMenu } = useMenu()

	return (
		<div className={className} ref={menuRef}>
			<BurgerBtn isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

			<nav>
				<ul className={clsx(styles.menu, isMenuOpen && styles.menuOpen)}>
					<li>
						<Dropdown label="Explore">
							{movieListPagesInfo.map(({ slug, title }) => (
								<Link
									key={slug}
									className={clsx(
										sharedStyles.dropdownLink,
										sharedStyles.dropdownLinkMinInlineSize
									)}
									href={`/movie/${slug}`}
									prefetch={false}
								>
									{title}
								</Link>
							))}
						</Dropdown>
					</li>
					<li>{children}</li>
				</ul>
			</nav>
		</div>
	)
}
