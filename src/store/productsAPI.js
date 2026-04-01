import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const productsApi = createApi({
    reducerPath: 'productsApi', // Key di Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fakestoreapi.com',
        // Tambah headers global di sini
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) headers.set('Authorization', `Bearer ${token}`)
            return headers
        },
    }),
    endpoints: (builder) => ({
        // Query (GET request)
        getProducts: builder.query({
            query: () => '/products',
            providesTags: ['Product'], // Untuk cache invalidation
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
        }),
        // Mutation (POST/PUT/DELETE)
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: '/orders',
                method: 'POST',
                body: orderData,
            }),
            invalidatesTags: ['Order'], // Invalidate cache setelah create
        }),
    }),
})
// Auto-generated hooks:
export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateOrderMutation,
} = productsApi