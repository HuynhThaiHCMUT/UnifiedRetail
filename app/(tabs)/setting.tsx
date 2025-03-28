import { removeUser } from '@/utils/auth.slice'
import { useAppDispatch } from '@/utils/hook'
import { XStack, Button } from 'tamagui'

export default function Tab() {
    const dispatch = useAppDispatch()
    const logOut = () => {
        dispatch(removeUser())
    }

    return (
        <XStack paddingBlock="$2" flex={1} justify="center" items="center">
            <Button theme="red" onPress={() => logOut()}>
                Đăng xuất
            </Button>
        </XStack>
    )
}
