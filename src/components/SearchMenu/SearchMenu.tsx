"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import clsx from "clsx"
import type { MovieTitle } from "~/interfaces"
import { getMovieTitles } from "~/actions/movies-actions"
import { removeActiveElementFocus } from "~/utils/remove-active-element-focus"
import { useDebounce } from "~/hooks/use-debounce"
import { useMenu } from "~/hooks/use-menu"
import { X, SearchIcon } from "~/components/Svg"
import { SearchBar } from "./SearchBar"
import { MoviesSuggester } from "./MoviesSuggester"
import styles from "./SearchMenu.module.css"
import { useOnRouteChange } from "~/hooks/use-on-route-change"

type HandledEvent = "ArrowUp" | "ArrowDown" | "Enter"

type KeyDownHandledEvent = {
	[key in HandledEvent]: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const DEBOUNCE_DELAY = 280

export const SearchMenu = () => {
	const router = useRouter()
	const pathname = usePathname()
	const params = useSearchParams()
	const { menuRef, isMenuOpen, toggleMenu } = useMenu()
	const {
		menuRef: moviesSuggesterRef,
		isMenuOpen: isMoviesSuggesterOpen,
		openMenu: openMoviesSuggester,
	} = useMenu(false)
	const [inputValue, setInputValue] = useState(params.get("search_query") || "")
	const [suggestedMovies, setSuggestedMovies] = useState<MovieTitle[]>([])
	const [suggestedMovieIdx, setSuggestedMovieIdx] = useState<number | null>(null)
	const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY)

	const maxSearchResultsLength = suggestedMovies.length - 1
	const showMoviesSuggester = !!suggestedMovies.length && isMoviesSuggesterOpen && !!inputValue

	useEffect(() => {
		if (!pathname.includes("/search")) setInputValue("")
	}, [pathname])

	useEffect(() => {
		if (debouncedInputValue.length <= 2) {
			return setSuggestedMovies([])
		}

		const fetchMovieTitles = async () => {
			try {
				const newSearchResults = await getMovieTitles(debouncedInputValue)
				setSuggestedMovies(newSearchResults)
			} catch (error) {
				console.error(error)
				setSuggestedMovies([])
			}
		}

		fetchMovieTitles()
	}, [debouncedInputValue, setSuggestedMovies])

	const keyDownHandledEvents: KeyDownHandledEvent = {
		ArrowUp: (e) => {
			if (suggestedMovies.length) e.preventDefault()

			if (suggestedMovieIdx === null) {
				return setSuggestedMovieIdx(maxSearchResultsLength)
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

			if (suggestedMovieIdx < maxSearchResultsLength) {
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

	const handleSubmit = () => {
		removeActiveElementFocus()
		const searchParams = new URLSearchParams({ search_query: inputValue }).toString()
		router.push(`/search?${searchParams}`)
	}

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (!(e.key in keyDownHandledEvents)) return

		const handler = keyDownHandledEvents[e.key as keyof KeyDownHandledEvent]
		handler(e)
	}

	return (
		<div ref={menuRef} className={styles.wrapper}>
			<button aria-label="Search movie" className={styles.searchMenuBtn} onClick={toggleMenu}>
				{isMenuOpen ? <X /> : <SearchIcon />}
			</button>

			<div
				ref={moviesSuggesterRef}
				className={clsx(styles.searchMenu, { [styles.open]: isMenuOpen })}
			>
				<SearchBar
					open={isMenuOpen}
					value={inputValue}
					onFocus={openMoviesSuggester}
					onChange={setInputValue}
					onSubmit={handleSubmit}
					onKeyDown={handleKeyDown}
				/>
				{showMoviesSuggester && (
					<MoviesSuggester
						suggestedMovies={suggestedMovies}
						suggestedMovieIdx={suggestedMovieIdx}
					/>
				)}
			</div>
		</div>
	)
}
