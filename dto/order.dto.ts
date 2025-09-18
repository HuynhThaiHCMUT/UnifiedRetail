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
  products: z.array(CreateOrderProductDtoSchema),
})

export type CreatePOSOrderDto = z.infer<typeof CreatePOSOrderDtoSchema>

export const CreateOnlineOrderDtoSchema = CreatePOSOrderDtoSchema.extend({
  customerId: z.string().nullish(),
  address: z.string().nullish(),
  phone: phoneSchema.nullish(),
  email: emailSchema.nullish(),
  customerName: z.string().nullish(),
})

export type CreateOnlineOrderDto = z.infer<typeof CreateOnlineOrderDtoSchema>

export const UpdateOrderDtoSchema = z.object({
  id: requiredStringSchema('id'),
  status: orderStatusSchema.nullish(),
  address: z.string().nullish(),
  phone: phoneSchema.nullish(),
  email: emailSchema.nullish(),
  customerName: z.string().nullish(),
  products: z
    .array(z.union([CreateOrderProductDtoSchema, UpdateOrderProductDtoSchema]))
    .nullish(),
})

export type UpdateOrderDto = z.infer<typeof UpdateOrderDtoSchema>

export const OrderDtoSchema = z.object({
  id: requiredStringSchema('id'),
  name: requiredStringSchema('Tên đơn hàng'),
  status: orderStatusSchema,
  total: integerSchema('Tổng tiền'),
  createdAt: dateSchema('Ngày tạo'),
  updatedAt: dateSchema('Ngày cập nhật'),
  staffId: z.string().nullish(),
  products: z.array(OrderProductDtoSchema),
  customerId: z.string().nullish(),
  address: z.string().nullish(),
  phone: phoneSchema.nullish(),
  email: emailSchema.nullish(),
  customerName: z.string().nullish(),
})

export type OrderDto = z.infer<typeof OrderDtoSchema>
