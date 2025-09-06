import DataWrapper from '@/components/DataWrapper'
import { ProductItem } from '@/components/ProductItem'
import { useGetProductsQuery } from '@/utils/api.service'
import { useRouter } from 'expo-router'
import { FlatList, RefreshControl } from 'react-native'
import { Stack, View, Button, Text, XStack } from 'tamagui'
import React, { useState, useMemo } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { FilterModal } from '@/components/FilterModal'
import { SortSelect } from '@/components/SortSelect'
import { sortOptions } from '@/constants'
import { GetProductsQueryDto, ProductDto } from '@/dto/product.dto'
import { useAppDispatch } from '@/utils/hook'
import { addItem } from '@/utils/order.slice'
import { Filter } from '@tamagui/lucide-icons'

const query: GetProductsQueryDto = {
  name: undefined,
  categories: undefined,
  offset: 0,
  limit: 10,
  sortBy: 'time',
  priceFrom: undefined,
  priceTo: undefined,
}

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export default function SelectProduct() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data, isFetching, error, refetch } = useGetProductsQuery(query)

  const [searchQuery, setSearchQuery] = useState('')
  const [filterVisible, setFilterVisible] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
  const [sortByLocal, setSortByLocal] = useState('time')

  const onAddItem = (product: ProductDto) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        unit: product.baseUnit ?? undefined,
        total: product.price * 1,
      })
    )
    router.back()
  }

  const filteredData = useMemo(() => {
    if (!data) return []
    return data
      .filter((item) => normalize(item.name).includes(normalize(searchQuery)))
      .filter(
        (item) =>
          item.categories &&
          (selectedCategories.length === 0 ||
            selectedCategories.includes(item.categories[0]))
      )
      .filter(
        (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
      )
      .sort((a, b) => {
        if (sortByLocal === 'price-asc') return a.price - b.price
        if (sortByLocal === 'price-desc') return b.price - a.price
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }, [data, searchQuery, selectedCategories, priceRange, sortByLocal])

  return (
    <DataWrapper isLoading={isFetching} error={error} refetch={refetch}>
      <Stack p="$4" flex={1}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <XStack my="$2">
          <View flex={1}>
            <SortSelect
              width={160}
              options={sortOptions}
              value={sortByLocal}
              onChange={setSortByLocal}
            />
          </View>
          <Button size="$3" onPress={() => setFilterVisible(true)}>
            <Filter size={16} />
            Bộ lọc
          </Button>
        </XStack>
        <FlatList
          data={filteredData}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <ProductItem
              product={item}
              key={item.id}
              onPress={() => onAddItem(item)}
            />
          )}
        />
      </Stack>
      <FilterModal
        visible={filterVisible}
        initialCategories={selectedCategories}
        initialPriceRange={priceRange}
        onApply={(cats, pr) => {
          setSelectedCategories(cats)
          setPriceRange(pr)
        }}
        onClose={() => setFilterVisible(false)}
      />
    </DataWrapper>
  )
}
