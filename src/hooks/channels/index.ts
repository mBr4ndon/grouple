import { onDeleteChannel, onUpdateChannelInfo } from "@/actions/channels"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export const useChannelInfo = () => {
    const channelRef = useRef<HTMLAnchorElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)

    const [channel, setChannel] = useState<string | undefined>(undefined)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [icon, setIcon] = useState<string | undefined>(undefined)

    const client = useQueryClient()

    const onEditChannel = (id?: string) => {
        setChannel(id)
        setIsEdit(true)
    }

    const onSetIcon = (icon?: string) => {
        setIcon(icon)
    }

    const { isPending, mutate, variables } = useMutation({
        mutationFn: (data: { name?: string; icon?: string }) =>
            onUpdateChannelInfo(channel!, data.name, data.icon),
        onMutate: () => {
            setIsEdit(false)
            onSetIcon(undefined)
        },
        onSuccess: (data) => {
            return toast(data.status !== 200 ? "Error" : "Success", {
                description: data.message,
            })
        },
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: ["group-channels"],
            })
        },
    })

    const { variables: deleteVariables, mutate: deleteMutation } = useMutation({
        mutationFn: (data: { id: string }) => onDeleteChannel(data.id),
        onSuccess: (data) => {
            return toast(data.status !== 200 ? "Error" : "Success", {
                description: data.message,
            })
        },
        onSettled: async () => {
            return await client.invalidateQueries({
                queryKey: ["group-channels"],
            })
        },
    })

    const onEndChannelEdit = (event: Event) => {
        if (inputRef.current && channelRef.current && triggerRef.current) {
            if (
                !inputRef.current.contains(event.target as Node | null) &&
                !channelRef.current.contains(event.target as Node | null) &&
                !triggerRef.current.contains(event.target as Node | null) &&
                !document.getElementById("icon-list")
            ) {
                if (inputRef.current.value) {
                    mutate({
                        name: inputRef.current.value,
                    })
                }
                if (icon) {
                    mutate({ icon })
                } else {
                    setIsEdit(false)
                }
            }
        }
    }

    useEffect(() => {
        document.addEventListener("click", onEndChannelEdit, false)
        return () => {
            document.removeEventListener("click", onEndChannelEdit, false)
        }
    }, [icon])

    const onChannelDetele = (id: string) => deleteMutation({ id })

    return {
        channel,
        onEditChannel,
        channelRef,
        isEdit,
        inputRef,
        variables,
        isPending,
        triggerRef,
        onSetIcon,
        icon,
        onChannelDetele,
        deleteVariables,
    }
}
