import { onAuthenticatedUser } from "@/actions/auth"
import {
    onGetAllGroupMembers,
    onGetGroupChannels,
    onGetGroupInfo,
    onGetGroupSubscriptions,
    onGetUserGroups,
} from "@/actions/groups"
import SideBar from "@/components/global/sidebar"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { Navbar } from "../_components/navbar"

interface Props {
    children: React.ReactNode
    params: {
        groupId: string
    }
}

const GroupLayout = async ({ children, params }: Props) => {
    const query = new QueryClient()

    const { payload: user } = await onAuthenticatedUser()

    if (!user || !user.id) {
        redirect("/sign-in")
    }

    // get group info
    await query.prefetchQuery({
        queryKey: ["group-info"],
        queryFn: () => onGetGroupInfo(params.groupId),
    })

    // get user groups
    await query.prefetchQuery({
        queryKey: ["user-groups"],
        queryFn: () => onGetUserGroups(user.id),
    })

    // channels
    await query.prefetchQuery({
        queryKey: ["group-channels"],
        queryFn: () => onGetGroupChannels(params.groupId),
    })

    // group subscriptions
    await query.prefetchQuery({
        queryKey: ["group-subscriptions"],
        queryFn: () => onGetGroupSubscriptions(params.groupId),
    })

    // members chat
    await query.prefetchQuery({
        queryKey: ["member-chat"],
        queryFn: () => onGetAllGroupMembers(params.groupId),
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen md:pt-5">
                <SideBar groupId={params.groupId} userId={user.id} />

                <div className="md:ml-[300px] flex flex-col flex-1 bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px] border-[#28282D]">
                    <Navbar groupId={params.groupId} userId={user.id} />
                    {children}
                    {/* <MobileNav groupId={params.groupId} /> */}
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default GroupLayout
