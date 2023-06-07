import React from "react";
import { useSelector } from "react-redux";

const Admin = () => {
   const { products } = useSelector((state) => state);
   console.log(products);
};

export default Admin;
