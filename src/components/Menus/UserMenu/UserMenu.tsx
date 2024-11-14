import Link from "next/link"
import { getSessionId } from "~/helpers/server-session-id"
import { getUserDetails } from "~/actions/user-actions"
import { Avatar } from "~/components/Ui/Avatar"
import { Button } from "~/components/Ui/Button"
import { CaretDown, Heart } from "~/components/Svg"
import { AuthLink } from "./AuthLink"
import { MenuWrapper } from "./MenuWrapper"
import { LogoutButton } from "./LogoutButton"
import styles from "./UserMenu.module.css"

export const UserMenu = async () => {
  const sessionId = getSessionId()

  if (!sessionId) return <AuthLink />

  const userDetails = await getUserDetails(sessionId)

  const { avatar, name } = userDetails
  const avatarUrl = `https://gravatar.com/avatar/${avatar.gravatar.hash}?s=170`
  const avatarAlt = "User Avatar"

  return (
    <MenuWrapper trigger={
      <Button
        className={styles.triggerBtn}
        variant="square"
        size="header"
      >
        <Avatar src={avatarUrl} alt={avatarAlt} />
        <CaretDown />
      </Button>
    }>
      <div>
        <div className={styles.header}>
          <Avatar
            src={avatarUrl}
            alt={avatarAlt}
            size={54}
          />
          <span className={styles.name}>{name}</span>
        </div>

        <div className={styles.mainOptions}>
          <Button
            className={styles.optionBtn}
            variant="square"
            hoverVariant="secondary"
            asChild
          >
            <Link href="/favorites">
              <Heart filled /> Favorites
            </Link>
          </Button>
        </div>

        <LogoutButton
          className={styles.optionBtn}
          sessionId={sessionId}
        />
      </div>
    </MenuWrapper>
  )
}
