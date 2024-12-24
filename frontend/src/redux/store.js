import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import userReducer from './slices/userSlice'
import orderReducer from './slices/orderSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        order: orderReducer,
        cart: cartReducer,
    },
})