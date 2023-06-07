import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../store";

const SingleProduct = () => {
    const {products} = useSelector(state => state);
    const dispatch = useDispatch();

    const {id} = useParams();
    const oneProd = products.find(product => product.id === id);
    if (!oneProd) {
        return null;
    }
    return(
    <>
        <h1>{oneProd.name}</h1>
        <button>-</button>
        <input type="number" id="quantityInput" min="1" max="5"/>
        <button>+</button>
        <button onClick={() => {console.log(1); dispatch(addToCart({product:oneProd,quantity:1}))}}>Add Cart</button>
    </>
    )
}

export default SingleProduct;