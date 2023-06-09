import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store';
import { Link } from "react-router-dom";

const Checkout = () => {
    const dispatch = useDispatch();
    const { orders, auth } = useSelector((state) => state);
    const [closedOrder,setClosedOrder] = useState({});

    React.useEffect(() => {
        if(orders){
            const currentClosed = orders[orders.length-1];
            setClosedOrder(currentClosed);
        }
      }, [orders]);
    

      console.log('closedOrder',closedOrder);
      
    if (closedOrder){
        return (
        <div>    
            <p>Thanks for shopping with us.</p>
            <p>Your order number: {closedOrder.id}</p>
        </div>    
)

    }
    
}

export default Checkout;