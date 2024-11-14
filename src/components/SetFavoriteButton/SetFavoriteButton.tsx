"use client"

import { useOptimistic, useState, useTransition } from "react"
import type { Size } from "~/types"
import { setFavoriteMovie } from "~/actions/user-actions"
import { getClientSessionId } from "~/helpers/client-session-id"
import { getAuthUrl } from "~/helpers/get-redirect-to"
import { IconButton } from "~/components/IconButton"
import { Heart } from "~/components/Svg"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "~/components/Ui/Tooltip"

interface Props {
  movieId: number
  size?: Size
  isFavorite: boolean
}

export const SetFavoriteButton: React.FC<Props> = ({
  movieId,
  size = "default",
  isFavorite
}) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite)
  const [optimisticIsFavorite, setOptimisticIsFavorite] = useOptimistic(isFavoriteState)
  const [isPending, startTransition] = useTransition()

  const handleClick = async (e: React.MouseEvent) => {
    if (isPending) return

    e.preventDefault()

    const sessionId = getClientSessionId()

    if (!sessionId) {
      const { pathname, search } = window.location

      const authUrl = getAuthUrl({
        pathname,
        searchParams: search.slice(1)
      })

      return window.location.href = authUrl
    }

    startTransition(async () => {
      setOptimisticIsFavorite(prev => !prev)

      const { data, error } = await setFavoriteMovie({
        sessionId,
        movieId,
        favorite: !isFavoriteState,
      })

      if (error) {
        setOptimisticIsFavorite(prev => !prev)
        console.error(error.message)
        // Show sooner
        return
      }

      setOptimisticIsFavorite(prev => !prev)
      setIsFavoriteState(data.status_code === 1)
    })
  }

  const label = "Mark as favorite"

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100} disableHoverableContent>
        <TooltipTrigger asChild>
          <IconButton
            ariaLabel={label}
            size={size}
            onClick={handleClick}
          >
            <Heart filled={optimisticIsFavorite} />
          </IconButton>
        </TooltipTrigger>

        <TooltipContent
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <label>{label}</label>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
