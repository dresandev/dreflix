import clsx from "clsx"
import styles from "./Title.module.css"

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const Title: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <h1 className={clsx(className, styles.title)} {...props}>
      {children}
    </h1>
  )
}
