import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slides/productSlide";
import orderReducer from "./slides/orderSlide";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    user: userReducer,
    order: orderReducer,
  },
});
