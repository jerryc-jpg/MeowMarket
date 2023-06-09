import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addToCart } from "../store";
import SingleProductAdmin from "./SingleProductAdmin";
import { deleteProduct, updateProductQuantity } from "../store";

const SingleProduct = () => {
   const { products, auth, cart } = useSelector((state) => state);
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [quantity, setQuantity] = useState(0);
   const [inventory, setInvetory] = useState(0);
   const [oneProd, setOneProd] = useState({});
   const isAdmin = auth.isAdmin;

   React.useEffect(() => {
      const foundProd = products.find((product) => product.id === id);
      if (!foundProd) {
         navigate("/");
      } else {
         setOneProd(foundProd);
         setInvetory(foundProd.quantity);
      }
   }, [products, id]);

   const decrementQ = (value) => {
      if (value > 1) {
         setQuantity(value - 1);
      }
   };

   const incrementQ = (value) => {
      if (value < 5) {
         setQuantity(value + 1);
      }
   };

   const handleQuantityChange = (ev) => {
      const value = Number(ev.target.value);
      if (value >= 1 && value <= 5) {
         setQuantity(value);
      }
   };

   const handleDelete = () => {
      dispatch(deleteProduct(oneProd));
      navigate("/");
   };

   if (oneProd.productType === "cat") {
      return (
         <div className="container vertical-center">
            <div className="row justify-content-center">
               <div className="col-md-6">
                  <div className="card">
                     <img src={oneProd.images[0]} alt="Cat Image" className="card-img-top img-fluid" />
                  </div>
               </div>
               <div className="col-md-6">
                  <h2>Cat Details</h2>
                  <p className="cat-detail">
                     <strong>Name:</strong> {oneProd.name}
                  </p>
                  <p className="cat-detail">
                     <strong>Breed:</strong> {oneProd.breed}
                  </p>
                  <p className="cat-detail">
                     <strong>Age:</strong> {oneProd.age}
                  </p>
                  <p className="cat-detail">
                     <strong>Description:</strong>
                  </p>

                  <p class="description">{oneProd.description}</p>
                  {oneProd.quantity === 0?(<p>Not Availale</p>):null}
                  <p className="cat-detail">
                     <strong>Price:</strong> ${oneProd.price}
                  </p>
                  
                  {isAdmin ? 
                     (  <div className="mt-3">
                           <Link to={`/admin/${oneProd.id}`} className="btn btn-primary me-2">
                              Edit
                           </Link>
                           <button onClick={handleDelete} className="btn btn-danger">
                              Delete
                           </button>
                        </div>
                     ) : (
                        <div>
                           <button
                              className="btn btn-success mt-3"
                              onClick={() => {
                                    dispatch(updateProductQuantity({product:oneProd,quantity}))
                                    dispatch(addToCart({ product: oneProd, quantity }))
                                 }  
                              }
                              disabled={oneProd.quantity===0} 
                           >
                              {
                                 oneProd.quantity>0?(<span>TAKE ME HOME</span>):(<span>LIMIT EXCEEDED</span>)
                              }
            
                           </button>
                           <button >CONTINUE SHOPPING</button>
                        </div>
                     )
                  }
     
               </div>
            </div>
         </div>
      );
   } else {
      return (

         <div className="container vertical-center">
            <div className="row justify-content-center">
               <div className="col-md-6">
                  <div className="card">
                     <img src={oneProd.images} alt="Access Image" className="card-img-top img-fluid" />
                  </div>
               </div>
               <div className="col-md-6">
                  <p className="product-detail">
                     <strong>Name:</strong> {oneProd.name}
                  </p>
                  <p className="product-detail">
                     <strong>Description:</strong>
                  </p>
                  <p className="description">{oneProd.description}</p>
                  <p className="product-detail">
                     <strong>Price:</strong> ${oneProd.price}
                  </p>
                  {isAdmin ? (
                     <div className="mt-3">
                        <Link to={`/admin/${oneProd.id}`} className="btn btn-primary me-2">
                           Edit
                        </Link>
                        <button onClick={handleDelete} className="btn btn-danger">
                           Delete
                        </button>
                     </div>
                  ) : (
                     <div className="d-flex justify-content-start">
                        <div className="mt-3">
                           <div className="input-group text-center">
                              <button
                                 className="btn btn-outline-secondary"
                                 type="button"
                                 onClick={() => decrementQ(quantity)}>
                                 -
                              </button>
                              <input
                                 type="number"
                                 value={quantity}
                                 onChange={handleQuantityChange}
                                 className="form-control border-0 text-center"
                                 style={{ maxWidth: "35px" }}
                              />
                              <button
                                 className="btn btn-outline-secondary"
                                 type="button"
                                 onClick={() => incrementQ(quantity)}
                                 disabled={quantity===oneProd.quantity}
                              >
                                 +
                              </button>
                           </div>
                        </div>
                        <div className="mt-3 ms-2 d-flex justify-content-center">
                           <button
                              className="btn btn-success"
                              onClick={() => {
                                 dispatch(updateProductQuantity({ product: oneProd, quantity:quantity}))
                                 dispatch(addToCart({ product: oneProd, quantity }));
                              }}
                              >
                               {
                                 oneProd.quantity>0?(<span>TAKE ME HOME</span>):(<span>LIMIT EXCEEDED</span>)
                              }
                              <span>({quantity})</span>
            
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>

      );
   }
};

export default SingleProduct;
