import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts= createAsyncThunk('fetchProducts', async()=>{
    const products = await axios.get('/api/products');
    return products.data;
});

export const createProduct = createAsyncThunk("createProduct", async (product, {rejectWithValue}) => {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.post('/api/admin/products', {
        headers: {
          authorization: token
        }
      });
      return response.data;
    }
    else {
      return rejectWithValue();
    }
  });

  export const editProduct = createAsyncThunk("editProduct", async (product, {rejectWithValue}) => {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.put(`/api/admin/products/${product.id}`, product, {
        headers: {
          authorization: token
        }
      });
      return response.data;
    }
    else {
      return rejectWithValue();
    }
  });

  export const deleteProduct = createAsyncThunk("deleteProduct", async (productId, {rejectWithValue}) => {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.delete(`/api/admin/products/${productId}`, {
        headers: {
          authorization: token
        }
      });
      return response.data;
    }
    else {
      return rejectWithValue();
    }
  });

   const productSlice = createSlice({
    name:"products",
    initialState: [],
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(editProduct.fulfilled, (state, action) => {
            const index = state.findIndex((product) => product.id === action.payload.id);
            state[index] = action.payload;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            return state.filter((product) => product.id !== action.payload.id)
        })
    }
})

export default productSlice.reducer;