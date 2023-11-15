import clsx from 'clsx'
import { IMAGES_BASE_URL } from '@constants'
import { NoImage } from '@components/NoImage'
import styles from './ActorCard.module.css'

interface ActorCardProps {
  className?: string
  profilePath: string
  character: string
  originalName: string
}

export const ActorCard: React.FC<ActorCardProps> = ({
  className,
  profilePath,
  originalName,
  character,
}) => {
  return (
    <figure className={clsx(
      styles.card,
      className
    )}>
      {
        profilePath
          ? (
            <img
              className={styles.image}
              src={`${IMAGES_BASE_URL}/w185/${profilePath}`}
              alt={originalName}
            />
          )
          : (
            <NoImage holder='profile' />
          )
      }

      <div className={styles.info}>
        <figcaption className={styles.name}>
          {originalName}
        </figcaption>
        <p>{character}</p>
      </div>
    </figure>
  )
}
