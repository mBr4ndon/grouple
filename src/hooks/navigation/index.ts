import { onCreateNewChannel } from "@/actions/channels"
import { onGetGroupChannels } from "@/actions/groups"
import { GroupInfo, Groups } from "@/components/global/sidebar"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const useNavigation = () => {
    const pathname = usePathname()
    const [section, setSection] = useState(pathname)
    const onSetSection = (page: string) => setSection(page)

    return {
        section,
        onSetSection,
    }
}

export const useSidebar = (groupId: string) => {
    const { data: groups } = useQuery({ queryKey: ["user-groups"] }) as {
        data: Groups
    }

    const { data: groupInfo } = useQuery({ queryKey: ["group-info"] }) as {
        data: GroupInfo
    }

    const { data: channels } = useQuery({
        queryKey: ["group-channels"],
        queryFn: () => onGetGroupChannels(groupId),
    })

    const client = useQueryClient()

    const { isPending, mutate, isError, variables } = useMutation({
        mutationFn: (data: {
            id: string
            name: string
            icon: string
            createdAt: Date
            groupId: string | null
        }) =>
            onCreateNewChannel(groupId, {
                id: data.id,
                name: data.name.toLowerCase(),
                icon: data.icon,
            }),
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: ["group-channels"],
            })
        },
    })

    if (isPending)
        toast("Success", {
            description: "Channel created",
        })

    if (isError)
        toast("Error", {
            description: "Oops! something went wrong",
        })

    return { groupInfo, groups, mutate, variables, isPending, channels }
}
