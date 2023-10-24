import Image from 'next/image'
import actorImage from '@assets/images/actor-image.png'
import styles from './ActorCard.module.css'

export const ActorCard = () => {
  return (
    <figure className={styles.card}>
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
