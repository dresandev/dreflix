import { forwardRef, type ChangeEvent, type FormEvent } from "react"
import { useAutoFocus } from "~/hooks/use-autofocus"
import { SearchIcon } from "~/components/Svg"
import styles from "./SearchBar.module.css"

interface SearchBarProps {
	open: boolean
	value: string
	onFocus?: () => void
	onChange: (value: string) => void
	onSubmit: () => void
	onKeyDown: React.KeyboardEventHandler<HTMLInputElement>
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
	const { open, value, onFocus, onChange, onSubmit, onKeyDown } = props

	useAutoFocus(ref as React.RefObject<HTMLInputElement>, open)

	const handleOnSubmit = (e: FormEvent) => {
		e.preventDefault()
		onSubmit()
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	return (
		<form className={styles.searchBar} onSubmit={handleOnSubmit}>
			<SearchIcon className={styles.searchIcon} />
			<input
				ref={ref}
				className={styles.input}
				name="phrase"
				type="search"
				placeholder="Search"
				spellCheck={false}
				autoComplete="off"
				autoCorrect="off"
				required
				value={value}
				onChange={handleInputChange}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
			/>
		</form>
	)
})

SearchBar.displayName = "SearchBar"
