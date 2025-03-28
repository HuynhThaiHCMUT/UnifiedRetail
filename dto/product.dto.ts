import { z } from 'zod'
import { UnitDtoSchema } from './unit.dto'
import { dateSchema, integerSchema, requiredStringSchema } from '@/utils/schema'

export interface FilesUploadDto {
    files: any[]
}

export const CreateProductDtoSchema = z.object({
    name: requiredStringSchema('tên sản phẩm'),
    description: z.string().optional(),
    categories: z.array(z.string()).optional(),
    units: z.array(UnitDtoSchema),
    price: integerSchema('Giá'),
    basePrice: integerSchema('Giá gốc').optional(),
    quantity: integerSchema('Số lượng').optional(),
    minQuantity: integerSchema('Số lượng tối thiểu').optional(),
    barcode: z.string().optional(),
    baseUnit: z.string().optional(),
})

export type CreateProductDto = z.infer<typeof CreateProductDtoSchema>

export const UpdateProductDtoSchema = z.object({
    id: requiredStringSchema('id'),
    name: z.string().optional(),
    description: z.string().optional(),
    categories: z.array(z.string()).optional(),
    units: z.array(UnitDtoSchema).optional(),
    price: integerSchema('Giá').optional(),
    basePrice: integerSchema('Giá gốc').optional(),
    quantity: integerSchema('Số lượng').optional(),
    minQuantity: integerSchema('Số lượng tối thiểu').optional(),
    barcode: z.string().optional(),
    baseUnit: z.string().optional(),
    enabled: z.boolean().optional(),
})

export type UpdateProductDto = z.infer<typeof UpdateProductDtoSchema>

export const ProductDtoSchema = z.object({
    id: requiredStringSchema('id'),
    name: requiredStringSchema('tên sản phẩm'),
    description: z.string().optional(),
    categories: z.array(z.string()).optional(),
    units: z.array(UnitDtoSchema),
    price: integerSchema('Giá'),
    basePrice: integerSchema('Giá gốc').optional(),
    quantity: integerSchema('Số lượng').optional(),
    minQuantity: integerSchema('Số lượng tối thiểu').optional(),
    barcode: z.string().optional(),
    baseUnit: z.string().optional(),
    enabled: z.boolean(),
    pictures: z.array(z.string()),
    createdAt: dateSchema('Ngày tạo'),
    updatedAt: dateSchema('Ngày cập nhật'),
})

export type ProductDto = z.infer<typeof ProductDtoSchema>

export const GetProductsQueryDtoSchema = z.object({
    offset: z.number().int().default(0).optional(),
    limit: z.number().int().default(10).optional(),
    sortBy: z.enum(['time', 'price-desc', 'price-asc']).optional(),
    name: z.string().optional(),
    priceFrom: z.number().int().optional(),
    priceTo: z.number().int().optional(),
    categories: z.string().optional(),
})

export type GetProductsQueryDto = z.infer<typeof GetProductsQueryDtoSchema>
