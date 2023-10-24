import { Carousel } from '@components/Carousel'
import styles from './CarouselSection.module.css'

interface MoviesSectionProps {
  children: React.ReactNode[]
  title: string
}

export const CarouselSection: React.FC<MoviesSectionProps> = ({
  children,
  title
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <Carousel itemsGap='1.2rem'>
        {children}
      </Carousel>
    </section>
  )
}
