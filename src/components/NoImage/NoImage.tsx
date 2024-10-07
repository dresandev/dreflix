import clsx from "clsx"
import styles from "./NoImage.module.css"

interface Props {
	holder: "profile" | "movie"
}

export const NoImage: React.FC<Props> = ({ holder }) => {
	return <div className={clsx(styles.noImage, styles[holder])}></div>
}
