import { SVGProps } from 'react'

export const ChevronArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <g clipPath='url(#a)'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='m6 9 6 6 6-6'
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='currentColor' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
)
