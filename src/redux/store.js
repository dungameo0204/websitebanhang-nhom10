import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
