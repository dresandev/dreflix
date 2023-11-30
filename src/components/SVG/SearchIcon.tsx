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
    <path
      fill='currentColor'
      d='M20.293 21.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM16.107 9.981c0 3.294-2.7 5.981-6.054 5.981v2c4.438 0 8.054-3.563 8.054-7.98h-2Zm-6.054 5.981C6.7 15.962 4 13.275 4 9.982H2c0 4.417 3.615 7.98 8.053 7.98v-2ZM4 9.982C4 6.687 6.7 4 10.053 4V2C5.615 2 2 5.564 2 9.981h2ZM10.053 4c3.353 0 6.054 2.688 6.054 5.981h2C18.107 5.564 14.49 2 10.053 2v2Zm4.24 11.707 6 6 1.414-1.414-6-6-1.414 1.414Z'
    />
  </svg>
)
