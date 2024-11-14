import { Suspense } from "react"
import Link from "next/link"
import { NavMenu } from "~/components/Menus/NavMenu"
import { SearchMenu } from "~/components/Menus/SearchMenu"
import { DreflixLogo } from "~/components/Svg"
import { Spacer } from "~/components/Ui/Spacer"
import { UserMenu } from "~/components/Menus/UserMenu"
import styles from "./Header.module.css"

export const Header = async () => {
	return (
		<header className={styles.header}>
			<Link
				className={styles.goHomeLink}
				aria-label="Go home"
				href="/"
			>
				<DreflixLogo />
			</Link>
			<Suspense fallback={<Spacer flexGrow={1} />}>
				<div className={styles.navMenuWrapper}>
					<NavMenu />
				</div>
				<Spacer flexGrow={1} />
				<SearchMenu />
			</Suspense>
			<UserMenu />
		</header>
	)
}
