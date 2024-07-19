"use client"

import clsx from "clsx"
import { ensureArray } from "~/utils/ensure-array"
import { useMenu } from "~/hooks/use-menu"
import { ChevronArrow } from "~/components/Svg"
import styles from "./Dropdown.module.css"

interface DropdownProps {
	children: React.ReactNode | React.ReactNode[]
	label: string
	optionsInGrid?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({ children, label, optionsInGrid }) => {
	const {
		menuRef: dropdownRef,
		isMenuOpen: dropdownIsOpen,
		toggleMenu: toggleDropdown,
	} = useMenu(false)

	const childrenArray = ensureArray(children)

	return (
		<div className={styles.dropdownWrapper} ref={dropdownRef}>
			<label>
				<button
					className={clsx(styles.labelBtn, dropdownIsOpen && styles.labelBtnOpen)}
					onClick={toggleDropdown}
				>
					{label}
					<ChevronArrow
						className={clsx(styles.chevronArrow, dropdownIsOpen && styles.rotateArrow)}
					/>
				</button>
			</label>
			<ul
				className={clsx(
					styles.dropdown,
					dropdownIsOpen && styles.dropdownOpen,
					optionsInGrid && styles.dropdownGrid
				)}
			>
				{childrenArray.map((option, i) => (
					<li key={i}>{option}</li>
				))}
			</ul>
		</div>
	)
}
