import React from "react";
import { useSelector } from "react-redux";


const AllCats = ()=> {
    
    const {products} = useSelector(state => state);
    console.log(products);
    const allCats = products.filter((product) => product.productType === 'cat');
    return (
        <div>
            {
            allCats.map((cat) => {
                return <h1 key={cat.id}>{cat.name}</h1>
            })
            }
        </div>
    )
}

export default AllCats;