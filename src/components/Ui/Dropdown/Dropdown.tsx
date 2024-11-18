"use client"

import clsx from "clsx"
import { ensureArray } from "~/utils/ensure-array"
import { useMenu } from "~/hooks/use-menu"
import { CaretDown } from "~/components/Svg"
import { Button } from "~/components/Ui/Button"
import styles from "./Dropdown.module.css"

interface Props {
	children: React.ReactNode | React.ReactNode[]
	label: string
	enableGrid?: boolean
}

export const Dropdown: React.FC<Props> = ({
	children,
	label,
	enableGrid,
}) => {
	const {
		menuRef: dropdownRef,
		isMenuOpen: dropdownIsOpen,
		toggleMenu: toggleDropdown,
		handleFocusVisibleOut
	} = useMenu(false)

	const childrenArray = ensureArray(children)

	return (
		<div
			ref={dropdownRef}
			className={styles.wrapper}
			onBlur={handleFocusVisibleOut}
		>
			<label>
				<Button
					variant="square"
					size="header"
					className={clsx(
						styles.triggerBtn,
						{ [styles.open]: dropdownIsOpen }
					)}
					onClick={toggleDropdown}
				>
					{label}
					<CaretDown />
				</Button>
			</label>
			<ul
				className={clsx(
					styles.dropdown,
					{ [styles.open]: dropdownIsOpen, [styles.grid]: enableGrid, }
				)}
			>
				{childrenArray.map((option, i) => (
					<li key={i}>{option}</li>
				))}
			</ul>
		</div>
	)
}
