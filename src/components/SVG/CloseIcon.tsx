import { SVGProps } from 'react'

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={28}
    height={28}
    viewBox='0 0 30 30'
    fill='none'
    {...props}
  >
    <title>Close</title>
    <line
      x1='8'
      y1='8'
      x2='22.1421'
      y2='22.1421'
      stroke='white'
      strokeWidth='3'
      strokeLinecap='round'
    />
    <line
      x1='8'
      y1='22'
      x2='22.1421'
      y2='7.85786'
      stroke='white'
      strokeWidth='3'
      strokeLinecap='round'
    />
  </svg>
)
