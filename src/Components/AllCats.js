import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";

const AllCats = () => {
   const dispatch = useDispatch();
   const { products, cart } = useSelector((state) => state);
   const allCats = products.filter((product) => product.productType === "cat");
   console.log(cart.lineItems,"allcats line11");

   const isActiveAdd = (id) =>{
      const activeAdd = cart.lineItems.reduce((acc,curr) =>{return acc && curr.productId!==id }, true)
      return activeAdd;
   }

   return (
      <div className="container text-center">
         <div className="row">
            {allCats.map((cat) => (
               <div key={cat.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100">
                     <div className="ratio ratio-4x3">
                        <img className="card-img-top img-fluid" src={cat.images[0]} alt={cat.name} />
                     </div>
                     <div className="card-body">
                        <h5 className="card-title">{cat.name}</h5>
                        <Link to={`/${cat.id}`} className="btn btn-primary me-2">
                           Details
                        </Link>
                        <button
                           onClick={() =>{if(isActiveAdd(cat.id)){dispatch(addToCart({ product: cat, quantity: 1 }))}
                           else{
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
            ))}
         </div>
      </div>
   );
};

export default AllCats;
