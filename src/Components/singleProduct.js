import React from "react";
import { useSelector } from "react-dom";

const SingleProduct = () => {
    const allProducts = useSelector(state => state);
    return(<h1>SingleProduct</h1>)
}

export default SingleProduct;