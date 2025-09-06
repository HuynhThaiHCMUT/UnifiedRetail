import { OrderDto } from '@/dto/order.dto'
import { ProductDto } from '@/dto/product.dto'
import { useGetProductQuery } from '@/utils/api.service'
import getImageUrl from '@/utils/get-image'
import { useAppDispatch } from '@/utils/hook'
import { Link, useRouter } from 'expo-router'
import { XStack, Text, Image, Stack, Button } from 'tamagui'

export interface OrderItemProps {
  item: OrderDto
}

export function OrderItem({ item }: OrderItemProps) {
  const dispatch = useAppDispatch()

  return (
    <XStack p="$2">
      <Stack flex={1}>
        <XStack>
          <Text flex={1} flexWrap="wrap">
            {item.name}
          </Text>
          <Text ml="$4">{item.total} đ</Text>
        </XStack>
      </Stack>
    </XStack>
  )
}
