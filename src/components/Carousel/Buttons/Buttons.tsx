import clsx from "clsx"
import { ChevronArrow } from "~/components/Svg"
import styles from "./Buttons.module.css"

interface Props {
	onClickPrev: () => void
	onClickNext: () => void
	showPrevButton: boolean
	showNextButton: boolean
	btnHoverVariant: "shadowHover" | "scaleHover"
	forwardBtnRef: React.Ref<HTMLButtonElement>
}

export const Buttons: React.FC<Props> = ({
	onClickPrev,
	onClickNext,
	showPrevButton,
	showNextButton,
	btnHoverVariant,
	forwardBtnRef,
}) => {
	return (
		<>
			<button
				aria-label="Previous slide"
				className={clsx(styles.btn, styles[btnHoverVariant], {
					[styles.hideBtn]: showPrevButton,
				})}
				onClick={onClickPrev}
			>
				<ChevronArrow className={styles.btnArrowIcon} direction="LEFT" />
			</button>
			<button
				ref={forwardBtnRef}
				aria-label="Next slide"
				className={clsx(styles.btn, styles[btnHoverVariant], {
					[styles.hideBtn]: showNextButton,
				})}
				onClick={onClickNext}
			>
				<ChevronArrow className={styles.btnArrowIcon} direction="RIGHT" />
			</button>
		</>
	)
}
