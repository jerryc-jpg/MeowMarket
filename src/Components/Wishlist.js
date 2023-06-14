import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWishlist, deleteFromWishlist, addToCart, updateProductQuantity } from "../store";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Wishlist = () => {
   const { wishlist } = useSelector((state) => state);
   const cart = useSelector((state) => state.cart);
   const dispatch = useDispatch();
   const { id } = useParams();

   React.useEffect(() => {
      dispatch(fetchWishlist(id));
   }, [dispatch, id]);

   const deleteFromWishlistHandler = (product) => {
      dispatch(deleteFromWishlist(product));
   };

   const handleAddToCart = (cat) => {
      if (cart.lineItems.find((item) => item.product.id === cat.id)) {
         toast.error(`${cat.name} is already in the cart!`);
      } else {
         dispatch(updateProductQuantity({ product: cat, quantity: 1 }));
         dispatch(addToCart({ product: cat, quantity: 1 }));
         toast.success(`${cat.name} added to cart!`);
      }
   };

   console.log(wishlist);
   return (
      <div className="cart-wrap">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="main-heading mb-10">My wishlist</div>
                  <div className="table-wishlist">
                     <table className="table" cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                           <tr>
                              <th width="45%">Product Name</th>
                              <th width="15%">Unit Price</th>
                              <th width="15%">Stock Status</th>
                              <th width="15%"></th>
                              <th width="10%"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {wishlist.length ? (
                              wishlist.map((item) => (
                                 <tr key={item.id}>
                                    <td width="45%">
                                       <div className="display-flex align-center">
                                          <div className="img-product">
                                             {item.product && item.product.images && item.product.images.length > 0 && (
                                                <img
                                                   src={item.product.images[0]}
                                                   alt={item.product.name}
                                                   className="mCS_img_loaded"
                                                />
                                             )}
                                          </div>
                                          <div className="name-product">{item.product && item.product.name}</div>
                                       </div>
                                    </td>
                                    <td width="15%" className="price">
                                       {item.product && item.product.price ? `$${item.product.price}` : "N/A"}
                                    </td>
                                    <td width="15%">
                                       {!item.product || item.product.quantity === 0 ? (
                                          <button type="button" className="btn btn-outline-danger" disabled>
                                             Unavailable
                                          </button>
                                       ) : (
                                          <button
                                             type="button"
                                             className="btn btn-outline-success"
                                             disabled={!item.product.isAvailable}>
                                             Available
                                          </button>
                                       )}
                                    </td>
                                    <td width="15%">
                                       {item.product && item.product.quantity && (
                                          <button
                                             onClick={() => handleAddToCart(item.product, item.product.name)}
                                             disabled={item.product.quantity === 0}
                                             className="btn btn-outline-dark my-2">
                                             <span>Take Me Home</span>
                                          </button>
                                       )}
                                    </td>
                                    <td width="10%" className="text-center">
                                       <a
                                          className="trash-icon"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => deleteFromWishlistHandler(item.product)}>
                                          <i className="far fa-trash-alt"></i>
                                       </a>
                                    </td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan="5" className="text-center">
                                    Wishlist is empty
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
         />
      </div>
   );
};

export default Wishlist;
