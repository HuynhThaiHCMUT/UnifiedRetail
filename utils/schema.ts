import { z } from 'zod'
import { OrderStatus, Role } from './enum'

export const requiredStringSchema = (name: string) =>
  z.string().nonempty(`Không được để trống ${name}`)
export const integerSchema = (name: string) =>
  z
    .number({ message: `${name} phải là một số nguyên` })
    .int({ message: `${name} phải là một số nguyên` })
export const parseIntegerSchema = (name: string) =>
  z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: 'Số lượng phải là số' })
export const dateSchema = (name: string) =>
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, {
      message: `${name} không hợp lệ`,
    })
    .transform((val) => new Date(val).toLocaleString())
export const booleanSchema = (name: string) =>
  z.boolean({ message: `${name} không hợp lệ` })
export const emailSchema = z.string().email('Email không hợp lệ')
export const phoneSchema = z
  .string()
  .regex(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ')
export const passwordSchema = z
  .string()
  .min(8, 'Mật khẩu tối thiểu 8 ký tự')
  .max(20, 'Mật khẩu tối đa 20 ký tự')
export const roleSchema = z.nativeEnum(Role, {
  message: 'Chức vụ không hợp lệ',
})
export const orderStatusSchema = z.nativeEnum(OrderStatus, {
  message: 'Trạng thái đơn hàng không hợp lệ',
})
