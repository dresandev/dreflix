import clsx from 'clsx'
import styles from './NoImage.module.css'

interface NoImageProps {
  holder: 'profile' | 'movie'
}

export const NoImage: React.FC<NoImageProps> = ({
  holder
}) => {
  return (
    <div className={clsx(
      styles.noImage,
      styles[holder]
    )}></div>
  )
}
