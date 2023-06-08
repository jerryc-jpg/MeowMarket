import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom"
import { addToCart } from "../store";
import SingleProductAdmin from "./SingleProductAdmin";
import { deleteProduct } from "../store";

const SingleProduct = () => {
    const {products, auth} = useSelector(state => state);
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const [quantity,setQuantity] = useState(1);
    const [oneProd, setOneProd] = useState({});
    const isAdmin = auth.isAdmin;
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
        const handleQuantityChange = (ev) => {
            const value = Number(ev.target.value);
            if ( value >= 1 && value <= 5) {
            setQuantity(value);
            }
        };
        
        if(oneProd.productType === 'cat'){
            console.log 
            return(
                <>
                    <h1>cat</h1>
                    <h1>{oneProd.name}</h1>
                    <img src = {oneProd.images} /> 
                    {isAdmin?<> <Link to={`/admin/${oneProd.id}`}><button>Edit</button></Link><button onClick={()=>{console.log('delete');
                        dispatch(deleteProduct(oneProd))
                    }}>Delete</button></>:
                            <button onClick={() => {console.log(1); dispatch(addToCart({product:oneProd,quantity}))}}>Add Cart</button>}
                </>
                )
        }else{
            return(
                <>  
                    <h1>accessory</h1>
                    <h1>{oneProd.name}</h1>
                    <img src = {oneProd.images} />
                    <button onClick={()=>decrementQ(quantity)}>-</button>
                    <input type="number" value={quantity} min="1" max="5" onChange={handleQuantityChange}/>
                    <button onClick={()=>incrementQ(quantity)}>+</button>
                    <button onClick={() => {console.log(1); dispatch(addToCart({product:oneProd,quantity}))}}>Add Cart</button>
                </>
                )
        }
        
    }


export default SingleProduct;