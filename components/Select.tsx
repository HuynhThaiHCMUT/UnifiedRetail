import { useState, useRef } from 'react'
import {
  Button,
  YStack,
  Paragraph,
  ListItem,
  Stack,
  StackProps,
} from 'tamagui'
import { Portal } from '@tamagui/portal'
import { View } from 'react-native'

type Option = {
  label: string
  value: string
}

export interface SelectProps extends StackProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  trigger?: React.ReactNode // let consumers define their trigger UI
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  trigger,
  ...rest
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [dropdownPos, setDropdownPos] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)

  const buttonRef = useRef<View>(null)

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? placeholder

  const toggleDropdown = () => {
    if (open) {
      setOpen(false)
      return
    }

    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownPos({ x, y, width, height })
      setOpen(true)
    })
  }

  return (
    <YStack {...rest}>
      {/* Trigger */}
      <Button ref={buttonRef} size="$3" onPress={toggleDropdown}>
        {trigger ?? selectedLabel}
      </Button>

      {/* Dropdown + Backdrop */}
      {open && dropdownPos && (
        <Portal>
          {/* Fullscreen backdrop */}
          <Stack
            onPress={() => setOpen(false)}
            t={0}
            l={0}
            width="100%"
            height="100%"
            z={99}
          />

          {/* Dropdown */}
          <Stack
            position="absolute"
            t={dropdownPos.y + dropdownPos.height + 20}
            l={dropdownPos.x}
            width={dropdownPos.width}
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
        </Portal>
      )}
    </YStack>
  )
}
