"use client"

import { Button } from "@/components/ui/button"
import { useGroupChatOnline } from "@/hooks/groups"
import { useSidebar } from "@/hooks/navigation"
import { CarotSort } from "@/icons"
import { cn } from "@/lib/utils"
import { Group, Plus } from "lucide-react"
import Link from "next/link"
import { v4 } from "uuid"
import { DropDown } from "../drop-down"
import SideBarMenu from "./menu"

interface Props {
    groupId: string
    userId: string
    mobile?: boolean
}

export interface GroupInfo {
    status: number
    group:
        | {
              id: string
              name: string
              category: string
              thumbnail: string | null
              description: string | null
              gallery: string[]
              jsonDescription: string | null
              htmlDescription: string | null
              privacy: boolean
              active: boolean
              createdAt: Date
              userId: string
              icon: string
          }
        | undefined
}

export interface Channels {
    id: string
    name: string
    icon: string
    createdAt: Date
    groupId: string | null
}

export interface Groups {
    status: number
    groups:
        | {
              icon: string | null
              id: string
              name: string
          }[]
        | undefined
}

const SideBar = ({ groupId, userId, mobile }: Props) => {
    const { groupInfo, groups, mutate, variables, isPending, channels } =
        useSidebar(groupId)

    useGroupChatOnline(userId)

    return (
        <div
            className={cn(
                "h-screen flex-col gap-y-10 sm:px-5",
                !mobile
                    ? "hidden bg-black md:w-[300px] fixed md:flex"
                    : "w-full flex",
            )}
        >
            {groups.groups && groups.groups.length > 0 && (
                <DropDown
                    title="Groups"
                    trigger={
                        <div className="w-full flex items-center justify-between text-themeTextGray md:border-[1px] border-themeGray p-3 rounded-xl">
                            <div className="flex gap-x-3 items-center">
                                <img
                                    src={`https://ucarecdn.com/${groupInfo.group?.icon as string}/`}
                                    alt="icon"
                                    className="w-10 rounded-lg"
                                />
                                <p className="text-sm">
                                    {groupInfo.group?.name}
                                </p>
                            </div>
                            <span className="">
                                <CarotSort />
                            </span>
                        </div>
                    }
                >
                    {groups &&
                        groups.groups.length > 0 &&
                        groups.groups.map((item) => (
                            <Link
                                key={item.id}
                                href={`/group/${item.id}/channel/${channels?.channels?.[0].id!}`}
                            >
                                <Button
                                    variant="ghost"
                                    className="flex gap-2 w-full justify-start hover:bg-themeGray items-center"
                                >
                                    <Group />
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                </DropDown>
            )}

            <div className="flex flex-col gap-y-5">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-[#F7ECE9]">CHANNELS</p>
                    {userId === groupInfo.group?.userId && (
                        <Plus
                            size={16}
                            className={cn(
                                "text-themeTextGray cursor-pointer",
                                isPending && "opacity-70",
                            )}
                            {...(!isPending && {
                                onClick: () =>
                                    mutate({
                                        id: v4(),
                                        icon: "general",
                                        name: "unnamed",
                                        createdAt: new Date(),
                                        groupId,
                                    }),
                            })}
                        />
                    )}
                </div>
                <SideBarMenu
                    channels={channels?.channels!}
                    optimisticChannel={variables}
                    loading={isPending}
                    groupId={groupId}
                    groupUserId={groupInfo.group?.userId!}
                    userId={userId}
                />
            </div>
        </div>
    )
}

export default SideBar
