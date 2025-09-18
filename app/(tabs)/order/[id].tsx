import DataWrapper from '@/components/DataWrapper'
import { Divider } from '@/components/Divider'
import { OrderProductItem } from '@/components/OrderProductItem'
import { ORDER_STATUS_COLORS, ORDER_STATUS, BASE_PRODUCT_QUERY } from '@/constants'
import { useGetOrderQuery, useGetProductsQuery } from '@/utils/api.service'
import { OrderProductItemDto } from '@/utils/order.slice'
import { useLocalSearchParams } from 'expo-router'
import { FlatList } from 'react-native'
import { Stack, XStack, Text } from 'tamagui'

export default function Order() {
  const { id } = useLocalSearchParams()
  const { data, isLoading, error, refetch } = useGetOrderQuery(id as string)
  const { data: products } = useGetProductsQuery(BASE_PRODUCT_QUERY)

  return (
    <DataWrapper p='$0' isLoading={isLoading} error={error} refetch={refetch}>
      <Stack p='$4' gap='$4'>
        <Text fontWeight="bold" fontSize="$4">
          Mã đơn hàng: #{data?.name}
        </Text>
        <Text>
          Ngày tạo: {data && new Date(data.createdAt).toLocaleString('vi-VN')}
        </Text>
        <XStack>
          <Text>Trạng thái: </Text>
          <Text 
            theme={ORDER_STATUS_COLORS[data?.status ?? 'PENDING']}
            bg='$color6'
            color='$color12'
            px="$2"
            rounded="$6"
          >
            {ORDER_STATUS[data?.status ?? 'PENDING']}
          </Text>
        </XStack>
      </Stack>
      <Divider thickness={4}/>
      <Stack p='$4' gap='$2'>
        <Text fontSize='$6' fontWeight='bold'>
          Sản phẩm
        </Text>
        {/* <FlatList
          data={data?.products ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderProductItem item={item} />}
        /> */}
      </Stack>
    </DataWrapper>
  )
}
