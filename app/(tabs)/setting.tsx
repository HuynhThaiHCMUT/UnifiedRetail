import { removeUser } from '@/utils/auth.slice'
import { useAppDispatch } from '@/hooks/useAppHooks'
import { XStack, Button } from 'tamagui'

export default function Setting() {
  const dispatch = useAppDispatch()
  const logOut = () => {
    dispatch(removeUser())
  }

  return (
    <XStack py="$2" flex={1} justify="center" items="center">
      <Button theme="red" onPress={() => logOut()}>
        Đăng xuất
      </Button>
    </XStack>
  )
}
