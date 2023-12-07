'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import styles from './error.module.css'
import clsx from 'clsx'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={styles.container}>
      <h1>Something went wrong!</h1>
      <p className={styles.error}>{error.message}</p>
      <div className={styles.actions}>
        <button
          className={clsx(
            styles.actionOption,
            styles.mainActionOption
          )}
          onClick={reset}
        >
          Try again
        </button>
        <Link
          className={styles.actionOption}
          href='/'
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
