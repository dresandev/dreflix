import styles from "./NoItemsFound.module.css"

interface Props {
	title: string
	message: string
}

export const NoItemsFound: React.FC<Props> = ({ title, message }) => {
	return (
		<div className={styles.notFoundItems}>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.message}>{message}</p>
		</div>
	)
}
