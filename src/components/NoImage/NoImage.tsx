import styles from './NoImage.module.css'

interface NoImageProps {
  holder: 'profile' | 'movie'
}

export const NoImage: React.FC<NoImageProps> = ({
  holder
}) => {
  return (
    <div className={styles.noImage}>
      a
    </div>
  )
}