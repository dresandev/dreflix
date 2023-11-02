import { SVGProps } from 'react'
import styles from './DreflixLogo.module.css'

export const DreflixLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className={styles.svg}
    xmlns='http://www.w3.org/2000/svg'
    width={35}
    height={30}
    fill='none'
    {...props}
  >
    <title>Logo de Dreflix</title>
    <path
      className={styles.path}
      fill='currentColor'
      d='M.251 7.782c-.369.367-.299.598 0 1.03l5.143 5.142c.54.49.884.57 1.543.514l19.544-7.2-5.144 11.83-3.6-4.115c-.744-.206-1.17-.291-2.057 0L9.508 17.04c-.79.316-.785.559-.514 1.029l10.8 10.8c2.612 1.57 4.075 1.6 6.687-.514l7.714-16.972c.182-1.881.03-3.016-.514-5.143L27.553.29c-1.075-.356-3.786-.42-5.143 0L.25 7.782Z'
    />
  </svg>
)
