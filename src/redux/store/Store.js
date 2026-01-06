import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slices/ProductSlice";
import cartSlice from "../slices/CartSlice";
const store = configureStore({
  reducer: {
    productSlice,
    cartSlice,
  },
});

export default store;


