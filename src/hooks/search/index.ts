import { onSearchGroups } from "@/actions/groups"
import { onClearSearch, onSearch } from "@/redux/slices/search-slice"
import { type AppDispatch } from "@/redux/store"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export const useSearch = (searchType: "GROUPS" | "POSTS") => {
    const [query, setQuery] = useState("")
    const [debounce, setDebounce] = useState("")

    const dispatch: AppDispatch = useDispatch()

    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value)

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => setDebounce(query), 1000)

        return () => clearTimeout(delayInputTimeoutId)
    }, [query, 1000])

    const { refetch, data, isFetched, isFetching } = useQuery({
        queryKey: ["search-data", debounce],
        queryFn: async ({ queryKey }) => {
            if (searchType === "GROUPS") {
                const groups = await onSearchGroups(searchType, query[1])
                return groups
            }
        },
        enabled: false,
    })

    if (isFetching) {
        dispatch(
            onSearch({
                isSearching: true,
                data: [],
            }),
        )
    }

    if (isFetched) {
        dispatch(
            onSearch({
                isSearching: false,
                status: data?.status as number,
                data: data?.groups || [],
                debounce,
            }),
        )
    }

    useEffect(() => {
        if (debounce) {
            refetch()
        } else {
            dispatch(onClearSearch())
        }

        return () => {
            debounce
        }
    }, [debounce])

    return { query, onSearchQuery }
}
