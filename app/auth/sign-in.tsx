import { SignInDto, SignInDtoSchema } from '@/dto/auth.dto'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Stack, Text, Button, Spinner } from 'tamagui'
import { useSignInMutation } from '@/utils/api.service'
import { useAppDispatch } from '@/utils/hook'
import { setUser } from '@/utils/auth.slice'
import { useRouter } from 'expo-router'
import handleError from '@/utils/error-handler'
import { openDialog } from '@/utils/dialog.slice'

export default function SignIn() {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInDto>({
        resolver: zodResolver(SignInDtoSchema),
    })

    const [signIn, { isLoading }] = useSignInMutation()

    const onSubmit = async (data: SignInDto) => {
        const result = await signIn(data)
        if (result.error) {
            dispatch(
                openDialog({
                    type: 'error',
                    title: 'Đăng nhập thất bại',
                    message: handleError(result.error),
                })
            )
        } else {
            dispatch(setUser(result.data))
            router.navigate('/(tabs)/home')
        }
    }

    return (
        <Stack flex={1} justify="center" items="center">
            <Stack paddingBlock="$4" gap="$4" width="$20">
                <Controller
                    control={control}
                    name="phone"
                    defaultValue=""
                    render={({ field }) => (
                        <Stack gap="$2">
                            <Text>Số điện thoại:</Text>
                            <Input {...field} placeholder="Số điện thoại" />
                            {errors.phone && (
                                <Text color="red">{errors.phone.message}</Text>
                            )}
                        </Stack>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field }) => (
                        <Stack gap="$2">
                            <Text>Mật khẩu:</Text>
                            <Input
                                {...field}
                                placeholder="Mật khẩu"
                                secureTextEntry
                            />
                            {errors.password && (
                                <Text color="red">
                                    {errors.password.message}
                                </Text>
                            )}
                        </Stack>
                    )}
                />

                <Button onPress={handleSubmit(onSubmit)} width="100%">
                    {isLoading ? <Spinner /> : 'Đăng nhập'}
                </Button>
            </Stack>
        </Stack>
    )
}
