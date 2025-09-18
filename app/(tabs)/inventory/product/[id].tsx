import { CategoryInput } from '@/components/CategoryInput'
import { FormInput } from '@/components/FormInput'
import { ScreenContainer } from '@/components/ScreenContainer'
import { CreateProductDto, CreateProductDtoSchema } from '@/dto/product.dto'
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductQuery,
  useUploadProductImagesMutation,
  useDeleteProductMutation,
} from '@/utils/api.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { useCallback, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Image, Stack, Text, XStack } from 'tamagui'
import { useEffect } from 'react'
import { openDialog, registerDialogCallback } from '@/utils/dialog.slice'
import { useAppDispatch } from '@/utils/hook'
import handleError from '@/utils/error-handler'
import { skipToken } from '@reduxjs/toolkit/query'
import { ImagePickerAsset } from 'expo-image-picker'
import { pickImage } from '@/utils/image-picker'
import { Image as ImageIcon, Trash2 } from '@tamagui/lucide-icons'
import getImageUrl from '@/utils/get-image'

export default function ProductDetail() {
  const navigation = useNavigation()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { id: idParam } = useLocalSearchParams()
  const id = idParam instanceof Array ? idParam[0] : idParam
  const isNew = id === 'new'

  const { data, isLoading } = useGetProductQuery(
    !isNew ? (id as string) : skipToken
  )

  const [createProduct, { isLoading: creating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation()
  const [uploadProductImages] = useUploadProductImagesMutation()
  const [images, setImages] = useState<ImagePickerAsset[]>([])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductDto>({
    resolver: zodResolver(CreateProductDtoSchema),
    defaultValues: {
      categories: [],
    },
  })

  useEffect(() => {
    if (data && !isNew) {
      reset({
        ...data,
        quantity: data.quantity?.toString() as unknown as number,
        price: data.price?.toString() as unknown as number,
        basePrice: data.basePrice?.toString() as unknown as number,
      })
    }
  }, [data, isNew, reset])

  const onSubmit = async (formData: CreateProductDto) => {
    try {
      const parsedData = {
        ...formData,
        quantity: parseInt(formData.quantity as unknown as string),
        price: parseInt(formData.price as unknown as string),
        basePrice: parseInt(formData.basePrice as unknown as string),
      }

      const result = isNew
        ? await createProduct(parsedData)
        : await updateProduct({ id, ...parsedData })

      if ('error' in result) {
        dispatch(
          openDialog({
            variant: 'error',
            title: isNew ? 'Thêm sản phẩm thất bại' : 'Cập nhật thất bại',
            message: handleError(result.error),
          })
        )
        return
      }

      if (images.length > 0) {
        const uploadResult = await uploadProductImages({
          id: isNew ? result.data.id : id,
          files: images,
        })

        console.log(uploadResult)

        if ('error' in uploadResult) {
          dispatch(
            openDialog({
              variant: 'error',
              title: 'Tải ảnh lên thất bại',
              message: handleError(uploadResult.error),
            })
          )
          return
        }
      }

      dispatch(
        openDialog({
          variant: 'success',
          title: isNew ? 'Thêm sản phẩm thành công' : 'Cập nhật thành công',
        })
      )

      router.back()
    } catch (err) {
      dispatch(
        openDialog({
          variant: 'error',
          title: 'Lỗi không xác định',
          message: 'Vui lòng thử lại',
        })
      )
    }
  }

  const onDelete = useCallback(async () => {
    registerDialogCallback('onDialogConfirm', async () => {
      try {
        const result = await deleteProduct(id)
        if ('error' in result) {
          dispatch(
            openDialog({
              variant: 'error',
              title: 'Xoá sản phẩm thất bại',
              message: handleError(result.error),
            })
          )
          return
        }
        dispatch(
          openDialog({
            variant: 'success',
            title: 'Xoá sản phẩm thành công',
          })
        )
        router.back()
      } catch (err) {
        dispatch(
          openDialog({
            variant: 'error',
            title: 'Lỗi không xác định',
            message: 'Vui lòng thử lại',
          })
        )
      }
    })
    dispatch(
      openDialog({
        type: 'confirm',
        variant: 'warning',
        title: 'Xoá sản phẩm',
        message: 'Bạn có chắc chắn muốn xoá sản phẩm này?',
      })
    )
  }, [id, dispatch, deleteProduct, router])

  const onPickImages = async () => {
    const img = await pickImage()
    if (img) setImages([...images, ...img])
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isNew ? 'Thêm sản phẩm' : 'Chi tiết sản phẩm',
      headerRight: () =>
        !isNew && (
          <Button size="$2" theme="red" disabled={isLoading} onPress={onDelete}>
            <Trash2 size={12} />
            Xoá
          </Button>
        ),
    })
  }, [id, navigation])

  return (
    <>
      <ScreenContainer>
        <Stack px="$4" flex={1} gap="$2">
          <FormInput
            control={control}
            name="name"
            label="Tên sản phẩm:"
            placeholder="Nhập tên sản phẩm"
            errors={errors}
          />
          <FormInput
            control={control}
            name="description"
            label="Mô tả:"
            placeholder="Nhập mô tả sản phẩm"
            errors={errors}
          />
          <FormInput
            control={control}
            name="categories"
            label="Danh mục:"
            placeholder="Nhập danh mục sản phẩm"
            defaultValue={[]}
            errors={errors}
            InputComponent={CategoryInput}
          />
          <FormInput
            control={control}
            name="quantity"
            label="Số lượng:"
            placeholder="Nhập số lượng sản phẩm"
            errors={errors}
          />
          <FormInput
            control={control}
            name="baseUnit"
            label="Tên đơn vị:"
            placeholder="Nhập tên đơn vị"
            errors={errors}
          />
          <XStack gap="$2">
            <FormInput
              control={control}
              name="price"
              label="Giá bán:"
              placeholder="Nhập giá bán"
              errors={errors}
              containerProps={{ flex: 1 }}
            />
            <FormInput
              control={control}
              name="basePrice"
              label="Giá vốn:"
              placeholder="Nhập giá vốn"
              errors={errors}
              containerProps={{ flex: 1 }}
            />
          </XStack>
          <Text>Ảnh sản phẩm:</Text>
          <XStack flexWrap="wrap" gap="$2" width="100%" items="center">
            <Stack
              onPress={onPickImages}
              width="$8"
              height="$6"
              items="center"
              justify="center"
              rounded="$2"
              borderWidth={2}
              borderColor="$borderColor"
            >
              <ImageIcon size="$4" />
            </Stack>
            {images.length > 0 &&
              images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  width="$6"
                  height="$6"
                  alt="Product Image"
                />
              ))}
            {data?.pictures &&
              data.pictures.map((picture, index) => (
                <Image
                  key={index}
                  source={{ uri: getImageUrl(picture) }}
                  width="$6"
                  height="$6"
                  alt="Product Image"
                />
              ))}
          </XStack>
        </Stack>
      </ScreenContainer>
      <Button
        onPress={handleSubmit(onSubmit)}
        theme="blue"
        mx="$4"
        my="$2"
        disabled={creating || updating}
      >
        {isNew ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
      </Button>
    </>
  )
}
