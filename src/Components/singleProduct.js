import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../store";

const SingleProduct = () => {
    const {products} = useSelector(state => state);
    const dispatch = useDispatch();
    const [quantity,setQuantity] = useState(1);

    const decrementQ = () => {
        if(quantity>1){
            setQuantity(quantity - 1);
        }
    }

    const incrementQ = () => {
        if(quantity<5){
            setQuantity(quantity + 1);  
        }
        
    }

    const {id} = useParams();
    const oneProd = products.find(product => product.id === id);
    if (!oneProd) {
        return null;
    }
    return(
    <>
        <h1>{oneProd.name}</h1>
        <button onClick={decrementQ}>-</button>
        <input type="number" defaultValue={quantity} min="1" max="5"/>
        <button onClick={incrementQ}>+</button>
        <button onClick={() => {console.log(1); dispatch(addToCart({product:oneProd,quantity}))}}>Add Cart</button>
    </>
    )
}

export default SingleProduct;