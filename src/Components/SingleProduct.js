import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addToCart } from "../store";
import SingleProductAdmin from "./SingleProductAdmin";
import Sitefooter from "./Sitefooter";

import { deleteProduct, updateProductQuantity } from "../store";

const SingleProduct = () => {
   const { products, auth, cart } = useSelector((state) => state);
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [quantity, setQuantity] = useState(1);
   const [inventory, setInventory] = useState(0);
   const [oneProd, setOneProd] = useState({});
   const isAdmin = auth.isAdmin;
   const [limitExceeded, setLimiteExceeded] = useState(false);
   const [showPopUp, setShowPopUp] = useState(false);

   const handleTakeMeHomeClick = () => {
      setLimiteExceeded(true);
   };
   React.useEffect(() => {
      const foundProd = products.find((product) => product.id === id);
      if (foundProd) {
         setOneProd(foundProd);
         setInventory(foundProd.quantity);
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
         <>
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

                     <p
                        className="description"
                        style={{
                           fontSize: "1rem",
                           color: "dark grey"
                        }}>
                        {oneProd.description}
                     </p>
                     {oneProd.quantity === 0 ? <p>Not Availale</p> : null}
                     <p className="cat-detail">
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
                           <button
                              className="btn btn-outline-dark mt-3"
                              onClick={() => {
                                 dispatch(updateProductQuantity({ product: oneProd, quantity }));
                                 dispatch(addToCart({ product: oneProd, quantity }));
                              }}
                              disabled={oneProd.quantity === 0}>
                              {oneProd.quantity > 0 ? <span>TAKE ME HOME</span> : <span>LIMIT EXCEEDED</span>}
                           </button>
                           <Link to="/">
                              <button className="btn btn-outline-dark mt-3 ms-3">CONTINUE SHOPPING</button>
                           </Link>
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <Sitefooter/>
         </>
      );
   } else {
      return (
         <> 
            <div className="container vertical-center">
               <div className="row justify-content-center">
                  <div className="col-md-6">
                     <div className="card">
                        <img src={oneProd.images} alt="Access Image" className="card-img-top img-fluid" />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <h2> {oneProd.name}</h2>

                     <p className="product-detail">
                        <strong>Description:</strong>
                     </p>
                     <p
                        className="description"
                        style={{
                           fontSize: "1rem",
                           color: "dark grey"
                        }}>
                        {oneProd.description}
                     </p>
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
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="form-control border-0 text-center"
                                    style={{ maxWidth: "40px" }}
                                 />
                                 <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => incrementQ(quantity)}
                                    disabled={quantity >= oneProd.quantity}>
                                    +
                                 </button>
                              </div>
                           </div>
                           <div className="d-flex justify-content-start">
                              <button
                                 className="btn btn-outline-dark mt-3 me-2 ms-2"
                                 onClick={() => {
                                    dispatch(updateProductQuantity({ product: oneProd, quantity: quantity }));
                                    dispatch(addToCart({ product: oneProd, quantity }));
                                 }}>
                                 Add to Cart
                              </button>
                              <Link to="/">
                                 <button className="btn btn-outline-dark mt-3">CONTINUE SHOPPING</button>
                              </Link>
                           </div>
                           
                        </div>
                        
                     )}
                  </div>
               </div>
               
            </div>
            <Sitefooter/>
         </>
         
      );
   }
};

export default SingleProduct;
