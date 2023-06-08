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


export const removeFromCart = createAsyncThunk('removeFromCart', async({product,quantityToRemove}) =>{
  try{
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/orders/cart',{product,quantityToRemove},{
      headers: {
        authorization: token
      }
    });
    return response.data;
    
  }catch(ex){
    console.log(err);
  }
  
})

export const checkoutCart = createAsyncThunk('checkoutCart', async()=>{
  try{
    const token = window.localStorage.getItem('token');
    const response = await axios.post('/api/orders/',null,{
      headers: {
        authorization: token
      }
    })
    console.log(response.data,'checkout')
  return response.data;
  }catch(err){
    console.log(err);
  }
  
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
    builder.addCase(removeFromCart.fulfilled, (state, action)=>{
      return action.payload;
    })
    builder.addCase(checkoutCart.fulfilled, (state,action)=>{
      return initialState;
    })
   
  }
})

export const { calculateTotal } = cartSlice.actions;

export default cartSlice.reducer;
