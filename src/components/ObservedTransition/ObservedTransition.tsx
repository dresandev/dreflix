'use client'

import clsx from 'clsx'
import { useIsInView } from '@hooks'

interface ObservedTransitionProps {
  children: React.ReactNode
  className: string
  isVisibleClassName: string
}

export const ObservedTransition: React.FC<ObservedTransitionProps> = ({
  children,
  className,
  isVisibleClassName,
}) => {
  const { observerTargetRef, isInView } = useIsInView<HTMLDivElement>({
    thresholdsByVisibility: {
      isVisibleThreshold: .1,
      notVisibleThreshold: .9
    },
  })

  return (
    <div ref={observerTargetRef}>
      <div
        className={clsx(
          className,
          isInView && isVisibleClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
