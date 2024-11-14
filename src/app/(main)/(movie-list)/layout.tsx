import styles from "./layout.module.css"

export default function MovieListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>{children}</div>
  )
}
