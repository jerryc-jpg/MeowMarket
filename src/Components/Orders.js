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
      return (
         <p>
            Please <Link to="/login">login</Link> to view the your orders.
         </p>
      );
   }

   console.log(orders);
   return (
      <div className="container bootdev order-history-container">
         <div className="container bootdey">
            <div className="panel panel-default panel-order">
               <div className="panel-heading">
                  <strong>Order history</strong>
               </div>

               <div className="panel-body">
                  {orders.length === 0 ? (
                     <p>No past orders</p>
                  ) : (
                     <div>
                        {orders.map((order) => {
                           let totalQuantity = 0;
                           let totalCost = 0;

                           order.lineItems.forEach((item) => {
                              totalQuantity += item.quantity;
                              totalCost += item.quantity * item.product.price;
                           });

                           return (
                              <div key={order.id} className="row">
                                 <div className="col-md-1">
                                    <img
                                       src={order.lineItems[0].product.images[0]}
                                       className="media-object img-thumbnail"
                                    />
                                 </div>
                                 <div className="col-md-11">
                                    <div className="row">
                                       <div className="col-md-12">
                                          <div
                                             className={
                                                "pull-right label " +
                                                (order.status === "rejected"
                                                   ? "label-danger"
                                                   : order.status === "approved"
                                                   ? "label-success"
                                                   : "label-info")
                                             }>
                                             {order.status}
                                          </div>
                                          <span>
                                             <strong>Order ID: {order.id}</strong>
                                          </span>{" "}
                                          <br />
                                          Quantity: {totalQuantity}, cost: ${totalCost.toFixed(2)}
                                          <br />
                                       </div>
                                       <div className="col-md-12">
                                          order made on: {new Date(order.createdAt).toLocaleString()}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Orders;
