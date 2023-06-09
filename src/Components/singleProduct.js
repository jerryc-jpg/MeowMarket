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
   const [quantity, setQuantity] = useState(1);
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
                              TAKE ME HOME
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
         <>
            <h1>accessory</h1>
            <h1>{oneProd.name}</h1>
            <img src={oneProd.images} />
            <button onClick={() => decrementQ(quantity)}>-</button>
            <input type="number" value={quantity} min="1" max="5" onChange={handleQuantityChange} />
            <button onClick={() =>{console.log("hi"); dispatch(updateProductQuantity({product:item.product,quantity:-1}));
                          dispatch(addToCart({ product: item.product, quantity: 1 }))}}>+</button>
            <button
               onClick={() => {
                  dispatch(addToCart({ product: oneProd, quantity }));
               }}>
               Add Cart
            </button>
            <span>{inventory}</span>
         </>
      );
   }
};

export default SingleProduct;
