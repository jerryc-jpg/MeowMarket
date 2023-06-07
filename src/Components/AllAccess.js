import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";



const AllAccess = ()=> {
    const dispatch = useDispatch();
    const {products} = useSelector(state => state);
    const allAccess = products.filter((product) => product.productType === 'access');
    return (
        <div>
            {
            allAccess.map((access) => {
                return (
                    <div key={access.id}>   
                        <img src = {access.images} />
                        <Link to ={`/${access.id}`} >{access.name}</Link>
                        <button onClick={() => dispatch(addToCart({product:access,quantity:1}))}>Add to Cart</button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default AllAccess;