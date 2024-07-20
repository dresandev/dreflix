import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/components/Ui/Dialog"
import styles from "./TrailerModal.module.css"

interface Props {
	trigger: React.ReactNode
	trailerKey: string
}

export const TrailerModal: React.FC<Props> = ({ trigger, trailerKey }) => {
	return (
		<Dialog modal>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className={styles.modal}>
				<DialogTitle className={styles.title}>Trailer de la película</DialogTitle>
				<iframe
					className={styles.trailerFrame}
					src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&si=F2Vt2iqn8TdSBHMP&amp;controls=1`}
					title="YouTube video player"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				></iframe>
			</DialogContent>
		</Dialog>
	)
}
