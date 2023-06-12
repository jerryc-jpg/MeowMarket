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

const handelNewAddToCart = (visitorOrder,{product,quantity,productId,id})=>{
  console.log('combine individual item');
  let lineItem = visitorOrder.find(lineItem =>{
    return lineItem.productId === productId;
  })
  if(lineItem){
    lineItem.quantity+= quantity;
  }else{
    visitorOrder.push({product,quantity,productId,id});
  }

 }

 const handelNewRemoveFromCart = (visitorOrder,{product,quantityToRemove})=>{
  console.log('handelNewRemoveFromCart');
  let lineItem = visitorOrder.find(lineItem =>{
    console.log('lineItem.productId:',lineItem.productId,'=>product.id:',product.id);
    return lineItem.productId === product.id;
  })
  console.log('lineItem:',lineItem);
  if(lineItem){
    lineItem.quantity-= quantityToRemove;
  }
  
 }



export const addToCart = createAsyncThunk('addToCart', async({product,quantity}) =>{
  try{
    const token = window.localStorage.getItem('token');
    console.log('token line 56:', token);
    if(token){
      const response = await axios.post('/api/orders/cart',{product,quantity},{
        headers: {
          authorization: token
        }
      });
      return response.data;
    }else{
      const visitorOrderString = window.localStorage.getItem('visitorOrder');
      let visitorOrder;
      if(visitorOrderString){
        visitorOrder = JSON.parse(visitorOrderString);
        let productId = product.id;
        let id = visitorOrder.length;
        handelNewAddToCart(visitorOrder,{product,quantity,productId,id});
        let updateVisitorOrderString = JSON.stringify(visitorOrder);
        window.localStorage.setItem('visitorOrder',updateVisitorOrderString);
      }else{
        visitorOrder=[];
        let productId = product.id;
        let id = 0;
        visitorOrder.push({product,quantity,productId,id});
        let updateVisitorOrderString = JSON.stringify(visitorOrder);
        window.localStorage.setItem('visitorOrder',updateVisitorOrderString);
      }
     
      return {lineItems:visitorOrder};
      
    }
  }catch(err){
    console.log(err);
  }

})


export const removeFromCart = createAsyncThunk('removeFromCart', async({product,quantityToRemove}) =>{
  try{
    // const token = window.localStorage.getItem('token');
    // const response = await axios.put('/api/orders/cart',{product,quantityToRemove},{
    //   headers: {
    //     authorization: token
    //   }
    // });
    // return response.data;

    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.put('/api/orders/cart',{product,quantityToRemove},{
        headers: {
          authorization: token
        }
      });
      return response.data;
    }else{
      const visitorOrderString = window.localStorage.getItem('visitorOrder');
      let visitorOrder;
      visitorOrder = JSON.parse(visitorOrderString);
      handelNewRemoveFromCart(visitorOrder,{product,quantityToRemove});
      let updateVisitorOrderString = JSON.stringify(visitorOrder);
      window.localStorage.setItem('visitorOrder',updateVisitorOrderString);
      return {lineItems:visitorOrder};
    }
    
    
    
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
  reducers: {
    logoutHideCart:(state)=>{
      return {};
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchCart.fulfilled, (state, action)=>{
      return action.payload;
    })
    builder.addCase(addToCart.fulfilled, (state, action)=>{
      if(action.payload){
        return action.payload;
      }
      
    })
    builder.addCase(removeFromCart.fulfilled, (state, action)=>{
      return action.payload;
    })
    builder.addCase(checkoutCart.fulfilled, (state,action)=>{
      return initialState;
    })
   
  }
})

export const { logoutHideCart } = cartSlice.actions;

export default cartSlice.reducer;
