'use client'

import { AppProgressBar } from 'next-nprogress-bar'
import type { ProgressBarProps } from 'next-nprogress-bar/dist/index'

export const ProgressBar = (props: ProgressBarProps) => (
  <AppProgressBar
    style='
          #nprogress {
           pointer-events: none;
          }
          #nprogress .bar {
            position: fixed;
            inset-inline-start: 0;
            inset-block-start: 0;
            z-index: 100;
            inline-size: 100%;
            block-size: 0.3rem;
            background-image: linear-gradient(
              60deg,
              hsl(30, 92%, 58%),
              hsl(10, 87%, 64%),
              hsl(343, 83%, 62%),
              hsl(291, 29%, 54%),
              hsl(220, 42%, 52%),
              hsl(188, 83%, 37%),
              hsl(172, 92%, 36%),
              hsl(135, 35%, 58%)
            );
            background-size: 500%;
            animation: 1s linear infinite gradientMovement;
          }
          @keyframes gradientMovement {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }'
    options={{ showSpinner: false }}
    shallowRouting
    {...props}
  />
)
