import { IMAGES_BASE_URL } from '~/constants'
import styles from './HeroImage.module.css'

interface HeroProps {
  backdropPath: string | null
}

export const HeroImage: React.FC<HeroProps> = ({
  backdropPath
}) => {
  return (
    <div className={styles.hero}>
      {
        backdropPath
          ? (
            <img
              className={styles.heroImage}
              srcSet={`
                ${IMAGES_BASE_URL}/w780${backdropPath} 780w,
                ${IMAGES_BASE_URL}/w1280${backdropPath} 1280w,
              `}
              sizes='
                (max-width: 880px) 375px,
                1280px
              '
              src={`${IMAGES_BASE_URL}/w1280${backdropPath}`}
              alt=''
              loading='eager'
            />
          )
          : (
            <div className={styles.noBackdropImage}></div>
          )
      }
    </div>
  )
}