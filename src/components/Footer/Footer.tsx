import styles from "./Footer.module.css"

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>
				Developed by &nbsp;
				<a className={styles.dresanWebLink} href="https://dresan.dev/" target="_blank">
					Dresan
				</a>
			</p>
		</footer>
	)
}
