import { useAppSelector } from '@/hooks/useAppHooks'
import { Redirect, Stack } from 'expo-router'

export default function AuthStack() {
  const auth = useAppSelector((state) => state.auth)
  if (auth.user.token) return <Redirect href="/(tabs)/home" />
  return (
    <Stack initialRouteName="sign-in">
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  )
}
