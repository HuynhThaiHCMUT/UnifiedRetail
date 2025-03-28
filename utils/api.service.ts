import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { RootState } from './store'
import { removeUser, setUser } from './auth.slice'
import { AuthDto, SignInDto, SignUpDto } from '../dto/auth.dto'
import { ApiError } from '../dto/error.dto'
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto/user.dto'
import {
    CreateProductDto,
    GetProductsQueryDto,
    ProductDto,
    UpdateProductDto,
} from '../dto/product.dto'
import {
    CreateOnlineOrderDto,
    CreatePOSOrderDto,
    OrderDto,
    UpdateOrderDto,
} from '../dto/order.dto'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_SERVER_HOST,
    timeout: 20000,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.user.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json')
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (
        result.error &&
        result.error.status === 401 &&
        (result.error.data as ApiError).code === 'EXPIRED_TOKEN'
    ) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            result = await baseQuery(
                {
                    url: 'auth/refresh',
                    method: 'POST',
                    body: {
                        token: (api.getState() as RootState).auth.user.refreshToken,
                        userId: (api.getState() as RootState).auth.user.id,
                    },
                },
                api,
                extraOptions
            )
            if (result.data) {
                api.dispatch(setUser(result.data as AuthDto))
                release()
                return await baseQuery(args, api, extraOptions)
            } else {
                release()
                setTimeout(async () => {
                    if (Platform.OS == 'ios' || Platform.OS == 'android') {
                        await SecureStore.deleteItemAsync('token')
                        await SecureStore.deleteItemAsync('refreshToken')
                    } else {
                        await AsyncStorage.removeItem('token')
                        await AsyncStorage.removeItem('refreshToken')
                    }
                    api.dispatch(removeUser())
                }, 3000)
            }
        } else {
            await mutex.waitForUnlock()
            return await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,

    tagTypes: ['User', 'Product', 'Order'],
    endpoints: (builder) => ({
        signIn: builder.mutation<AuthDto, SignInDto>({
            query: (body) => ({
                url: 'auth/sign-in',
                method: 'POST',
                body,
            }),
        }),
        signUp: builder.mutation<AuthDto, SignUpDto>({
            query: (body) => ({
                url: 'auth/sign-up',
                method: 'POST',
                body,
            }),
        }),
        getUsers: builder.query<UserDto[], void>({
            query: () => 'users',
            providesTags: ['User'],
        }),
        getUser: builder.query<UserDto, string>({
            query: (id) => `users/${id}`,
            providesTags: ['User'],
        }),
        createUser: builder.mutation<UserDto, CreateUserDto>({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation<UserDto, UpdateUserDto>({
            query: (body) => ({
                url: `users/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        getProducts: builder.query<ProductDto[], GetProductsQueryDto | void>({
            query: (params) => ({
                url: 'products',
                params: params ?? {},
            }),
            providesTags: ['Product'],
        }),
        getProduct: builder.query<ProductDto, string>({
            query: (id) => `products/${id}`,
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation<ProductDto, CreateProductDto>({
            query: (body) => ({
                url: 'products',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<ProductDto, UpdateProductDto>({
            query: (body) => ({
                url: `products/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        getOrders: builder.query<OrderDto[], void>({
            query: () => 'orders',
            providesTags: ['Order'],
        }),
        getOrder: builder.query<OrderDto, string>({
            query: (id) => `orders/${id}`,
            providesTags: ['Order'],
        }),
        createOnlineOrder: builder.mutation<OrderDto, CreateOnlineOrderDto>({
            query: (body) => ({
                url: 'orders/online',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Order'],
        }),
        createPOSOrder: builder.mutation<OrderDto, CreatePOSOrderDto>({
            query: (body) => ({
                url: 'orders/pos',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Order'],
        }),
        updateOrder: builder.mutation<OrderDto, UpdateOrderDto>({
            query: (body) => ({
                url: `orders/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Order'],
        }),
        deleteOrder: builder.mutation<void, string>({
            query: (id) => ({
                url: `orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
        }),
    }),
})

export const {
    useSignInMutation,
    useSignUpMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetOrdersQuery,
    useGetOrderQuery,
    useCreateOnlineOrderMutation,
    useCreatePOSOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = api
export default api
