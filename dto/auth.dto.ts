import {
    emailSchema,
    passwordSchema,
    phoneSchema,
    requiredStringSchema,
    roleSchema,
} from '@/utils/schema'
import { z } from 'zod'

export const SignInDtoSchema = z.object({
    phone: phoneSchema,
    password: passwordSchema,
})

export type SignInDto = z.infer<typeof SignInDtoSchema>

export const SignUpDtoSchema = z.object({
    name: requiredStringSchema('tên'),
    password: passwordSchema,
    email: emailSchema.optional(),
    phone: phoneSchema,
    role: roleSchema.optional(),
})

export type SignUpDto = z.infer<typeof SignUpDtoSchema>

export const AuthDtoSchema = z.object({
    id: requiredStringSchema('id'),
    name: requiredStringSchema('tên'),
    role: roleSchema,
    phone: phoneSchema,
    email: emailSchema.optional(),
    token: requiredStringSchema('token'),
    refreshToken: requiredStringSchema('refresh token'),
})

export type AuthDto = z.infer<typeof AuthDtoSchema>

export const RefreshTokenDtoSchema = z.object({
    token: requiredStringSchema('token'),
    userId: requiredStringSchema('userId'),
})

export type RefreshTokenDto = z.infer<typeof RefreshTokenDtoSchema>

export const NewTokenDtoSchema = z.object({
    token: requiredStringSchema('token'),
    refreshToken: requiredStringSchema('refreshToken'),
})

export type NewTokenDto = z.infer<typeof NewTokenDtoSchema>
