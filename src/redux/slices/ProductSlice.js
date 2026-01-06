import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
   "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log("Fetched products:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  } 
);
const ProductSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(fetchProducts.fulfilled, (state,action) => {
        state.products = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

 

export default ProductSlice.reducer;