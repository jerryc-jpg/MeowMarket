import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"

const SingleProductAdmin = () =>{
    const {products} = useSelector(state => state);
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const [oneProd,setOneProd] = useState({});
    const [name,setName] = useState('');
    const [isCat,setIsCat] = useState(false);

    React.useEffect(() => { 
        const foundProd = products.find(product => product.id === id);
        
        if (!foundProd) {
            navigate('/');
        }else{
            setOneProd(foundProd);
            setName(foundProd.name);
            console.log(foundProd.productType);
            if(foundProd.productType === 'cat'){
                setIsCat(true);
            }
        }
    },[products,id]);
    console.log(isCat);
    return(
        <div>
            <form>
                <label htmlFor="name">Name:</label>
                <input placeholder="name" />
                <label htmlFor="productType">Type:</label>
                <input placeholder="type" />
                <label htmlFor="price">Price:</label>
                <input placeholder="price" />
                <label htmlFor="image">image</label>
                <input placeholder="image" />
                {isCat?<> <label htmlFor="breed">Breed:</label>
                            <input placeholder="breed" />
                            <label htmlFor="age">age</label>
                            <input placeholder="age" />
                        </>:null}
                <label htmlFor="description">description:</label>
                <input placeholder="description" />
                <label htmlFor="quantity">quantity</label>
                <input placeholder="quantity" />
            </form>
        </div>
    )
}

export default SingleProductAdmin;