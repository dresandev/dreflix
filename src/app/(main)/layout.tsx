import styles from "./layout.module.css"

interface Props {
	children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
	return (
		<>
			{children}
			<div className={styles.pageClearance}></div>
		</>
	)
}
