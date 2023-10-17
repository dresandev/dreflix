import { SVGProps } from 'react'

export const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <g clipPath='url(#a)'>
      <path
        fill='currentColor'
        d='M6.98 3.074a6 6 0 0 1 4.987 1.425l.037.033.034-.03a6 6 0 0 1 4.733-1.44l.246.036a6 6 0 0 1 3.364 10.008l-.18.185-.048.041-7.45 7.379a1 1 0 0 1-1.313.082l-.094-.082-7.493-7.422A6 6 0 0 1 6.98 3.074Z'
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='currentColor' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
)
