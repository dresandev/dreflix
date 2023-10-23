import Link from 'next/link'
import styles from './not-found.module.css'

export const metadata = {
  title: '404: No encontrado',
}

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p>No hemos encontrado la página</p>

      <Link
        className={styles.goBackHomeLink}
        href='/'
      >
        Ir al inicio
      </Link>
    </div>
  )
}
