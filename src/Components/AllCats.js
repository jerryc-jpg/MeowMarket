import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const AllCats = ()=> {
    
    const {products} = useSelector(state => state);
    console.log(products);
    const allCats = products.filter((product) => product.productType === 'cat');
    return (
        <div>
            {
            allCats.map((cat) => {
                return <Link to ={`/${cat.id}`} key={cat.id}>{cat.name}</Link>
            })
            }
        </div>
    )
}

export default AllCats;