import { Suspense } from "react"
import Link from "next/link"
import { NavMenu } from "~/components/NavMenu"
import { SearchMenu } from "~/components/SearchMenu"
import { DreflixLogo } from "~/components/Svg"
import styles from "./Header.module.css"

export const Header = () => (
	<header className={styles.header}>
		<Link className={styles.goHomeBtn} aria-label="Go home" href="/">
			<DreflixLogo />
		</Link>

		<Suspense>
			<NavMenu className={styles.navMenu} />
			<div className={styles.spacer}></div>
			<SearchMenu />
		</Suspense>

		<button className={styles.userMenuButton} type="button" aria-label="Open user account menu">
			<img src="/images/profile-image.png" alt="" width={32} height={32} />
		</button>
	</header>
)
