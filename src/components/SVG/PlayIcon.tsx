import { SVGProps } from 'react'

export const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      d='M5 4v16a1 1 0 0 0 1.524.852l13-8a1.001 1.001 0 0 0 0-1.704l-13-8A1 1 0 0 0 5 4Z'
    />
  </svg>
)
