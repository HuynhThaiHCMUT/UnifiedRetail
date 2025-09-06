import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthDto, NewTokenDto } from '../dto/auth.dto'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

interface AuthState {
  user: Nullable<AuthDto>
  isLoading: boolean
}

const initialState: AuthState = {
  user: {
    id: null,
    name: null,
    role: null,
    phone: null,
    token: null,
    refreshToken: null,
    email: null,
  },
  isLoading: true,
}

function updateSavedUser(user: Nullable<AuthDto>) {
  if (Platform.OS == 'ios' || Platform.OS == 'android') {
    SecureStore.setItemAsync('user', JSON.stringify(user))
  } else {
    AsyncStorage.setItem('user', JSON.stringify(user))
  }
}

function removeSavedUser() {
  if (Platform.OS == 'ios' || Platform.OS == 'android') {
    SecureStore.deleteItemAsync('user')
  } else {
    AsyncStorage.removeItem('user')
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setUser: (state, action: PayloadAction<AuthDto>) => {
      state.user = action.payload
      if (state.user?.token) {
        updateSavedUser(state.user)
      }
    },
    setToken: (state, action: PayloadAction<NewTokenDto>) => {
      state.user.token = action.payload.token
      state.user.refreshToken = action.payload.refreshToken
      updateSavedUser(state.user)
    },
    removeUser: (state) => {
      state.user = {
        id: null,
        name: null,
        role: null,
        phone: null,
        token: null,
        refreshToken: null,
        email: null,
      }
      removeSavedUser()
    },
  },
})

export const { setLoading, setUser, removeUser } = authSlice.actions

export default authSlice.reducer
