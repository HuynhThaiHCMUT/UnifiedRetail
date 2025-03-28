import { z } from 'zod'
import {
    dateSchema,
    emailSchema,
    passwordSchema,
    phoneSchema,
    requiredStringSchema,
    roleSchema,
} from '@/utils/schema'

export interface FileUploadDto {
    file: any
}

export const CreateUserDtoSchema = z.object({
    name: requiredStringSchema('tên người dùng'),
    password: passwordSchema,
    email: emailSchema.optional(),
    phone: phoneSchema,
    role: roleSchema.optional(),
    picture: z.string().optional(),
})

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>

export const UpdateUserDtoSchema = z.object({
    id: requiredStringSchema('id'),
    name: z.string().optional(),
    email: emailSchema.optional(),
    phone: phoneSchema.optional(),
    role: roleSchema.optional(),
    picture: z.string().optional(),
})

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>

export const UserDtoSchema = z.object({
    id: requiredStringSchema('id'),
    name: requiredStringSchema('tên người dùng'),
    email: emailSchema.optional(),
    phone: phoneSchema,
    role: roleSchema,
    picture: z.string().optional(),
    createdAt: dateSchema('Ngày tạo'),
    updatedAt: dateSchema('Ngày cập nhật'),
})

export type UserDto = z.infer<typeof UserDtoSchema>
