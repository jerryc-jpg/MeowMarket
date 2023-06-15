import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import RegisterAcc from "./Register";
import Cart from "./Cart";
import About from "./About";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart, fetchProducts, Register } from "../store";
import { Link, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import SingleProduct from "./SingleProduct";
import SingleProductAdmin from "./SingleProductAdmin";
import Checkout from "./Checkout";
import Users from "./Users";
import Profile from "./Profile";
import Orders from "./Orders";
import PaymentPage from "./PaymentPage";
import Wishlist from "./Wishlist";
import OrderHistoryDetail from "./OrderHistoryDetail";
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'




const App = () => {
   const { auth } = useSelector((state) => state);
   const dispatch = useDispatch();
   const { userId } = useParams();
   const [stripePromise, setStripePromise] = useState(null);

   useEffect(() => {
      fetch("/config").then(async (r) => {
         const { publishableKey } = await r.json();
         setStripePromise(loadStripe(publishableKey));
      });
   }, []);

   useEffect(() => {
      dispatch(loginWithToken());
      dispatch(fetchProducts());
   }, []);

   useEffect(() => {
      async function fetchData() {
         if (auth.id) {
            await dispatch(fetchCart());
         }
      }

      //console.log("app useEffect fetchData")

      fetchData();
      //if (auth.id) {
      //   dispatch(fetchCart());
      // }
   }, [auth]);

   return (
      <div>
         <Navbar />
         <div>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/cart/payment" element={<PaymentPage />} />
               <Route path="/cart/checkout" element={ 
                  <Elements stripe={stripePromise}>
                     <Checkout />
                  </Elements>} />

               <Route path="/about" element={<About />} />
               <Route path="/admin/:id" element={<SingleProductAdmin />} />
               <Route path="/register" element={<RegisterAcc />} />
               <Route path="/users" element={<Users />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/orders" element={<Orders />} />
               <Route path="/wishlist" element={<Wishlist />} />
               <Route path="/order-history/:orderId" element={<OrderHistoryDetail />} />
               <Route path="/:id" element={<SingleProduct />} />
               <Route path="*" element={<Home />} />
            </Routes>
         </div>
      </div>
   );
};

export default App;
