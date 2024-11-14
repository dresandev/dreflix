"use client"

import { useTransition } from "react"
import { deleteUserSession } from "~/actions/user-actions"
import { DoorExit } from "~/components/Svg"
import { Button } from "~/components/Ui/Button"

interface Props {
  className?: string
  sessionId: string
}

export const LogoutButton: React.FC<Props> = ({ className, sessionId }) => {
  const [isPending, startTransition] = useTransition()

  const handleLogOut = () => {
    startTransition(async () => {
      const data = await deleteUserSession(sessionId)

      if (!data?.error) {
        // Show sonner
      }
    })
  }

  return (
    <Button
      className={className}
      variant="square"
      hoverVariant="secondary"
      disabled={isPending}
      onClick={handleLogOut}
    >
      <DoorExit /> Sign out
    </Button>
  )
}
