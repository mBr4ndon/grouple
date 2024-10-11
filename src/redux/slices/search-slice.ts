import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface GroupStateProps {
    id: string
    name: string
    category: string
    createdAt: Date
    htmlDescription: string | null
    userId: string
    thumbnail: string | null
    description: string | null
    privacy: "PUBLIC" | "PRIVATE"
    jsonDescription: string | null
    gallery: string[]
}

interface InitialStateProps {
    isSearching?: boolean
    status?: number | undefined
    data: GroupStateProps[]
    debounce?: string
}

const InitialState: InitialStateProps = {
    isSearching: false,
    status: undefined,
    data: [],
    debounce: "",
}

export const search = createSlice({
    name: "search",
    initialState: InitialState,
    reducers: {
        onSearch: (state, action: PayloadAction<InitialStateProps>) => {
            return { ...action.payload }
        },
        onClearSearch: (state) => {
            state.data = []
            state.isSearching = false
            state.status = undefined
            state.debounce = ""
        },
    },
})

export const { onSearch, onClearSearch } = search.actions
export default search.reducer
