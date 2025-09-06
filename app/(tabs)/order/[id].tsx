import DataWrapper from '@/components/DataWrapper'
import { useGetOrderQuery } from '@/utils/api.service'
import { useLocalSearchParams } from 'expo-router'
import { Stack, XStack, Text } from 'tamagui'

export default function Order() {
  const { id } = useLocalSearchParams()
  const { data, isLoading, error, refetch } = useGetOrderQuery(id as string)

  return (
    <DataWrapper isLoading={isLoading} error={error} refetch={refetch}>
      <Stack>
        <Text fontWeight="bold" fontSize="$4">
          Mã đơn hàng: {data?.name}
        </Text>
        <Text></Text>
      </Stack>
    </DataWrapper>
  )
}
