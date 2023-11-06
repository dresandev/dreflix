'use client'

import type { Size } from '@types'
import { useUiStore } from '@store/use-ui-store'
import { IconButton } from '@components/IconButton'
import { PlayIcon } from '@components/SVG'

interface TrailerIconButttonProps {
  size?: Size
}

export const TrailerIconButtton: React.FC<TrailerIconButttonProps> = ({
  size = 'medium'
}) => {
  const { toggleShowTrailerModal } = useUiStore()

  return (
    <IconButton
      ariaLabel='Reproducir trailer'
      size={size}
      onClick={toggleShowTrailerModal}
    >
      <PlayIcon />
    </IconButton>
  )
}
