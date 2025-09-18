import { Select, SelectProps } from "./Select"
import { Label, Text } from "tamagui"
import { ArrowUpDown } from '@tamagui/lucide-icons'

interface SortSelectProps extends Omit<SelectProps, 'trigger'> {}

export function SortSelect(props: SortSelectProps) {
  const { options, value, placeholder } = props

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? placeholder ?? 'Sort...'

  return (
    <Select
      {...props}
      trigger={
        <>
          <ArrowUpDown size={16} />
          <Text fontSize="$3" ml="$2">{selectedLabel}</Text>
        </>
      }
    />
  )
}