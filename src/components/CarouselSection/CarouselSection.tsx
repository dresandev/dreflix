import clsx from 'clsx'
import { Carousel } from '~/components/Carousel'
import styles from './CarouselSection.module.css'

interface MoviesSectionProps {
  children: React.ReactNode | React.ReactNode[]
  title: string
  className?: string
}

export const CarouselSection: React.FC<MoviesSectionProps> = ({
  children,
  className,
  title,
}) => {
  return (
    <section className={clsx(
      styles.section,
      className
    )}>
      <h2 className={styles.title}>
        {title}
      </h2>

      <Carousel itemsGap='var(--carousel-items-gap)'>
        {children}
      </Carousel>
    </section>
  )
}
