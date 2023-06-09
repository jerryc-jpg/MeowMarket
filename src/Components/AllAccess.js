import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";

const AllAccess = () => {
   const dispatch = useDispatch();
   const { products } = useSelector((state) => state);
   const allAccess = products.filter((product) => product.productType !== "cat");

   const isActiveAdd = (id) => {
      const activeAdd = cart.lineItems.reduce((acc, curr) => {
         return acc && curr.productId !== id;
      }, true);
      return activeAdd;
   };

   return (
      <div className="container text-center">
         <div className="row">
            {allAccess.map((access) => {
               return (
                  <div key={access.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                     <div className="card h-100">
                        <div className="ratio ratio-4x3">
                           <img src={access.images} className="card-img-top img-fluid" alt={access.name} />
                        </div>
                        <div className="card-body">
                           <h5 className="card-title">{access.name}</h5>
                           <Link to={`/${access.id}`} className="btn btn-primary me-2">
                              Details
                           </Link>
                           <button
                              onClick={() => {
                                 if (isActiveAdd(cat.id)) {
                                    dispatch(addToCart({ product: access, quantity: 1 }));
                                 } else {
                                    window.alert("Maximum quantity reached!");
                                    console.log("Maximum quantity reached!");
                                 }
                              }}
                              className="btn btn-primary">
                              Add to Cart
                           </button>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default AllAccess;
