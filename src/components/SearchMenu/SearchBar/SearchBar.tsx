import type { ChangeEvent, FormEvent } from "react"
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

export const SearchBar: React.FC<SearchBarProps> = ({
	open,
	value,
	onFocus,
	onChange,
	onSubmit,
	onKeyDown,
}) => {
	const inputRef = useAutoFocus(open)

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
				ref={inputRef}
				className={styles.input}
				name="search_query"
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
}
