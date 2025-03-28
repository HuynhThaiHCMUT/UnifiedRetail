import { integerSchema, requiredStringSchema } from '@/utils/schema'
import { z } from 'zod'

export const CreateOrderProductDtoSchema = z.object({
    productId: requiredStringSchema('mã sản phẩm'),
    unitName: z.string().optional(),
    quantity: integerSchema('Số lượng'),
    price: integerSchema('Đơn giá'),
})

export type CreateOrderProductDto = z.infer<typeof CreateOrderProductDtoSchema>

export const UpdateOrderProductDtoSchema = z.object({
    id: requiredStringSchema('mã sản phẩm đơn hàng'),
    productId: requiredStringSchema('mã sản phẩm'),
    unitName: z.string().optional(),
    quantity: integerSchema('Số lượng').optional(),
    price: integerSchema('Đơn giá').optional(),
})

export type UpdateOrderProductDto = z.infer<typeof UpdateOrderProductDtoSchema>

export const OrderProductDtoSchema = z.object({
    id: requiredStringSchema('mã sản phẩm đơn hàng'),
    productId: requiredStringSchema('mã sản phẩm'),
    unitName: z.string().optional(),
    quantity: integerSchema('Số lượng'),
    price: integerSchema('Đơn giá'),
    total: integerSchema('Thành tiền'),
})

export type OrderProductDto = z.infer<typeof OrderProductDtoSchema>
