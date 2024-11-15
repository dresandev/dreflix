import type { Cast } from "~/interfaces/Cast"
import { CarouselSection } from "~/components/CarouselSection"
import { ActorCard } from "~/components/Cards/ActorCard"
import { NoItemsFound } from "~/components/Placeholders/NoItemsFound"
import styles from "./MainCast.module.css"

interface Props {
	cast: Cast[]
}

export const MainCast: React.FC<Props> = ({ cast }) => {
	const title = "Top Billed Cast"
	const hasCast = cast.length

	if (!hasCast) return <NoItemsFound title={title} message="No Cast found" />

	return (
		<CarouselSection title={title}>
			{cast.map((actor) => {
				const { id, profile_path, original_name, character } = actor

				return (
					<ActorCard
						key={id}
						className={styles.actorCard}
						profilePath={profile_path}
						originalName={original_name}
						character={character}
					/>
				)
			})}
		</CarouselSection>
	)
}
