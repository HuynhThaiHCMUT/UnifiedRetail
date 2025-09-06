import React from 'react'
import { GetThemeValueForKey, Stack } from 'tamagui'

type DividerProps = {
  type?: 'horizontal' | 'vertical'
  thickness?: number | GetThemeValueForKey<'width'> // number => pixels, or a Tamagui token like '$1'
  color?: GetThemeValueForKey<'backgroundColor'> // default token or any color string
} & React.ComponentProps<typeof Stack>

export function Divider({
  type = 'horizontal',
  thickness = 1,
  color = '$borderColor',
  ...rest
}: DividerProps) {
  const isHorizontal = type === 'horizontal'

  return (
    <Stack
      {...rest}
      width={isHorizontal ? '100%' : thickness}
      height={isHorizontal ? thickness : '100%'}
      bg={color}
    />
  )
}
