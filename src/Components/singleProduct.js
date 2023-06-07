import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"
import { addToCart } from "../store";

const SingleProduct = () => {
    const {products} = useSelector(state => state);
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const [quantity,setQuantity] = useState(1);
    const [oneProd, setOneProd] = useState({});

    React.useEffect(() => { 
        console.log('line15',id);
        const foundProd = products.find(product => product.id === id);
        console.log('line16');
        if (!foundProd) {
            navigate('/');
        }else{
            setOneProd(foundProd);
        }
        
    },[products,id]);


    const decrementQ = (value) => {
        if(value>1){
            setQuantity(value - 1);
        }
    }

    const incrementQ = (value) => {
        if(value<5){
            setQuantity(value + 1);  
        }
        
    }


    return(
    <>
        <h1>{oneProd.name}</h1>
        <button onClick={()=>decrementQ(quantity)}>-</button>
        <input type="number" value={quantity} min="1" max="5"/>
        <button onClick={()=>incrementQ(quantity)}>+</button>
        <button onClick={() => {console.log(1); dispatch(addToCart({product:oneProd,quantity}))}}>Add Cart</button>
    </>
    )
}

export default SingleProduct;