import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";


const AllCats = ()=> {
    const dispatch = useDispatch();
    const {products} = useSelector(state => state);
    const allCats = products.filter((product) => product.productType === 'cat');
    return (
        <div>
            {
            allCats.map((cat) => {
                return (
                    <div key={cat.id}>   
                        <img className = "w-50" src = {cat.images[0]} />
                        <Link to ={`/${cat.id}`} >{cat.name}</Link>
                        <button onClick={() => dispatch(addToCart({product:cat,quantity:1}))}>Add to Cart</button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default AllCats;