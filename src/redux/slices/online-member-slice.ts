import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialStateProps {
    members: {
        id: string
    }[]
}

const initialState: InitialStateProps = {
    members: [],
}

export const onlineTracking = createSlice({
    name: "online",
    initialState,
    reducers: {
        onOnline: (state, action: PayloadAction<InitialStateProps>) => {
            const list = state.members.find((data) =>
                action.payload.members.find(
                    (payload) => data.id === payload.id,
                ),
            )

            if (!list) {
                state.members = [...state.members, ...action.payload.members]
            }
        },

        onOffline: (state, action: PayloadAction<InitialStateProps>) => {
            state.members = state.members.filter((member) =>
                action.payload.members.find((m) => member.id !== m.id),
            )
        },
    },
})

export const { onOnline, onOffline } = onlineTracking.actions
export default onlineTracking.reducer
