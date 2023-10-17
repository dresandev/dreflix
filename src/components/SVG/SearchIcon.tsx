import { SVGProps } from 'react'

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <g
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      clipPath='url(#a)'
    >
      <path d='M3 10a7 7 0 1 0 14 0 7 7 0 0 0-14 0ZM21 21l-6-6' />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='currentColor' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
)
