import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWishlist, deleteFromWishlist, addToCart, updateProductQuantity } from "../store";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineShoppingCart } from "react-icons/ai";

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

   return (
      <section className="vh-50">
         <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
               <div className="col-md-12 col-xl-10">
                  <div className="card">
                     <div className="card-header p-3">
                        <h5 className="mb-0">My Wishlist</h5>
                     </div>
                     <div
                        className="card-body"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "400px" }}>
                        <table className="table mb-0">
                           <thead>
                              <tr>
                                 <th scope="col">Product Name</th>
                                 <th scope="col">Price</th>
                                 <th scope="col">Stock Status</th>
                                 <th scope="col">Actions</th>
                              </tr>
                           </thead>
                           <tbody>
                              {wishlist.length ? (
                                 wishlist.map((item) => (
                                    <tr key={item.id} className="fw-normal">
                                       <th>
                                          {item.product && item.product.images && item.product.images.length > 0 && (
                                             <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="shadow-1-strong rounded-circle"
                                                style={{ width: "55px", height: "auto" }}
                                             />
                                          )}
                                          <span className="ms-2">
                                             <Link to={`/${item.productId}`} className="text-decoration-none text-dark">
                                                {item.product && item.product.name}
                                             </Link>
                                          </span>
                                       </th>
                                       <td className="align-middle">
                                          <span>
                                             {item.product && item.product.price ? `$${item.product.price}` : "N/A"}
                                          </span>
                                       </td>
                                       <td className="align-middle">
                                          <h6 className="mb-0">
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
                                          </h6>
                                       </td>
                                       <td className="align-middle">
                                          <a
                                             onClick={() => handleAddToCart(item.product, item.product.name)}
                                             style={{
                                                fontSize: "25px",
                                                marginRight: "15px",
                                                cursor: "pointer"
                                             }}>
                                             <AiOutlineShoppingCart />
                                          </a>

                                          <a
                                             className="trash-icon"
                                             style={{
                                                cursor: "pointer",
                                                fontSize: "20px",
                                                color: "#212529"
                                             }}
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
      </section>
   );
};

export default Wishlist;
