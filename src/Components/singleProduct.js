import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const {products} = useSelector(state => state);

    const {id} = useParams();
    const oneProd = products.find(product => product.id === id);
    if (!oneProd) {
        return null;
    }
    return(
    <div>
        <h1>{oneProd.name}</h1>
        <button>add cart</button>
    </div>
    )
}

export default SingleProduct;