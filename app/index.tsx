import { useEffect } from 'react'
import { useAppSelector } from '../utils/hook'
import { Spinner, XStack } from 'tamagui'
import { useRouter } from 'expo-router'
import { useGetProductsQuery } from '@/utils/api.service'

export default function SplashScreen() {
  const router = useRouter()
  const auth = useAppSelector((state) => state.auth)
  const { data } = useGetProductsQuery()
  const getData = async () => {
    //const onboarding = await AsyncStorage.getItem('onboarding')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (auth?.user.token) {
      router.navigate('/(tabs)/home')
    } else {
      router.navigate('/auth/sign-in')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <XStack py="$2" flex={1} justify="center" items="center">
      <Spinner />
    </XStack>
  )
}
