import styles from './NoItemsFound.module.css'

interface NoItemsFoundProps {
  title: string
  message: string
}

export const NoItemsFound: React.FC<NoItemsFoundProps> = ({
  title,
  message
}) => {
  return (
    <div className={styles.notFoundItems}>
      <h2 className={styles.title}>
        {title}
      </h2>
      <p className={styles.message}>
        {message}
      </p>
    </div>
  )
}
