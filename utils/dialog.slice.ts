import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DialogType = 'error' | 'info' | 'warning'

export interface DialogState {
    open: boolean
    type?: DialogType
    title?: string
    message?: string
}

const initialState: DialogState = { open: false }

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog: (
            state,
            action: PayloadAction<{
                type: DialogType
                title: string
                message: string
            }>
        ) => {
            state.open = true
            state.type = action.payload.type
            state.title = action.payload.title
            state.message = action.payload.message
        },
        closeDialog: (state) => {
            state.open = false
            state.type = undefined
            state.title = undefined
            state.message = undefined
        },
    },
})

export const { openDialog, closeDialog } = dialogSlice.actions
export default dialogSlice.reducer
