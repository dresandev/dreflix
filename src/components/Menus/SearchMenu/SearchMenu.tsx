"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import type { MovieTitle } from "~/interfaces/MovieTitle"
import { asyncWrapper } from "~/utils/async-wrapper"
import { getMovieTitles } from "~/actions/movies-actions"
import { useDebounce } from "~/hooks/use-debounce"
import { useMenu } from "~/hooks/use-menu"
import { X, SearchIcon } from "~/components/Svg"
import { SearchBar } from "./SearchBar"
import { MoviesSuggester } from "./MoviesSuggester"
import styles from "./SearchMenu.module.css"

type HandledEvent = "ArrowUp" | "ArrowDown" | "Enter"

type KeyDownHandledEvent = {
	[key in HandledEvent]: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const DEBOUNCE_DELAY = 280

export const SearchMenu = () => {
	const router = useRouter()
	const { menuRef, isMenuOpen, toggleMenu } = useMenu()
	const {
		menuRef: moviesSuggesterRef,
		isMenuOpen: isMoviesSuggesterOpen,
		openMenu: openMoviesSuggester,
		handleFocusVisibleOut,
	} = useMenu(true)
	const [inputValue, setInputValue] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)
	const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY)
	const [suggestedMovies, setSuggestedMovies] = useState<MovieTitle[]>([])
	const [suggestedMovieIdx, setSuggestedMovieIdx] = useState<number | null>(null)

	const suggestedMoviesLength = suggestedMovies.length - 1
	const showMoviesSuggester = !!suggestedMovies.length && isMoviesSuggesterOpen && !!inputValue

	useEffect(() => {
		if (debouncedInputValue.length <= 2) {
			return setSuggestedMovies([])
		}

		const fetchMovieTitles = async () => {
			const { data, error, status } = await asyncWrapper(
				getMovieTitles(debouncedInputValue)
			)

			if (status === "error") {
				setSuggestedMovies([])
				console.error(error)
				return
			}

			setSuggestedMovies(data)
		}

		fetchMovieTitles()
	}, [debouncedInputValue, setSuggestedMovies])

	const keyDownHandledEvents: KeyDownHandledEvent = {
		ArrowUp: (e) => {
			if (suggestedMovies.length) e.preventDefault()

			if (suggestedMovieIdx === null) {
				return setSuggestedMovieIdx(suggestedMoviesLength)
			}

			if (suggestedMovieIdx > 0) {
				return setSuggestedMovieIdx(suggestedMovieIdx - 1)
			}

			setSuggestedMovieIdx(null)
		},
		ArrowDown: (e) => {
			if (suggestedMovies.length) e.preventDefault()

			if (suggestedMovieIdx === null) {
				return setSuggestedMovieIdx(0)
			}

			if (suggestedMovieIdx < suggestedMoviesLength) {
				return setSuggestedMovieIdx(suggestedMovieIdx + 1)
			}

			setSuggestedMovieIdx(null)
		},
		Enter: () => {
			if (suggestedMovieIdx === null) return

			const title = suggestedMovies[suggestedMovieIdx].title
			setInputValue(title)
			setSuggestedMovieIdx(null)
		},
	}

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (!(e.key in keyDownHandledEvents)) return

		const handler = keyDownHandledEvents[e.key as keyof KeyDownHandledEvent]
		handler(e)
	}

	const handleSubmit = () => {
		const searchParams = new URLSearchParams({ phrase: inputValue })
		router.push(`/search?${searchParams}`)
		inputRef.current?.blur()
	}

	return (
		<div
			ref={menuRef}
			className={styles.wrapper}
			onBlur={handleFocusVisibleOut}
		>
			<button
				aria-label={`${isMenuOpen ? "Close" : "Open"} search menu`}
				className={styles.menuTrigger}
				onClick={toggleMenu}
			>
				{isMenuOpen ? <X /> : <SearchIcon />}
			</button>

			<div
				ref={moviesSuggesterRef}
				className={clsx(styles.searchMenu, { [styles.open]: isMenuOpen })}
			>
				<SearchBar
					ref={inputRef}
					open={isMenuOpen}
					value={inputValue}
					onFocus={openMoviesSuggester}
					onChange={setInputValue}
					onSubmit={handleSubmit}
					onKeyDown={handleKeyDown}
				/>
				{showMoviesSuggester && (
					<MoviesSuggester
						movies={suggestedMovies}
						selectedMovieIdx={suggestedMovieIdx}
					/>
				)}
			</div>
		</div>
	)
}
