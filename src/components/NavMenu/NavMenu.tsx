import { CCNavMenu } from "./CCNavMenu"
import { GenresDropdown } from "./GenresDropdown"

interface NavMenuProps {
	children?: React.ReactNode
	className?: string
}

export const NavMenu: React.FC<NavMenuProps> = ({ className }) => {
	return (
		<CCNavMenu className={className}>
			<GenresDropdown />
		</CCNavMenu>
	)
}
