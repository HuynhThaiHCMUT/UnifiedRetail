import getImageUrl from '@/utils/get-image'
import { Image } from 'tamagui'

export function ProductImage({ url }: { url: string }) {
  return (
    <Image
      key={url}
      source={{ uri: getImageUrl(url) }}
      width="$6"
      height="$6"
      alt="Product Image"
    />
  )
}
