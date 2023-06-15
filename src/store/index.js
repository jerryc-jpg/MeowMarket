import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import products from './productsSlice'
import orders from './ordersSlice'
import users from './usersSlice'
import wishlist from './wishlist'

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth: auth,
    cart: cart,
    products: products,
    orders: orders,
    users: users,
    wishlist: wishlist
  }
});

export default store;
export * from './auth';
export * from './cart';
export * from './productsSlice';
export * from './ordersSlice';
export * from './usersSlice';
export * from './wishlist';

