import React,{useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, updateProductQuantity } from "../store";



const AllAccess = ()=> {
    const dispatch = useDispatch();
    const {products, cart} = useSelector(state => state);
    const [allAccess,setAllAccess] = useState([]);
    
    
    React.useEffect(()=>{
        let Access = products.filter((product) => product.productType !== 'cat' && product.quantity >0);
        setAllAccess(Access);
     },[products,cart])
    
    
    return (
        <div>
            {
            allAccess.map((access) => {
                return (
                    <div key={access.id}>   
                        <img src = {access.images} />
                        <Link to ={`/${access.id}`} >{access.name}</Link>
                        <button 
                            onClick={() => {
                                dispatch(updateProductQuantity({product:access,quantity:1}))
                                dispatch(addToCart({product:access,quantity:1}))
                                }
                            }
                        >Add to Cart
                        </button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default AllAccess;
