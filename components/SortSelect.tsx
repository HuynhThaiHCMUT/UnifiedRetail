import { useState } from 'react'
import { Button, YStack, Paragraph, ListItem, Stack, StackProps } from 'tamagui'
import { ArrowUpDown } from '@tamagui/lucide-icons'

type Option = {
  label: string
  value: string
}

interface SelectProps extends StackProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  style?: any
}

export function SortSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  ...rest
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? placeholder

  return (
    <YStack position="relative" {...rest}>
      {/* Trigger button */}
      <Button size="$3" onPress={() => setOpen((o) => !o)}>
        <ArrowUpDown size={16} />
        {selectedLabel}
      </Button>

      {/* Floating dropdown */}
      {open && (
        <Stack
          position="absolute"
          t="100%"
          l={0}
          r={0}
          z={100}
          bg="$background"
          borderWidth={1}
          borderColor="$borderColor"
          rounded="$4"
          mt="$2"
          elevationAndroid={4}
          shadowColor="rgba(0,0,0,0.2)"
        >
          {options.map((opt) => (
            <ListItem
              key={opt.value}
              onPress={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              bg={opt.value === value ? '$blue5' : 'transparent'}
            >
              <Paragraph>{opt.label}</Paragraph>
            </ListItem>
          ))}
        </Stack>
      )}
    </YStack>
  )
}
