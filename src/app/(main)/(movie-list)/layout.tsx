import styles from "./layout.module.css"

interface Props {
  children: React.ReactNode
}

export default function MovieListLayout({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}
