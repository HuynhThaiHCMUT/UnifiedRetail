import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth.slice'
import dialogReducer from './dialog.slice'
import api from './api.service'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dialog: dialogReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
