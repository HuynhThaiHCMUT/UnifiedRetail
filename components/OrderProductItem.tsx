import { useGetProductQuery } from '@/utils/api.service'
import getImageUrl from '@/utils/get-image'
import { useAppDispatch } from '@/utils/hook'
import { OrderProductItemDto, updateQuantity } from '@/utils/order.slice'
import { Minus, Plus } from '@tamagui/lucide-icons'
import { XStack, Text, Image, Stack, Button } from 'tamagui'

export interface OrderProductItemProps {
  item: OrderProductItemDto
}

export function OrderProductItem({ item }: OrderProductItemProps) {
  const dispatch = useAppDispatch()
  const { data: product } = useGetProductQuery(item.id)

  return (
    product && (
      <XStack p="$2">
        {product.pictures && product.pictures?.length > 0 && (
          <Image
            source={{ uri: getImageUrl(product.pictures[0]) }}
            width="$4"
            height="$4"
            alt="Product Image"
            mr="$4"
          />
        )}
        <Stack flex={1}>
          <XStack flex={1}>
            <Text flex={1} flexWrap="wrap">
              {product.name}
            </Text>
            <Text ml="$4">{item.total} đ</Text>
          </XStack>
          <XStack items="center">
            <Text mr="$4" width="25%">{product.price} đ</Text>
            <Button
              size="$2"
              onPress={() =>
                dispatch(
                  updateQuantity({ id: item.id, unit: item.unit, delta: -1 })
                )
              }
            >
              <Minus size={12} />
            </Button>
            <Text mx="$2">{item.quantity}</Text>
            <Button
              size="$2"
              onPress={() =>
                dispatch(
                  updateQuantity({ id: item.id, unit: item.unit, delta: 1 })
                )
              }
            >
              <Plus size={12} />
            </Button>
          </XStack>
        </Stack>
      </XStack>
    )
  )
}
