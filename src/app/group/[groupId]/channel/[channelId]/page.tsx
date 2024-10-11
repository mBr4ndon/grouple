import { onAuthenticatedUser } from "@/actions/auth"
import { onGetChannelInfo } from "@/actions/channels"
import { onGetGroupInfo } from "@/actions/groups"
import { currentUser } from "@clerk/nextjs/server"
import { QueryClient } from "@tanstack/react-query"

interface Props {
    params: {
        channelId: string
        groupId: string
    }
}

const GroupChannelPage = async ({ params }: Props) => {
    const client = new QueryClient()
    const user = await currentUser()
    const { payload: authUser } = await onAuthenticatedUser()

    await client.prefetchQuery({
        queryKey: ["channel-info"],
        queryFn: () => onGetChannelInfo(params.channelId),
    })

    await client.prefetchQuery({
        queryKey: ["about-group-info"],
        queryFn: () => onGetGroupInfo(params.groupId),
    })

    return <div>GroupChannelPage</div>
}

export default GroupChannelPage
