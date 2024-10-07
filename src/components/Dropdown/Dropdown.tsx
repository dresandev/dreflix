"use client"

import clsx from "clsx"
import { ensureArray } from "~/utils/ensure-array"
import { useMenu } from "~/hooks/use-menu"
import { ChevronArrow } from "~/components/Svg"
import styles from "./Dropdown.module.css"

interface Props {
	children: React.ReactNode | React.ReactNode[]
	label: string
	enableGrid?: boolean
}

export const Dropdown: React.FC<Props> = ({ children, label, enableGrid }) => {
	const {
		menuRef: dropdownRef,
		isMenuOpen: dropdownIsOpen,
		toggleMenu: toggleDropdown,
	} = useMenu(false)

	const childrenArray = ensureArray(children)

	return (
		<div className={styles.wrapper} ref={dropdownRef}>
			<label>
				<button
					className={clsx(styles.labelBtn, { [styles.open]: dropdownIsOpen })}
					onClick={toggleDropdown}
				>
					{label}
					<ChevronArrow
						className={clsx(styles.chevronArrow, { [styles.rotate]: dropdownIsOpen })}
					/>
				</button>
			</label>
			<ul
				className={clsx(
					styles.dropdown,
					{
						[styles.open]: dropdownIsOpen,
						[styles.grid]: enableGrid,
					}
				)}
			>
				{childrenArray.map((option, i) => (
					<li key={i}>{option}</li>
				))}
			</ul>
		</div>
	)
}
