import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState={
  lineItems: []
}

export const fetchCart = createAsyncThunk("fetchCart", async()=>{
  try{
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: token
      }
    });
    return response.data;
  }catch(err){
    console.log(err)
  }
})

export const addToCart = createAsyncThunk('addToCart', async({product,quantity}) =>{
  try{
    const token = window.localStorage.getItem('token');
    const obj = {product,quantity}
    const response = await axios.post('/api/orders/cart',{product,quantity},{
      headers: {
        authorization: token
      }
    });
    return response.data;
  }catch(err){
    console.log(err);
  }

})

export const updateCart = createAsyncThunk('updateCart', async(request) =>{
  const response = await axios.put('/api/orders/cart',request);
  return response.data;
})

export const removeCart = createAsyncThunk('removeCart', async(request) =>{
  const response = await axios.put('/api/orders/cart',request);
  return response.data;
})

const cartSlice = createSlice({
  name:"cart",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchCart.fulfilled, (state, action)=>{
      return action.payload;
    })
    builder.addCase(addToCart.fulfilled, (state, action)=>{
      return action.payload;
    })
   
  }
})

export default cartSlice.reducer;
