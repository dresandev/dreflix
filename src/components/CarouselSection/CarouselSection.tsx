import { Carousel } from "~/components/Carousel"
import styles from "./CarouselSection.module.css"

interface Props {
	children: React.ReactNode | React.ReactNode[]
	title: string
}

export const CarouselSection: React.FC<Props> = ({ children, title }) => {
	return (
		<section className={styles.section}>
			<h2 className={styles.title}>{title}</h2>
			<Carousel itemsGap="var(--carousel-items-gap)">{children}</Carousel>
		</section>
	)
}
