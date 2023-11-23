import styles from './PageGradient.module.css'

interface PageGradientProps {
  gradientColor: string
}

export const PageGradient: React.FC<PageGradientProps> = ({
  gradientColor
}) => {
  const customStyles = {
    backgroundImage: `linear-gradient(
      30deg,
      ${gradientColor} 0%,
      transparent 50%
    )`
  }

  return (
    <div
      className={styles.gradient}
      style={customStyles}
    >
    </div>
  )
}

