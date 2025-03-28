import '../tamagui-web.css'

import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { Platform, useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { StatusBar } from 'expo-status-bar'
import { tamaguiConfig } from '../tamagui.config'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from '@/utils/store'
import { useEffect } from 'react'
import { useAppDispatch } from '@/utils/hook'
import { AuthDto } from '@/dto/auth.dto'
import { setUser } from '@/utils/auth.slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { GlobalDialog } from '@/components/GlobalDialog'

function App() {
    const dispatch = useAppDispatch()
    const getData = async () => {
        let user: AuthDto | null = null
        if (Platform.OS == 'ios' || Platform.OS == 'android') {
            user = JSON.parse((await SecureStore.getItemAsync('user')) ?? '{}')
        } else {
            user = JSON.parse((await AsyncStorage.getItem('user')) ?? '{}')
        }
        if (user?.token) dispatch(setUser(user))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const colorScheme = useColorScheme()

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <TamaguiProvider
                    config={tamaguiConfig}
                    defaultTheme={colorScheme!}
                >
                    <StatusBar style="auto" backgroundColor="" />
                    <ThemeProvider
                        value={
                            colorScheme === 'dark' ? DarkTheme : DefaultTheme
                        }
                    >
                        <GlobalDialog />
                        <App />
                    </ThemeProvider>
                </TamaguiProvider>
            </Provider>
        </SafeAreaProvider>
    )
}
