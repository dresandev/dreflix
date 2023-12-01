import Link from 'next/link'
import styles from './not-found.module.css'

export const metadata = {
  title: '404: Not found',
}

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p>We have not found the page</p>

      <Link
        className={styles.goBackHomeLink}
        href='/'
      >
        Go to Dreflix home
      </Link>
    </div>
  )
}
