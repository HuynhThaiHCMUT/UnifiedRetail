import React from 'react'
import { Stack, Input } from 'tamagui'

interface SearchBarProps {
  value: string
  onChange: (text: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <Stack>
    <Input
      p="$0"
      size="$3"
      placeholder="Tìm kiếm..."
      value={value}
      onChangeText={onChange}
    />
  </Stack>
)
