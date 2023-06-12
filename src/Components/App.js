import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import RegisterAcc from "./Register";
import Cart from "./Cart";
import About from "./About";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart, fetchProducts, Register } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import SingleProduct from "./SingleProduct";
import SingleProductAdmin from "./SingleProductAdmin";
import Checkout from "./Checkout";
import Users from "./Users";
import Profile from "./Profile";
import Orders from "./Orders";

const App = () => {
   const { auth } = useSelector((state) => state);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(loginWithToken());
      dispatch(fetchProducts());
   }, []);

   useEffect( () => {
      async function fetchData(){
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
               <Route path="/cart/checkout" element={<Checkout />} />
               <Route path="/about" element={<About />} />
               <Route path="/admin/:id" element={<SingleProductAdmin />} />
               <Route path="/register" element={<RegisterAcc />} />
               <Route path="/users" element={<Users />} /> 
               <Route path="/profile" element={<Profile />} />
               <Route path="/orders" element={<Orders />} />

               <Route path="/:id" element={<SingleProduct />} />
               <Route path="*" element={<Home />} />
            </Routes>
         </div>
      </div>
   );
};

export default App;
