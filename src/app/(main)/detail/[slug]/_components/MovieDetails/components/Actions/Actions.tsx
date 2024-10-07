import { IconButton } from "~/components/IconButton"
import { HeartIcon, PlayIcon, PlusIcon } from "~/components/Svg"
import { TrailerModal } from "~/components/TrailerModal"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "~/components/Ui/Tooltip"
import styles from "./Actions.module.css"

interface Props {
	trailerKey?: string
}

export const Actions: React.FC<Props> = ({ trailerKey }) => {
	return (
		<div className={styles.actions}>
			{trailerKey && (
				<TrailerModal
					trigger={
						<button className={styles.trailerTextButton}>
							<div className={styles.playIcon}>
								<PlayIcon />
							</div>
							<span className={styles.text}>Play Trailer</span>
						</button>
					}
					trailerKey={trailerKey}
				/>
			)}

			<TooltipProvider>
				<Tooltip delayDuration={100} disableHoverableContent>
					<TooltipTrigger asChild>
						<IconButton ariaLabel="Add to list">
							<PlusIcon />
						</IconButton>
					</TooltipTrigger>

					<TooltipContent side="bottom" sideOffset={10}>
						<label>{"Add to list"}</label>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip delayDuration={100} disableHoverableContent>
					<TooltipTrigger asChild>
						<IconButton ariaLabel="Mark as favorite">
							<HeartIcon />
						</IconButton>
					</TooltipTrigger>

					<TooltipContent side="bottom" sideOffset={10}>
						<label>{"Mark as favorite"}</label>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
}
