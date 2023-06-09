import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, updateProductQuantity, addToWishlist, deleteFromWishlist } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const AllAccess = ({ filter }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { products, cart, wishlist } = useSelector((state) => state);
   const [allAccess, setAllAccess] = useState([]);
   const user = useSelector((state) => state.auth);

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 9;

   const handlePreviousPage = () => {
      setCurrentPage((Page) => Page - 1);
   };

   const handleNextPage = () => {
      setCurrentPage((Page) => Page + 1);
   };

   const addToWishlistHandler = (product) => {
      const isProductInWishlist = wishlist.some((item) => item.productId === product.id);

      if (isProductInWishlist) {
         dispatch(deleteFromWishlist(product));
      } else {
         dispatch(addToWishlist(product));
      }
   };

   React.useEffect(() => {
      let access = products.filter((product) => product.productType !== "cat");
      let accesslist = [...access];
      if (accesslist) {
         accesslist.sort(function (a, b) {
            if (a.name < b.name) {
               return -1;
            }
            if (a.name > b.name) {
               return 1;
            }
            return 0;
         });
      }
      setAllAccess(accesslist);
   }, [products, cart]);

   const AllfilteredAccess = allAccess.filter((access) => access.name.toLowerCase().includes(filter.toLowerCase()));

   const filteredAccess = [...AllfilteredAccess].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

   const totalPages = Math.ceil(allAccess.length / itemsPerPage);

   const handleAddToCart = (access) => {
      dispatch(updateProductQuantity({ product: access, quantity: 1 }));
      dispatch(addToCart({ product: access, quantity: 1 }));

      toast.success(`${access.name} added to cart!`);
   };

   const handleGoToSingleItem = (ev, id) => {
      const isButton = ev.target.closest(".btn-primary");
      const isHeartIcon = ev.target.closest(".btn-outline-danger.ms-3");

      if (!isButton && !isHeartIcon) {
         navigate(`/${id}`);
      }
   };

   const isProductInWishlist = (productId) => {
      return wishlist.some((item) => item.productId === productId);
   };

   return (
      <div className="container text-center">
         <div className="row">
            {filteredAccess.map((access) => {
               return (
                  <div key={access.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                     <div className="card h-100">
                        <div className="ratio ratio-4x3">
                           <img
                              src={access.images}
                              className="card-img-top img-fluid"
                              alt={access.name}
                              onClick={(ev) => handleGoToSingleItem(ev, access.id)}
                              style={{ cursor: "pointer" }}
                           />
                        </div>
                        <div className="card-body">
                           <h5 className="card-title">{access.name}</h5>
                           {user.username && (
                              <div className="mb-2">
                                 {isProductInWishlist(access.id) ? (
                                    <AiFillHeart
                                       className="heart active"
                                       onClick={() => addToWishlistHandler(access)}
                                    />
                                 ) : (
                                    <AiOutlineHeart className="heart" onClick={() => addToWishlistHandler(access)} />
                                 )}
                              </div>
                           )}
                           <Link to={`/${access.id}`} className="btn btn-outline-dark me-2">
                              Details
                           </Link>
                           <button
                              onClick={() => {
                                 handleAddToCart(access);
                              }}
                              className="btn btn-outline-dark">
                              {access.quantity > 0 ? <span>Add to Cart</span> : <span>Opps! Sold</span>}
                           </button>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         <nav className="Page navigation mb-5 d-flex justify-content-center align-items-center">
            <ul className="pagination my-4" style={{ gap: "10px" }}>
               <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={handlePreviousPage}>
                     Previous
                  </button>
               </li>
               {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <li className={`page-item ${page === currentPage ? "active" : ""}`} key={page}>
                     <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                     </button>
                  </li>
               ))}
               <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={handleNextPage}>
                     Next
                  </button>
               </li>
            </ul>
         </nav>
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

export default AllAccess;
