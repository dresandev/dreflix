import { Suspense } from "react"
import Link from "next/link"
import { NavMenu } from "~/components/NavMenu"
import { SearchMenu } from "~/components/SearchMenu"
import { DreflixLogo } from "~/components/Svg"
import { Spacer } from "~/components/Ui/Spacer"
import styles from "./Header.module.css"

export const Header = () => (
	<header className={styles.header}>
		<Link className={styles.goHomeBtn} aria-label="Go home" href="/">
			<DreflixLogo />
		</Link>

		<Suspense fallback={<Spacer flexGrow={1} />}>
			<div className={styles.navMenuWrapper}>
				<NavMenu />
			</div>
			<Spacer flexGrow={1} />
			<SearchMenu />
		</Suspense>

		<button className={styles.userMenuButton} type="button" aria-label="Open user account menu">
			<img src="/images/profile-image.png" alt="" width={32} height={32} />
		</button>
	</header>
)
