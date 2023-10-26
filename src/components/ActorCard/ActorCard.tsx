import Image from 'next/image'
import clsx from 'clsx'
import actorImage from '@assets/images/actor-image.png'
import styles from './ActorCard.module.css'

interface ActorCardProps {
  className?: string
}

export const ActorCard: React.FC<ActorCardProps> = ({
  className
}) => {
  return (
    <figure className={clsx(
      styles.card,
      className
    )}>
      <Image
        className={styles.image}
        src={actorImage}
        alt='Actor image'
      />
      <div className={styles.data}>
        <figcaption className={styles.name}>Tom Hiddleston</figcaption>
        <p>Loki Laufeyson</p>
      </div>
    </figure>
  )
}
