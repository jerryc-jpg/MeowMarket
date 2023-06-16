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
         <h2 className="justify-content-center text-center mt-5">
            Please <Link to="/login">login</Link> to view your orders.
         </h2>
      );
   }

   return (
      <div className="container px-3 my-5 clearfix">
         <div className="card custom-card">
            <div className="card-header">
               <h2>
                  <strong>Order History</strong>
               </h2>
            </div>
            <div className="card-body">
               {orders.length === 0 ? (
                  <p>No past orders</p>
               ) : (
                  <div>
                     {orders
                        .filter((order) => order.lineItems.length > 0)
                        .map((order) => {
                           let totalQuantity = 0;
                           let totalCost = 0;

                           order.lineItems.forEach((item) => {
                              if (item.product) {
                                 totalQuantity += item.quantity;
                                 totalCost += item.quantity * item.product.price;
                              }
                           });

                           return (
                              <div key={order.id} className="row">
                                 <div className="col-md-1">
                                    {order.lineItems[0].product && order.lineItems[0].product.images[0] && (
                                       <img
                                          src={order.lineItems[0].product.images[0]}
                                          className="media-object img-thumbnail"
                                       />
                                    )}
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
                                             <Link
                                                to={`/order-history/${order.id}`}
                                                className="text-decoration-none text-dark">
                                                <strong>Order ID: {order.id}</strong>
                                             </Link>
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
   );
};

export default Orders;
