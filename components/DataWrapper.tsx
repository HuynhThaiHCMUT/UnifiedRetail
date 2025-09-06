import handleError from '@/utils/error-handler'
import { Spinner, Stack, Text, Button } from 'tamagui'

interface DataWrapperProps {
  isLoading: boolean
  error: any
  refetch?: () => void
  children: any
}

const DataWrapper = ({
  isLoading,
  error,
  refetch,
  children,
}: DataWrapperProps) => {
  if (isLoading) {
    return (
      <Stack
        p="$4"
        width="100%"
        height="100%"
        items="center"
        justify="center"
        gap="$4"
      >
        <Spinner size="large" color="$color" />
      </Stack>
    )
  }

  if (error) {
    return (
      <Stack p="$4" width="100%" height="100%" items="center" justify="center">
        <Text fontWeight="bold" mb="$4">
          {handleError(error)}
        </Text>
        {refetch && <Button onPress={refetch}>Thử lại</Button>}
      </Stack>
    )
  }

  return <>{children}</>
}

export default DataWrapper
