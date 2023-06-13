import React, { useEffect, useState } from "react";
import { useDispatch,  } from 'react-redux';
import { checkoutCart } from "../store";
const Checkout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkoutCart());
    }, [])

    return (
        <div>    
            <h1>Thanks for shopping with us.</h1>
        </div>    
    )
    
}

export default Checkout;