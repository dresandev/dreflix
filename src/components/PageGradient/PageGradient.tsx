import styles from "./PageGradient.module.css"

interface PageGradientProps {
	gradientColor: string
}

export const PageGradient: React.FC<PageGradientProps> = ({ gradientColor }) => {
	const inlineStyles = {
		backgroundImage: `linear-gradient(
      30deg,
      ${gradientColor} 0%,
      transparent 40%
    )`,
	}

	return <div className={styles.gradient} style={inlineStyles}></div>
}
