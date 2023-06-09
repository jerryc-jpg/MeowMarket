import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, loginWithToken } from "../store";
import { Link } from "react-router-dom";

const Orders = () => {
   const dispatch = useDispatch();
   const { orders, auth } = useSelector((state) => state);

   useEffect(() => {
      dispatch(fetchOrders());
      dispatch(loginWithToken()); 
   }, [dispatch]);

   if (!auth.username) {
      return <p>Please <Link to='/login'>login</Link> to view the your orders.</p>;
    }

    return (
      <div className="container">
         <h2 className="mt-3">Past Orders for {auth.username}</h2>
         {orders.length === 0 ? (
            <p>No past orders</p>
         ) : (
            <div>
               <h2>Past Orders:</h2>
               {orders.map((order) => (
                  <div key={order.id} className="mb-4">
                     <p>Order ID: {order.id}</p>
                     <p>Total: {order.total}</p>
                     <ul className="list-unstyled">
                        {order.lineItems.map((item) => (
                           <li key={item.id}>
                              <Link to={`/${item.product.id}`}>{item.product.name}</Link> - Quantity: {item.quantity}
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Orders;
