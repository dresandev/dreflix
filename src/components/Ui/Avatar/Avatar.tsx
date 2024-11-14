import styles from "./Avatar.module.css"

interface Props {
  src: string
  alt: string
  size?: number
}

export const Avatar: React.FC<Props> = ({ alt, src, size = 32 }) => {
  return (
    <img
      className={styles.avatar}
      src={src}
      alt={alt}
      width={size}
      height={size}
    />
  )
}
