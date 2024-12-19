import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { searchProduct } = productSlide.actions;

export default productSlide.reducer;
