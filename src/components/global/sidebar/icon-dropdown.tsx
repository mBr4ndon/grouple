import { ICON_LIST } from "@/constants/icons"
import { cn } from "@/lib/utils"
import { DropDown } from "../drop-down"
import { IconRenderer } from "../icon-renderer"

interface Props {
    ref: React.RefObject<HTMLButtonElement>
    icon: string
    page?: string
    channelId: string
    currentIcon?: string
    onSetIcon: (icon: string) => void
}

const IconDropDown = ({
    ref,
    icon,
    page,
    channelId,
    currentIcon,
    onSetIcon,
}: Props) => {
    return (
        <DropDown
            ref={ref}
            title="Pick your icon"
            trigger={
                <span>
                    <IconRenderer
                        icon={icon}
                        mode={page === channelId ? "LIGHT" : "DARK"}
                    />
                </span>
            }
        >
            <div id="icon-list" className="flex gap-x-2">
                {ICON_LIST.map(
                    (icons) =>
                        icons.icon !== icon && (
                            <span
                                key={icons.id}
                                className={cn(
                                    currentIcon === icons.icon
                                        ? "bg-themeGray"
                                        : "",
                                    "p-2 rounded-lg",
                                )}
                                onClick={() => onSetIcon(icons.icon)}
                            >
                                <IconRenderer
                                    icon={icons.icon}
                                    mode={page === channelId ? "LIGHT" : "DARK"}
                                />
                            </span>
                        ),
                )}
            </div>
        </DropDown>
    )
}

export default IconDropDown
