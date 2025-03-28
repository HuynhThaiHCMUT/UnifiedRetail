import { z } from 'zod'
import {
    CreateOrderProductDtoSchema,
    OrderProductDtoSchema,
    UpdateOrderProductDtoSchema,
} from './order-product.dto'
import {
    dateSchema,
    emailSchema,
    integerSchema,
    orderStatusSchema,
    phoneSchema,
    requiredStringSchema,
} from '@/utils/schema'

export const CreatePOSOrderDtoSchema = z.object({
    products: z.array(OrderProductDtoSchema),
})

export type CreatePOSOrderDto = z.infer<typeof CreatePOSOrderDtoSchema>

export const CreateOnlineOrderDtoSchema = CreatePOSOrderDtoSchema.extend({
    customerId: z.string().optional(),
    address: z.string().optional(),
    phone: phoneSchema.optional(),
    email: emailSchema.optional(),
    customerName: z.string().optional(),
})

export type CreateOnlineOrderDto = z.infer<typeof CreateOnlineOrderDtoSchema>

export const UpdateOrderDtoSchema = z.object({
    id: requiredStringSchema('id'),
    status: orderStatusSchema.optional(),
    address: z.string().optional(),
    phone: phoneSchema.optional(),
    email: emailSchema.optional(),
    customerName: z.string().optional(),
    products: z
        .array(
            z.union([CreateOrderProductDtoSchema, UpdateOrderProductDtoSchema])
        )
        .optional(),
})

export type UpdateOrderDto = z.infer<typeof UpdateOrderDtoSchema>

export const OrderDtoSchema = z.object({
    id: requiredStringSchema('id'),
    status: orderStatusSchema,
    total: integerSchema('Tổng tiền'),
    createdAt: dateSchema('Ngày tạo'),
    updatedAt: dateSchema('Ngày cập nhật'),
    staffId: z.string().optional(),
    products: z.array(z.object({ OrderProductDtoSchema })),
})

export type OrderDto = z.infer<typeof OrderDtoSchema>
