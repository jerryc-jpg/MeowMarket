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
import SingleProduct from "./singleProduct";
import SingleProductAdmin from "./SingleProductAdmin";

const App = () => {
   const { auth } = useSelector((state) => state);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(loginWithToken());
      dispatch(fetchProducts());
   }, []);

   useEffect(() => {
      if (auth.id) {
         dispatch(fetchCart());
      }
   }, [auth]);

   return (
      <div>
         <Navbar />
         <div>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/:id" element={<SingleProduct />} />
               <Route path="/about" element={<About />} />
               <Route path="/admin/:id" element={<SingleProductAdmin />} />
               <Route path="/register" element={<RegisterAcc />} />
            </Routes>
         </div>
      </div>
   );
};

export default App;
