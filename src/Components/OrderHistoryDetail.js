import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrders, loginWithToken } from "../store";

const OrderHistoryDetail = () => {
   const { orderId } = useParams();
   const { orders, auth } = useSelector((state) => state);
   const dispatch = useDispatch();
   console.log(orders);

   useEffect(() => {
      dispatch(fetchOrders());
      dispatch(loginWithToken());
   }, [dispatch]);

   const order = orders.find((order) => order.id === orderId);

   if (!order) {
      return <div>Loading...</div>; // or display an error message
   }

   return (
      <div className="container-fluid">
         <div className="container">
            <div className="text-center">
               <h2 className="mt-3">Details</h2>
            </div>
            <div className="d-flex justify-content-center align-items-center py-3">
               <h2 className="h5 mb-0">
                  <a href="#" className="text-muted"></a> Order #{orderId}
               </h2>
            </div>

            <div className="row">
               <div className="col-lg-10 mx-auto">
                  <div className="card mb-4">
                     <div className="card-body">
                        {order ? (
                           <div>
                              {order.lineItems.length === 0 ? (
                                 <p>No line items</p>
                              ) : (
                                 <div>
                                    {order.lineItems.map((item) => (
                                       <div key={item.id} className="row my-3">
                                          <div className="col-md-1">
                                             <Link to={`/${item.product.id}`}>
                                                <img
                                                   src={item.product.images[0]}
                                                   className="media-object img-thumbnail"
                                                   alt=""
                                                />
                                             </Link>
                                          </div>
                                          <div className="col-md-5">
                                             <div>
                                                <strong>Product:</strong>
                                                <Link
                                                   to={`/${item.product.id}`}
                                                   className="text-dark ms-2 text-underline-hover">
                                                   {item.product.name}
                                                </Link>
                                             </div>
                                             <div>
                                                {item.product.productType === "cat" ? (
                                                   <span>
                                                      <strong>Breed: </strong>
                                                      {item.product.breed}
                                                   </span>
                                                ) : null}
                                             </div>
                                          </div>
                                          <div className="col-md-3">
                                             <div>
                                                <strong>Quantity:</strong> {item.quantity}
                                             </div>
                                             <div>
                                                <strong>Price:</strong> ${item.product.price}
                                             </div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              )}
                           </div>
                        ) : (
                           <p>Order not found</p>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrderHistoryDetail;
